export default class AlertMsgView {
  constructor(msgWrapper) {
    this._msgWrapper = msgWrapper
    this._timeout = null
  }

  render(alertMsgModel) {
    clearTimeout(this._timeout)

    this._msgWrapper.innerHTML = `
      <div class="alert ${alertMsgModel.type}">
        ${alertMsgModel.content}
      </div>
    `

    this._timeout = setTimeout(() => this._clear(), 5000)
  }

  _clear() {
    this._msgWrapper.innerHTML = ''
  }
}
