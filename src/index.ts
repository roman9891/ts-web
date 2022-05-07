import { User } from './Models/User'

const user = new User({ id: 1 })

user.on('change', () => {
  console.log('changed')
})

user.fetch()
