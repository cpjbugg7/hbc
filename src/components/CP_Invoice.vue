<template>
<div>
    <v-dialog v-model="dialog" persistent max-width="500">
        <v-card>
            <v-toolbar color="#757575" dark>
                <v-toolbar-title class="ml-0 pl-4">
                    <span>Factura del vendedor</span>
                </v-toolbar-title>

                <v-spacer></v-spacer>
                <v-btn icon dark @click="dialog=false">
                    <v-icon>mdi-close</v-icon>
                </v-btn>
            </v-toolbar>

            <v-card-text>
                <v-container align="left" class="text-left">
                    <div class="text-h5">Datos del vendedor</div>
                    <template v-if="dinvoice.vendedor!=null">
                        <p><span class="black--text">Identificador</span>: #{{dinvoice.vendedor.id}}</p>
                        <p><span class="black--text">Nombre</span>: {{dinvoice.vendedor.name}}</p>
                        <p><span class="black--text">Puntos acumulados</span>: {{dinvoice.vendedor.observations}}</p>
                    </template>

                    <div class="text-h5">Datos de la factura</div>
                    <template v-if="dinvoice.invoice!=null">
                        <p><span class="black--text">Fecha y hora</span>: {{dinvoice.invoice.datetime}}</p>
                        <p><span class="black--text">Cliente</span>: {{dinvoice.invoice.client.name}}</p>
                        <p><span class="black--text">Total</span>: {{dinvoice.invoice.total}}</p>
                        <p><span class="black--text">Método de pago</span>: {{dinvoice.invoice.paymentMethod}}</p>
                        <p><span class="black--text">Productos/Servicios</span>:</p>
                        <v-list-item
                                v-for="item in  dinvoice.invoice.items"
                                :key="item.id"
                        >
                            <v-list-item-content>
                                <v-list-item-title>{{item.name}}</v-list-item-title>
                                <v-list-item-subtitle>
                                    <span class="black--text">Precio</span>:{{item.price}}<br>
                                    <span class="black--text">Clave producto</span>:{{item.productKey}}<br>
                                    <span class="black--text">Cantidad</span>:{{item.quantity}}
                                </v-list-item-subtitle>
                            </v-list-item-content>
                        </v-list-item>
                    </template>
                </v-container>
            </v-card-text>
                <v-divider></v-divider>
            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="#008e79" @click="dialog=false" text>Cerrar</v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</div>
</template>
<script>
    import { mapState } from 'vuex';
    export default {
        name: 'invoice',
        data: () => ({
            dialog: false,
        }),
        computed: {
            ...mapState({
                dinvoice: state => state.dinvoice,
            }),
        },
    }
</script>