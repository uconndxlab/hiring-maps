<template>
  <v-row>
    <v-col>
      <card-text :key="skillsKey" :title="'Most in demand skills for 2021'">
        <v-list>
          <v-list-item v-for="skill in skills" :key="skill.skill_id" :to="`skills/${skill.skill_id}`">
            {{ skill.name }}
          </v-list-item>
        </v-list>
        {{ skills }}
      </card-text>
    </v-col>
  </v-row>
</template>
<script>
import { mapGetters } from 'vuex'
import cardText from '~/components/card-text.vue'
export default {
  name: 'SkillsPage',
  components: { cardText },
  data () {
    return {
      skills: [],
      skillsKey: 0
    }
  },
  computed: {
    ...mapGetters({
      topTenJobs: 'primary/topTenJobPostings'
    })
  },
  mounted () {
    const fetchSkills = async (jobArr) => {
      const query = this.$supabase().rpc('getclosestskills', { occupationid: jobArr })
      const { data, error } = await query
      if (error) {
        console.log(error)
        return false
      }
    }
  },
  methods: {
    setSkills (skillArr) {
      this.skills = skillArr
      this.skillsKey++
    }
  }
}
</script>
