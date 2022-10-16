<template>
  <v-card>
    <div>
      <ul>
        <li>
          test
        </li>
      </ul>
    </div>
  </v-card>
</template>

<script>
import { useStore } from 'vuex'
import { computed } from 'vue'

export default {
  setup () {
    const store = useStore()

    return {
      topTenJobs: computed(() => store.getters.topTenJobPostings)
    }
  }
}

</script>
