import '../scss/index.scss'

// const importAll = r => r.keys().forEach(r);
// importAll(require.context('../img/', true, /\.(jpe?g|png|gif)$/));

// import { toggleClass, addClass, removeClass, nodelistToArray } from './helpers/helpers'

import Product from './models/Product'
import ProductsController from './controllers/ProductsController'

const $list = document.getElementById('list')
const $msg = document.getElementById('msg')

const controller = new ProductsController($list, $msg)

controller.add(new Product('nome', '123456', '222', '22.99'))
controller.add(new Product('dasdsadsa', '3123123', '333', '44.99'))
controller.add(new Product('ttttt', '5858', '333', '44.99'))
controller.add(new Product('xxxxxx', '9999', '333', '44.99'))
controller.remove('123456')
console.log(controller)

/*
MODELS
- Product
  Props:
  - name
  - sku
  - qty
  - sale price

- Products
  Props:
  - products list

- Products Controller
  Props:
  - products list > cria instância de Products
  - products view > cria instância de Products View

  Methods:
  - add product > instancia Product e o adiciona em instância de Products (products list)
  - edit product
  - remove product

- Products View
  Methods:
  - render > retorna markup

*/
