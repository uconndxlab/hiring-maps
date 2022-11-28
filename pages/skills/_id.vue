<template>
  <div class="singe-skill-page">
    <h1>
      {{ skill.name }}
    </h1>
    <card-text :title="'Description'">
      Short description on the skill and what types of jobs may be applicable
    </card-text>
    <v-row>
      <v-col>
        <card-text :title="`Top Jobs that Require ${skill.name}`">
          <v-list-item v-for="job in relatedJobs" :key="job.occupation_id" :to="`/occupations/${job.occupation_id}`">
            {{ job.name }}
          </v-list-item>
        </card-text>
      </v-col>
      <v-col>
        <cardText :title="`Skills Related to ${skill.name}`">
          <v-list>
            <v-list-item v-for="skill in skills" :key="skill.skill_id" :to="`${skill.skill_id}`">
              {{ skill.name }}
            </v-list-item>
          </v-list>
        </cardText>
      </v-col>
    </v-row>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import cardText from '~/components/card-text.vue'

export default {
  components: { cardText },
  async asyncData ({ params, store }) {
    const skillId = params.id
    const skill = store.getters['primary/skill']
    if (!skill.id || skill.id !== skillId) {
      await store.dispatch('primary/fetchSkill', skillId)
    }
  },
  data () {
    return {
      relatedJobs: [],
      skills: [
        {
          skill_id: 2,
          name: 'Mathematical Reasoning'
        },
        {
          skill_id: 110,
          name: 'Complex Problem Solving'
        },
        {
          skill_id: 113,
          name: 'Time Management'
        },
        {
          skill_id: 117,
          name: 'Social Perceptiveness'
        }
      ]
    }
  },
  computed: {
    ...mapGetters({
      skill: 'primary/skill',
      bootstrapped: 'primary/bootstraped'
    })
  },
  mounted () {
    const fetchRelatedJobs = async (skill) => {
      const query = this.$supabase().rpc('jobsrelatedtoskill', { skillid: skill })
      const { data, error } = await query
      if (error) {
        console.log(error)
        return false
      }
      this.setRelatedJobs(data)
    }
    fetchRelatedJobs(this.skill.id)
  },
  methods: {
    setRelatedJobs (jobArr) {
      this.relatedJobs = jobArr
    }
  }
}
</script>
