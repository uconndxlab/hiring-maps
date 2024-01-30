<template>
  <div class="mb-4">
      <h2 class="mb-2">
        Connecticut Top Occupations 2021
      </h2>
      <p>Within the year 2021, here are the jobs with the largest number of postings in the state of Connecticut.</p>
    <v-row align="start" class="job-cards-container">
      <v-col
        v-for="job in topTenJobs"
        :key="job.name"
        cols="12"
        sm="6"
        md="4"
      >
        <router-link :to="jobLink(job)" class="job-card">
          <v-card class="job-card">
            <v-card-title class="font-weight-bold mb-2 job-card-title">
              <span class="job-card-title-text">{{ job.name }}</span>
            </v-card-title>
            <v-card-subtitle>
              {{ jobSalary(job) }}
            </v-card-subtitle>
            <v-card-text class="card-subtitle">
              {{ numberWithCommas(job.job_postings) }} Jobs Posted
            </v-card-text>
          </v-card>
        </router-link>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
const numberFormatter = new Intl.NumberFormat('en-US')
const currencyFormatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD'
})

export default {
  data () {
    return {
      month: 'Current Month'
    }
  },
  computed: {
    ...mapGetters({
      topTenJobs: 'primary/topTenJobPostings'
    })
  },
  mounted () {
    const current = new Date()
    const currentMonth = current.toLocaleString('default', { month: 'long' })
    this.month = currentMonth
  },
  methods: {
    numberWithCommas (x) {
      return numberFormatter.format(x)
    },
    jobLink (job) {
      let type = ''
      let id = ''
      if ('occupation_id' in job) {
        type = 'occupations'
        id = job.occupation_id
      } else {
        type = 'counties'
        id = job.id
      }
      return `/${type}/${id}`
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

<style scoped>
.job-card-title {
  white-space: nowrap;
  padding-right: 15px;
  -webkit-line-clamp: 2;
}

.job-card-title-text {
    overflow: hidden;
    text-overflow: ellipsis;
  }
.job-card {
  background-color: #cad7d5;
  text-decoration: none;
}

.card-subtitle {
  color: #20886e !important;
}
</style>
