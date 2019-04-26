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
            <input type="number" class="form-control" placeholder="Quantity" min="1" data-sku=${sku} data-input="qty" value="${qty}">
          </td>
          <td>
            <input type="number" class="form-control" placeholder="Sale Price" min="0.01" step="0.01" data-sku=${sku} data-input="price" value="${price}"></td>
          <td>
            <button type="button" class="btn btn-primary btn-sm" data-js="update" data-sku="${sku}">Update</button>
            <button type="button" class="btn btn-danger btn-sm" data-js="remove" data-sku="${sku}">Remove</button>
          </td>
        </tr>
        ${acc}
      `
    }, '')
  }
}
