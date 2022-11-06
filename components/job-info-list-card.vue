<template>
  <v-card class="px-6 py-4 mb-5" min-height="100">
    <v-card-title>
      {{ title }}
    </v-card-title>
    <v-card-text>
      <ul>
        <li v-for="item in items" :key="item">
          {{ item }}
        </li>
      </ul>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      required: true
    },
    items: {
      type: Array,
      required: true
    }
  }
}

</script>
