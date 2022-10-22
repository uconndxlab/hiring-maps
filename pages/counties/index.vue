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
  computed: {
    ...mapGetters({
      counties: 'primary/counties',
      bootstrapped: 'primary/bootstrapped'
    })
  },
  mounted () {
    if (!this.bootstrapped) {
      const unsubscribe = this.$store.subscribe((mutation) => {
        if (mutation.type === 'primary/setDataHasBeenRetrieved') {
          console.log('Data has been retrieved')
          google.charts.setOnLoadCallback(this.setTotalCountyMapData)
          unsubscribe()
        }
      })
    }
    google.charts.setOnLoadCallback(this.setTotalCountyMapData)
  },
  methods: {
    ...mapMutations({
      setTotalCountyMapData: 'primary/setTotalCountyMapData'
    })
  }
}

</script>
