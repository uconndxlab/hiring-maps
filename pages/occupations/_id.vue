<template>
  <div class="single-occupation-page">
    <v-row class="mt-2 mb-2 ml-2">
      <v-col>
        <h1>{{ occupation.title }}</h1>
      </v-col>
    </v-row>
    <v-tabs v-model="tab" color="black">
      <v-tab v-for="item in items" :key="item.tab">
        {{ item.tab }}
      </v-tab>
    </v-tabs>
    <v-tabs-items v-model="tab">
      <v-tab-item v-for="item in items" :key="item.tab">
        <component :is="item.content" />
      </v-tab-item>
    </v-tabs-items>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import MapTabVue from './tabs/map-tab.vue'
import AdditionalInfoTabVue from './tabs/additional-info-tab.vue'

export default {
  components: {
    MapTabVue,
    AdditionalInfoTabVue
  },
  async asyncData ({ params, store }) {
    const occupation = store.getters['primary/occupation']
    if (!occupation || !occupation.id || occupation.id !== params.id) {
      await store.dispatch('primary/fetchOccupation', params.id)
    }
  },
  data () {
    return {
      tab: null,
      items: [
        { tab: 'Map and Job description', content: 'MapTabVue' },
        { tab: 'Additional Info', content: 'AdditionalInfoTabVue' }
      ]
    }
  },
  computed: {
    ...mapGetters({
      occupation: 'primary/occupation'
    })
  }
}

</script>
