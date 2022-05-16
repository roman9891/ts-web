import { ApiSync } from './ApiSync'
import { Attributes } from './Attributes'
import { Eventing } from './Eventing'
import { Model } from './Model'

export interface UserProps {
  id?: number
  name?: string
  age?: number
}

const rootURL = 'http://localhost:3000/users'

export class User extends Model<UserProps> {
  static build(attributes: UserProps): User {
    return new User(
      new Attributes<UserProps>(attributes),
      new ApiSync<UserProps>(rootURL),
      new Eventing()
    )
  }
}
