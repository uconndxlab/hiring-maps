<template>
  <v-card class="mb-5" tile :to="`/counties/${county.id}`">
    <v-card-title>{{ county.name }}</v-card-title>
    <v-card-subtitle>{{ county.geocode }}</v-card-subtitle>
    <v-card-text>Job postings this month: {{ numberWithCommas(county.jobs_monthly) }}</v-card-text>
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
  methods: {
    numberWithCommas (x) {
      return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
    }
  }
}

</script>
