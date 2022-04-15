<template>
  <v-row justify="center">
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
        <graph-bar />
      </card-text>
    </v-col>
    <v-col cols="12" sm="6">
      <card-stat-display :title="`Average Annual Salary`" :large="`$120,000`" />
      <card-stat-display :title="`Average Annual Salary`" :large="`$120,000`" :supporting="`$00.00/hourly`" />
    </v-col>
  </v-row>
</template>
