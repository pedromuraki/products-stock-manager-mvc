import ProductsList from '../models/ProductsList'
import ProductsListView from '../views/ProductsListView'
import AlertMsg from '../models/AlertMsg'
import AlertMsgView from '../views/AlertMsgView'

import eventEmitter from '../helpers/eventEmitter'

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
    /* set "on products list changed" listeners */
    eventEmitter.on('productsListChanged', () => {
      this._productsListView.render(this._productsList.items)
      this._alertMsgView.render(this._alertMsg.content, this._alertMsg.type)
    })
  }

  add(product) {
    /* trigger alert if sku already exists */
    if (this._productsList.items.filter(item => item.sku === product.sku).length > 0) {
      this._updateAlertMsgContent(`#${product.sku} already exists in inventory.`, 'alert-danger')
      this._alertMsgView.render(this._alertMsg.content, this._alertMsg.type)
    }
    /* update alert message and add product */
    else {
      this._updateAlertMsgContent(`#${product.sku} added to inventory.`, 'alert-success')
      this._productsList.add(product)
    }
  }

  remove(sku) {
    /* return error if sku not found */
    const i = this._productsList.items.findIndex(product => product.sku === sku)
    if (i < 0) throw new Error('SKU no found.')
    /* update alert message and remove product */
    this._updateAlertMsgContent(`#${sku} removed from inventory.`, 'alert-warning')
    this._productsList.remove(i)
  }

  _updateAlertMsgContent(content, type) {
    this._alertMsg.content = content
    this._alertMsg.type = type
  }
}
