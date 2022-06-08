<template>
  <div class="single-occupation-page">
    <v-row justify="center">
      <v-col cols="12">
        <gchart-map :wait-hook="`primary/setOccupationMonthlyMapData`" />
      </v-col>
    </v-row>

    <v-row justify="center">
      <v-col cols="12">
        <occupation-list-item :occupation="occupation" />
      </v-col>
    </v-row>
  </div>
</template>

<script>
/* global google */

import { mapGetters, mapMutations } from 'vuex'

export default {
  async asyncData ({ params, store }) {
    const occupation = store.getters['primary/occupation']

    if (!occupation || !occupation.id || occupation.id !== params.id) {
      await store.dispatch('primary/fetchOccupation', params.id)
    }
  },
  computed: {
    ...mapGetters({
      occupation: 'primary/occupation',
      bootstrapped: 'primary/bootstrapped'
    })
  },
  mounted () {
    if (!this.bootstrapped) {
      const unsubscribe = this.$store.subscribe((mutation) => {
        if (mutation.type === 'primary/setDataHasBeenRetrieved') {
          console.log('Data has been retrieved')
          google.charts.setOnLoadCallback(this.setOccupationMonthlyMapData)
          unsubscribe()
        }
      })
    } else {
      google.charts.setOnLoadCallback(this.setOccupationMonthlyMapData)
    }
  },
  methods: {
    ...mapMutations({
      setOccupationMonthlyMapData: 'primary/setOccupationMonthlyMapData'
    })
  }
}
</script>
