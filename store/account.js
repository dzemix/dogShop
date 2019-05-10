export const state = () => ({
  account: ''
})
export const mutations = {
  login(state, param) {
    state.account = param
  },
  logout(state, param) {
    state.account = param
  }
}
