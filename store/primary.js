/* global google */

export const state = () => ({
  dataHasBeenRetrieved: false,
  counties: [],
  counties2021: [],
  county: {},
  mapData: {},
  mapHighlightData: {},
  occupationResults: [],
  occupationSearchLoading: false,
  occupation: {},
  relatedOccupations: {},
  topTenJobs: []
})

export const getters = {
  counties (state) {
    return state.counties
  },
  counties2021 (state) {
    return state.counties2021
  },
  county (state) {
    return state.county
  },
  mapData (state) {
    return state.mapData
  },
  mapHighlightData (state) {
    return state.mapHighlightData
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
  relatedOccupations (state) {
    return state.relatedOccupations
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
  }
}

export const mutations = {
  setCounties (state, counties) {
    state.counties = counties
  },
  setCounty (state, county) {
    state.county = county
  },
  setCounties2021 (state, counties2021) {
    state.counties2021 = counties2021
  },
  setMapHighlightData (state) {
    console.log('highlighting county')
    const returnData = new google.visualization.DataTable()
    returnData.addColumn('string', 'id')
    returnData.addColumn('string', 'name')
    returnData.addColumn('number', 'value')
    const data = []
    state.counties.forEach((county) => {
      const dataEntry = [
        county.geocode,
        county.name,
        1
      ]
      data.push(dataEntry)
    })
    returnData.addRows(data)
    state.mapHighlightData = returnData
  },
  setInitialMapData (state) {
    console.log('settingInitialMapData')
    const returnData = new google.visualization.DataTable()
    returnData.addColumn('string', 'id')
    returnData.addColumn('string', 'name')
    returnData.addColumn('number', '')
    const data = []
    state.counties.forEach((county) => {
      const dataEntry = [
        county.geocode,
        county.name,
        0
      ]
      data.push(dataEntry)
    })
    returnData.addRows(data)
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
      state.occupation.occupation_monthly.sort(sortForRecentYearAndMonth)
      const countyIndex = county.id - 1
      const countyMonthly = state.occupation.occupation_monthly[countyIndex].job_postings

      const monthlyCountyDataEntry = [
        county.geocode,
        county.name,
        parseInt(countyMonthly)
      ]
      data.push(monthlyCountyDataEntry)
    })
    returnData.addRows(data)
    state.mapData = returnData
  },
  // TODO: Change logic to fit once getCounties is an rpc function call
  setMonthlyCountyMapData (state) {
    console.log('settingMonthlyCountyMapData')
    const returnData = new google.visualization.DataTable()
    returnData.addColumn('string', 'id')
    returnData.addColumn('string', 'name')
    returnData.addColumn('number', 'Job Postings This Month')
    const data = []
    for (let i = 0; i < 8; i++) { // Iterate through each county: i
      const totalCountyPostingDataEntry = [
        state.counties[i].geocode,
        state.counties[i].name,
        parseInt(state.counties[i].jobs_monthly)
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
  setRelatedOccupations (state, relatedOccupations) {
    state.relatedOccupations = relatedOccupations
  },
  setTopTenJobs (state, occupations) {
    state.topTenJobs = occupations
  }
}

export const actions = {
  async bootstrap ({ dispatch, commit }) {
    await dispatch('getCounties2021')
    await dispatch('getCounties')
    await dispatch('fetchOccupations')
    await dispatch('fetchTopTenJobs')
    // await dispatch('fetchTopJobsByCounty')
    console.log('bootstrapped')
    commit('setDataHasBeenRetrieved', true)
  },
  /* Function async getCounties({ commit, state })
  Calls rpc function that returns the id, name, state_code, geocode, and jobs_monthly of each county
  where jobs_monthly is an integer value representing the total number of job postings in the county for
  the most recent month.
  Sets the counties data and individual county data
  Sets initial map data.
  */
  async getCounties ({ commit, state }) {
    const { data: counties, error } = await this.$supabase().rpc('getcountiesmonthly')

    if (error) {
      console.log(error)
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
  /* Function async getCounties2021 ({ commit })
  Queries the counties table from supabase and the occupations data for the year 2021
  Returns a JSON object
  counties {
    id: int
    name: string
    state_code: string
    geocode: string
    occupation_monthy: {
      year: 2021,
      county_id: int
      job_postings: int
    }
  }
   */
  async getCounties2021 ({ commit }) {
    const { data: counties, error } = await this.$supabase()
      .from('counties')
      .select('*')
      .eq('state_code', 'CT')

    if (counties && Array.isArray(counties)) {
      const query = this.$supabase().rpc('getjobsbycounty')
      const { data: countiesWithJobs, error: jobserror } = await query
      if (jobserror) {
        console.log(error)
        return false
      }
      const sortByCountyId = (a, b) => (a.id < b.id ? 1 : -1)
      counties.sort(sortByCountyId)
      countiesWithJobs.sort(sortByCountyId)
      for (let i = 0; i < counties.length; i++) {
        counties[i].job_postings = countiesWithJobs[i].job_postings
      }
      counties.sort(sortForJobListingsObject)

      commit('setCounties2021', counties)
      return true
    }

    console.log(error)
    return false
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
  /* countyJobPostingsThisYear ({ state })
  Calls rpc() function countypostingsthisyear with the input parameter of the current countyid
  Returns an integer data that represents the total number of job postings in the given county for the most recent year */
  async countyJobPostingsThisYear ({ state }) {
    const countyid = state.county.id
    const { data, error } = await this.$supabase().rpc('countypostingsthisyear', { countyid })

    if (error) {
      console.log(error)
      return 0
    }
    return data
  },
  /* countyJobPostingsThisMonth ({ state })
  Calls rpc() function countypostingsthismonth with the input parameter of the current countyid
  Returns an integer data that represents the total number of job postings in the given county for the most recent month */
  async countyJobPostingsThisMonth ({ state }) {
    const countyid = state.county.id
    const { data, error } = await this.$supabase().rpc('countypostingsthismonth', { countyid })

    if (error) {
      console.log(error)
      return 0
    }
    return data
  },
  /* jobWithMostDemandThisMonthByCounty ({ state })
  Calls rpc() function gettopjobscounty with input parameter of the current countyid
  Returns a JSON object of following form for the name, id, and number of job postings of the top 10
  jobs in each county.
  {
    "occupation_id" : int
    "name" : string
    "job_postings" : int
  },
  continue for each county */
  async jobWithMostDemandThisMonthByCounty ({ state }) {
    const countyid = state.county.id
    const { data, error } = await this.$supabase().rpc('gettopjobscounty', { countyid })

    if (error) {
      console.log(error)
      return 0
    }
    return data
  },
  async fetchOccupations ({ commit }, searchOptions) {
    // const limit = searchOptions?.limit ? searchOptions.limit : 100
    // const start = searchOptions?.start ? searchOptions.start : 0

    let query = this.$supabase()
      .from('occupations')
      .select('id, code, title, job_description, type')

    if (searchOptions?.query) {
      query = query.ilike('title', `%${searchOptions.query}%`)
    }

    // query = query.range(start, limit - 1)

    const { data: occupations, error } = await query

    if (occupations && Array.isArray(occupations)) {
      commit('setOccupationResults', occupations)
      return true
    }

    console.log(error)
    return false
  },
  /* fetchRelatedOccupations ({ commit }, relatedOccupations)
  Given a list of occupation.codes return an array of occupations queried by their code */
  async fetchRelatedOccupations ({ commit, state }) {
    const relatedOccupations = state.occupation.related_occupations
    const related = []
    for (let i = 0; i <= relatedOccupations.length; i++) {
      const query = this.$supabase()
        .from('occupations')
        .select('id, code, title, job_description')
        .eq('code', relatedOccupations[i])

      const { data, error } = await query

      if (error) {
        console.log(error)
        return false
      }
      related.push(data)
    }
    commit('setRelatedOccupations', related.flat())
    return true
  },
  /* fetchOccupation ({ commit }, id)
  Queries supase and returns an object for the specified occupation based on its id
  Return JSON object format:
  {
    "id" : int,
    "code" : string,
    "title" : string,
    "date_added" : string,
    "job_description" : string,
    "type" : string,
    "alternate_titles": [strings]
    "job_zone_category": string,
    "related_occupations": [strings],
    "additional_information": [
      {
        "title": string,
        "link": string
      }...,
    ],
    "detailed_work_activities": [strings],
    "tools_used": [strings],
    "technology_skills": [strings],
    "tasks": [strings],
    "occupation_annual": [
      {
        "id": int,
        "created_at": string,
        "county_id": int,
        "occupation_id": int,
        "percent_high_school": int,
        "percent_associates": int,
        "percent_bachelors": int,
        "mean_market_salary": int,
        "year": int
      }...,
    ],
    "occupation_monthy": [
      {
        "id": int,
        "month": int,
        "year": int,
        "occupation_id": int,
        "job_postings": int,
        "county_id": int
      }
    ]
  }
  */
  async fetchOccupation ({ commit }, id) {
    const query = this.$supabase()
      .from('occupations')
      .select(
        'id, code, title, job_description, type, alternate_titles, job_zone_category, related_occupations, additional_information, detailed_work_activities, tools_used, technology_skills, tasks, occupation_annual (*), occupation_monthly (*)'
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
    const query = this.$supabase().rpc('gettoptenjobs')
    const { data: jobs, error } = await query
    if (error) {
      console.log(error)
      return false
    }
    if (jobs && Array.isArray(jobs)) {
      jobs.sort(job => sortForJobListingsObject)
      commit('setTopTenJobs', jobs)
    }
  }
}

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
