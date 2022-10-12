<template>
  <div class="counties-list">
    <div v-if="counties.length" class="counties-list-container">
      <CountiesListItem v-for="county in counties" :key="county.name" :county="county" />
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  computed: {
    ...mapGetters({
      counties: 'primary/counties'
    })
  }
}

</script>
