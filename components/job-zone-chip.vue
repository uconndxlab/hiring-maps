<template>
  <div class="text-center">
    <v-chip outlined :color="color">
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
    </v-chip>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      required: true
    },
    color: {
      type: String,
      required: true
    }
  }
}

</script>
