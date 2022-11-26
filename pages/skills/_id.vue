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
          <HomepageListItem v-for="job in topTenJobs" :key="job.name" :list-item="job" />
        </card-text>
      </v-col>
      <v-col>
        <cardText :title="`Skills Related to ${skill.name}`">
          <v-list>
            <v-list-item v-for="skill in skills" :key="skill.id" :to="`${skill.id}`">
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
      skills: [{
        id: 106,
        name: 'Critical Thinking'
      },
      {
        id: 113,
        name: 'Time Management'
      },
      {
        id: 73,
        name: 'Mathematics',
        related_jobs: []
      },
      {
        id: 131,
        name: 'Programming',
        related_jobs: []
      },
      {
        id: 124,
        name: 'Management of Financial Resources',
        related_jobs: []
      }]
    }
  },
  computed: {
    ...mapGetters({
      skill: 'primary/skill',
      bootstrapped: 'primary/bootstraped',
      topTenJobs: 'primary/topTenJobPostings'
    })
  },
  mounted () {
  },
  methods: {
  }
}
</script>
