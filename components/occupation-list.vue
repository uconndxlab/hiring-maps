<template>
  <div class="occupation-results">
    <div v-if="occupations.length" class="occupation-results-list-container">
      <occupation-list-item v-for="occupation in occupations" :key="`occ-${occupation.id}`" :occupation="occupation" />
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  computed: {
    ...mapGetters({
      occupations: 'primary/occupationResults'
    })
  }
}
</script>
