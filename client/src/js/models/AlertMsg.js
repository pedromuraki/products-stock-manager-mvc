export default class AlertMsg {
  constructor(content = null, type = null) {
    this._content = content
    this._type = type
  }

  get content() {
    return this._content
  }

  set content(content) {
    this._content = content
  }

  get type() {
    return this._type
  }

  set type(type) {
    this._type = type
  }
}
