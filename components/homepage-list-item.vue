<template>
  <v-list-item :to="`${path}`">
    <v-list-item-content>
      <v-list-item-title>
        {{ textData.name }}
      </v-list-item-title>
    </v-list-item-content>
  </v-list-item>
</template>
<script>
export default {
  props: {
    listItem: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      path: '',
      textData: {}
    }
  },
  mounted () {
    this.setPath(this.listItem)
    this.setTextData(this.listItem)
  },
  methods: {
    setPath (item) {
      let type = ''
      let id = ''
      console.log(item)
      if ('occupation_id' in item) {
        type = 'occupations'
        id = item.occupation_id
      } else {
        type = 'counties'
        id = item.id
      }
      const path = `/${type}/${id}`
      this.path = path
    },
    setTextData (item) {
      console.log(item.name)
      this.textData.name = item.name
      this.textData.job_postings = item.job_postings
    }
  }
}
</script>

<style scoped>

</style>
