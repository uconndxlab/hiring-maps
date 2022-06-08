<template>
  <div class="map-container">
    <div :id="domElementId" />
  </div>
</template>

<script>
/* global google */

export default {
  data () {
    return {
      chart: null,
      domElementId: 'map-element'
    }
  },
  mounted () {
    google.charts.load('current', {
      packages: ['geochart'],
      mapsApiKey: this.$config.GOOGLE_MAPS_API_KEY
    })
    google.charts.setOnLoadCallback(this.drawMap)
  },
  methods: {
    drawMap () {
      const data = google.visualization.arrayToDataTable([
        ['id', 'name', 'Value'],
        ['CT-01', 'Fairfield', 888],
        ['CT-02', 'Hartford', 233],
        ['CT-03', 'Litchfield', 300],
        ['CT-04', 'Middlesex', 500],
        ['CT-05', 'New Haven', 600],
        ['CT-06', 'New London', 700],
        ['CT-07', 'Tolland', 800],
        ['CT-08', 'Windham', 900]
      ])

      google.visualization.GeoChart.setMapsSource('/maps_counties')

      const options = {
        region: 'US-CT',
        resolution: 'provinces'
      }

      this.chart = new google.visualization.GeoChart(document.getElementById(this.domElementId))
      this.chart.draw(data, options)
    }
  }
}
</script>
