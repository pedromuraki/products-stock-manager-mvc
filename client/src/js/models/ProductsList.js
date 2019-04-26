import Product from './Product'

const defaultProducts = [
  new Product('T-shirt', '123', '150', '29.99'),
  new Product('Hat', '456', '75', '79.99')
]

export default class ProductsList {
  constructor() {
    this._items = defaultProducts
    Object.freeze(this)
  }

  get items() {
    return this._items
  }

  add(product) {
    this._items.push(product)
  }

  remove(i) {
    this._items.splice(i, 1)
  }
}
