<template>
  <div class="single-county-page">
    <v-row justify="center">
      <v-col cols="12">
        <GchartCountyMap :county="county" />
      </v-col>
    </v-row>

    <v-row>
      <v-col>
        <h1>{{ county.name }}</h1>
      </v-col>
    </v-row>
    <v-row justify="center">
      <v-col cols="12" md="6">
        <CardStatDisplay :title="`Total job postings this month`" :large="monthValue" />
        <CardStatDisplay :title="`Total job postings this year`" :large="yearValue" />
      </v-col>
      <v-col cols="12" md="6">
        <CardStatDisplay v-if="jobWithMostDemand.length" :title="`Occupation with the most demand`" :large="jobWithMostDemand[0].name" :supporting="jobWithMostDemand[0].job_postings + ` Jobs posted this month `" />
      </v-col>
    </v-row>
  </div>
</template>

<script>

import { mapActions, mapGetters, mapMutations } from 'vuex'
import GchartCountyMap from '~/components/gchart-county-map.vue'

export default {
  components: { GchartCountyMap },
  async asyncData ({ params, store }) {
    const county = store.getters['primary/county']
    if (!county || !county.id || county.id !== params.id) {
      await store.dispatch('primary/getCounty', params.id)
    }
    return {
      yearValue: '',
      monthValue: '',
      jobWithMostDemand: {}
    }
  },
  computed: {
    ...mapGetters({
      county: 'primary/county',
      bootstrapped: 'primary/bootstrapped'
    }),
    ...mapActions({
      countyJobPostingsThisYear: 'primary/countyJobPostingsThisYear',
      countyJobPostingsThisMonth: 'primary/countyJobPostingsThisMonth',
      jobWithMostDemandThisMonthByCounty: 'primary/jobWithMostDemandThisMonthByCounty'
    })
  },
  async mounted () {
    this.setMapHighlightData()

    const yearValue = await this.countyJobPostingsThisYear
    this.yearValue = yearValue.toString()

    const monthValue = await this.countyJobPostingsThisMonth
    this.monthValue = monthValue.toString()

    const jobWithMostDemand = await this.jobWithMostDemandThisMonthByCounty
    this.jobWithMostDemand = jobWithMostDemand
    console.log(jobWithMostDemand[0].name)
  },
  methods: {
    ...mapMutations({
      setMapHighlightData: 'primary/setMapHighlightData'
    })
  }
}

</script>
