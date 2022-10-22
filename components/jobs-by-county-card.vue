<template>
  <card-text :title="`Number of Job Postings by County for 2021`">
    <div>
      <ul>
        <li v-for="county in counties" :key="`county-${county.id}`">
          {{ county.name }} ({{ county.job_postings }})
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
      counties: 'primary/counties'
    })
  },
  mounted () {
  }
}
</script>
