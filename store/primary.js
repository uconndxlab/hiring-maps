/* global google */

export const state = () => ({
  dataHasBeenRetrieved: false,
  counties: [],
  county: {},
  mapData: {},
  occupationResults: [],
  occupationSearchLoading: false,
  occupation: {},
  topTenJobs: []
})

export const getters = {
  counties (state) {
    return state.counties
  },
  county (state) {
    return state.county
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
  },
  occupationAnnualSalary (state) {
    if (
      Array.isArray(state.occupation?.occupation_annual) &&
      state.occupation?.occupation_annual.length > 0
    ) {
      const occupationAnnuals = [...state.occupation.occupation_annual].sort(
        sortForRecentYear
      )
      const year = occupationAnnuals[0].year
      let totalCounted = 0
      const sum = occupationAnnuals.reduce((acc, occAnn) => {
        if (occAnn.year === year && occAnn.mean_market_salary) {
          totalCounted++
          return acc + occAnn.mean_market_salary
        }
        return acc
      }, 0)
      if (sum && totalCounted) {
        return sum / totalCounted
      }
    }
    return 0
  },
  occupationMonthlyPostings (state) {
    if (
      Array.isArray(state.occupation?.occupation_monthly) &&
      state.occupation?.occupation_monthly.length > 0
    ) {
      // We are assuming data is sorted (based on our fetch functions) but we can always re-run the sort in a destructured array
      const year = state.occupation.occupation_monthly[0].year
      const month = state.occupation.occupation_monthly[0].month

      console.log('Year', year, 'Month', month)

      const monthlies = state.occupation.occupation_monthly.filter((x) => {
        return x.year === year && x.month === month
      })

      const sum = monthlies.reduce((acc, occM) => {
        return acc + occM.job_postings
      }, 0)

      return sum
    }
    return 0
  },
  topTenJobPostings (state) {
    return state.topTenJobs
  },
  // TODO: Fix this function to return data for most recent month not every month
  countyMonthlyPostings (state) {
    if (Array.isArray(state.county?.occupation_monthly) && state.county?.occupation_monthly.length > 0) {
      let totalJobPostings = 0
      for (let i = 0; i < state.county.occupation_monthly.length; i++) {
        totalJobPostings += state.county.occupation_monthly[i].job_postings
      }

      return totalJobPostings
    }
    return 0
  },
  countyJobPostings2020 (state) {
    if (Array.isArray(state.county.occupation_monthly) && state.county?.occupation_monthly.length > 0) {
      let totalJobPostings = 0
      for (let i = 0; i < state.county.occupation_monthly.length; i++) {
        if (state.county.occupation_monthly[i].year === 2020) {
          totalJobPostings += state.county.occupation_monthly[i].job_postings
        }
      }
      return totalJobPostings
    }
    return 0
  },
  countyJobPostings2021 (state) {
    if (Array.isArray(state.county.occupation_monthly) && state.county?.occupation_monthly.length > 0) {
      let totalJobPostings = 0
      for (let i = 0; i < state.county.occupation_monthly.length; i++) {
        if (state.county.occupation_monthly[i].year === 2021) {
          totalJobPostings += state.county.occupation_monthly[i].job_postings
        }
      }
      return totalJobPostings
    }
    return 0
  }
}

export const mutations = {
  setCounties (state, counties) {
    state.counties = counties
  },
  setCounty (state, county) {
    state.county = county
  },
  setInitialMapData (state) {
    console.log('settingInitialMapData')
    const returnData = new google.visualization.DataTable()
    returnData.addColumn('string', 'id')
    returnData.addColumn('string', 'name')
    returnData.addColumn('number', 'Job Postings')
    state.mapData = returnData
  },
  setOccupationMonthlyMapData (state) {
    console.log('settingOccupationMonthlyMapData')
    const returnData = new google.visualization.DataTable()
    returnData.addColumn('string', 'id')
    returnData.addColumn('string', 'name')
    returnData.addColumn('number', 'Job Postings')
    const data = []
    state.counties.forEach((county) => {
      const countyMonthly = state.occupation.occupation_monthly.filter((x) => {
        return x.county_id === county.id
      })
      countyMonthly.sort(sortForRecentYearAndMonth)

      const monthlyCountyDataEntry = [
        county.geocode,
        county.name,
        countyMonthly.length ? parseInt(countyMonthly[0].job_postings) : 0
      ]
      data.push(monthlyCountyDataEntry)
    })
    returnData.addRows(data)
    state.mapData = returnData
  },

  // TODO: Create a function similar to the one below except only data for most recent month.
  setTotalCountyMapData (state) {
    console.log('settingTotalCountyMapData')
    const returnData = new google.visualization.DataTable()
    returnData.addColumn('string', 'id')
    returnData.addColumn('string', 'name')
    returnData.addColumn('number', 'Job Postings')
    const data = []
    for (let i = 0; i < state.counties.length; i++) { // Iterate through each county: i
      let countyJobPostings = 0
      const countyMonthly = state.counties[i].occupation_monthly
      for (let j = 0; j < countyMonthly.length; j++) { // Iterate through each index of occupation monthly: j
        if (countyMonthly[j].county_id === state.counties[i].id) {
          countyJobPostings += countyMonthly[j].job_postings
        }
      }
      const totalCountyPostingDataEntry = [
        state.counties[i].geocode,
        state.counties[i].name,
        parseInt(countyJobPostings)
      ]
      data.push(totalCountyPostingDataEntry)
    }
    returnData.addRows(data)
    state.mapData = returnData
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
  },
  setTopTenJobs (state, occupations) {
    state.topTenJobs = occupations
  }
}

