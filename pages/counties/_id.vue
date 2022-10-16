<template>
  <div class="single-county-page">
    <v-row justify="center">
      <v-col cols="12">
        <GchartMap :wait-hook="`primary/setOccupationMonthlyMapData`" />
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
          <CardStatDisplay :title="`Total Monthly Job Postings`" :large="monthlyCountyJobPostings" />
          <CardStatDisplay :title="`Total Annual Job Postings`" :large="`{annualCountyJobPostings}`" />
        </v-col>
        <v-col cols="12" md="6">
          <CardStatDisplay :title="`Industry with Most Demand:`" :large="`{industryDemandName}`" :supporting="`{industryDemandJobs}`" />
        </v-col>
      </v-row>
    </grey-bg>
  </div>
</template>

<script>

import { mapGetters, mapMutations } from 'vuex'
/* global google */

export default {
  async asyncData ({ params, store }) {
    const county = store.getters['primary/counties']
    if (!county || !county.id || county.id !== params.id) {
      await store.dispatch('primary/getCounty', params.id)
    }
  },
  computed: {
    ...mapGetters({
      county: 'primary/county',
      bootstrapped: 'primary/bootstrapped',
      countyMonthlyPostings: 'primary/countyMonthlyPostings'
    }),
    monthlyCountyJobPostings () {
      if (!this.countyMonthlyPostings) {
        return 'No Data'
      }
      return this.countyMonthlyPostings.toString()
    }
  },
  mounted () {
    if (!this.bootstrapped) {
      const unsubscribe = this.$store.subscribe((mutation) => {
        if (mutation.type === 'primary/setDataHasBeenRetrieved') {
          console.log('Data has been retrieved')
          google.charts.setOnLoadCallback(this.setCountyMonthlyMapData)
          unsubscribe()
        }
      })
    } else {
      google.charts.setOnLoadCallback(this.setCountyMonthlyMapData)
    }
  },
  methods: {
    ...mapMutations({
      setCountyMonthlyMapData: 'primary/setCountyMonthlyMapData'
    })
  }
}

</script>
