<template>
  <div class="zone-home-tab">
    <GreyBg>
      <v-row>
        <v-col cols="12">
          <h1>Zone 3: Medium Preparation Needed</h1>
        </v-col>
      </v-row>
      <v-row justify="center">
        <v-col cols="12" md="6">
          <card-text :title="`Education`">
            Most occupations in this zone require training in vocational schools, related on-the-job experience, or an associate's degree.
          </card-text>
          <card-text :title="`Experience`">
            Previous work-related skill, knowledge, or experience is required for these occupations. For example, an electrician must have completed three or four years of apprenticeship or several years of vocational training, and often must have passed a licensing exam, in order to perform the job.
          </card-text>
          <card-text :title="`Training`">
            Employees in these occupations usually need one or two years of training involving both on-the-job experience and informal training with experienced workers. A recognized apprenticeship program may be associated with these occupations.
          </card-text>
        </v-col>
        <v-col cols="12" md="6">
          <card-text :title="`Examples`">
            These occupations usually involve using communication and organizational skills to coordinate, supervise, manage, or train others to accomplish goals. Examples include hydroelectric production managers, travel guides, electricians, agricultural technicians, barbers, court reporters, and medical assistants.
          </card-text>
          <card-text :title="`SVP Range`">
            {{ `(6.0 to < 7.0)` }}
          </card-text>
        </v-col>
      </v-row>
    </GreyBg>
  </div>
</template>

<script>
import GreyBg from '~/components/grey-bg.vue'

export default {
  name: 'ZoneThreeTabVue',
  components: { GreyBg }
}
</script>
