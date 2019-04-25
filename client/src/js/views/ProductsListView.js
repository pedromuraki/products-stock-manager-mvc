export default class ProductsListView {
  constructor(listWrapper) {
    this._listWrapper = listWrapper
    Object.freeze(this)
  }

  render(productsList) {
    this._listWrapper.innerHTML = productsList.reduce((acc, product) => {
      const { name, sku, qty, price } = product

      return `
        <tr data-sku="${sku}">
          <td>${sku}</td>
          <td>${name}</td>
          <td>
            <input type="number" class="form-control" id="qty" placeholder="Quantity" min="1" value="${qty}" disabled>
          </td>
          <td>
            <input type="number" class="form-control" id="salePrice" placeholder="Sale Price" min="0.01" step="0.01" value="${price}" disabled></td>
          <td>
            <button type="button" class="btn btn-primary btn-sm" data-js="update" data-sku="${sku}" disabled>Update</button>
            <button type="button" class="btn btn-danger btn-sm" data-js="remove" data-sku="${sku}">Remove</button>
          </td>
        </tr>
        ${acc}
      `
    }, '')
  }
}
