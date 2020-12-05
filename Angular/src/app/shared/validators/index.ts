import { AbstractControl, ValidationErrors } from '@angular/forms';

export function passwordMatch(target: AbstractControl): ValidationErrors {
    return function rePasswordValidator(
        control: AbstractControl
    ): ValidationErrors | null {
        const match = target.value === control.value;
        return match ? null : { rePasswordValidator: true };
    };
}
