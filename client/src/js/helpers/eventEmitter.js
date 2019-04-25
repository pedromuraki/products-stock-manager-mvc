const eventEmitter = {
  _events: {},

  on(event, fn) {
    if (!this._events[event]) this._events = { ...this._events, [event]: [] }
    this._events[event].push(fn)
  },

  emit(event, payload) {
    const fns = this._events[event]
    if (fns) fns.forEach(fn => fn(payload))
  }
}

export default eventEmitter
