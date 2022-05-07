import { UserProps } from './User'

export class Attributes<Props> {
  constructor(private data: Props) {}

  get = <Key extends keyof Props>(key: Key): Props[Key] => {
    return this.data[key]
  }

  set(updateProps: Props): void {
    Object.assign(this.data, updateProps)
  }
}
