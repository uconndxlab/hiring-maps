<template>
  <div class="counties-list">
    <div v-if="counties.length" class="counties-list-container">
      <CountiesListItem v-for="county in counties" :key="county.name" :county="county" :county-monthly-postings="countyMonthlyPostings" />
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  computed: {
    ...mapGetters({
      counties: 'primary/counties',
      county: 'primary/county',
      countyMonthlyPostings: 'primary/countyMonthlyPostings'
    })
  }
}

</script>
