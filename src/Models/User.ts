interface UserProps {
  name?: string
  age?: number
}

type Callback = () => void

export class User {
  events: { [key: string]: Callback[] } = {}

  constructor(private data: UserProps) {}

  get(propName: string): number | string {
    return this.data[propName]
  }

  set(updateProps: UserProps): void {
    Object.assign(this.data, updateProps)
  }

  on(event: string, callback: Callback): void {
    const handlers = this.events[event] || []
    handlers.push(callback)
    this.events[event] = handlers
  }

  trigger(event: string): void {
    const handlers = this.events[event]

    if (!handlers || handlers.length === 0) return

    handlers.forEach((callback) => callback())
  }
}
