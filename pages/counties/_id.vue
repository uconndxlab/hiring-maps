<template>
  <div class="single-county-page">
    <v-row justify="center">
      <v-col cols="12">
        <GchartCountyMap :county="county" />
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
          <CardStatDisplay :title="`Total job postings this year`" :large="jobPostingThisYear" />
          <CardStatDisplay :title="`Total job postings this month`" :large="jobPostingThisMonth" />
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
import GchartCountyMap from '~/components/gchart-county-map.vue'

export default {
  components: { GchartCountyMap },
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
      countyJobPostingsThisYear: 'primary/countyJobPostingsThisYear',
      countyJobPostingsThisMonth: 'primary/countyJobPostingsThisMonth'
    }),
    jobPostingThisYear () {
      if (!this.countyJobPostingsThisYear) {
        return 'No Data'
      }
      return this.countyJobPostingsThisYear.toString()
    },
    jobPostingThisMonth () {
      if (!this.countyJobPostingsThisMonth) {
        return 'No Data'
      }
      return this.countyJobPostingsThisMonth.toString()
    }
  },
  mounted () {
    this.setMapHighlightData()
  },
  methods: {
    ...mapMutations({
      setMapHighlightData: 'primary/setMapHighlightData'
    })
  }
}

</script>
