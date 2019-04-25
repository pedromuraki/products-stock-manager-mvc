import ProductsList from '../models/ProductsList'
import ProductsListView from '../views/ProductsListView'

export default class ProductsController {
  constructor(listWrapper) {
    this._productsList = new ProductsList()
    this._productsListView = new ProductsListView(listWrapper)
    this._productsListView.render(this._productsList.items)
    Object.freeze(this)
  }

  add(product) {
    this._productsList.add(product)
    this._productsListView.update(product)
  }

  remove(sku) {
    this._productsList.remove(sku)
  }
}
