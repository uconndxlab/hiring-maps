<template>
  <div class="county-map-page">
    <v-row justify="center">
      <v-col cols="12">
        <GchartMap :wait-hook="`primary/setTotalCountyMapData`" />
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12" class="mb-4 mt-8">
        <CountiesList />
      </v-col>
    </v-row>
  </div>
</template>

<script>
/* global google */

import { mapMutations, mapGetters } from 'vuex'
// TODO: Call primary function to draw geochart with total job posting data per county, then pass this chart to each county/id page
export default {
  name: 'CountyPage',
  async asyncData ({ params, store }) {
    const county = store.getters['primary/county']
    if (!county || !county.id || county.id !== params.id) {
      await store.dispatch('primary/getCounty', params.id)
    }
  },
  computed: {
    ...mapGetters({
      county: 'primary/county',
      bootstrapped: 'primary/bootstrapped'
    })
  },
  mounted () {
    console.log('mounted')
    if (!this.bootstrapped) {
      const unsubscribe = this.$store.subscribe((mutation) => {
        if (mutation.type === 'primary/setDataHasBeenRetrieved') {
          console.log('Data has been retrieved')
          google.charts.setOnLoadCallback(this.setTotalCountyMapData)
          unsubscribe()
        }
      })
    }
    console.log('not strapped')
    google.charts.setOnLoadCallback(this.setTotalCountyMapData)
  },
  methods: {
    ...mapMutations({
      setTotalCountyMapData: 'primary/setTotalCountyMapData'
    })
  }
}

</script>
