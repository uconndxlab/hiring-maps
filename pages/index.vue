<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <v-row justify="center">
    <v-col cols="12">
      <gchart-map />
    </v-col>
    <v-col cols="6">
      <TopJobsCard />
    </v-col>
    <v-col cols="6">
      <JobsByCountyCard />
    </v-col>
  </v-row>
</template>

<script>
/* global google */

import { mapGetters, mapMutations } from 'vuex'
import TopJobsCard from '~/components/top-jobs-card.vue'
import JobsByCountyCard from '~/components/jobs-by-county-card.vue'

export default {
  components: { TopJobsCard, JobsByCountyCard },
  computed: {
    ...mapGetters({
      bootstrapped: 'primary/bootstrapped'
    })
  },
  mounted () {
    if (!this.bootstrapped) {
      const unsubscribe = this.$store.subscribe((mutation) => {
        if (mutation.type === 'primary/setDataHasBeenRetrieved') {
          console.log('Data has been retrieved')
          google.charts.setOnLoadCallback(this.setInitialMapData)
          unsubscribe()
        }
      })
    } else {
      google.charts.setOnLoadCallback(this.setInitialMapData)
    }
  },
  methods: {
    ...mapMutations({
      setInitialMapData: 'primary/setInitialMapData'
    })
  }
}
</script>
