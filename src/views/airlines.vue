<template>
    <div>
        <v-row>
            <v-col cols="12">
                <v-card>
                    <v-toolbar color="#008e79" dark>
                        <v-toolbar-title style="width:30%" align="left" class="ml-3">
                            <span class="hidden-sm-and-down">AIRLINES</span>
                        </v-toolbar-title>
                        <v-text-field
                                width="70%"
                                v-model="search"
                                append-icon="mdi-magnify"
                                label="Search airline"
                                single-line
                                hide-details
                                autocomplete="off"
                                clearable
                        ></v-text-field>

                        <v-tooltip bottom>
                            <template v-slot:activator="{ on }">
                                <v-btn icon v-on="on" @click="open()">
                                    <v-icon>mdi-plus</v-icon>
                                </v-btn>
                            </template>
                            <span>New airline</span>
                        </v-tooltip>
                    </v-toolbar>

                    <v-card-text>
                        <v-data-table
                                fixed-header
                                :headers="headers"
                                :items="airlines"
                                class="elevation-1"
                                :search="search"
                                :items-per-page="10"
                        >
                            <template v-slot:[`item.action`]="{ item }">
                                <v-tooltip bottom>
                                    <template v-slot:activator="{ on }">
                                        <v-btn v-on="on" icon @click="open(item)" color="primary">
                                            <v-icon>mdi-pencil</v-icon>
                                        </v-btn>
                                    </template>
                                    <span>Edit</span>
                                </v-tooltip>

                                <v-tooltip bottom>
                                    <template v-slot:activator="{ on }">
                                        <v-btn v-on="on" icon @click="cpdelete(item)" color="red">
                                            <v-icon>mdi-delete-forever</v-icon>
                                        </v-btn>
                                    </template>
                                    <span>Remove</span>
                                </v-tooltip>
                            </template>

                            <template v-slot:no-data>
                                No records
                            </template>
                        </v-data-table>
                    </v-card-text>
                </v-card>
            </v-col>
            <v-dialog v-model="dialog" persistent max-width="600px">
                <v-card>
                    <v-toolbar color="#757575" dark>
                        <v-toolbar-title class="ml-0 pl-4">
                            <span class="hidden-sm-and-down">{{ formTitle }}</span>
                        </v-toolbar-title>

                        <v-spacer></v-spacer>
                        <v-btn icon dark @click="close()">
                            <v-icon>mdi-close</v-icon>
                        </v-btn>
                    </v-toolbar>

                    <v-card-text>
                        <v-container>
                            <v-form ref="form">
                                <v-row class="mt-5">
                                    <v-col cols="12" md="12" sm="12">
                                        <v-text-field
                                                required
                                                :rules="[rules.required]"
                                                dense
                                                v-model="editedItem.name"
                                                label="Name"
                                        ></v-text-field>
                                    </v-col>
                                    <v-col cols="6" md="6" sm="12">
                                        <v-text-field
                                                required
                                                dense
                                                :rules="[rules.required]"
                                                v-model="editedItem.code"
                                                label="Code"
                                        ></v-text-field>
                                    </v-col>
                                </v-row>
                            </v-form>
                        </v-container>
                    </v-card-text>
                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn color="#008e79" text @click="close()">Close</v-btn>
                        <v-btn color="#008e79" dark @click="save()">Save</v-btn>
                    </v-card-actions>
                </v-card>
            </v-dialog>
        </v-row>
    </div>
</template>
<script>
    import {RULES} from "../mixins/rules";
    import { mapState } from 'vuex';
    export default {
        name: 'AirlinesComponent',
        components: {
        },
        mixins: [RULES],
        data: ()=> ({
            search: '',
            dialog: false,
            editedIndex: -1,
            editedItem: {
                id: null,
                name: null,
                code: null,
                city: null,
            },
            defaultItem: {
                id: null,
                name: null,
                code: null,
                city: null,
            },
            headers: [
                { text: '#', value: 'id', align: 'left'  },
                { text: 'NAME', value: 'name', align: 'left'  },
                { text: 'CODE', value: 'code', align: 'center' },
                { text: 'ACTIONS', value: 'action', sortable: false },
            ],
        }),
        beforeMount(){
            this.$store.dispatch('getAirlines');
        },
        computed:{
            formTitle() {
                return this.editedIndex === -1 ? 'New Airline' : 'Edit Airline'
            },
            ...mapState({
                airlines: state => state.airlines,
            }),
        },
        methods: {

            open(item = null){
                this.editedIndex = -1;
                if(item != null){
                    this.editedIndex = 0;
                    this.editedItem = Object.assign({}, item);
                }
                this.dialog = true;
            },
            close(){
                this.editedItem = Object.assign({},this.defaultItem);
                this.dialog = false;
            },
            save(){
                if(this.$refs.form.validate()){
                    if(this.editedItem.id>0){
                        this.$axios.put('/api/airlines/'+this.editedItem.id,this.editedItem).then(response => {
                            if(response.status==200){

                                if(response.data.success){
                                    this.$swal('Record : '+this.editedItem.name+' edited successfully.');
                                    this.close();
                                }else{
                                    this.$swal.fire({
                                        icon: 'error',
                                        title: 'Oops...',
                                        text: response.data.msg,
                                    })
                                }
                                this.$store.dispatch('getAirlines');
                            }
                        }).catch(error => {
                            this.$swal.fire({
                                icon: 'error',
                                title: 'Oops...',
                                text: error.response.data.message,
                            })
                        });

                    }else{

                        this.$axios.post('/api/airlines',this.editedItem,{
                            headers: { "Access-Control-Allow-Origin": "*" }
                        }).then(response => {
                            if(response.status==200){
                                if(response.data.success){
                                    this.$swal('Record: '+this.editedItem.name+' created successfully.');
                                    this.close();
                                }else{
                                    this.$swal.fire({
                                        icon: 'error',
                                        title: 'Oops...',
                                        text: response.data.msg,
                                    })
                                }
                                this.$store.dispatch('getAirlines');
                            }
                        }).catch(error => {
                            if(error.response.status)
                                this.$swal.fire({
                                    icon: 'error',
                                    title: 'Oops...',
                                    text: error.response.data.message,
                                })
                        });
                    }
                }

            },
            cpdelete(item){
                this.$swal({
                    title: "DO YOU WANT TO REMOVE "+item.name+"?",
                    text: "This action is irreversible.",
                    icon: "warning",
                    showCancelButton: true,
                    confirmButtonText: 'Yes, Remove!',
                    cancelButtonText: 'No, cancel!',
                })
                    .then((isConfirm) => {
                        if (isConfirm.isConfirmed) {
                            this.$axios.delete('/api/airlines/'+item.id).then(response => {
                                if(response.status==200) {
                                    this.$swal(response.data.msg);
                                    this.$store.dispatch('getAirlines');
                                }
                            });
                        }
                    });
            },
        }
    }
</script>
