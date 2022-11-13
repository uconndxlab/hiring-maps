<template>
  <div class="additional-info-tab">
    <GreyBg>
      <v-row justify="center">
        <v-col cols="12">
          <h2>Additional Information</h2>
        </v-col>
      </v-row>
      <v-row justify="center">
        <v-col cols="12">
          <related-jobs-list-card v-if="related.length" :title="`Explore related occupations and industries`" :related="related" />
          <link-list-card
            v-if="occupation.additional_information.length"
            :title="`External links for more information about the field`"
            :items="occupation.additional_information"
          />
        </v-col>
      </v-row>
    </GreyBg>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import GreyBg from '../../../components/grey-bg.vue'

export default {
  name: 'AdditionalInfoTabVue',
  components: { GreyBg },
  async asyncData ({ store }) {
    const occupation = store.getters['primary/occupation']
    await store.dispatch('primary/fetchRelatedOccupations', occupation.related_occupations)
  },
  computed: {
    ...mapGetters({
      occupation: 'primary/occupation',
      related: 'primary/relatedOccupations'
    })
  },
  methods: {
    navToLink (url) {
      window.open(url, '_blank')
    }
  }
}

</script>
