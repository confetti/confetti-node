/**
 * Shape of the custom metadata we attach via `.meta()` on Zod schemas.
 * Zod's `GlobalMeta` has `[k: string]: unknown`, so this narrows the
 * keys we actually use to concrete types.
 */
export type MetaValues =
  | Array<{ value: string; label: string }>
  | Array<{ label: string; description: string; type: string; key: string; value: string }>

export interface SchemaMeta {
  label?: string
  description?: string
  placeholder?: string
  helpText?: string
  values?: MetaValues
}

/**
 * Safely extract `.meta()` from a Zod schema.
 *
 * `Object.entries(shape)` yields core `$ZodType` values whose TS
 * declarations lack the classic `.meta()` method.  At runtime the
 * instances *are* classic types (we import from `'zod'`), so the
 * method exists — this helper bridges the gap with a single,
 * auditable runtime check.
 */
function hasMetaMethod(schema: unknown): schema is { meta: () => SchemaMeta | undefined } {
  return (
    typeof schema === 'object' &&
    schema !== null &&
    'meta' in schema &&
    // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
    typeof (schema as Record<string, unknown>).meta === 'function'
  )
}

export function getMeta(schema: unknown): SchemaMeta | undefined {
  return hasMetaMethod(schema) ? schema.meta() : undefined
}
