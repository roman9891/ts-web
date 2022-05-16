import { AxiosPromise, AxiosResponse } from 'axios'

interface Events {
  on(eventName: string, callback: () => void): void
  trigger(eventName: string): void
}

interface Sync<T> {
  fetch(id: number): AxiosPromise
  save(data: T): AxiosPromise
}

interface ModelAttributes<T> {
  set(value: T): void
  get<K extends keyof T>(key: K): T[K]
  getAll(): T
}

interface HasID {
  id?: number
}

export class Model<T extends HasID> {
  constructor(
    private attributes: ModelAttributes<T>,
    private sync: Sync<T>,
    private events: Events
  ) {}

  //   get on() {
  //     return this.events.on
  //   }

  //   get trigger() {
  //     return this.events.trigger
  //   }

  //   get get() {
  //     return this.attributes.get
  //   }

  on = this.events.on
  trigger = this.events.trigger
  get = this.attributes.get

  set(update: T): void {
    this.attributes.set(update)
    this.events.trigger('change')
  }

  fetch(): void {
    const id = this.attributes.get('id')

    if (!id) {
      throw new Error('Cannot fetch without an id')
    } else {
      this.sync.fetch(id).then((response: AxiosResponse): void => {
        this.set(response.data)
      })
    }
  }

  save(): void {
    this.sync
      .save(this.attributes.getAll())
      .then((response: AxiosResponse): void => this.trigger('save'))
      .catch(() => this.trigger('error'))
  }
}
