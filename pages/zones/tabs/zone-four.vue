<template>
  <div class="zone-home-tab">
    <GreyBg>
      <v-row>
        <v-col cols="12">
          <h1>Zone 4: Considerable Preparation Needed</h1>
        </v-col>
      </v-row>
      <v-row justify="center">
        <v-col cols="12" md="6">
          <card-text :title="`Education`">
            Most of these occupations require a four-year bachelor's degree, but some do not.
          </card-text>
          <card-text :title="`Experience`">
            A considerable amount of work-related skill, knowledge, or experience is needed for these occupations. For example, an accountant must complete four years of college and work for several years in accounting to be considered qualified.
          </card-text>
          <card-text :title="`Training`">
            Employees in these occupations usually need several years of work-related experience, on-the-job training, and/or vocational training.
          </card-text>
        </v-col>
        <v-col cols="12" md="6">
          <card-text :title="`Examples`">
            Many of these occupations involve coordinating, supervising, managing, or training others. Examples include real estate brokers, sales managers, database administrators, graphic designers, chemists, art directors, and cost estimators.
          </card-text>
          <card-text :title="`SVP Range`">
            {{ `(7.0 to < 8.0)` }}
          </card-text>
        </v-col>
      </v-row>
    </GreyBg>
  </div>
</template>

<script>
import GreyBg from '~/components/grey-bg.vue'

export default {
  name: 'ZoneFourTabVue',
  components: { GreyBg }
}
</script>
