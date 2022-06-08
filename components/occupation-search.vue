<template>
  <div class="occupation-search-input-container">
    <v-text-field v-model="searchText" label="Search Occupations" placeholder="Software Developer" outlined @input="onChangeSearch">
      <template #append>
        <v-icon v-show="loading" class="rotating">
          mdi-loading
        </v-icon>
      </template>
    </v-text-field>
  </div>
</template>

<script>
import { debounce } from 'lodash'
import { mapActions, mapMutations, mapGetters } from 'vuex'

export default {
  data () {
    return {
      searchText: ''
    }
  },
  computed: {
    ...mapGetters({
      loading: 'primary/occupationSearchLoading'
    })
  },
  methods: {
    ...mapMutations({
      setLoading: 'primary/setOccupationSearchLoading'
    }),
    ...mapActions({
      fetchOccupations: 'primary/fetchOccupations'
    }),
    async search () {
      console.log('searching')
      this.setLoading(true)
      await this.fetchOccupations({
        query: this.searchText
      })
      this.setLoading(false)
    },
    onChangeSearch: debounce(function (e) {
      console.log('running debounced func')
      this.search()
    }, 500)
  }
}
</script>

<style scoped>
@keyframes rotating {
    from {
        transform: rotate(0deg);
    }
    to {
        transform: rotate(360deg);
    }
}

.rotating {
    animation: rotating 2s linear infinite;
}
</style>
