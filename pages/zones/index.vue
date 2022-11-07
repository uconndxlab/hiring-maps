<template>
  <div class="job_zone_page">
    <v-row class="mt-2 mb-2 ml-2">
      <v-col>
        <h1>Learn about Job Zone Categories</h1>
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
import ZoneHomeTabVue from './tabs/zone-home.vue'
import ZoneOneTabVue from './tabs/zone-one.vue'
import ZoneTwoTabVue from './tabs/zone-two.vue'
import ZoneThreeTabVue from './tabs/zone-three.vue'
import ZoneFourTabVue from './tabs/zone-four.vue'
import ZoneFiveTabVue from './tabs/zone-five.vue'

export default {
  name: 'JobZonesPage',
  components: {
    ZoneHomeTabVue,
    ZoneOneTabVue,
    ZoneTwoTabVue,
    ZoneThreeTabVue,
    ZoneFourTabVue,
    ZoneFiveTabVue
  },
  data () {
    return {
      tab: null,
      items: [
        { tab: 'What are Job Zones', content: 'ZoneHomeTabVue' },
        { tab: 'Zone 1', content: 'ZoneOneTabVue' },
        { tab: 'Zone 2', content: 'ZoneTwoTabVue' },
        { tab: 'Zone 3', content: 'ZoneThreeTabVue' },
        { tab: 'Zone 4', content: 'ZoneFourTabVue' },
        { tab: 'Zone 5', content: 'ZoneFiveTabVue' }
      ]
    }
  }
}

</script>
