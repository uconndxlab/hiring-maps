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
          <v-row justify="center">
            <v-col cols="10" offset="1">
              <div class="map-container">
                <gchart-map />
              </div>
            </v-col>
          </v-row>
        </v-col>
        <v-col cols="12">
          <h1 class="map-title-two">
            To <span style="color:#fd4940">OPPORTUNITIES</span>
          </h1>
        </v-col>
      </v-row>
    </v-container>
    <div class="section-padding">
      <v-container>
        <v-row>
          <v-col cols="12">
            <h1 class="mb-4">
              The Hiring Maps Project
            </h1>
            <p>In partnership with the <a href="https://are.uconn.edu">UConn Department of Agriculture &amp; Resource
                Economics</a> and the <a href="https://dxgroup.core.uconn.edu/">Digital Experience Group</a>, the Hiring
              Maps project is a go-to resource for navigating Connecticut's job market. Explore counties and wages, track
              monthly job postings, and discover related jobs &amp; occupations to make informed career decisions.</p>
          </v-col>
        </v-row>
      </v-container>
    </div>
    <div class="light-blue--bg section-padding">
      <v-container>
        <div>
          <h2 class="text-center">Explore Jobs &amp; Counties</h2>
          <p class="text-center">Select a county from the map above, or use the search to find a specific job or county.
          </p>
          <ais-instant-search index-name="dev_jobs" :search-client="searchClient">
            <ais-search-box placeholder="Search a county name OR occupation name." />
            <ais-configure :hitsPerPage="10" />
            <ais-state-results>
              <template v-slot:default="{ state: { query } }">
                <div class="search-results-container px-3 white--bg">
                  <div class="search-results py-3" v-if="query.length > 0">
                    <ais-index index-name="dev_counties">
                      <ais-hits>
                        <template v-slot="{ items }">
                          <p class="text-overline mb-0" v-if="items.length > 0">Counties</p>
                          <v-list two-line v-if="items.length > 0">
                            <v-list-item v-for="item in items" :key="item.objectID" :to="item.url">
                              <v-list-item-content>
                                <v-list-item-title>
                                  {{ item.name }}
                                </v-list-item-title>
                                <v-list-item-subtitle>
                                  {{ numberFormatter.format(getCountyById(item.id).jobs_monthly) }} Monthly Job Postings
                                </v-list-item-subtitle>
                              </v-list-item-content>
                            </v-list-item>
                          </v-list>
                        </template>
                      </ais-hits>
                    </ais-index>
                    <ais-hits>
                      <template v-slot="{ items }">
                        <p class="text-overline mb-0" v-if="items.length > 0">Jobs &amp; Occupations</p>
                        <v-list two-line v-if="items.length > 0">
                          <v-list-item v-for="item in items" :key="item.objectID" :to="item.url">
                            <v-list-item-content>
                              <v-list-item-title>
                                {{ item.title }}
                              </v-list-item-title>
                              <v-list-item-subtitle>
                                {{ JSON.parse(item.alternate_titles).join(', ') }}
                              </v-list-item-subtitle>
                            </v-list-item-content>
                          </v-list-item>
                        </v-list>
                      </template>
                    </ais-hits>
                  </div>
                </div>
              </template>
            </ais-state-results>
          </ais-instant-search>
        </div>
      </v-container>
    </div>
    <div class="section-padding">
      <v-container>
        <v-row>
          <v-col cols="12">
            <TopJobsCard />
          </v-col>
        </v-row>
      </v-container>
    </div>
  </div>
</template>

<script>
/* global google */

import { mapGetters, mapMutations } from 'vuex'
import algoliasearch from 'algoliasearch'
import TopJobsCard from '~/components/top-jobs-card.vue'
// import JobsByCountyCard from '~/components/jobs-by-county-card.vue'

export default {
  components: { TopJobsCard },
  data() {
    return {
      numberFormatter: new Intl.NumberFormat('en-US'),
      searchClient: algoliasearch(
        '6EXZW0OM1T', // Application ID
        'bfa8d90f359d7a2aeb2cd0fe77915b28' // Search API Key
      )
    }
  },
  computed: {
    ...mapGetters({
      bootstrapped: 'primary/bootstrapped',
      getCountyById: 'primary/getCountyById'
    })
  },
  mounted() {
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
}</style>
