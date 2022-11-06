<template>
  <v-card class="px-6 py-4 mb-5" min-height="100">
    <v-card-title>
      {{ title }}
    </v-card-title>
    <v-card-text>
      <v-list>
        <v-list-item v-for="item in items" :key="item.title" icon @click="navToLink(item.link)">
          <v-list-item-icon>
            <v-icon>
              mdi-link
            </v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>
              {{ item.title }}
            </v-list-item-title>
            <v-list-item-subtitle>
              {{ item.link }}
            </v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
      </v-list>
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
  },
  methods: {
    navToLink (url) {
      window.open(url, '_blank')
    }
  }
}

</script>
