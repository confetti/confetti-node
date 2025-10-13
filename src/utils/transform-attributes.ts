export interface Attribute {
  key: string
  [key: string]: unknown
}

export default function (attributes: Attribute[], additionalConfig: Record<string, unknown> = {}): Attribute[] {
  return Object.keys(additionalConfig).reduce((res: Attribute[], key: string) => {
    const attribute = attributes.find((attr) => attr.key === key)
    if (attribute) {
      const transformedAttribute = {
        ...attribute,
        ...(additionalConfig[key] as Record<string, unknown>),
      }
      res.push(transformedAttribute)
    } else {
      res.push({ key, ...(additionalConfig[key] as Record<string, unknown>) })
    }
    return res
  }, [])
}
