<template>
  <v-menu v-if="alternateTitles.length" offset-y open-on-hover>
    <template #activator="{ on, attrs }">
      <v-btn icon v-bind="attrs" v-on="on">
        <v-icon large color="green darken-2">
          mdi-chevron-down
        </v-icon>
      </v-btn>
    </template>
    <v-list>
      <v-list-item>
        <v-list-item-title>
          <b>
            Alternate titles:
          </b>
        </v-list-item-title>
      </v-list-item>
      <v-list-item v-for="title in alternateTitles" :key="title">
        <v-list-item-title>{{ title }}</v-list-item-title>
      </v-list-item>
    </v-list>
  </v-menu>
</template>

<script>
export default {
  props: {
    alternateTitles: {
      type: Array,
      required: true
    }
  }
}

</script>
