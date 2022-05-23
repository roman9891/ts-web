import { User, UserProps } from '../Models/User'
import { View } from './View'

export class UserForm extends View<User, UserProps> {
  template(): string {
    return `
            <div>
                <input placeholder="${this.model.get('name')}"/>
                <button class="set-name">Set Name</button>
                <button class="set-age">Set Age</button>
                <button class="save-user">Save User</button>
            </div>
        `
  }

  eventsMap(): { [key: string]: () => void } {
    return {
      'click:.set-age': this.setRandomAge,
      'click:.set-name': this.setName,
      'click:.save-user': this.saveClick,
    }
  }

  setRandomAge = (): void => {
    const age = this.model.setRandomAge()
    console.log(age)
  }

  setName = (): void => {
    const input = this.parent.querySelector('input')

    if (input) {
      const name = input.value
      this.model.set({ name })
    }
  }

  saveClick = (): void => {
    this.model.save()
  }
}
