<template>
  <div class="occupation-results">
    <div v-if="occupations.length" class="occupation-results-list-container">
      <v-pagination v-model="page" class="mb-4" :length="pageSize" circle />
      <occupation-list-item v-for="occupation in occupations" :key="`occ-${occupation.id}`" :occupation="occupation" />
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  data () {
    return {
      page: 1,
      pageSize: 20
    }
  },
  computed: {
    ...mapGetters({
      occupations: 'primary/occupationResults'
    })
  }
}
</script>
