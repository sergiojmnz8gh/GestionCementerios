import { AbstractControl, ValidationErrors } from "@angular/forms";

export class validadores {
/*
    VALIDADORES
        DNI
        FECHA ES ANTERIOR
*/

    // DNI
    public static dni(control: AbstractControl): ValidationErrors | null {
    let error=true;
    if (parseInt(control.value)){
        let numero = parseInt(control.value);
        let letra = control.value[control.value.length - 1].toUpperCase();
        if (("TRWAGMYFPDXBNJZSQVHLCKE")[numero%23]==letra){
            error=false;
        }
    }
    return error ? {error: "DNI no valido"} : null;
    }

    //FECHA ES ANTERIOR
    public static fechaEsAnterior(fecha: Date){
        return (control: AbstractControl): ValidationErrors | null => {
            let error=true;
            if (control.value){
                let fechaControl = new Date(control.value);
                if (fechaControl.getTime()<fecha.getTime()){
                    error=false;
                }
            }
            return error ? {error: "La fecha debe ser anterior a la actual"} : null;
        }
    }
}