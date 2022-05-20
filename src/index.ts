import axios from 'axios'
import { Collection } from './Models/Collection'
import { User, UserProps } from './Models/User'
import { UserForm } from './Views/UserForm'

const URL = 'http://localhost:3000/users'
const userProps = {
  name: 'test',
  age: 0,
}

const user = User.buildUser(userProps)

// const collection = User.buildUserCollection()

// user.save()

// collection.fetch()

// console.log(collection.models)
const root = document.getElementById('root')

if (root) {
  const userForm = new UserForm(root, user)
  userForm.render()
}
