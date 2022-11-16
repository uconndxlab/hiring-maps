<template>
  <card-text :title="`Top Job Postings for 2021`">
    <HomepageListItem v-for="job in topTenJobs" :key="job.name" :list-item="job" />
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
