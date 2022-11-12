<template>
  <card-text :title="`Number of Job Postings by County for 2021`">
    <div>
      <ul>
        <li v-for="county in counties2021" :key="county.id">
          <homepageListItem :list-item="county" />
        </li>
      </ul>
    </div>
  </card-text>
</template>

<script>
import { mapGetters } from 'vuex'
import homepageListItem from './homepage-list-item.vue'

export default {
  components: { homepageListItem },
  data () {
    return {
      month: 'Current Month'
    }
  },
  computed: {
    ...mapGetters({
      counties2021: 'primary/counties2021'
    })
  },
  methods: {
    numberWithCommas (x) {
      return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
    }
  }
}
</script>
