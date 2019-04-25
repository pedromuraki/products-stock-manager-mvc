// import defaultProducts
import eventEmitter from '../helpers/eventEmitter'

export default class ProductsList {
  constructor(items = []) {
    this._items = items
    Object.freeze(this)
  }

  get items() {
    return this._items
  }

  add(product) {
    this._items.push(product)
    eventEmitter.emit('productsListChanged')
  }

  remove(i) {
    this._items.splice(i, 1)
    eventEmitter.emit('productsListChanged')
  }
}
