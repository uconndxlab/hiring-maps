<template>
  <v-card class="px-6 py-4 mb-5" min-height="100">
    <v-card-title>
      {{ title }}
    </v-card-title>
    <v-card-text>
      <v-list>
        <v-list-item v-for="item in related" :key="item.title" :to="item.id.toString()">
          <v-list-item-content>
            <v-list-item-title>
              {{ item.title }}
            </v-list-item-title>
            <v-list-item-subtitle>
              {{ jobSalary(item) }}
            </v-list-item-subtitle>
            <v-list-item-subtitle>
              {{ item.job_description }}
            </v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-card-text>
  </v-card>
</template>

<script>

const currencyFormatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD'
})

export default {
  props: {
    title: {
      type: String,
      required: true
    },
    related: {
      type: Array,
      required: true
    }
  },
  methods: {
    jobSalary (job) {
      if ( job.salary ) {
        return currencyFormatter.format(job.salary)
      } else {
        return 'Salary not available'
      }
    }
  }
}

</script>
