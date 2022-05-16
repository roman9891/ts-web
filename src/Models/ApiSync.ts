import axios, { AxiosPromise } from 'axios'

interface HasID {
  id?: number
}

export class ApiSync<Props extends HasID> {
  constructor(public rootURL: string) {}

  fetch(id: number): AxiosPromise {
    return axios.get(`${this.rootURL}/${id}`)
  }

  save(data: Props): AxiosPromise {
    const { id } = data

    if (id) return axios.put(`${this.rootURL}/${id}`, data)
    else return axios.post(this.rootURL, data)
  }
}
