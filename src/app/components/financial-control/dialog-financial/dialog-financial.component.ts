import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Guid } from 'guid-typescript';
// import * as moment from 'moment';
import { DialogData } from 'src/app/model/Dialog-data';
import { FinancialControl } from 'src/app/model/Financial-control';
import { SelectOptions } from 'src/app/model/Select-options';
import { LocalStorageService } from 'src/app/services/local-storage.service';

@Component({
  selector: 'app-dialog-financial',
  templateUrl: './dialog-financial.component.html',
  styleUrls: ['./dialog-financial.component.scss']
})
export class DialogFinancialComponent implements OnInit {

  formulario: FormGroup
  financialItems: FinancialControl[] = [];

  categories: SelectOptions[] = [
    { value: 'Moradia', viewValue: 'Moradia' },
    { value: 'Educação', viewValue: 'Educação' },
    { value: 'Lazer', viewValue: 'Lazer' },
    { value: 'Saúde & Beleza', viewValue: 'Saúde & Beleza' },
    { value: 'Vestuario', viewValue: 'Vestuário' },
    { value: 'Alimentacao', viewValue: 'Alimentação' },
    { value: 'Financas', viewValue: 'Finanças' },
    { value: 'Pets', viewValue: 'Pets' },
    { value: 'Outros', viewValue: 'Outros' },
  ];


  payTypes: SelectOptions[] = [
    { value: 'Débito', viewValue: 'Débito' },
    { value: 'Crédito à vista', viewValue: 'Crédito à vista' },
    { value: 'Crédito Parcelado', viewValue: 'Crédito Parcelado' },
    { value: 'Pix', viewValue: 'Pix' },
    { value: 'Ted', viewValue: 'Ted' },
    { value: 'Doc', viewValue: 'Doc' },
    { value: 'Tef', viewValue: 'Tef' },
  ];

  constructor(
    public dialogRef: MatDialogRef<DialogFinancialComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private formBuilder: FormBuilder,
    private localStorageService: LocalStorageService,
  ) { }

  ngOnInit(): void {
    this.createForm(new FinancialControl());
    this.showItems();
  }

  cancel(): void {
    this.dialogRef.close();
  }

  createForm(financial: FinancialControl) {
    this.formulario = this.formBuilder.group({
      id: [financial.id],
      date: [financial.date, [Validators.required]],
      category: [financial.category, [Validators.required]],
      value: [financial.value, [Validators.required]],
      paymentType: [financial.paymentType, [Validators.required]],
      time: [financial.time, [Validators.required]],
      place: [financial.place, [Validators.required]],
      description: [financial.description],
    })
  }

  addNewActivity(): void {
    try {
      this.formulario.value.id = Guid.create().toString();

      const items: FinancialControl = this.formulario.value;
      this.financialItems.push(items);
      this.localStorageService.set('financialControl', JSON.stringify(this.financialItems));
      this.formulario.reset();

    } catch (err) {

    }

  }

  showItems(): void {
    if (this.localStorageService.get('financialControl')) {
      this.financialItems = JSON.parse(this.localStorageService.get('financialControl'));
    } else {
      this.financialItems = [];
    }
  }

  teste(dados: any) {
    console.log('dados do form', dados)
  }

}
