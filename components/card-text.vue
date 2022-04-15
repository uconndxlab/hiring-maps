<template>
  <v-card class="px-6 py-4" min-height="340">
    <v-card-title
      class="mb-2"
    >
      {{ title }}
    </v-card-title>
    <v-card-text>
      <div
        class="
      text--primary
      text-body-1"
      >
        <slot />
      </div>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      required: true
    }
  }
}
</script>
