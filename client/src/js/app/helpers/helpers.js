const toggleClass = (el, cl) => el.classList.contains(cl) ? el.classList.remove(cl) : el.classList.add(cl)

const addClass = (el, cl) => el.classList.add(cl)

const removeClass = (el, cl) => el.classList.remove(cl)

const nodelistToArray = (selector, parent) => Array.prototype.slice.call(parent.querySelectorAll(selector))

export { toggleClass, addClass, removeClass, nodelistToArray }
