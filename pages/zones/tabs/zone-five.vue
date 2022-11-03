<template>
  <div class="zone-home-tab">
    <GreyBg>
      <v-row>
        <v-col cols="12">
          <h1>Zone 5: Extensive Preparation Needed</h1>
        </v-col>
      </v-row>
      <v-row justify="center">
        <v-col cols="12" md="6">
          <card-text :title="`Education`">
            Most of these occupations require graduate school. For example, they may require a master's degree, and some require a Ph.D., M.D., or J.D. (law degree).
          </card-text>
          <card-text :title="`Experience`">
            Extensive skill, knowledge, and experience are needed for these occupations. Many require more than five years of experience. For example, surgeons must complete four years of college and an additional five to seven years of specialized medical training to be able to do their job.
          </card-text>
          <card-text :title="`Training`">
            Employees may need some on-the-job training, but most of these occupations assume that the person will already have the required skills, knowledge, work-related experience, and/or training.
          </card-text>
        </v-col>
        <v-col cols="12" md="6">
          <card-text :title="`Examples`">
            These occupations often involve coordinating, training, supervising, or managing the activities of others to accomplish goals. Very advanced communication and organizational skills are required. Examples include pharmacists, lawyers, astronomers, biologists, clergy, neurologists, and veterinarians.
          </card-text>
          <card-text :title="`SVP Range`">
            {{ `(8.0 and above)` }}
          </card-text>
        </v-col>
      </v-row>
    </GreyBg>
  </div>
</template>

<script>
import GreyBg from '~/components/grey-bg.vue'

export default {
  name: 'ZoneFiveTabVue',
  components: { GreyBg }
}
</script>
