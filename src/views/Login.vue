<template>
    <div>
        <v-card-text>
            <v-row justify="center">
                <v-col cols="12" md="5">
                    <v-sheet
                            elevation="12"
                            class="pa-12"
                            color="rgba(255, 255, 255, 0.5)"
                    >
                        <v-form ref="formLogin">
                            <v-row>
                                <v-col cols="12" class="text-center headline">
                                    Acceder
                                </v-col>
                                <v-col cols="12">
                                    <v-text-field name="Correo" filled v-model="formLogin.email" :rules="[rules.required, rules.email]"
                                                  label="Correo"></v-text-field>
                                </v-col>
                                <v-col cols="12">
                                    <v-text-field
                                            v-model="formLogin.password"
                                            :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                                            :rules="[rules.required]"
                                            :type="showPassword ? 'text' : 'password'"
                                            label="Contraseña"
                                            @click:append="showPassword = !showPassword"
                                    ></v-text-field>
                                </v-col>
                                <v-col cols="12" class="text-center">
                                    <v-btn class="ma-2" style="width: 200px;" color="success" @click="login">INICIAR SESIÓN</v-btn>
                                </v-col>
                            </v-row>
                        </v-form>
                    </v-sheet>
                </v-col>
            </v-row>
        </v-card-text>
    </div>
</template>
<script>
    import {RULES} from "../mixins/rules";
    export default {
        mixins: [RULES],
        data: () => ({
            valid: true,
            emailRules: [
                v => !!v || 'E-mail is requerido',
                v => /.+@.+\..+/.test(v) || 'E-mail no válido',
            ],

            formLogin: {
                email: '',
                password: '',
            },
            showPassword: false,
            errors:[],
        }),
        mounted(){

        },

        methods: {
            me(){
                this.$axios.get('/api/airports').then(res =>{
                    console.log(res);
                });
            },
            validate () {
                this.$refs.form.validate()
            },
            reset () {
                this.$refs.form.reset()
            },
            resetValidation () {
                this.$refs.form.resetValidation()
            },
            login(){
                this.$axios.post('/api/login', this.formLogin).then((res) => {

                    localStorage.setItem('user',res.data.auth.id);
                    localStorage.setItem('token',res.data.token);
                    this.$axios.defaults.headers.common['Authorization'] = 'Bearer '+localStorage.getItem('token');

                    this.$router.push({ name: "airports"});
                }).catch((error) =>{
                    this.errors = error.response.data.errors;
                })
            }
        },
    }
</script>