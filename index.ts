import Handlebars from "handlebars";
import { mkdir } from "node:fs/promises";
import { join } from "node:path";

// =============================================================================
// STEP A: Read config
// =============================================================================

const config = {
  mondayApiToken: process.env.MONDAY_API_TOKEN!,
  itemId: process.env.ITEM_ID!,
  templatePath: process.env.TEMPLATE_PATH || "templates/client.txt",
  outputDir: process.env.OUTPUT_DIR || "output",
};

if (!config.mondayApiToken || !config.itemId) {
  console.error("Error: MONDAY_API_TOKEN and ITEM_ID are required in .env");
  process.exit(1);
}

// =============================================================================
// STEP B: Fetch the Monday item
// =============================================================================

async function fetchMondayItem(itemId: string, token: string) {
  const query = `
    query {
      items(ids: [${itemId}]) {
        id
        name
        column_values {
          id
          text
        }
      }
    }
  `;

  const response = await fetch("https://api.monday.com/v2", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: token,
      "API-Version": "2023-04",
    },
    body: JSON.stringify({ query }),
  });

  if (!response.ok) {
    throw new Error(`Monday API error: ${response.status} ${response.statusText}`);
  }

  const data = await response.json() as {
    data?: { items?: any[] };
    errors?: any[];
  };

  if (data.errors) {
    throw new Error(`Monday API errors: ${JSON.stringify(data.errors)}`);
  }

  const item = data.data?.items?.[0];
  if (!item) {
    throw new Error(`Item ${itemId} not found`);
  }

  return item;
}

// =============================================================================
// STEP C: Map Monday response → template vars
// =============================================================================

function mapItemToTemplateVars(item: any) {
  // Create a lookup map for columns
  const col = Object.fromEntries(
    item.column_values.map((c: any) => [c.id, c.text ?? ""])
  );

  const vars = {
    contact_name: item.name,
    email: col["email"] || "",
    phone: col["phone"] || "",
    priority: col["status5"] || "",
    next_interaction: col["date"] || "",
    notes: col["text4"] || "",
  };

  return vars;
}

// =============================================================================
// STEP D: Render template + write output
// =============================================================================

async function renderTemplate(templatePath: string, vars: Record<string, string>, outputPath: string) {
  // Read template as text
  const templateFile = Bun.file(templatePath);
  const templateSource = await templateFile.text();

  // Compile template with Handlebars
  const template = Handlebars.compile(templateSource);

  // Render with vars
  const content = template(vars);

  // Write output
  await Bun.write(outputPath, content);
}

// =============================================================================
// Main execution
// =============================================================================

async function main() {
  try {
    console.log(`Fetching item ${config.itemId} from Monday...`);
    const item = await fetchMondayItem(config.itemId, config.mondayApiToken);
    console.log(`Fetched item: ${item.name}`);

    const vars = mapItemToTemplateVars(item);
    console.log("\nTemplate variables:");
    console.log(JSON.stringify(vars, null, 2));

    // Ensure output directory exists
    await mkdir(config.outputDir, { recursive: true });

    // Generate output filename with timestamp
    const timestamp = new Date().toISOString().replace(/[:.]/g, "-");
    const outputFilename = `rendered-${config.itemId}-${timestamp}.txt`;
    const outputPath = join(config.outputDir, outputFilename);

    console.log("\nRendering template...");
    await renderTemplate(config.templatePath, vars, outputPath);
    console.log(`Rendered: ${outputPath}`);
  } catch (error) {
    console.error("Error:", error);
    process.exit(1);
  }
}

main();
