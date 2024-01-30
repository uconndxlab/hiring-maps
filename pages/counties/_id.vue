<template>
  <div>
    <div class="section-padding">
      <v-container>
        <breadcrumbs :text="county.name"/>
        <v-row>
          <v-col cols="12" md="5">
            <h1 class="mb-4">{{ county.name }} County</h1>
            <p class="mb-4">{{ county.description }}</p>
            <CardStatDisplay v-if="monthValue != ''" :title="`Total job postings this month`" :large="monthValue" />
            <CardStatDisplay v-if="yearValue != ''" :title="`Total job postings this year`" :large="yearValue" />
          </v-col>
          <v-col cols="12" md="7">
            <div class="mt-5">
              <GchartCountyMap :county="county" />
            </div>
          </v-col>
        </v-row>
      </v-container>
    </div>
    <div>
      <v-container>
        <v-row class="mb-4">
        <v-col cols="12">
          <line-graph
            :datasets="graphDatasets"
            :labels="graphLabels"
          />
        </v-col>
      </v-row>
      <v-row justify="center" class="mb-5">
        <v-col cols="12">
          <cardTextVue v-if="jobsWithMostDemand.length" :title="`Occupations in ${county.name} County with High Demand`">
            <v-list>
              <v-list-item v-for="occupation in jobsWithMostDemand" :key="occupation.title" :to="`/occupations/` + occupation.occupation_id.toString()">
                <v-list-item-content>
                  <v-list-item-title class="mb-1">
                    {{ occupation.name }}
                  </v-list-item-title>
                  <v-list-item-subtitle>
                    {{ numberWithCommas(occupation.job_postings) }} jobs posted in 2021
                  </v-list-item-subtitle>
                  <v-list-item-subtitle>
                    {{ jobSalary(occupation) }}
                  </v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>
            </v-list>
          </cardTextVue>
        </v-col>
      </v-row>
      </v-container>
    </div>
  </div>
</template>

<script>

import { mapActions, mapGetters } from 'vuex'
import lineGraph from '~/components/line-graph.vue'
import GchartCountyMap from '~/components/gchart-county-map.vue'
import cardTextVue from '~/components/card-text.vue'

const numberFormatter = new Intl.NumberFormat('en-US')
const currencyFormatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD'
});

export default {
  components: { lineGraph, GchartCountyMap, cardTextVue },
  async asyncData ({ params, store, $supabase }) {
    let county = store.getters['primary/county']
    if (!county || !county.id || county.id !== params.id) {
      await store.dispatch('primary/getCounty', params.id)
      county = store.getters['primary/county']
    }

    const query = $supabase().rpc('getcountyjobsyear', { countyid: params.id })
    const { data: JobPostingsMonthly } = await query

    const countyPostingsThisYear = await store.dispatch('primary/countyJobPostingsThisYear')
    const yearValue = numberFormatter.format(countyPostingsThisYear)

    const countyPostingsThisMonth = await store.dispatch('primary/countyJobPostingsThisMonth')
    const monthValue = numberFormatter.format(countyPostingsThisMonth)

    const jobsWithMostDemand = await store.dispatch('primary/jobWithMostDemandThisMonthByCounty')

    county.jobs_monthly = countyPostingsThisMonth
    return {
      county,
      job_postings_monthly: JobPostingsMonthly.map(month => month.job_postings),
      monthValue,
      yearValue,
      jobsWithMostDemand
    }
  },
  data () {
    return {
      graphLabels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
    }
  },
  computed: {
    ...mapGetters({
      bootstrapped: 'primary/bootstrapped'
    }),
    ...mapActions({
      countyJobPostingsThisYear: 'primary/countyJobPostingsThisYear',
      countyJobPostingsThisMonth: 'primary/countyJobPostingsThisMonth',
      jobWithMostDemandThisMonthByCounty: 'primary/jobWithMostDemandThisMonthByCounty'
    }),
    graphDatasets () {
      return [
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
          label: `Job Postings Per Month for ${this.county.name} County`,
          data: this.job_postings_monthly
        }
      ]
    }
  },
  methods: {
    numberWithCommas (x) {
      return numberFormatter.format(x)
    },
    currencyFormatter (x) {
      return currencyFormatter.format(x)
    },
    jobSalary(job) {
      if ( job.salary ) {
        return `Mean Salary: ${currencyFormatter.format(job.salary)}`
      } else {
        return `Salary Data Not Available`
      }
    }
  }
}

</script>
