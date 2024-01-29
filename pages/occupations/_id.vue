<template>
  <div class="single-occupation-page">
    <div v-if="occupation.type === 'occupation'">
      <v-row justify="center">
        <v-col cols="12">
          <v-tabs v-model="tab" grow center-active color="black">
            <v-tab v-for="item in items" :key="item.tab">
              {{ item.tab }}
            </v-tab>
          </v-tabs>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12">
          <v-tabs-items v-model="tab">
            <v-tab-item v-for="item in items" :key="item.tab" :related="relatedOccupations">
              <component :is="item.content" />
            </v-tab-item>
          </v-tabs-items>
        </v-col>
      </v-row>
    </div>
    <div v-else>
      <v-row>
        <v-col cols="12">
          <MapTabVue />
        </v-col>
      </v-row>
    </div>
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
      bootstrapped: 'primary/bootstrapped',
      occupationAnnualSalary: 'primary/occupationAnnualSalary',
      occupationMonthlyPostings: 'primary/occupationMonthlyPostings',
      relatedOccupations: 'primary/relatedOccupations'
    })
  }
}

</script>

<style scoped>
.v-tabs {
  display: none;
}
</style>
