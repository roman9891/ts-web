import axios from 'axios'

const fetchData = async (): Promise<void> => {
  const data = await axios.get('http://localhost:3000/users')

  console.log(data)
}

fetchData()
