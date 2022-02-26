<template>
    <v-app>
        <v-overlay :value="overlay" :z-index="9999">
            <v-progress-circular indeterminate size="64"></v-progress-circular>
        </v-overlay>
        <sidebar></sidebar>
                <router-view></router-view>
        <v-footer app></v-footer>
    </v-app>
</template>

<script>
    import Sidebar from './Sidebar'
    import EventBus from '@/event-bus'
    export default {
        name: 'Full',
        data: () => ({
            bus: EventBus,
            dialog: false,
            overlay: false,
        }),
        created(){
            EventBus.$on('before-request', record => {
                console.log(record);
                this.overlay = true;
            });
            EventBus.$on('after-response', record => {
                console.log(record);

                this.overlay = false;
            });
            EventBus.$on('response-error', record => {
                this.overlay = false;
                console.log(record);

            });
        },
        components: {
            Sidebar
        }
    }
</script>
