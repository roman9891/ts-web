import axios, { AxiosResponse } from 'axios'
import { Eventing } from './Eventing'
import { User, UserProps } from './User'

export class Collection {
  models: User[] = []
  events: Eventing = new Eventing()

  constructor(public rootURL: string) {}

  get on() {
    return this.events.on
  }

  get trigger() {
    return this.events.trigger
  }

  async fetch() {
    const data = await axios.get(this.rootURL)

    data.data.forEach((value: UserProps): void => {
      const user = User.build(value)
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
