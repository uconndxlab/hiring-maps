<template>
  <div :class="className">
    <div :id="domElementId" />
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
      isLoading: true,
      chartOptions: {
        region: 'US-CT',
        resolution: 'provinces',
        colors: ['#c2e2f6', '#1f7197'],
        datalessRegionColor: 'transparent',
        // legend: 'none'
        // displayMode: 'text'
      }
    }
  },
  computed: {
    ...mapGetters({
      bootstrapped: 'primary/bootstrapped',
      mapData: 'primary/mapData'
    }),
    className() {
      let classes = ['map-container']
      if (this.isLoading) {
        classes.push('is-loading')
      }
      return classes.join(' ')
    }
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
      this.isLoading = false;
    },
    chartSelect () {
      console.log('Chart was selected.')
      const selected = this.chart.getSelection()
      for (let i = 0; i < selected.length; i++) {
        const item = selected[i]
        const countyId = item.row + 1
        this.$nuxt.$options.router.push('/counties/' + countyId)
      }
    },
    clearMapData () {
      this.chart.clearChart()
    }
  }
}
</script>


<style scoped>
.map-container {
  transition: 0.3s linear opacity;
}
.is-loading {
  height: 500px;
  opacity: 0;
}
</style>