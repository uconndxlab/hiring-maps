<template>
  <div class="single-county-page">
    <v-row justify="center">
      <v-col cols="12">
        <GchartMap :wait-hook="`primary/setOccupationMonthlyMapData`" />
      </v-col>
    </v-row>

    <grey-bg>
      <v-row>
        <v-col>
          <h1>{{ county.name }}</h1>
        </v-col>
      </v-row>
      <v-row justify="center">
        <v-col cols="12" md="6">
          <CardText :title="`County Description`" />
        </v-col>
      </v-row>
    </grey-bg>
  </div>
</template>

<script>

import { mapGetters } from 'vuex'

export default {
  async asyncData ({ params, store }) {
    const county = store.getters['primary/county']
    console.log(county.name)

    if (!county || !county.id || county.id !== params.id) {
      await store.dispatch('primary/getCounty', params.id)
    }
  },
  computed: {
    ...mapGetters({
      county: 'primary/county',
      bootstrapped: 'primary/bootstrapped'
    })
  }
}

</script>
