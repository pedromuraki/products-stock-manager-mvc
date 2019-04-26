export default class Product {
  constructor(name, sku, qty, price) {
    Object.assign(this, {
      name, sku, qty, price
    })
    Object.freeze(this)
  }

  // get name() {
  //   return this._name
  // }

  // get sku() {
  //   return this._sku
  // }

  // get qty() {
  //   return this._qty
  // }

  // get price() {
  //   return this._price
  // }
}
