<template>
  <div class="job-info-tab">
    <GreyBg>
      <v-row class="mb-4 ml-4">
        <h2>Detailed Job Information</h2>
        <job-zone-chip v-if="occupation.job_zone_category.length" class="pl-8 pt-1" :title="occupation.job_zone_category" :color="computeChipColor" />
      </v-row>
      <v-row justify="center">
        <v-col cols="12" md="6">
          <job-info-list-card :title="`Detailed Work Activities`" :items="occupation.detailed_work_activities" />
          <job-info-list-card :title="`Tools Used`" :items="occupation.tools_used" />
        </v-col>
        <v-col cols="12" md="6">
          <job-info-list-card :title="`Technology Skills`" :items="occupation.technology_skills" />
          <job-info-list-card :title="`Common Tasks`" :items="occupation.tasks" />
        </v-col>
      </v-row>
    </GreyBg>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'JobInfoTabVue',
  computed: {
    ...mapGetters({
      occupation: 'primary/occupation'
    }),
    computeChipColor () {
      console.log(this.occupation.job_zone_category)
      if (this.occupation.job_zone_category === 'Job Zone One: Little or No Preparation Needed') {
        return '#176B13'
      } else if (this.occupation.job_zone_category === 'Job Zone Two: Some Preparation Needed') {
        return '#FFE733'
      } else if (this.occupation.job_zone_category === 'Job Zone Three: Medium Preparation Needed') {
        return '#FFAA1C'
      } else if (this.occupation.job_zone_category === 'Job Zone Four: Considerable Preparation Needed') {
        return '#FF8C01'
      } else if (this.occupation.job_zone_category === 'Job Zone Five: Extensive Preparation Needed') {
        return '#E62836'
      }
      return ''
    }
  }
}

</script>
