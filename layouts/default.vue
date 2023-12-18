<template>
  <v-app>
    <uconn-banner />
    <v-main>
      <Nuxt />
    </v-main>
    <v-footer
      class="uconn-blue--bg py-5"
    >
      <v-container>
        <v-row>
          <v-col>
            <a class="white--text d-block mb-3" href="https://are.uconn.edu" target="_blank">UConn Department of Agriculture &amp; Resource Economics</a>
            <span class="white--text d-block mb-3"><a class="white--text" href="https://dxgroup.core.uconn.edu/" target="_blank">Digital Experience Group at UConn</a> &copy; {{ new Date().getFullYear() }}</span>
          </v-col>
          <v-col>
            <a class="white--text d-block mb-3" href="https://uconn.edu" target="_blank">&copy; University of Connecticut</a>
            <a class="white--text d-block mb-3" href="https://uconn.edu/disclaimers-privacy-copyright/" target="_blank">Disclaimers, Privacy &amp; Copyright</a>
            <a class="white--text d-block mb-3" href="https://accessibility.uconn.edu/" target="_blank">Accessibility</a>
          </v-col>
        </v-row>
      </v-container>
    </v-footer>
  </v-app>
</template>

<script>
/* global google */

import { mapActions } from 'vuex'

export default {
  name: 'DefaultLayout',
  data () {
    return {
      clipped: true,
      drawer: false,
      fixed: true,
      items: [
        {
          icon: 'mdi-apps',
          title: 'Home',
          to: '/'
        },
        {
          icon: 'mdi-format-list-bulleted',
          title: 'Occupations',
          to: '/occupations'
        },
        {
          icon: 'mdi-format-list-bulleted',
          title: 'Counties',
          to: '/counties'
        },
        {
          icon: ' mdi-format-list-bulleted',
          title: 'Skills',
          to: '/skills'
        },
        {
          icon: 'mdi-format-list-bulleted',
          title: 'What are Job Zones?',
          to: '/zones'
        }
      ],
      title: 'Hiring Maps'
    }
  },
  created () {
    google.charts.load('current', {
      packages: ['geochart'],
      mapsApiKey: this.$config.GOOGLE_MAPS_API_KEY
    })
    this.bootstrap()
  },
  methods: {
    ...mapActions({
      bootstrap: 'primary/bootstrap'
    })
  }

}
</script>
