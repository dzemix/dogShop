export const state = () => ({
  cart: []
})
export const mutations = {
  addCart(state, param) {
    state.cart.push(param)
  },
  clear(state) {
    state.cart = []
  }
}
