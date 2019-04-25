import '../scss/index.scss'

import Product from './models/Product'
import ProductsController from './controllers/ProductsController'

const $list = document.getElementById('list')
const $msg = document.getElementById('msg')

const controller = new ProductsController($list, $msg)

const $form = document.getElementById('form')
const $product = document.getElementById('product')
const $sku = document.getElementById('sku')
const $qty = document.getElementById('qty')
const $salePrice = document.getElementById('salePrice')

const fields = [$product, $sku, $qty, $salePrice]

const getValues = () => fields.map(field => field.value)
const clearFields = () => fields.forEach(field => { field.value = '' })

$form.addEventListener('submit', (e) => {
  e.preventDefault()
  controller.add(new Product(...getValues()), clearFields)
})
