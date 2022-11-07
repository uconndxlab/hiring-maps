<template>
  <div class="single-occupation-page">
    <v-row class="mt-2 mb-2 ml-2">
      <v-col>
        <h1>
          {{ occupation.title }}
          <v-chip outlined label>
            Type: {{ occupation.type }}
          </v-chip>
          <v-menu offset-y open-on-hover>
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
              <v-list-item v-for="title in occupation.alternate_titles" :key="title">
                <v-list-item-title>{{ title }}</v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>
        </h1>
      </v-col>
    </v-row>
    <v-tabs v-model="tab" color="black">
      <v-tab v-for="item in items" :key="item.tab">
        {{ item.tab }}
      </v-tab>
    </v-tabs>
    <v-tabs-items v-model="tab">
      <v-tab-item v-for="item in items" :key="item.tab" :related="relatedOccupations">
        <component :is="item.content" />
      </v-tab-item>
    </v-tabs-items>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import MapTabVue from './tabs/map-tab.vue'
import AdditionalInfoTabVue from './tabs/additional-info-tab.vue'
import JobInfoTabVue from './tabs/job-info-tab.vue'

export default {
  components: {
    MapTabVue,
    AdditionalInfoTabVue,
    JobInfoTabVue
  },
  async asyncData ({ params, store }) {
    const occupation = store.getters['primary/occupation']
    if (!occupation || !occupation.id || occupation.id !== params.id) {
      await store.dispatch('primary/fetchOccupation', params.id)
      await store.dispatch('primary/fetchRelatedOccupations', occupation.related_occupations)
    }
  },
  data () {
    return {
      tab: null,
      items: [
        { tab: 'Map and Description', content: 'MapTabVue' },
        { tab: 'Detailed Job Info', content: 'JobInfoTabVue' },
        { tab: 'Additional Info', content: 'AdditionalInfoTabVue' }
      ]
    }
  },
  computed: {
    ...mapGetters({
      occupation: 'primary/occupation',
      relatedOccupations: 'primary/relatedOccupations'
    })
  }
}

</script>
