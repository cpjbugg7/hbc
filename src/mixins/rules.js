export const RULES = {
    data: function(){
        return {
            rules: {
                size: v => !v || v.size < 5000000 || 'El tamaño debe ser menor a 5 MB!',
                required: v => (!!v || v===0) || 'El campo es requerido',
                email: v => {
                    if((v || '').length==0){
                        return true;
                    }else{
                        return /.+@.+\..+/.test(v) || 'Correo no válido'
                    }
                },
                notCero: v => v=='0.00' || 'Ingrese un valor mayor a 0',
                mayor(number){ return v => Number.parseFloat(v)>number || 'Ingrese un valor mayor a '+number },
                menor(number){ return v => Number.parseFloat(v)<number || 'Ingrese un valor menor a '+number },
                longDigit(number){
                    return v => (v || '').length == number || 'Debe proporcionar '+number+' digitos';
                },
                min(number){
                    return v => (v || '').length >= number || 'Mínimo '+number+' caracteres';
                },
                max(number){
                    return v => (v || '').length <= number || 'Máximo: '+number+' caracteres';
                },
                notCeroMoney: v => v!="0.00" || 'Monto no válido',
                notequal(string){
                    return v => v!=string || 'Valor no válido';
                },
                match: (value) => {
                    if(value[0]!=value[1])
                        return false || 'No coincide';
                    else
                        return true;
                },
                requiredif(condition){
                    return v => (condition)?(!!v || 'Requerido'):true;
                },
            },
        }
    },
    methods: {
    }
}
