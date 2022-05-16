type Callback = () => void

const Events = ['save', 'change'] as const

type EventName = typeof Events[number]

export class Eventing {
  events: { [key: string]: Callback[] } = {}

  on = (event: EventName, callback: Callback): void => {
    const handlers = this.events[event] || []
    handlers.push(callback)
    this.events[event] = handlers
  }

  trigger = (event: EventName): void => {
    const handlers = this.events[event]

    if (!handlers || handlers.length === 0) return

    handlers.forEach((callback) => callback())
  }
}
