import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { identity } from 'rxjs';
import { CustomResponse } from 'src/app/models/custom-response.model';
import { BillsService } from 'src/app/services/bills.service';

@Component({
  selector: 'app-consultar-facturacion',
  templateUrl: './consultar-facturacion.component.html',
  styleUrls: ['./consultar-facturacion.component.css']
})
export class ConsultarFacturacionComponent implements OnInit {

  constructor(
    private fb: FormBuilder,
    private readonly _billService: BillsService,
    private router: Router
    ) { }

  ngOnInit(): void {
  }

  myForm: FormGroup = this.fb.group({
    nis: ['', [Validators.required, Validators.minLength(7), Validators.maxLength(7)]],
    clientIdType: ['', [Validators.required]],
    clientId: ['', [Validators.required, Validators.minLength(9), Validators.maxLength(9)]]
  });

  isNumberKey(evt:KeyboardEvent) {
    var charCode = (evt.which) ? evt.which : evt.keyCode
    if (charCode > 31 && (charCode < 48 || charCode > 57))
        return false;
    return true;
    
  }

  async getCollectionBill(){
    let nis = this.myForm.get('nis')?.value;
    let clientIdType = this.myForm.get('clientIdType')?.value;
    let clientId = this.myForm.get('clientId')?.value;
    let bill = (await this._billService.getCollectionBill(nis, clientIdType, clientId).toPromise());
    console.log(bill)
    if(bill!.success==true){
      console.log(bill?.data)
      this._billService.set_sharingBill(bill?.data);
      this.router.navigate(['/detalles-facturacion'])
    }
    else{
      console.log(bill?.message)
    }
  }

}
