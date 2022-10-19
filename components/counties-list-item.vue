<template>
  <v-card class="mb-5" tile :to="`/counties/${county.id}`">
    <v-card-title>{{ county.name }}</v-card-title>
    <v-card-subtitle>{{ county.geocode }}</v-card-subtitle>
    <v-card-text>{{ countyMonthlyPostings }}</v-card-text>
  </v-card>
</template>

<script>

export default {
  props: {
    county: {
      type: Object,
      required: true
    },
    countyMonthlyPostings: {
      type: Number,
      required: true
    }
  }
}

</script>
