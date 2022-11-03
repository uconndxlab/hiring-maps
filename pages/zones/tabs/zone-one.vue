<template>
  <div class="zone-home-tab">
    <GreyBg>
      <v-row>
        <v-col cols="12">
          <h1>Zone 1: Little or No Preparation Needed</h1>
        </v-col>
      </v-row>
      <v-row justify="center">
        <v-col cols="12" md="6">
          <card-text :title="`Education`">
            Some of these occupations may require a high school diploma or GED certificate.
          </card-text>
          <card-text :title="`Experience`">
            Little or no previous work-related skill, knowledge, or experience is needed for these occupations. For example, a person can become a waiter or waitress even if he/she has never worked before.
          </card-text>
          <card-text :title="`Training`">
            Employees in these occupations need anywhere from a few days to a few months of training. Usually, an experienced worker could show you how to do the job.
          </card-text>
        </v-col>
        <v-col cols="12" md="6">
          <card-text :title="`Examples`">
            These occupations involve following instructions and helping others. Examples include food preparation workers, dishwashers, sewing machine operators, landscaping and groundskeeping workers, logging equipment operators, and baristas.
          </card-text>
          <card-text :title="`SVP Range`">
            (Below 4.0)
          </card-text>
        </v-col>
      </v-row>
    </GreyBg>
  </div>
</template>

<script>
import GreyBg from '~/components/grey-bg.vue'

export default {
  name: 'ZoneOneTabVue',
  components: { GreyBg }
}
</script>
