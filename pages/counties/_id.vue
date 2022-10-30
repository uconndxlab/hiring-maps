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
          <CardStatDisplay :title="`Total job postings this month`" :large="monthValue" />
          <CardStatDisplay :title="`Total job postings this year`" :large="yearValue" />
        </v-col>
        <v-col cols="12" md="6">
          <CardStatDisplay :title="`Industry with Most Demand:`" :large="`{industryDemandName}`" :supporting="`{industryDemandJobs}`" />
        </v-col>
      </v-row>
    </grey-bg>
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
  },
  data () {
    return {
      yearValue: '',
      monthValue: ''
    }
  },
  computed: {
    ...mapGetters({
      county: 'primary/county',
      bootstrapped: 'primary/bootstrapped'
    }),
    ...mapActions({
      countyJobPostingsThisYear: 'primary/countyJobPostingsThisYear',
      countyJobPostingsThisMonth: 'primary/countyJobPostingsThisMonth'
    })
  },
  async mounted () {
    this.setMapHighlightData()

    const yearValue = await this.countyJobPostingsThisYear
    this.yearValue = yearValue.toString()

    const monthValue = await this.countyJobPostingsThisMonth
    this.monthValue = monthValue.toString()
  },
  methods: {
    ...mapMutations({
      setMapHighlightData: 'primary/setMapHighlightData'
    })
  }
}

</script>
