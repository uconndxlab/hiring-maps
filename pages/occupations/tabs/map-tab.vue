<template>
  <div class="map-tab">
    <GreyBg>
      <v-row justify="center">
        <v-col cols="12">
          <gchart-map :wait-hook="`primary/setOccupationMonthlyMapData`" />
          <line-graph
            :key="graphKey"
            :datasets="graphDatasets"
            :labels="graphLabels"
          />
        </v-col>
      </v-row>
      <v-row justify="center">
        <v-col cols="12" md="6">
          <card-text :title="`Job Description`">
            {{ occupation.job_description }}
          </card-text>
        </v-col>
        <v-col cols="12" md="6">
          <card-stat-display :title="`Average Annual Salary`" :large="annualSalary" :supporting="annualSalaryHourly" />
          <card-stat-display :title="`Monthly Job Postings`" :large="monthlyPostings" />
        </v-col>
      </v-row>
    </GreyBg>
  </div>
</template>

<script>
/* global google */

import { mapGetters, mapMutations } from 'vuex'
import GreyBg from '~/components/grey-bg.vue'
import lineGraph from '~/components/line-graph.vue'

export default {
  name: 'MapTabVue',
  components: { GreyBg, lineGraph },
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
      occupation: 'primary/occupation',
      bootstrapped: 'primary/bootstrapped',
      occupationAnnualSalary: 'primary/occupationAnnualSalary',
      occupationMonthlyPostings: 'primary/occupationMonthlyPostings'
    }),
    annualSalary () {
      if (!this.occupationAnnualSalary) {
        return 'No Data'
      }
      const formatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD'
      })
      return formatter.format(this.occupationAnnualSalary)
    },
    annualSalaryHourly () {
      if (!this.occupationAnnualSalary) {
        return null
      }
      const hourly = this.occupationAnnualSalary / 52 / 40
      const formatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD'
      })
      return `${formatter.format(hourly)}/hourly`
    },
    monthlyPostings () {
      if (!this.occupationMonthlyPostings) {
        return 'No Data'
      }
      return `${this.occupationMonthlyPostings}`
    }
  },
  mounted () {
    if (!this.bootstrapped) {
      const unsubscribe = this.$store.subscribe((mutation) => {
        if (mutation.type === 'primary/setDataHasBeenRetrieved') {
          console.log('Data has been retrieved')
          google.charts.setOnLoadCallback(this.setOccupationMonthlyMapData)
          unsubscribe()
        }
      })
    } else {
      google.charts.setOnLoadCallback(this.setOccupationMonthlyMapData)
    }
    const fetchJobPostingsById = async () => {
      const id = this.occupation.id
      const query = this.$supabase().rpc('getjobmonthlypostings', { jobid: id })
      const { data: jobPostingsMonthly, error } = await query
      if (error) {
        console.log(error)
        return false
      }
      console.log('JOB POSTINGS', jobPostingsMonthly)
      const postings = []
      jobPostingsMonthly.forEach((month) => {
        console.log('MONTH', month)
        postings[month.month - 1] = month.job_postings
      })
      this.setGraphData(postings)
    }
    fetchJobPostingsById()
  },
  methods: {
    ...mapMutations({
      setOccupationMonthlyMapData: 'primary/setOccupationMonthlyMapData'
    }),
    setGraphData (data) {
      console.log(data)
      this.graphDatasets[0].data = data
      this.graphDatasets[0].label = `Monthly Job Postings for ${this.occupation.title}`
      this.graphKey++
    }
  }
}
</script>
