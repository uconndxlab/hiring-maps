<template>
  <card-text :title="`Top Job Postings for 2021`">
    <div>
      <ul>
        <li v-for="job in topTenJobs" :key="job.id">
          {{ job.name }} ({{ numberWithCommas(job.job_postings) }} listings)
        </li>
      </ul>
    </div>
  </card-text>
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
    }
  }
}
</script>