export const actions = {
  async bootstrap ({ dispatch, commit }) {
    await dispatch('getCounties')
    await dispatch('fetchOccupations')
    await dispatch('fetchTopTenJobs')
    await dispatch('fetchTopJobsByCounty')
    console.log('bootstrapped')
    commit('setDataHasBeenRetrieved', true)
  },
  async getCounties ({ commit, state }) {
    const { data: counties, error: countyError } = await this.$supabase()
      .from('counties')
      .select('id, name, state_code, geocode, occupation_annual (*), occupation_monthly (*)')
      .eq('state_code', 'CT')

    if (countyError) {
      console.log(countyError)
      return false
    }

    commit('setCounties', counties)

    counties.forEach((county) => {
      commit('setCounty', county)
    })

    if (!state.mapData.version) {
      commit('setInitialMapData')
    }
    return true
  },
  async getCounty ({ commit }, id) {
    const query = this.$supabase().from('counties')
      .select('id, name, state_code, geocode, occupation_annual (*), occupation_monthly (*)')
      .eq('id', id)
      .eq('occupation_annual.county_id', id)
      .eq('occupation_monthly.county_id', id)
    const { data: county, error } = await query

    if (county && Array.isArray(county) && county.length > 0) {
      county[0].occupation_annual.sort(sortForRecentYear)
      county[0].occupation_monthly.sort(sortForRecentYearAndMonth)
      commit('setCounty', county[0])
      return true
    }
    console.log(error)
    return false
  },
  async fetchOccupations ({ commit }, searchOptions) {
    const limit = searchOptions?.limit ? searchOptions.limit : 20
    const start = searchOptions?.start ? searchOptions.start : 0

    let query = this.$supabase()
      .from('occupations')
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
    const query = this.$supabase()
      .from('occupations')
      .select(
        'id, code, title, job_description, type, occupation_annual (*), occupation_monthly (*)'
      )
      .eq('id', id)

    const { data: occupation, error } = await query

    if (occupation && Array.isArray(occupation) && occupation.length > 0) {
      occupation[0].occupation_annual.sort(sortForRecentYear)
      occupation[0].occupation_monthly.sort(sortForRecentYearAndMonth)
      commit('setOccupation', occupation[0])
      return true
    }

    console.log(error)
    return false
  },
  async fetchTopTenJobs ({ commit }) {
    const jobs = {}
    const jobQuery = this.$supabase()
      .from('occupation_monthly')
      .select('occupation_id, job_postings, year')
      .eq('year', '2021')
    const { data: allJobs, error } = await jobQuery
    if (error) {
      console.log(error)
      return false
    }
    allJobs.forEach((job) => {
      const jobId = job.occupation_id
      if (jobId in jobs) {
        jobs[jobId] += job.job_postings
      } else {
        jobs[jobId] = job.job_postings
      }
    })
    const jobArr = []
    for (const [key, val] of Object.entries(jobs)) {
      jobArr.push([key, val])
    }
    jobArr.sort(sortForJobListingsArray)
    const topTenJobs = []
    const topTenIds = []
    for (let i = 0; i < 10; i++) {
      topTenJobs.push([jobArr[i][0], jobArr[i][1]]) //  [....[id, postings],...]
      topTenIds.push([jobArr[i][0]])
    }
    const { data: occupations, error: occupationError } = await this.$supabase()
      .from('occupations')
      .select('*')
      .in('id', topTenIds)
    if (occupationError) {
      console.log(occupationError)
      return false
    }
    occupations.forEach((job) => { //  add job posting data to each occupation
      const jobId = job.id
      topTenJobs.forEach((j) => {
        if (parseInt(j[0]) === jobId) {
          job.job_postings = j[1]
        }
      })
    })
    occupations.sort(sortForJobListingsObject)
    commit('setTopTenJobs', occupations)
  }
}

const sortForJobListingsArray = (a, b) => (a[1] < b[1] ? 1 : -1)

const sortForJobListingsObject = (a, b) => (a.job_postings < b.job_postings ? 1 : -1)

const sortForRecentYear = (a, b) => {
  if (a.year > b.year) {
    return -1
  }

  if (a.year < b.year) {
    return 1
  }

  return 0
}

const sortForRecentYearAndMonth = (a, b) => {
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
}
