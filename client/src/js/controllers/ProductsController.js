import ProductsList from '../models/ProductsList'
// import ProductsView from '../views/ProductsView'

export default class ProductsController {
  constructor() {
    this._productsList = new ProductsList()
    // this._productsView = new ProductsView()
    Object.freeze(this)
  }

  add(product) {
    this._productsList.add(product)
    // this._productsView.render(this._productsList)
  }

  remove(sku) {
    this._productsList.remove(sku)
  }
}
