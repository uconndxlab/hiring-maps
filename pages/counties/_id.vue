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
        <CardStatDisplay v-if="monthValue != ''" :title="`Total job postings this month`" :large="monthValue" />
        <CardStatDisplay v-if="yearValue != ''" :title="`Total job postings this year`" :large="yearValue" />
      </v-col>
      <v-col cols="12" md="6">
        <cardTextVue v-if="jobsWithMostDemand.length" :title="`Occupations with the most demand`">
          <div>
            <ul>
              <li v-for="occupation in jobsWithMostDemand" :key="occupation.id">
                {{ occupation.name }}: {{ occupation.job_postings }} jobs posted this month
              </li>
            </ul>
          </div>
        </cardTextVue>
      </v-col>
    </v-row>
  </div>
</template>

<script>

import { mapActions, mapGetters, mapMutations } from 'vuex'
import GchartCountyMap from '~/components/gchart-county-map.vue'
import cardTextVue from '~/components/card-text.vue'

export default {
  components: { GchartCountyMap, cardTextVue },
  async asyncData ({ params, store }) {
    const county = store.getters['primary/county']
    if (!county || !county.id || county.id !== params.id) {
      await store.dispatch('primary/getCounty', params.id)
    }
    return {
      yearValue: '',
      monthValue: '',
      jobsWithMostDemand: {}
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

    const jobsWithMostDemand = await this.jobWithMostDemandThisMonthByCounty
    this.jobsWithMostDemand = jobsWithMostDemand
  },
  methods: {
    ...mapMutations({
      setMapHighlightData: 'primary/setMapHighlightData'
    })
  }
}

</script>
