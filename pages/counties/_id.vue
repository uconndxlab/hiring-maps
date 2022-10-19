<template>
  <div class="single-county-page">
    <v-row justify="center">
      <v-col cols="12">
        <GchartMap />
      </v-col>
    </v-row>

    <grey-bg>
      <v-row>
        <v-col>
          <h1>{{ county.name }}</h1>
        </v-col>
      </v-row>
      <v-row justify="center">
        <v-col cols="12" md="6">
          <CardStatDisplay :title="`Total Job Postings 2020`" :large="jobPosting2020" />
          <CardStatDisplay :title="`Total Job Postings in 2021`" :large="jobPosting2021" />
        </v-col>
        <v-col cols="12" md="6">
          <CardStatDisplay :title="`Industry with Most Demand:`" :large="`{industryDemandName}`" :supporting="`{industryDemandJobs}`" />
        </v-col>
      </v-row>
    </grey-bg>
  </div>
</template>

<script>

import { mapGetters } from 'vuex'

export default {
  async asyncData ({ params, store }) {
    const county = store.getters['primary/county']
    if (!county || !county.id || county.id !== params.id) {
      await store.dispatch('primary/getCounty', params.id)
    }
  },
  computed: {
    ...mapGetters({
      county: 'primary/county',
      bootstrapped: 'primary/bootstrapped',
      countyMonthlyPostings: 'primary/countyMonthlyPostings',
      countyJobPostings2020: 'primary/countyJobPostings2020',
      countyJobPostings2021: 'primary/countyJobPostings2021'
    }),
    recentMonthCountyJobPostings () {
      if (!this.countyMonthlyPostings) {
        return 'No Data'
      }
      return this.countyMonthlyPostings.toString()
    },
    jobPosting2020 () {
      if (!this.countyJobPostings2020) {
        return 'No Data'
      }
      return this.countyJobPostings2020.toString()
    },
    jobPosting2021 () {
      if (!this.countyJobPostings2021) {
        return 'No Data'
      }
      return this.countyJobPostings2021.toString()
    }
  }
}

</script>
