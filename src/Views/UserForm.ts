import { User } from '../Models/User'

export class UserForm {
  constructor(public parent: Element, public model: User) {
    this.bindUser()
  }

  bindUser(): void {
    this.model.on('change', () => {
      this.render()
    })
  }

  template(): string {
    return `
            <div>
                <h1>User Form</h1>
                <div>User Name: ${this.model.get('name')}</div>
                <div>User Age: ${this.model.get('age')}</div>
                <input/>
                <button class="set-name">Set Name</button>
                <button class="set-age">Set Age</button>
            </div>
        `
  }

  render(): void {
    this.parent.innerHTML = ''

    const templateElement = document.createElement('template')
    templateElement.innerHTML = this.template()

    this.bindEvents(templateElement.content)

    this.parent.append(templateElement.content)
  }

  evenstMap(): { [key: string]: () => void } {
    return {
      'click:.set-age': this.setRandomAge,
      'click:.set-name': this.setName,
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

  bindEvents(fragment: DocumentFragment): void {
    const eventsMap = this.evenstMap()

    for (let eventkey in eventsMap) {
      const [eventName, selector] = eventkey.split(':')

      fragment.querySelectorAll(selector).forEach((element) => {
        element.addEventListener(eventName, eventsMap[eventkey])
      })
    }
  }
}
