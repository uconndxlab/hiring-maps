<template>
  <div class="single-occupation-page">
    <v-row class="mt-2 mb-2 ml-2">
      <v-col>
        <line-graph
          :key="graphKey"
          :datasets="graphDatasets"
          :labels="graphLabels"
        />
        <h1>
          {{ occupation.title }}
          <v-chip outlined label>
            Type: {{ occupation.type }}
          </v-chip>
          <v-menu offset-y open-on-hover>
            <template #activator="{ on, attrs }">
              <v-btn icon v-bind="attrs" v-on="on">
                <v-icon large color="green darken-2">
                  mdi-chevron-down
                </v-icon>
              </v-btn>
            </template>
            <v-list>
              <v-list-item>
                <v-list-item-title>
                  <b>
                    Alternate titles:
                  </b>
                </v-list-item-title>
              </v-list-item>
              <v-list-item v-for="title in occupation.alternate_titles" :key="title">
                <v-list-item-title>{{ title }}</v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>
        </h1>
      </v-col>
    </v-row>
    <v-tabs v-model="tab" color="black">
      <v-tab v-for="item in items" :key="item.tab">
        {{ item.tab }}
      </v-tab>
    </v-tabs>
    <v-tabs-items v-model="tab">
      <v-tab-item v-for="item in items" :key="item.tab" :related="relatedOccupations">
        <component :is="item.content" />
      </v-tab-item>
    </v-tabs-items>
  </div>
</template>

<script>
/* global google */
import { mapGetters, mapMutations } from 'vuex'
import MapTabVue from './tabs/map-tab.vue'
import AdditionalInfoTabVue from './tabs/additional-info-tab.vue'
import JobInfoTabVue from './tabs/job-info-tab.vue'
import lineGraph from '~/components/line-graph.vue'

export default {
  components: {
    MapTabVue,
    AdditionalInfoTabVue,
    JobInfoTabVue,
    lineGraph
  },
  async asyncData ({ params, store }) {
    const occupation = store.getters['primary/occupation']
    if (!occupation || !occupation.id || occupation.id !== params.id) {
      await store.dispatch('primary/fetchOccupation', params.id)
      await store.dispatch('primary/fetchRelatedOccupations', occupation.related_occupations)
    }
  },
  data () {
    return {
      tab: null,
      items: [
        { tab: 'Map and Description', content: 'MapTabVue' },
        { tab: 'Detailed Job Info', content: 'JobInfoTabVue' },
        { tab: 'Additional Info', content: 'AdditionalInfoTabVue' }
      ],
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
      occupationMonthlyPostings: 'primary/occupationMonthlyPostings',
      relatedOccupations: 'primary/relatedOccupations'
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
