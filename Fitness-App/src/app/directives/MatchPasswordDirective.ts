import { Directive, Input } from '@angular/core';
import { NG_VALIDATORS ,ValidationErrors, Validator, FormGroup, AbstractControl} from '@angular/forms';
import Validation from './validation';

@Directive({
  selector: '[appMatchPassword]',  
  providers: [{ provide: NG_VALIDATORS, useExisting: MatchPasswordDirective, multi: true }]
})
export class MatchPasswordDirective implements Validator {

  constructor() { }

  @Input('appMatchPassword') matchPassword: string[] = [];

  validate(formGroup: FormGroup): ValidationErrors | null {
    return Validation.match(this.matchPassword[0], this.matchPassword[1])(formGroup);
  }

}
