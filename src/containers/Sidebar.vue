<template>
    <div>
        <v-app-bar
                :clipped-left="$vuetify.breakpoint.lgAndUp"
                app
                color="cyan darken-4"
                src="/img/agropecuaria.jpg"
                dark
        >
            <template v-slot:img="{ props }">
                <v-img
                        v-bind="props"
                        gradient="to top right, rgba(19,84,122,.5), rgba(128,208,199,.8)"
                ></v-img>
            </template>
            <v-app-bar-nav-icon @click.stop="mini = !mini"/>
            <v-toolbar-title
                    class="ml-0"
            >
                <v-list-item>
                    <v-list-item-content>
                        <v-list-item-subtitle class="subtitle-1 font-weight-bold white--text" style="text-shadow: 2px 3px 5px #0E0653;">
                            Usuario: {{ user.nombre }}<span class="caption"> ({{ user.role }})</span>
                        </v-list-item-subtitle>

                    </v-list-item-content>
                </v-list-item>
            </v-toolbar-title>
            <v-spacer/>
            <v-btn icon>
                <v-icon>mdi-bell</v-icon>
            </v-btn>

            <v-btn icon @click.prevent="$router.push({ name: 'dependencia'})">
                <v-icon>mdi-bank</v-icon>
            </v-btn>

            <v-btn @click="logout" icon>
                <v-icon>mdi-export</v-icon>
            </v-btn>
        </v-app-bar>

        <v-navigation-drawer
                class="grey lighten-2"

                v-model="drawer"
                :clipped="$vuetify.breakpoint.lgAndUp"
                app
                fixed
                hide-overlay
                :expand-on-hover="mini"
                stateless
        >
            <v-list dense>
                <v-list-item :key="'airports'" link :to="{name: 'airports'}">
                    <v-list-item-action>
                        <v-icon> mdi-monitor-dashboard </v-icon>
                    </v-list-item-action>
                    <v-list-item-content>
                        <v-list-item-title>
                            Airports
                        </v-list-item-title>
                    </v-list-item-content>
                </v-list-item>
                <v-list-item :key="'airlines'" link :to="{name: 'airlines'}">
                    <v-list-item-action>
                        <v-icon> mdi-monitor-dashboard </v-icon>
                    </v-list-item-action>
                    <v-list-item-content>
                        <v-list-item-title>
                            Airlines
                        </v-list-item-title>
                    </v-list-item-content>
                </v-list-item>
                <v-list-item :key="'flights'" link :to="{name: 'flights'}">
                    <v-list-item-action>
                        <v-icon> mdi-monitor-dashboard </v-icon>
                    </v-list-item-action>
                    <v-list-item-content>
                        <v-list-item-title>
                            Flights
                        </v-list-item-title>
                    </v-list-item-content>
                </v-list-item>

            </v-list>
        </v-navigation-drawer>
    </div>
</template>
<script>
    export default {
        name: 'Sidebar',
        data: () => ({
            user: 'Cesar Perez',
            modulos: [{}],
            drawer: true,
            mini: false,
            items: [
                {icon: 'mdi-home', text: 'Inicio', route: 'Inicio'},
                {icon: 'mdi-contacts', text: 'Menu 2', route: 'Inicio'},
            ],
        }),
        mounted() {
            // console.log(Laravel);
        },
        computed: {

        },
        watch: {

        },
        methods: {
            menu() {

            },
            logout() {
                this.$axios.post('/api/logout',{'user':localStorage.getItem('user')}).then(() => {
                    this.$router.push({ name: "login"});
                }).catch((error) =>{
                    console.log(error);
                })
            }
        }
    }
</script>
