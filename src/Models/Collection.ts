import axios from 'axios'
import { Eventing } from './Eventing'

export class Collection<T, K> {
  models: T[] = []
  events: Eventing = new Eventing()

  constructor(public rootURL: string, public deserialize: (json: K) => T) {}

  get on() {
    return this.events.on
  }

  get trigger() {
    return this.events.trigger
  }

  async fetch() {
    const data = await axios.get(this.rootURL)

    data.data.forEach((value: K): void => {
      const user = this.deserialize(value)
      this.models.push(user)
    })

    this.trigger('change')
  }

  //   fetch(): void {
  //     axios.get(this.rootURL).then((response: AxiosResponse) => {
  //       response.data.forEach((value: UserProps): void => {
  //         const user = User.build(value)
  //         this.models.push(user)
  //       })
  //     })

  //     this.trigger('change')
  //   }
}
