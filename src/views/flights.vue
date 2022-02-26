<template>
    <div>
        <v-row>
            <v-col cols="12">
                <v-card>
                    <v-toolbar color="#008e79" dark>
                        <v-toolbar-title style="width:30%" align="left" class="ml-3">
                            <span class="hidden-sm-and-down">FLIGHTS</span>
                        </v-toolbar-title>
                        <v-text-field
                                width="70%"
                                v-model="search"
                                append-icon="mdi-magnify"
                                label="Search flight"
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
                            <span>New flights</span>
                        </v-tooltip>
                    </v-toolbar>

                    <v-card-text>
                        <v-data-table
                                fixed-header
                                :headers="headers"
                                :items="flights"
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
                                    <v-col cols="5" md="5" sm="12">
                                        <v-text-field
                                                :rules="[rules.required]"
                                                required
                                                dense
                                                v-model="editedItem.code"
                                                label="Code"
                                        ></v-text-field>
                                    </v-col>
                                    <v-col cols="7" md="7" sm="12">
                                        <v-radio-group
                                                :rules="[rules.required]"
                                                v-model="editedItem.type"
                                                row
                                        >
                                            <v-radio
                                                    label="Passenger"
                                                    value="PASSENGER"
                                            ></v-radio>
                                            <v-radio
                                                    label="Freight"
                                                    value="FREIGHT"
                                            ></v-radio>
                                        </v-radio-group>
                                    </v-col>
                                    <v-col cols="6">
                                        <v-select
                                                :rules="[rules.required]"
                                                :items="airports"
                                                v-model="editedItem.departure_id"
                                                label="Departure"
                                                outlined
                                                item-text="name"
                                                item-value="id"
                                                @change="enableDestination"

                                        >
                                        </v-select>
                                    </v-col>
                                    <v-col cols="6">
                                        <v-dialog
                                                ref="refDepartureTime"
                                                v-model="dialogDepartureTime"
                                                :return-value.sync="editedItem.departure_time"
                                                persistent
                                                width="290px"
                                        >
                                            <template v-slot:activator="{ on, attrs }">
                                                <v-text-field
                                                        :rules="[rules.required]"
                                                        v-model="editedItem.departure_time"
                                                        label="Departure time"
                                                        prepend-icon="mdi-clock-time-four-outline"
                                                        readonly
                                                        v-bind="attrs"
                                                        v-on="on"
                                                ></v-text-field>
                                            </template>
                                            <v-time-picker
                                                    v-if="dialogDepartureTime"
                                                    v-model="editedItem.departure_time"
                                                    full-width
                                            >
                                                <v-spacer></v-spacer>
                                                <v-btn
                                                        text
                                                        color="primary"
                                                        @click="dialogDepartureTime = false"
                                                >
                                                    Cancel
                                                </v-btn>
                                                <v-btn
                                                        text
                                                        color="primary"
                                                        @click="$refs.refDepartureTime.save(editedItem.departure_time)"
                                                >
                                                    OK
                                                </v-btn>
                                            </v-time-picker>
                                        </v-dialog>
                                    </v-col>
                                    <v-col cols="6">
                                        <v-select
                                                :rules="[rules.required]"
                                                :items="airports"
                                                v-model="editedItem.destination_id"
                                                label="Departure"
                                                outlined
                                                item-text="name"
                                                item-value="id"

                                        ></v-select>
                                    </v-col>
                                    <v-col cols="6">
                                        <v-dialog
                                                ref="refArrivalTime"
                                                v-model="dialogArrivalTime"
                                                :return-value.sync="editedItem.arrival_time"
                                                persistent
                                                width="290px"
                                        >
                                            <template v-slot:activator="{ on, attrs }">
                                                <v-text-field
                                                        :rules="[rules.required]"
                                                        v-model="editedItem.arrival_time"
                                                        label="Destination time"
                                                        prepend-icon="mdi-clock-time-four-outline"
                                                        readonly
                                                        v-bind="attrs"
                                                        v-on="on"
                                                ></v-text-field>
                                            </template>
                                            <v-time-picker
                                                    v-if="dialogArrivalTime"
                                                    v-model="editedItem.arrival_time"
                                                    full-width
                                            >
                                                <v-spacer></v-spacer>
                                                <v-btn
                                                        text
                                                        color="primary"
                                                        @click="dialogArrivalTime = false"
                                                >
                                                    Cancel
                                                </v-btn>
                                                <v-btn
                                                        text
                                                        color="primary"
                                                        @click="$refs.refArrivalTime.save(editedItem.arrival_time)"
                                                >
                                                    OK
                                                </v-btn>
                                            </v-time-picker>
                                        </v-dialog>
                                    </v-col>
                                    <v-col cols="8">
                                        <v-select
                                                :rules="[rules.required]"
                                                :items="airlines"
                                                v-model="editedItem.airline_id"
                                                label="Airlines"
                                                outlined
                                                item-text="name"
                                                item-value="id"
                                        ></v-select>
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
        name: 'AirportsComponent',
        components: {
        },
        mixins: [RULES],
        data: ()=> ({
            search: '',
            dialog: false,
            editedIndex: -1,
            editedItem: {
                id: null,
                code: null,
                type: null,
                departure_id:null,
                departure_time:null,
                destination_id:null,
                arrival_time:null,
                airline_id:null,
            },
            defaultItem: {
                id: null,
                code: null,
                type: null,
                departure_id:null,
                departure_time:null,
                destination_id:null,
                arrival_time:null,
                airline_id:null,
            },
            headers: [
                { text: '#', value: 'id', align: 'left'  },
                { text: 'CODE', value: 'code', align: 'center' },
                { text: 'TYPE', value: 'type', align: 'left'  },
                { text: 'AIRLINE', value: 'airline.name', align: 'center' },
                { text: 'DEPARTURE', value: 'departure.name', align: 'center' },
                { text: 'DEPARTURE TIME', value: 'departure_time', align: 'center' },
                { text: 'DESTINATION', value: 'destination.name', align: 'center' },
                { text: 'ARRIVAL TIME', value: 'arrival_time', align: 'center' },
                { text: 'ACTIONS', value: 'action', sortable: false },
            ],
            dialogDepartureTime:false,
            dialogArrivalTime:false,

        }),
        beforeMount(){
            this.$store.dispatch('getAirports');
            this.$store.dispatch('getFlights');
            this.$store.dispatch('getAirlines');
        },
        computed:{
            formTitle() {
                return this.editedIndex === -1 ? 'New flight' : 'Edit flight'
            },
            ...mapState({
                flights: state => state.flights,
                airports: state => state.airports,
                airlines: state => state.airlines,
            }),
        },
        methods: {

            enableDestination(){

            },
            disableItem(item){
                return item.id == this.editedItem.departure_id;
            },
            open(item = null){
                console.log(this.airports);
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
                        this.$axios.put('/api/flights/'+this.editedItem.id,this.editedItem).then(response => {
                            if(response.status==200){
                                this.$swal('Record : '+this.editedItem.code+' edited successfully.');
                                this.$store.dispatch('getFlights');
                                this.close();
                            }
                        }).catch(error => {
                            this.$swal.fire({
                                icon: 'error',
                                title: 'Oops...',
                                text: error.response.data.message,
                            })
                        });

                    }else{
                        this.$axios.post('/api/flights',this.editedItem,{
                            headers: { "Access-Control-Allow-Origin": "*" }
                        }).then(response => {
                            if(response.status==200){
                                if(response.data.success){
                                    this.$swal('Record: '+this.editedItem.name+' created successfully.');
                                    this.$store.dispatch('getFlights');
                                    this.close();
                                }else{
                                    this.$swal.fire({
                                    icon: 'error',
                                    title: 'Oops...',
                                    text: response.data.msg,
                                })

                                }
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
                            this.$axios.delete('/api/flights/'+item.id).then(response => {
                                if(response.status==200) {
                                    this.$swal(response.data.msg);
                                    this.$store.dispatch('getFlights');
                                }
                            });
                        }
                    });
            },
        }
    }
</script>
