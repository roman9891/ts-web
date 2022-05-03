import { Eventing } from './Eventing'
import { Sync } from './Sync'

export interface UserProps {
  id?: number
  name?: string
  age?: number
}

const rootURL = 'http://localhost:3000/users'

export class User {
  public events: Eventing = new Eventing()
  public sunc: Sync<UserProps> = new Sync<UserProps>(rootURL)

  constructor(private data: UserProps) {}

  get(propName: string): number | string {
    return this.data[propName]
  }

  set(updateProps: UserProps): void {
    Object.assign(this.data, updateProps)
  }
}
