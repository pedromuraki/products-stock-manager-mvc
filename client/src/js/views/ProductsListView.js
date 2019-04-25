export default class ProductsListView {
  constructor(listWrapper) {
    this._listWrapper = listWrapper
    Object.freeze(this)
  }

  render(productsList) {
    this._listWrapper.innerHTML = productsList.map(product => {
      const { _name, _sku, _qty, _price } = product

      return `
        <tr data-sku="${_sku}">
          <td>${_sku}</td>
          <td>${_name}</td>
          <td>
            <input type="number" class="form-control" id="qty" placeholder="Quantity" min="1" value="${_qty}" disabled>
          </td>
          <td>
            <input type="number" class="form-control" id="salePrice" placeholder="Sale Price" min="0.01" step="0.01" value="${_price}" disabled></td>
          <td>
            <button type="button" class="btn btn-primary btn-sm" id="update" data-sku="${_sku}" disabled>Update</button>
            <button type="button" class="btn btn-danger btn-sm" id="remove" data-sku="${_sku}">Remove</button>
          </td>
        </tr>
      `
    }).join('')
  }

  update(product) {
    const { _name, _sku, _qty, _price } = product

    const productMarkup = `
      <tr data-sku="${_sku}">
        <td>${_sku}</td>
        <td>${_name}</td>
        <td>
          <input type="number" class="form-control" id="qty" placeholder="Quantity" min="1" value="${_qty}" disabled>
        </td>
        <td>
          <input type="number" class="form-control" id="salePrice" placeholder="Sale Price" min="0.01" step="0.01" value="${_price}" disabled></td>
        <td>
          <button type="button" class="btn btn-primary btn-sm" id="update" data-sku="${_sku}" disabled>Update</button>
          <button type="button" class="btn btn-danger btn-sm" id="remove" data-sku="${_sku}">Remove</button>
        </td>
      </tr>
    `

    this._listWrapper.innerHTML += productMarkup
  }
}
