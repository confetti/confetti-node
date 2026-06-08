# 4.1.0

- Feature: `tickets.update(id, data, options)` for editing tickets after create.
- Feature: tickets can now be created with inline `guestTickets` — an array of guest people that become child tickets attached to the parent. Each guest accepts `firstName`, `lastName`, `email`, `phone`, `company`, and `values`. Requires the event to have guest info enabled. Guests can only be set at create time; editing or removing guests on an existing ticket is not yet supported by the API.
- Feature: tickets now expose `parentTicket` (the parent of a guest ticket) and `guestTickets` (the guests of a parent ticket) as includable relations.
- Feature: ticket `values` (raw form field answers keyed by field name) can now be set on both create and update.
- Change: form field `name` is auto-generated from `title` when omitted on create, and is now treated as immutable — it is no longer accepted by `formFields.update`.

# 4.0.0 - 2026-06-01

- Feature: write-side CRUD added across the SDK — `events.update`, full CRUD for `pages`, `blocks`, `images`, `formFields`, `speakers`, `organisers`, `scheduleItems`, `sponsors`, `sponsorLevels`, plus read-only `forms` and `formFields`.
- Feature: image uploads supported via `images.create`.
- Feature: every model now exposes Zod schemas at `model.operations.{read,create,update}.schema`, and a `schemaToJsonSchema()` utility converts them to JSON Schema for tools like MCP.
- Feature: events expose `customCss`, a `workspace` relationship, and a tightened `location` schema.
- Feature: new `previewToken` model.
- Change: model attribute metadata moved from `model.attributes` to `model.operations.read.attributes`.
- Change: model field descriptions migrated from `.describe(JSON.stringify(...))` to native Zod `.meta()`, including `label`, `description`, `helpText`, and enum `values` for tooling.
- Change: blocks and images use `type` instead of `blockType` / `imageType`.
- Change: yayson upgraded to v4; the SDK uses typed presenters and store symbols internally.
- Change: dependency versions pinned (caret ranges dropped) for reproducible installs.

# 3.0.5 - 2026-05-20

- Fix: accept both string and number ids on write-side `*Id` fields (create, update, filter). JSON:API returns ids as strings, so values from `findAll` can now be passed straight into `create` without a `ZodError`. Uses `z.coerce.number()` — numeric callers keep working.

# 3.0.0 - 2025-09-15

- `model.attributes` are now found in `model.operations.read.attributes`
- Zod schemas are now included in all models
- Data and options is validated with Zod before being sent to the server
- Entire library rewritten to TypeScript and now provides types
- Drop support for Node 14, 16 & 18.
- ESM only

# 2.0.6 - 2025-01-27

- Fix: removes company field from create attributes in ticket model

# 2.0.5 - 2025-01-24

- Add company field to ticket model

# 2.0.3 - 2023-11-23

- Add company field to contact model

# 2.0.2 - 2023-11-21

- Add attributes for create operations

# 2.0.1 - 2023-11-12

- Updated dependencies
- Remove dotenv dependency

# 2.0.0 - 2023-07-04

- Drops support for Node 12
- Updated dependencies
- Feature: Supports creating tickets and contacts

# 1.1.6 - 2023-04-12

- Updated descriptions
- Add Contact resource

# 1.1.5 - 2022-01-05

- Updated dependencies
- Add Contact model and it's webhooks

# 1.1.4 - 2021-06-18

- Add `contrastColor` to event model samples and remove `colors`

# 1.1.3 - 2021-05-24

- Add `phone` to ticket model

# 1.1.2 - 2021-03-03

- Add `location` attribute to event model

# 1.1.1 - 2020-11-06

- Add value to some event model enums
- Correct value of ticket deletion requested

# 1.1.0

- Feature: Support including categories, pages, blocks and images for events
- Rename (debug) settings params host to apiHost and protocol to apiProtocol

# 1.0.16

- Add eventId to webhook filters

# 1.0.15

- Remove event attribute colors
- Add event attributes contrastColor, enableExtraGuests, maxExtraGuests
- Update dependencies

# 1.0.14

- Remove deprecated filters
- Add information about default values of filters

# 1.0.13

- Add changelog
- Update dependencies
- Update Node support
- Update code formatting from Prettier 1 to 2
