import axios from 'axios'
import { Collection } from './Models/Collection'
import { User, UserProps } from './Models/User'
import { UserEdit } from './Views/UserEdit'
import { UserForm } from './Views/UserForm'
import { UserList } from './Views/UserList'

// const URL = 'http://localhost:3000/users'
// const userProps = {
//   name: 'test',
//   age: 0,
// }

// const user = User.buildUser(userProps)

// const collection = User.buildUserCollection()

// user.save()

// collection.fetch()

// console.log(collection.models)
// const root = document.getElementById('root')

// if (root) {
//   const userEdit = new UserEdit(root, user)

//   userEdit.render()

//   console.log(userEdit)
// } else throw new Error('no root bro!')

const users = new Collection(
  'http://localhost:3000/users',
  (json: UserProps) => {
    return User.buildUser(json)
  }
)

users.on('change', () => {
  const root = document.getElementById('root')

  if (root) {
    new UserList(root, users).render()
  }
})

users.fetch()
