<template>
  <div class="zone-home-tab">
    <GreyBg>
      <v-row>
        <v-col cols="12">
          <h1>Zone 2: Some Preparation Needed</h1>
        </v-col>
      </v-row>
      <v-row justify="center">
        <v-col cols="12" md="6">
          <card-text :title="`Education`">
            These occupations usually require a high school diploma.
          </card-text>
          <card-text :title="`Experience`">
            Some previous work-related skill, knowledge, or experience is usually needed. For example, a teller would benefit from experience working directly with the public.
          </card-text>
          <card-text :title="`Training`">
            Employees in these occupations need anywhere from a few months to one year of working with experienced employees. A recognized apprenticeship program may be associated with these occupations.
          </card-text>
        </v-col>
        <v-col cols="12" md="6">
          <card-text :title="`Examples`">
            These occupations often involve using your knowledge and skills to help others. Examples include orderlies, counter and rental clerks, customer service representatives, security guards, upholsterers, and tellers.
          </card-text>
          <card-text :title="`SVP Range`">
            {{ `(4.0 to < 6.0)` }}
          </card-text>
        </v-col>
      </v-row>
    </GreyBg>
  </div>
</template>

<script>
import GreyBg from '~/components/grey-bg.vue'

export default {
  name: 'ZoneTwoTabVue',
  components: { GreyBg }
}
</script>
