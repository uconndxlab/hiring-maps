<template>
  <v-row justify="center">
    <v-col cols="12">
      <gchart-map />
    </v-col>
    <v-col cols="12" sm="6">
      <card-text :title="`Job Description`">
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Perferendis magnam minus labore laborum incidunt ducimus aperiam repellendus praesentium animi neque a laboriosam est, et totam eos ea ullam voluptates itaque!
        </p>
        <p>
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quisquam, eaque voluptates rerum odio unde ea! Iure voluptatem officia architecto eius, aliquid dolore, facilis ullam quisquam iste similique impedit, minima explicabo.
        </p>
      </card-text>
      <card-text :title="`Top Industries for { job }`">
        <graph-bar
          :labels="graphLabels"
          :datasets="graphDatasets"
          :additional-config="graphAdditionalConfig"
          :chart-id="`example-bar-graph`"
        />
      </card-text>
    </v-col>
    <v-col cols="12" sm="6">
      <card-stat-display :title="`Average Annual Salary`" :large="`$120,000`" />
      <card-stat-display :title="`Average Annual Salary`" :large="`$120,000`" :supporting="`$00.00/hourly`" />
    </v-col>
  </v-row>
</template>

<script>
export default {
  data () {
    return {
      graphLabels: ['Technology', 'Finance', 'Manufacturing', 'Retail'],
      graphDatasets: [
        {
          backgroundColor: 'rgba(103, 197, 135, 1)',
          data: [0.6, 0.25, 0.15, 0.02]
        }
      ],
      graphAdditionalConfig: {
        barPercentage: 0.5,
        scales: {
          x: {
            max: 1,
            ticks: {
              count: 3,
              format: {
                style: 'percent'
              }
            }
          }
        },
        plugins: {
          legend: {
            display: false
          }
        }
      }
    }
  }
}
</script>
