<template>
  <div class="map-container">
    <v-row justify="center">
      <v-col>
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
      mapData: [],
      domElementId: 'map-element',
      chartOptions: {
        colorAxis: {
          minValue: 0
        },
        region: 'US-CT',
        resolution: 'provinces',
        colors: ['#c2e2f6', '#1f7197'],
        datalessRegionColor: 'transparent',
        tooltip: {
          trigger: 'none'
        },
        legend: 'none',
        enableRegionInteractivity: false
      }
    }
  },
  mounted () {
    google.charts.setOnLoadCallback(this.drawMap)
  },
  methods: {
    drawMap () {
      const mapData = new google.visualization.DataTable()
      mapData.addColumn('string', 'id')
      mapData.addColumn('string', 'name')
      mapData.addColumn('number', 'Job Postings This Month')
      google.visualization.GeoChart.setMapsSource('/maps_counties')
      this.chart = new google.visualization.GeoChart(document.getElementById(this.domElementId))
      const rows = [
        ['CT-01', 'Fairfield', 0],
        ['CT-02', 'Hartford', 0],
        ['CT-03', 'Litchfield', 0],
        ['CT-04', 'Middlesex', 0],
        ['CT-05', 'New Haven', 0],
        ['CT-06', 'New London', 0],
        ['CT-07', 'Tolland', 0],
        ['CT-08', 'Windham', 0]
      ]
      for (let i = 0; i < rows.length; i++) {
        if (this.county.geocode === rows[i][0]) {
          rows[i][2] = this.county.jobs_monthly ?? 100
        }
      }
      mapData.addRows(rows)
      this.mapData = mapData
      this.chart.draw(this.mapData, this.chartOptions)
    }
  }
}

</script>
