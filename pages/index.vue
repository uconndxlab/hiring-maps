<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div class="home my-5">
    <v-container class="py-4">
      <v-row justify="center">
        <v-col cols="12">
          <h1 class="map-title">
            <span style="color:#fd4940">CONNECT</span>ing you
          </h1>
        </v-col>
        <v-col cols="12" style="padding:0px;">
          <div class="map-container">
            <gchart-map />
          </div>
        </v-col>
        <v-col cols="12">
          <h1 class="map-title-two">
            To <span style="color:#fd4940">OPPORTUNITIES</span>
          </h1>
        </v-col>
      </v-row>
    </v-container>
    <div class="light-blue--bg py-5">
      <v-container>
        <v-row>
          <v-col cols="12">
            <h1 class="mb-4">
              The Hiring Maps Project
            </h1>
            <p>In partnership with the <a href="https://are.uconn.edu">UConn Department of Agriculture &amp; Resource Economics</a> and the <a href="https://dxgroup.core.uconn.edu/">Digital Experience Group</a>, the Hiring Maps project is a go-to resource for navigating Connecticut's job market. Explore counties, track monthly job postings, and discover related job opportunities to make informed career decisions.</p>
          </v-col>
        </v-row>
      </v-container>
    </div>
    <v-container>
      <v-row>
        <v-col cols="12">
          <TopJobsCard />
        </v-col>
      <!-- <v-col cols="12">
        <JobsByCountyCard />
      </v-col> -->
      </v-row>
    </v-container>
  </div>
</template>

<script>
/* global google */

import { mapGetters, mapMutations } from 'vuex'
import TopJobsCard from '~/components/top-jobs-card.vue'
// import JobsByCountyCard from '~/components/jobs-by-county-card.vue'

export default {
  components: { TopJobsCard },
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

<style scoped>
.map-title-two {
  text-align: right;
  font-size: 40px;
  padding-top: 0px;
}
.map-title {
  font-size: 40px;
  padding-bottom: 0px;
}
.map-container {
  max-width: 900px;
  margin: 0 auto;
}
</style>
