<template>
  <v-card>
    <div>
      <ul>
        <li v-for="job in topTenJobs" :key="`job-${job.id}`">
          {{ job.title }}
        </li>
      </ul>
    </div>
  </v-card>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  computed: {
    ...mapGetters({
      topTenJobs: 'primary/topTenJobPostings'
    })
  }
}
</script>
