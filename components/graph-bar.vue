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
    }
  },
  data () {
    return {
      chartData: {
        labels: ['Monday', 'Tuesday'],
        datasets: [
          {
            label: 'One',
            backgroundColor: 'blue',
            data: [12, 80]
          }
        ]
      },
      chartOptions: {
        responsive: true,
        indexAxis: 'y'
      }
    }
  }
}
</script>
