import { User } from './Models/User'

const user = new User({ name: 'steve', age: 5 })

user.on('click', () => {
  console.log('yo')
})
user.on('click', () => {
  console.log('um')
})
user.on('click', () => {
  console.log('what')
})

user.trigger('click')

console.log(user)
