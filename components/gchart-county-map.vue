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

export default {
  props: {
    county: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      chart: null,
      mapData: google.visualization.arrayToDataTable([
        ['County', 'name', ''],
        ['CT-01', 'Fairfield', 0],
        ['CT-02', 'Hartford', 0],
        ['CT-03', 'Litchfield', 0],
        ['CT-04', 'Middlesex', 0],
        ['CT-05', 'New Haven', 0],
        ['CT-06', 'New London', 0],
        ['CT-07', 'Tolland', 0],
        ['CT-08', 'Windham', 0]
      ]),
      domElementId: 'map-element',
      chartOptions: {
        colorAxis: {
          minValue: 0
        },
        region: 'US-CT',
        resolution: 'provinces'
      }
    }
  },
  mounted () {
    this.drawMap()
  },
  methods: {
    drawMap () {
      google.visualization.GeoChart.setMapsSource('/maps_counties')

      this.chart = new google.visualization.GeoChart(document.getElementById(this.domElementId))
      google.visualization.events.addListener(this.chart, 'select', this.chartSelect)
      this.mapData.setValue(this.county.id - 1, 2, 100)
      this.chart.draw(this.mapData, this.chartOptions)
    },
    chartSelect () {
      const selected = this.chart.getSelection()[0]
      for (let i = 0; i < 8; i++) {
        if (i === selected.row) {
          this.mapData.setValue(i, 2, 100)
          this.$nuxt.$options.router.push('/counties/' + (i + 1))
        } else {
          this.mapData.setValue(i, 2, 0)
        }
      }
      this.chart.draw(this.mapData, this.chartOptions)
    }
  }
}

</script>
