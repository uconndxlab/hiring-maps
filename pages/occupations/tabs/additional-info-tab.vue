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
          <v-list>
            <v-list-item v-for="item in occupation.additional_information" :key="item.title" @click="navToLink(item.link)">
              <v-list-item-content>
                <v-list-item-title>
                  {{ item.title }}
                </v-list-item-title>
                <v-list-item-subtitle>
                  {{ item.link }}
                </v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
          </v-list>
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
  },
  methods: {
    navToLink (url) {
      window.open(url, '_blank')
    }
  }
}

</script>
