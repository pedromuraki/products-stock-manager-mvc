export default class Product {
  constructor(_name, _sku, _qty, _price) {
    Object.assign(this, {
      _name, _sku, _qty, _price
    })
    Object.freeze(this)
  }
}
