// The SDK deserializes JSON:API responses into plain objects and resolves
// relationships, which produces circular references when includes are used
// (e.g. event.categories[0].events[0] === event). `JSON.stringify` throws on
// those, so cyclic back-references are replaced with a compact "[Circular <id>]"
// marker. Pass `--raw` (or `-o '{"raw":true}'`) to print the raw JSON:API
// document instead, which is naturally acyclic.
export function safeStringify(value: unknown): string {
  const ancestors: object[] = []
  return JSON.stringify(
    value,
    function (this: unknown, _key: string, val: unknown) {
      if (typeof val !== 'object' || val === null) return val
      while (ancestors.length > 0 && ancestors[ancestors.length - 1] !== this) ancestors.pop()
      if (ancestors.includes(val)) {
        const id: unknown = Reflect.get(val, 'id')
        return typeof id === 'string' || typeof id === 'number' ? `[Circular ${String(id)}]` : '[Circular]'
      }
      ancestors.push(val)
      return val
    },
    2,
  )
}

export function printResult(result: unknown): void {
  if (result === undefined || result === null) return
  console.log(safeStringify(result))
}
