<template>
  <div class="single-occupation-page">
    <v-row justify="center">
      <v-col cols="12">
        <gchart-map :wait-hook="`primary/setOccupationMonthlyMapData`" />
      </v-col>
    </v-row>

    <grey-bg>
      <v-row>
        <v-col>
          <h1>{{ occupation.title }}</h1>
        </v-col>
      </v-row>
      <v-row justify="center">
        <v-col cols="12" md="6">
          <card-text :title="`Job Description`">
            {{ occupation.job_description }}
          </card-text>
        </v-col>
        <v-col cols="12" md="6">
          <card-text :title="`Job Description`">
            {{ occupation.job_description }}
          </card-text>
        </v-col>
      </v-row>
    </grey-bg>
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
