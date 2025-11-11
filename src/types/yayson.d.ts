declare module 'yayson' {
  export class Store {
    sync(data: unknown): unknown
  }

  export class Presenter {
    static type: string
    static plural: string
    static render(data: unknown): unknown
    attributes?(data: unknown): unknown
    relationships?(): Record<string, unknown>
  }

  export default function (): {
    Store: typeof Store
    Presenter: typeof Presenter
  }
}
