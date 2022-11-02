<template>
  <v-card class="px-6 py-4 mb-5" min-height="100">
    <v-card-title class="mb-2">
      {{ title }}
      <v-tooltip top>
        <template #activator="{ on, attrs }">
          <v-btn icon :to="`/zones`">
            <v-icon v-bind="attrs" v-on="on">
              mdi-help-circle-outline
            </v-icon>
          </v-btn>
        </template>
        <span>Click here to learn more about Job Zones</span>
      </v-tooltip>
    </v-card-title>
    <v-card-text>
      <div class="text--primary text-body-1">
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
