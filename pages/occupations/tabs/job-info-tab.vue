<template>
  <div class="job-info-tab">
    <GreyBg>
      <v-row justify="start">
        <h2 class="pr-4">
          Detailed Job Information
        </h2>
        <job-zone-chip v-if="occupation.job_zone_category" :title="occupation.job_zone_category" :color="computeChipColor" />
      </v-row>
      <v-row justify="center">
        <v-col cols="12" md="6">
          <job-info-list-card v-if="occupation.detailed_work_activities.length" :title="`Detailed Work Activities`" :items="occupation.detailed_work_activities" />
          <card-text :title="`Related Skills for ${occupation.title}`">
            <v-list-item v-for="skill in relatedSkills" :key="skill.skill_id" :to="`/skills/${skill.skill_id}`">
              {{ skill.name }}
            </v-list-item>
          </card-text>
        </v-col>
        <v-col cols="12" md="6">
          <job-info-list-card v-if="occupation.technology_skills.length" :title="`Technology Skills`" :items="occupation.technology_skills" />
          <job-info-list-card v-if="occupation.tasks.length" :title="`Common Tasks`" :items="occupation.tasks" />
        </v-col>
      </v-row>
    </GreyBg>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'JobInfoTabVue',
  data () {
    return {
      relatedSkills: []
    }
  },
  computed: {
    ...mapGetters({
      occupation: 'primary/occupation'
    }),
    computeChipColor () {
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
  },
  mounted () {
    const fetchRelatedSkills = async (occupationId) => {
      const query = this.$supabase().rpc('getclosestskills', { occupationid: occupationId })
      const { data, error } = await query
      if (error) {
        console.log(error)
        return false
      }
      this.setRelatedSkills(data)
    }
    const occupationId = [this.occupation.id]
    fetchRelatedSkills(occupationId)
  },
  methods: {
    setRelatedSkills (skills) {
      this.relatedSkills = skills
    }
  }
}

</script>
