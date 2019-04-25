export default class AlertMsgView {
  constructor(msgWrapper) {
    this._msgWrapper = msgWrapper
    Object.freeze(this)
  }

  render(content, type) {
    this._msgWrapper.innerHTML = `
      <div class="alert ${type}">
        ${content}
      </div>
    `
    setTimeout(() => this._clear(), 5000)
  }

  _clear() {
    this._msgWrapper.innerHTML = ''
  }
}
