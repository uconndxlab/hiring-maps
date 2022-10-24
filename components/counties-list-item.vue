<template>
  <v-card class="mb-5" tile :to="`/counties/${county.id}`">
    <v-card-title>{{ county.name }}</v-card-title>
    <v-card-subtitle>{{ county.geocode }}</v-card-subtitle>
    <v-card-text>{{ monthlyPostings }}</v-card-text>
  </v-card>
</template>

<script>

export default {
  props: {
    county: {
      type: Object,
      required: true
    }
  },
  computed: {
    monthlyPostings () {
      let totalPostings = 0
      for (let i = 0; i < this.county.occupation_monthly.length; i++) {
        totalPostings += this.county.occupation_monthly[i].job_postings
      }

      return totalPostings
    }
  }
}

</script>
