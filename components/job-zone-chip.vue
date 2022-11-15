<template>
  <div class="pt-1">
    <v-chip small outlined :color="color">
      <h4>
        {{ title }}
      </h4>
      <v-tooltip top>
        <template #activator="{ on, attrs }">
          <v-btn icon :to="`/zones`">
            <v-icon v-bind="attrs" class="text-h6" v-on="on">
              mdi-help-circle-outline
            </v-icon>
          </v-btn>
        </template>
        Click here to learn more about Job Zones
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
