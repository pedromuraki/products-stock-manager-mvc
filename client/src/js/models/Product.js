export default class Product {
  constructor(_name, _sku, _qty, _price) {
    Object.assign(this, {
      _name, _sku, _qty, _price
    })
    Object.freeze(this)
  }

  get name() {
    return this._name
  }

  get sku() {
    return this._sku
  }

  get qty() {
    return this._qty
  }

  get price() {
    return this._price
  }
}
