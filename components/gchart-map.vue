<template>
  <div class="map-container">
    <v-row justify="center">
      <v-col cols="10" offset="1">
        <div :id="domElementId" />
      </v-col>
    </v-row>
  </div>
</template>

<script>
/* global google */
import { mapGetters } from 'vuex'

export default {
  props: {
    waitHook: {
      type: String,
      default: 'primary/setDataHasBeenRetrieved'
    }
  },
  data () {
    return {
      chart: null,
      domElementId: 'map-element',
      chartOptions: {
        region: 'US-CT',
        resolution: 'provinces'
      }
    }
  },
  computed: {
    ...mapGetters({
      bootstrapped: 'primary/bootstrapped',
      mapData: 'primary/mapData'
    })
  },
  watch: {
    mapData (newData, oldData) {
      console.log('changingMapData', newData, oldData)
      if (this.chart) {
        this.chart.draw(newData, this.chartOptions)
      }
    }
  },
  mounted () {
    google.charts.setOnLoadCallback(this.initiateMapDraw)
  },
  methods: {
    initiateMapDraw () {
      if (!this.bootstrapped) {
        const unsubscribe = this.$store.subscribe((mutation) => {
          if (mutation.type === this.waitHook) {
            console.log('Data has been retrieved')
            this.drawMap()
            unsubscribe()
          }
        })
      } else {
        this.drawMap()
      }
    },
    drawMap () {
      console.log('Drawing Map')
      google.visualization.GeoChart.setMapsSource('/maps_counties')

      this.chart = new google.visualization.GeoChart(document.getElementById(this.domElementId))
      google.visualization.events.addListener(this.chart, 'ready', this.chartReady)
      google.visualization.events.addListener(this.chart, 'select', this.chartSelect)
      if (this.mapData.version) {
        this.chart.draw(this.mapData, this.chartOptions)
      }
    },
    chartReady () {
      console.log('Chart is ready.')
    },
    chartSelect (e) {
      console.log('Chart was selected.', e)
    }
  }
}
</script>
