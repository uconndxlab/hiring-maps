export const state = () => ({
  counties: []
})

export const getters = {
  counties (state) {
    return state.counties
  }
}

export const mutations = {
  setCounties (state, counties) {
    state.counties = counties
  }
}

export const actions = {
  async getCounties ({ commit }) {
    const { data: counties, error } = await this.$supabase().from('counties')
      .select('*')
      .eq('state_code', 'CT')

    if (counties && Array.isArray(counties)) {
      commit('setCounties', counties)
      return true
    }

    console.log(error)
    return false
  }
}
