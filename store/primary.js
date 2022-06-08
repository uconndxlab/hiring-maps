/* global google */

export const state = () => ({
  dataHasBeenRetrieved: false,
  counties: [],
  mapData: {},
  occupationResults: [],
  occupationSearchLoading: false,
  occupation: {}
})

export const getters = {
  counties (state) {
    return state.counties
  },
  mapData (state) {
    return state.mapData
  },
  bootstrapped (state) {
    return state.dataHasBeenRetrieved
  },
  occupationResults (state) {
    return state.occupationResults
  },
  occupationSearchLoading (state) {
    return state.occupationSearchLoading
  },
  occupation (state) {
    return state.occupation
  }
}

export const mutations = {
  setCounties (state, counties) {
    state.counties = counties
  },
  setInitialMapData (state) {
    console.log('settingInitialMapData')
    const data = [
      ['id', 'name', 'Value']
    ]
    const defaultValue = 0

    state.counties.forEach((county) => {
      data.push([county.geocode, county.name, defaultValue])
    })

    const transformedData = google.visualization.arrayToDataTable(data)
    state.mapData = transformedData
  },
  setOccupationMonthlyMapData (state) {
    console.log('settingOccupationMonthlyMapData')
    const data = [
      ['id', 'name', 'Job Postings']
    ]

    state.counties.forEach((county) => {
      const countyMonthly = state.occupation.occupation_monthly.filter((x) => {
        return x.county_id === county.id
      })
      countyMonthly.sort((a, b) => {
        if (a.year > b.year) {
          return -1
        }

        if (b.year > a.year) {
          return 1
        }

        if (a.month > b.month) {
          return -1
        }
        if (b.month > a.month) {
          return 1
        }
        return 0
      })

      const monthlyCountyDataEntry = [
        county.geocode,
        county.name,
        countyMonthly.length ? parseInt(countyMonthly[0].job_postings) : 0
      ]

      data.push(monthlyCountyDataEntry)
    })
    const transformedData = google.visualization.arrayToDataTable(data)
    state.mapData = transformedData
  },
  setDataHasBeenRetrieved (state, retrievedStatus) {
    state.dataHasBeenRetrieved = retrievedStatus
  },
  setOccupationResults (state, results) {
    state.occupationResults = results
  },
  setOccupationSearchLoading (state, loading) {
    state.occupationSearchLoading = !!loading
  },
  setOccupation (state, occupation) {
    state.occupation = occupation
  }
}

export const actions = {
  async bootstrap ({ dispatch, commit }) {
    await dispatch('getCounties')
    await dispatch('fetchOccupations')
    console.log('bootstrapped')
    commit('setDataHasBeenRetrieved', true)
  },
  async getCounties ({ commit, state }) {
    const { data: counties, error } = await this.$supabase().from('counties')
      .select('*')
      .eq('state_code', 'CT')

    if (counties && Array.isArray(counties)) {
      commit('setCounties', counties)
      if (state.mapData === {}) {
        commit('setInitialMapData')
      }
      return true
    }

    console.log(error)
    return false
  },
  async fetchOccupations ({ commit }, searchOptions) {
    const limit = searchOptions?.limit ? searchOptions.limit : 20
    const start = searchOptions?.start ? searchOptions.start : 0

    let query = this.$supabase().from('occupations')
      .select('id, code, title, job_description, type')

    if (searchOptions?.query) {
      query = query.ilike('title', `%${searchOptions.query}%`)
    }

    query = query.range(start, limit - 1)

    const { data: occupations, error } = await query

    if (occupations && Array.isArray(occupations)) {
      commit('setOccupationResults', occupations)
      return true
    }

    console.log(error)
    return false
  },
  async fetchOccupation ({ commit }, id) {
    const query = this.$supabase().from('occupations')
      .select('id, code, title, job_description, type, occupation_annual (*), occupation_monthly (*)')
      .eq('id', id)

    const { data: occupation, error } = await query

    if (occupation && Array.isArray(occupation) && occupation.length > 0) {
      commit('setOccupation', occupation[0])
      return true
    }

    console.log(error)
    return false
  }
}
