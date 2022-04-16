<template>
  <Bar
    :chart-options="chartOptions"
    :chart-data="chartData"
    :chart-id="chartId"
  />
</template>

<script>
import { Bar } from 'vue-chartjs/legacy'
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js'

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale)

export default {
  name: 'GraphBar',
  components: { Bar },
  props: {
    chartId: {
      type: String,
      default: 'bar-chart'
    },
    labels: {
      type: Array,
      required: true
    },
    datasets: {
      type: Array,
      required: true
    },
    vertical: {
      type: Boolean,
      default: false
    },
    percent: {
      type: Boolean,
      default: true
    },
    additionalConfig: {
      type: Object,
      default: () => {}
    }
  },
  data () {
    return {
    }
  },
  computed: {
    chartOptions () {
      const options = {
        responsive: true,
        ...this.additionalConfig
      }

      if (!this.vertical) {
        options.indexAxis = 'y'
      }

      return options
    },
    chartData () {
      return {
        labels: this.labels,
        datasets: this.datasets
      }
    }
  }
}
</script>
