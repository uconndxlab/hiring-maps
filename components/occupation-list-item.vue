<template>
  <v-card class="mb-5" tile :to="`/occupations/${occupation.id}`">
    <v-card-title>{{ occupation.title }}</v-card-title>
    <v-card-subtitle>{{ occupation.code }}</v-card-subtitle>
    <v-card-text>{{ occupation.job_description }}</v-card-text>
  </v-card>
</template>

<script>
export default {
  props: {
    occupation: {
      type: Object,
      required: true
    }
  }
}
</script>
