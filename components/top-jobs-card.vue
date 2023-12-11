<template>
<div>
<h2 class="section-title">Top Job Postings 2021</h2>
  <v-row align="start" class="job-cards-container">
    <v-col v-for="job in topTenJobs"
    :key="job.name"
      cols="12"
      sm="6"
      md="4"
      lg="3"
    >
    <router-link :to="jobLink(job)" class="job-card">
      <v-card class="job-card">
        <v-card-title class="job-title job-card-content">
        <HomepageListItem :list-item="job" />
        </v-card-title>
        <v-card-text class="card-subtitle">{{ numberWithCommas(job.job_postings) }} Jobs Available</v-card-text>
      </v-card>
      </router-link>
    </v-col>
  </v-row>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

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
      return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
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
    }
  }
}
</script>

<style scoped>
.section-title {
  text-align: left;
  font-size: 28px;
  margin-bottom: 50px;
  margin-top: 50px;
}
.job-title {
  display: flex;
  flex-direction: column;
  align-items: start;
  text-align: start;
}

.job-card {
  background-color: #cad7d5;
  text-decoration: none;
}

.v-card__title {
  font-size: 15px !important;
  white-space: nowrap;
  overflow: hidden !important;
  text-overflow: ellipsis !important;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}

/* .job-card-content {
  height: 150px;
} */

v-list-item__title {
  text-overflow: ellipsis !important;
  white-space: nowrap !important;
}

.card-subtitle {
  color: #20886e !important;
}
</style>
