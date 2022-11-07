<template>
  <div class="single-county-page">
    <v-row justify="center">
      <v-col cols="12">
        <GchartMap :wait-hook="`primary/setOccupationMonthlyMapData`" />
        <line-graph
          :key="graphKey"
          :datasets="graphDatasets"
          :labels="graphLabels"
        />
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
import lineGraph from '~/components/line-graph.vue'
/* global google */

export default {
  components: { lineGraph },
  async asyncData ({ params, store }) {
    const county = store.getters['primary/counties']
    if (!county || !county.id || county.id !== params.id) {
      await store.dispatch('primary/getCounty', params.id)
    }
  },
  data () {
    return {
      graphKey: 0,
      graphDatasets: [
        {
          borderColor: (ctx) => {
            const canvas = ctx.chart.ctx
            const gradient = canvas.createLinearGradient(0, 0, 0, 275)
            gradient.addColorStop(0, 'rgb(0, 255, 0)')
            gradient.addColorStop(0.25, 'rgb(16, 150, 24)')
            gradient.addColorStop(0.5, 'rgb(0, 196, 75)')
            gradient.addColorStop(0.75, 'rgb(114, 212, 114)')
            gradient.addColorStop(1.0, 'rgb(239, 230, 220)')
            return gradient
          },
          cubicInterpolationMode: 'monotone',
          label: '',
          data: []
        }
      ],
      graphLabels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
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
    const fetchCountyJobPostings = async () => {
      const id = this.county.id
      const query = this.$supabase().rpc('getcountyjobsyear', { countyid: id })
      const { data: JobPostingsMonthly, error } = await query
      if (error) {
        console.log(error)
        return false
      }
      const postings = []
      JobPostingsMonthly.forEach((month) => {
        postings[month.month - 1] = month.job_postings
      })
      this.setGraphData(postings)
    }
    fetchCountyJobPostings()
  },
  methods: {
    ...mapMutations({
      setCountyMonthlyMapData: 'primary/setCountyMonthlyMapData'
    }),
    setGraphData (data) {
      this.graphDatasets[0].data = data
      this.graphDatasets[0].label = `Monthly Job Postings for ${this.county.name} County`
      this.graphKey++
    }
  }
}

</script>
