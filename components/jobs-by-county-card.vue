<template>
  <card-text :title="`Number of Job Postings by County for 2021`">
    <HomepageListItem v-for="county in counties2021" :key="county.id" :list-item="county" />
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
      counties2021: 'primary/counties2021'
    })
  },
  methods: {
    numberWithCommas (x) {
      return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
    }
  }
}
</script>
