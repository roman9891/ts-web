import axios, { AxiosPromise } from 'axios'
import { UserProps } from './User'

interface HasID {
  id?: number
}

export class Sync<Props extends HasID> {
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
