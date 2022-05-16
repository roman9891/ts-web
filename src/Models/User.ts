import { ApiSync } from './ApiSync'
import { Attributes } from './Attributes'
import { Collection } from './Collection'
import { Eventing } from './Eventing'
import { Model } from './Model'

export interface UserProps {
  id?: number
  name?: string
  age?: number
}

const rootURL = 'http://localhost:3000/users'

export class User extends Model<UserProps> {
  static buildUser(attributes: UserProps): User {
    return new User(
      new Attributes<UserProps>(attributes),
      new ApiSync<UserProps>(rootURL),
      new Eventing()
    )
  }

  static buildUserCollection(): Collection<User, UserProps> {
    return new Collection(rootURL, (json) => {
      return User.buildUser(json)
    })
  }
}
