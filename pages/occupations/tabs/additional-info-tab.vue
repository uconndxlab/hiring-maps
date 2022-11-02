<template>
  <div class="additional-info-tab">
    <GreyBg>
      <v-row justify="center">
        <v-col cols="12">
          <card-text :title="`Additional Information`">
            {{ occupation.additional_information }}
          </card-text>
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
  computed: {
    ...mapGetters({
      occupation: 'primary/occupation'
    })
  }
}

</script>
