<template>
  <card-text :title="`Top Job Postings for ${month}`">
    <div>
      <ul>
        <li v-for="job in topTenJobs" :key="`job-${job.id}`">
          {{ job.title }}
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
      month: ''
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
  }
}
</script>
