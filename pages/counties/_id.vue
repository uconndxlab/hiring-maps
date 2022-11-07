<template>
  <div class="single-county-page">
    <GreyBg>
      <v-row justify="center">
        <v-col cols="12">
          <GchartCountyMap :county="county" />
        </v-col>
      </v-row>
      <v-row class="mt-2 mb-2 ml-2">
        <span>
          <h1>{{ county.name }}</h1>
          <h3>{{ county.geocode }}</h3>
        </span>
      </v-row>
      <v-row>
        <v-col cols="12">
          <line-graph
            :key="graphKey"
            :datasets="graphDatasets"
            :labels="graphLabels"
          />
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
    </GreyBg>
  </div>
</template>

<script>

import { mapActions, mapGetters, mapMutations } from 'vuex'
import lineGraph from '~/components/line-graph.vue'
import GchartCountyMap from '~/components/gchart-county-map.vue'
import cardTextVue from '~/components/card-text.vue'

export default {
  components: { lineGraph, GchartCountyMap, cardTextVue },
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
      setMapHighlightData: 'primary/setMapHighlightData'
    }),
    setGraphData (data) {
      this.graphDatasets[0].data = data
      this.graphDatasets[0].label = `Monthly Job Postings for ${this.county.name} County`
      this.graphKey++
    }
  }
}

</script>
