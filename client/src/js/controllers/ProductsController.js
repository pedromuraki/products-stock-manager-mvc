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
    this._productsListView.render(this._productsList)
    /* add actions listeners */
    this._addActionsListeners()
    /* create instance of alert message model and its view */
    this._alertMsg = new AlertMsg()
    this._alertMsgView = new AlertMsgView(msgWrapper)
    /* freeze obj */
    Object.freeze(this)
    /* set "on products list changed" listeners */
    eventEmitter.on('productsListChanged', () => {
      this._productsListView.render(this._productsList)
      this._alertMsgView.render(this._alertMsg)
      this._addActionsListeners()
    })
  }

  add(product, callback) {
    /* trigger alert if sku already exists */
    if (this._productsList.items.filter(item => item.sku === product.sku).length > 0) {
      this._updateAlertMsgContent(`#${product.sku} already exists in inventory.`, 'alert-danger')
      this._alertMsgView.render(this._alertMsg)
      return
    }
    /* update alert message and add product */
    this._updateAlertMsgContent(`#${product.sku} added to inventory.`, 'alert-success')
    this._productsList.add(product)
    eventEmitter.emit('productsListChanged')
    /* trigger callback if exists */
    if (callback) callback()
    console.log(this._productsList.items)
  }

  remove(sku, callback) {
    /* return error if sku not found */
    const i = this._productsList.items.findIndex(product => product.sku === sku)
    if (i < 0) throw new Error('SKU no found.')
    /* update alert message and remove product */
    this._updateAlertMsgContent(`#${sku} removed from inventory.`, 'alert-warning')
    this._productsList.remove(i)
    eventEmitter.emit('productsListChanged')
    /* trigger callback if exists */
    if (callback) callback()
  }

  update(sku, callback) {
    const data = {
      qty: this._listWrapper.querySelector(`input[data-sku="${sku}"][data-input="qty"]`).value,
      price: this._listWrapper.querySelector(`input[data-sku="${sku}"][data-input="price"]`).value
    }

    /* return error if sku not found */
    const i = this._productsList.items.findIndex(product => product.sku === sku)
    if (i < 0) throw new Error('SKU no found.')
    /* update alert message and update product */
    this._updateAlertMsgContent(`#${sku} updated.`, 'alert-success')
    this._productsList.update(i, data)
    eventEmitter.emit('productsListChanged')
    /* trigger callback if exists */
    if (callback) callback()
  }

  _addActionsListeners() {
    const removeBtns = nodelistToArray('[data-js="remove"]', this._listWrapper)
    if (removeBtns.length > 0) removeBtns.forEach(btn => btn.addEventListener('click', () => this.remove(btn.getAttribute('data-sku'))))

    const updateBtns = nodelistToArray('[data-js="update"]', this._listWrapper)
    if (updateBtns.length > 0) updateBtns.forEach(btn => btn.addEventListener('click', () => this.update(btn.getAttribute('data-sku'))))
  }

  _updateAlertMsgContent(content, type) {
    this._alertMsg.content = content
    this._alertMsg.type = type
  }
}
