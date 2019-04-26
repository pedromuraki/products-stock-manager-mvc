// import eventEmitter from '../helpers/eventEmitter'
// import { nodelistToArray } from '../helpers/helpers'

export default class ProductsListView {
  constructor(listWrapper) {
    this._listWrapper = listWrapper
    Object.freeze(this)
  }

  render(productsListModel) {
    this._listWrapper.innerHTML = productsListModel.items.reduce((acc, product) => {
      const { name, sku, qty, price } = product

      return `
        <tr>
          <td>${sku}</td>
          <td>${name}</td>
          <td>
            <input type="number" class="form-control" id="qty" placeholder="Quantity" min="1" value="${qty}">
          </td>
          <td>
            <input type="number" class="form-control" id="salePrice" placeholder="Sale Price" min="0.01" step="0.01" value="${price}"></td>
          <td>
            <button type="button" class="btn btn-primary btn-sm" data-js="update" data-sku="${sku}">Update</button>
            <button type="button" class="btn btn-danger btn-sm" data-js="remove" data-sku="${sku}">Remove</button>
          </td>
        </tr>
        ${acc}
      `
    }, '')

    // console.log(actions)

    // const removeBtns = nodelistToArray('[data-js="remove"]', this._listWrapper)
    // if (removeBtns.length > 0) {
    //   removeBtns.forEach(btn => {
    //     btn.addEventListener('click', () => {
    //       const i = productsListModel.items.indexOf(item => item.sku == btn.getAttribute('data-sku'))
    //       productsListModel.remove(i)
    //       eventEmitter.emit('productsListChanged')
    //     })
    //   })
    // }
  }
}
