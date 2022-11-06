<template>
  <div class="job-info-tab">
    <GreyBg>
      <v-row justify="center">
        <v-col cols="12">
          <h2>Detailed Job Information</h2>
        </v-col>
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
    })
  }
}

</script>
