<template>
    <div>
        <v-breadcrumbs :items="items" large></v-breadcrumbs>
    </div>
</template>

<script>
export default {
    props: {
        text: {
            type: String,
            default: 'Current'
        }
    },
    computed: {
        items() {
            const i = []
            console.log(this.$router)

            if ( this.$router.currentRoute !== '/' ) {
                i.push({
                    text: 'Home',
                    disabled: false,
                    href: '/'
                })
            }

            console.log(this.$router.currentRoute)

            if ( this.$router.currentRoute.path.includes('/occupations') || this.$router.currentRoute.path.includes('/counties') ) {
                i.push({
                    text: this.text,
                    disabled: true
                })
            }

            return i
        }
    }
}
</script>