import { AfterViewInit, Component, ElementRef, OnInit, ViewChildren } from '@angular/core';
import { FormBuilder, FormControlName, FormGroup, Validators } from '@angular/forms';
import { fromEvent, merge, Observable } from 'rxjs';
import { Usuario } from 'src/app/model/usuario';
import { DisplayMessage, GenericValidator, ValidationMessages } from 'src/app/shared/genericValidator';

@Component({
  selector: 'app-form-validation',
  templateUrl: './form-validation.component.html',
  styleUrls: ['./form-validation.component.scss']
})
export class FormValidationComponent implements OnInit, AfterViewInit {

  @ViewChildren(FormControlName, { read: ElementRef }) formInputElements: ElementRef[];


  cadastroForm: FormGroup;
  usuario: Usuario;
  formResult: string = '';

  genericValidator: GenericValidator;
  validationMessages: ValidationMessages;
  displayMessage: DisplayMessage = {};

  constructor(private _fb: FormBuilder) {

    this.validationMessages = {
      nome: {
        required: 'O Nome é requerido',
        minlength: 'O Nome precisa ter no mínimo 2 caracteres',
        maxlength: 'O Nome precisa ter no máximo 150 caracteres'
      }
    }

    this.genericValidator = new GenericValidator(this.validationMessages);

  }

  ngAfterViewInit(): void {
    //chamado no momento que o Html já está disponivel para o navegador

    let controlBlurs: Observable<any>[] = this.formInputElements
      .map((formControl: ElementRef) => fromEvent(formControl.nativeElement, 'blur'));
    debugger;
    merge(...controlBlurs).subscribe(() => {
      this.displayMessage = this.genericValidator.processarMensagens(this.cadastroForm);
    })

  }

  ngOnInit() {

    this.cadastroForm = this._fb.group({
      nome: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(150)]],

    });

  }

  adicionarUsuario() {
    if (this.cadastroForm.dirty && this.cadastroForm.valid) {
      this.usuario = Object.assign({}, this.usuario, this.cadastroForm.value);
      this.formResult = JSON.stringify(this.cadastroForm.value);
    }
    else {
      this.formResult = "Não submeteu!!!"
    }
  }

}
