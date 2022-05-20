import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { PaymentsService } from 'src/app/services/payments.service';

@Component({
  selector: 'app-consultar-pagos',
  templateUrl: './consultar-pagos.page.html',
  styleUrls: ['./consultar-pagos.page.scss'],
})
export class ConsultarPagosPage implements OnInit {

  myForm: FormGroup = this.fb.group({
    nis: ['', [Validators.required, Validators.minLength(7), Validators.maxLength(7)]],
    clientIdType: ['', [Validators.required]],
    clientId: ['', [Validators.required, Validators.minLength(9), Validators.maxLength(9)]]
  });

  constructor(
    private fb: FormBuilder,
    private readonly _paymentService: PaymentsService,
    private router: Router
  ) { }

  ngOnInit() {
  }

  isNumberKey(evt:KeyboardEvent) {
    var charCode = (evt.which) ? evt.which : evt.keyCode
    if (charCode > 31 && (charCode < 48 || charCode > 57))
        return false;
    return true;
  }

  validField(id:string){
    if(this.myForm.get(id)?.touched){
      return (this.myForm.get(id)?.valid)?'is-valid':'is-invalid';
    }
    return '';
  }

  async getCollectionPayments(){
    let nis = this.myForm.get('nis')?.value;
    let clientIdType = this.myForm.get('clientIdType')?.value;
    let clientId = this.myForm.get('clientId')?.value;
    
    let res = (await this._paymentService.getPayments(nis, clientIdType, clientId).toPromise());
    if(res?.success){
      this.router.navigate(['/consultar-pagos/detalles', nis, clientIdType, clientId]);
    }
    else{
      //this.toastr.info("El cliente no tiene pagos realizados", `NIS ${nis}`)
    }
  }


}