import ProductsList from '../models/ProductsList'
import ProductsListView from '../views/ProductsListView'
import AlertMsg from '../models/AlertMsg'
import AlertMsgView from '../views/AlertMsgView'

export default class ProductsController {
  constructor(listWrapper, msgWrapper) {
    /* create instance of products list model and its view */
    this._productsList = new ProductsList()
    this._productsListView = new ProductsListView(listWrapper)
    /* render previous items on table */
    this._productsListView.render(this._productsList.items)
    /* create instance of alert message model and its view */
    this._alertMsg = new AlertMsg()
    this._alertMsgView = new AlertMsgView(msgWrapper)
    /* freeze obj */
    Object.freeze(this)
  }

  add(product) {
    this._productsList.add(product)
    this._updateAlertMsg(`#${product.sku} added to inventory.`, 'alert-success')
    this._productsListView.render(this._productsList.items) // listChanged
    this._alertMsgView.render(this._alertMsg.content, this._alertMsg.type) // listChanged
  }

  remove(sku) {
    const i = this._productsList.items.findIndex(product => product.sku === sku)
    if (i < 0) throw new Error('SKU no found.')
    this._productsList.remove(i)
    this._updateAlertMsg(`#${sku} removed from inventory.`, 'alert-warning')
    this._productsListView.render(this._productsList.items) // listChanged
    this._alertMsgView.render(this._alertMsg.content, this._alertMsg.type) // listChanged
  }

  _updateAlertMsg(content, type) {
    this._alertMsg.content = content
    this._alertMsg.type = type
  }
}
