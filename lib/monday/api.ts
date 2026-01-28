// =============================================================================
// Monday.com API utilities
// =============================================================================

import type { MondayBoard, MondayColumn, MondayItem, CreatedItem, ColumnLabels } from "./types";

let apiToken: string | null = null;

export function setApiToken(token: string): void {
  apiToken = token;
}

export function getApiToken(): string {
  if (!apiToken) {
    throw new Error("Monday API token not set. Call setApiToken() first.");
  }
  return apiToken;
}

// =============================================================================
// Core API request function
// =============================================================================

export async function mondayRequest<T>(
  query: string,
  variables?: Record<string, unknown>
): Promise<T> {
  const token = getApiToken();

  const response = await fetch("https://api.monday.com/v2", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: token,
      "API-Version": "2023-04",
    },
    body: JSON.stringify({ query, variables }),
  });

  if (!response.ok) {
    throw new Error(`Monday API error: ${response.status} ${response.statusText}`);
  }

  const data = await response.json();

  if (data.errors) {
    throw new Error(`Monday API errors: ${JSON.stringify(data.errors)}`);
  }

  return data;
}

// =============================================================================
// Board operations
// =============================================================================

export async function fetchBoardStructure(boardId: string): Promise<MondayBoard> {
  const query = `
    query ($boardId: [ID!]) {
      boards(ids: $boardId) {
        id
        name
        columns {
          id
          title
          type
          settings_str
        }
        groups {
          id
          title
        }
      }
    }
  `;

  const result = await mondayRequest<{ data: { boards: MondayBoard[] } }>(query, {
    boardId: [boardId],
  });
  const board = result.data.boards[0];

  if (!board) {
    throw new Error(`Board ${boardId} not found`);
  }

  return board;
}

export async function fetchItem(itemId: string): Promise<MondayItem> {
  const query = `
    query ($itemId: [ID!]) {
      items(ids: $itemId) {
        id
        name
        board {
          id
          name
        }
        group {
          id
          title
        }
        column_values {
          id
          text
          ... on BoardRelationValue {
            linked_item_ids
            display_value
            linked_items {
              id
              name
              column_values {
                id
                text
              }
            }
          }
          ... on MirrorValue {
            display_value
          }
        }
      }
    }
  `;

  const result = await mondayRequest<{ data: { items: MondayItem[] } }>(query, {
    itemId: [itemId],
  });
  const item = result.data.items[0];

  if (!item) {
    throw new Error(`Item ${itemId} not found`);
  }

  return item;
}

export async function createItem(
  boardId: string,
  groupId: string,
  itemName: string,
  columnValues: Record<string, unknown>
): Promise<CreatedItem> {
  const query = `
    mutation ($boardId: ID!, $groupId: String!, $itemName: String!, $columnValues: JSON!) {
      create_item(
        board_id: $boardId
        group_id: $groupId
        item_name: $itemName
        column_values: $columnValues
      ) {
        id
        name
      }
    }
  `;

  const result = await mondayRequest<{ data: { create_item: CreatedItem } }>(query, {
    boardId,
    groupId,
    itemName,
    columnValues: JSON.stringify(columnValues),
  });

  return result.data.create_item;
}

// =============================================================================
// Column utilities
// =============================================================================

export function findColumnByType(
  columns: MondayColumn[],
  type: string
): MondayColumn | undefined {
  return columns.find((c) => c.type === type);
}

export function findColumnByTitle(
  columns: MondayColumn[],
  titlePattern: RegExp
): MondayColumn | undefined {
  return columns.find((c) => titlePattern.test(c.title.toLowerCase()));
}

// =============================================================================
// Label management
// =============================================================================

export function parseColumnLabels(column: MondayColumn): ColumnLabels {
  try {
    const settings = JSON.parse(column.settings_str);
    if (settings.labels) {
      if (Array.isArray(settings.labels)) {
        const result: ColumnLabels = {};
        for (const label of settings.labels) {
          result[label.id.toString()] = label.name;
        }
        return result;
      } else {
        return settings.labels;
      }
    }
  } catch {
    // Ignore parse errors
  }
  return {};
}

export function getExistingLabelNames(column: MondayColumn): string[] {
  const labels = parseColumnLabels(column);
  return Object.values(labels);
}

function findNextLabelIndex(column: MondayColumn): number {
  const labels = parseColumnLabels(column);
  const indices = Object.keys(labels)
    .map((k) => parseInt(k))
    .filter((n) => !isNaN(n));
  if (indices.length === 0) return 1;
  return Math.max(...indices) + 1;
}

async function addStatusLabels(
  boardId: string,
  columnId: string,
  column: MondayColumn,
  newLabels: string[]
): Promise<void> {
  let nextIndex = findNextLabelIndex(column);

  for (const label of newLabels) {
    const query = `
      mutation ($boardId: ID!, $columnId: String!, $value: String!) {
        change_column_metadata(
          board_id: $boardId
          column_id: $columnId
          column_property: labels
          value: $value
        ) {
          id
        }
      }
    `;

    const labelValue = JSON.stringify({ labels: { [nextIndex]: label } });
    await mondayRequest(query, {
      boardId,
      columnId,
      value: labelValue,
    });
    nextIndex++;
  }
}

export async function ensureLabelsExist(
  boardId: string,
  column: MondayColumn,
  requiredLabels: string[]
): Promise<void> {
  // Dropdown columns auto-create labels when setting values
  if (column.type === "dropdown") {
    console.log(`  Skipping "${column.title}" (dropdown) - labels auto-create on use`);
    return;
  }

  // Only handle status/color columns which require pre-created labels
  if (column.type !== "status" && column.type !== "color") {
    return;
  }

  const existingLabels = getExistingLabelNames(column);
  const missingLabels = requiredLabels.filter(
    (label) =>
      !existingLabels.some(
        (existing) => existing.toLowerCase() === label.toLowerCase()
      )
  );

  if (missingLabels.length === 0) {
    console.log(`  "${column.title}" - all labels exist`);
    return;
  }

  console.log(
    `  Adding missing labels to "${column.title}": ${missingLabels.join(", ")}`
  );
  await addStatusLabels(boardId, column.id, column, missingLabels);
}
