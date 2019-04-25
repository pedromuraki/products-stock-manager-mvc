import ProductsList from '../models/ProductsList'
import ProductsListView from '../views/ProductsListView'
import AlertMsg from '../models/AlertMsg'
import AlertMsgView from '../views/AlertMsgView'

import eventEmitter from '../helpers/eventEmitter'
import { nodelistToArray } from '../helpers/helpers'

export default class ProductsController {
  constructor(listWrapper, msgWrapper) {
    this._listWrapper = listWrapper
    /* create instance of products list model and its view */
    this._productsList = new ProductsList()
    this._productsListView = new ProductsListView(this._listWrapper)
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
      this._addRemoveListeners()
    })
  }

  add(product, callback) {
    /* trigger alert if sku already exists */
    if (this._productsList.items.filter(item => item.sku === product.sku).length > 0) {
      this._updateAlertMsgContent(`#${product.sku} already exists in inventory.`, 'alert-danger')
      this._alertMsgView.render(this._alertMsg.content, this._alertMsg.type)
      return
    }
    /* update alert message and add product */
    this._updateAlertMsgContent(`#${product.sku} added to inventory.`, 'alert-success')
    this._productsList.add(product, callback)
    eventEmitter.emit('productsListChanged')
    /* trigger callback if exists */
    if (callback) callback()
  }

  remove(sku, callback) {
    /* return error if sku not found */
    const i = this._productsList.items.findIndex(product => product.sku === sku)
    if (i < 0) throw new Error('SKU no found.')
    /* update alert message and remove product */
    this._updateAlertMsgContent(`#${sku} removed from inventory.`, 'alert-warning')
    this._productsList.remove(i, callback)
    eventEmitter.emit('productsListChanged')
    /* trigger callback if exists */
    if (callback) callback()
  }

  _addRemoveListeners() {
    const removeBtns = nodelistToArray('[data-js="remove"]', this._listWrapper)
    if (removeBtns.length > 0) removeBtns.forEach(btn => btn.addEventListener('click', () => this.remove(btn.getAttribute('data-sku'))))
  }

  _updateAlertMsgContent(content, type) {
    this._alertMsg.content = content
    this._alertMsg.type = type
  }
}
