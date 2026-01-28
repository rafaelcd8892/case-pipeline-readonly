# Config-Driven Architecture

This document describes the config-driven architecture implemented to make the case-pipeline tool scalable and portable across different Monday.com workspaces.

## Overview

Instead of hardcoding Monday.com column IDs in the source code, the tool now uses YAML configuration files to define:

1. **Board definitions** - Board IDs and column resolution strategies
2. **Template definitions** - How Monday.com data maps to template variables

This allows adding new boards, columns, and templates without any code changes.

## Project Structure

```
case-pipeline/
├── config/
│   ├── boards.yaml           # Board & column definitions
│   └── templates.yaml        # Template variable mappings
├── lib/
│   ├── monday/               # Shared Monday.com API utilities
│   │   ├── api.ts            # Core API functions
│   │   ├── types.ts          # TypeScript interfaces
│   │   ├── column-resolver.ts # Dynamic column resolution
│   │   └── index.ts          # Re-exports
│   ├── config/               # Configuration loading
│   │   ├── types.ts          # Config type definitions
│   │   ├── loader.ts         # YAML parsing + env var substitution
│   │   └── index.ts          # Re-exports
│   └── template/             # Template utilities
│       ├── mapper.ts         # Variable mapping & validation
│       └── index.ts          # Re-exports
├── scripts/seed/             # Test data seeding (uses shared lib)
├── index.ts                  # Main entry point
└── templates/                # Handlebars templates
```

## Configuration Files

### config/boards.yaml

Defines Monday.com boards and how to resolve their columns:

```yaml
boards:
  profiles:
    id: "${PROFILES_BOARD_ID:18397286934}"  # Env override with default
    name: "Client Profiles"
    columns:
      email:
        resolve: by_type
        type: email

      priority:
        resolve: by_title
        pattern: "priority|status"
        types: [status, color]
        fallback:
          resolve: by_type
          type: status
```

### config/templates.yaml

Defines how Monday.com data maps to template variables:

```yaml
templates:
  client_letter:
    path: "templates/client.txt"
    source_board: profiles
    variables:
      contact_name:
        source: item.name
      email:
        source: column
        column: email
    validation:
      required: [contact_name, email]
      warn_if_empty: [phone, notes]
```

## Column Resolution Strategies

The column resolver supports three strategies:

| Strategy | Description | Example |
|----------|-------------|---------|
| `by_type` | Match by column type | `type: email` matches the email column |
| `by_title` | Match by title regex | `pattern: "priority\|status"` matches "Priority" or "Status" |
| `by_id` | Exact column ID | `id: "status5"` (fallback for edge cases) |

Each strategy supports:
- `types` - Optional array to filter by column type
- `fallback` - Another resolution to try if the first fails

## Environment Variables

Board IDs can be overridden via environment variables:

```bash
# In .env
PROFILES_BOARD_ID=18397286934
CONTRACTS_BOARD_ID=18397312752
```

The syntax `${VAR_NAME:default}` in YAML files will:
1. Use the environment variable if set
2. Fall back to the default value otherwise

## Usage

### Running the main pipeline

```bash
# Normal run
bun index.ts

# With debug output (shows column resolution)
bun index.ts --debug

# Use a different template
TEMPLATE_NAME=other_template bun index.ts
```

### Debug output

With `--debug`, you'll see column resolution details:

```
Resolving columns...
  ✓ email → email (Email, email)
  ✓ phone → phone (Phone, phone)
  ✓ priority → status5 (Priority, status)
  ✗ some_column → NOT FOUND
```

## Adding New Columns

To add a new column to the pipeline:

1. **Add to boards.yaml:**
   ```yaml
   columns:
     new_column:
       resolve: by_title
       pattern: "new.*column"
       types: [text]
   ```

2. **Add to templates.yaml:**
   ```yaml
   variables:
     new_variable:
       source: column
       column: new_column
   ```

3. **Use in template:**
   ```handlebars
   New Value: {{new_variable}}
   ```

No code changes required!

## Adding New Boards

1. Add the board definition to `config/boards.yaml`
2. Create a new template in `config/templates.yaml` with `source_board` pointing to the new board
3. Optionally add an environment variable override for the board ID

## Shared Library

The `lib/monday/` module is shared between:
- Main pipeline (`index.ts`)
- Seed scripts (`scripts/seed/`)

This ensures consistent API usage and reduces code duplication.

## Validation

The template mapper validates variables before rendering:

- **Required variables** - Must have a non-empty value (fails if missing)
- **Warn if empty** - Logs a warning but continues

Configure in `templates.yaml`:

```yaml
validation:
  required: [contact_name, email]
  warn_if_empty: [phone, notes]
```
