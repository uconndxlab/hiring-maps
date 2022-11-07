<template>
  <div class="zone-home-tab">
    <GreyBg>
      <v-row just="center">
        <v-col>
          <card-text :title="`What are Job Zone Categories?`">
            Job Zone Categories classify different occupations by the average amount of preparation required to get the job.
            Many factors are taken into account to classify a job into these categories, including:
            <ul>
              <li>
                Education of the average individual with this occupation
              </li>
              <li>
                The amount of prior experience required
              </li>
              <li>
                The amount of training required including on-the-job and external
              </li>
            </ul>
          </card-text>
        </v-col>
      </v-row>
    </GreyBg>
  </div>
</template>

<script>
import GreyBg from '~/components/grey-bg.vue'

export default {
  name: 'ZoneHomeTabVue',
  components: { GreyBg }
}
</script>
