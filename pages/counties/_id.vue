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
      graphkey: 0,
      graphDatasets: [
        {
          label: 'test',
          data: []
        }
      ],
      graphLabels: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
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
  created () {

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
      console.log(postings)
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
      this.graphKey++
    }
  }
}

</script>
