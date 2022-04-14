<template>
  <v-card class="mx-auto px-6 py-4">
    <v-card-text>
      <div class="mb-3">
        {{ title }}
      </div>
      <v-row align="end">
        <v-col>
          <p class="text-h4 text--primary font-weight-bold">
            {{ large }}
          </p>
        </v-col>
        <v-col class="align-md-end">
          <p v-if="supporting">
            {{ supporting }}
          </p>
        </v-col>
      </v-row>
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
    large: {
      type: String,
      required: true
    },
    supporting: {
      type: String,
      default: ''
    }
  }
}
</script>
