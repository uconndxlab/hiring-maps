<template>
  <div class="map-tab">
    <GreyBg>
      <v-row justify="center">
        <v-col cols="12">
          <gchart-map :wait-hook="`primary/setOccupationMonthlyMapData`" />
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

export default {
  name: 'MapTabVue',
  components: { GreyBg },
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
  },
  methods: {
    ...mapMutations({
      setOccupationMonthlyMapData: 'primary/setOccupationMonthlyMapData'
    })
  }
}
</script>
