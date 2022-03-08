import { Component, OnInit } from '@angular/core';
// import { FormBuilder, FormGroup } from '@angular/forms';
// import { Guid } from 'guid-typescript';
import { FinancialControl } from 'src/app/model/Financial-control';
// import * as moment from 'moment';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from 'src/app/shared/dialog/dialog.component';
import { DialogFinancialComponent } from './dialog-financial/dialog-financial.component';

@Component({
  selector: 'app-financial-control',
  templateUrl: './financial-control.component.html',
  styleUrls: ['./financial-control.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ]
})
export class FinancialControlComponent implements OnInit {

  columnsToDisplay = ['date', 'category', 'value', 'paymentType', 'time', 'place', 'actions'];
  expandedElement: FinancialControl | null;

  // formulario: FormGroup
  financialItems: FinancialControl[] = [];

  constructor(
    // private formBuilder: FormBuilder,
    private localStorageService: LocalStorageService,
    public dialog: MatDialog
  ) {

  }

  // foods = [
  //   { value: 'steak-0', viewValue: 'Steak' },
  //   { value: 'pizza-1', viewValue: 'Pizza' },
  //   { value: 'tacos-2', viewValue: 'Tacos' },
  // ];

  ngOnInit(): void {
    // this.createForm(new FinancialControl());
    this.showItems();
  }

  // createForm(financial: FinancialControl) {
  //   this.formulario = this.formBuilder.group({
  //     id: [financial.id],
  //     value: [financial.value],
  //     date: [moment(financial.date).format('DD-MM-YYYY, hh:mm a')],
  //     time: [financial.time],
  //     place: [financial.place],
  //     description: [financial.description],
  //   })
  // }

  // addNewActivity(): void {
  //   try {
  //     this.formulario.value.id = Guid.create().toString();

  //     const items: FinancialControl = this.formulario.value;
  //     this.financialItems.push(items);
  //     this.localStorageService.set('financialControl', JSON.stringify(this.financialItems));
  //     this.showItems();

  //     this.formulario.reset();
  //   } catch (err) {

  //   }

  // }

  openDialog(title: string, idItemSelected: any): void {
    const bodyPattern = 'Após confirmado esta operação não poderá ser cancelada!'
    const dialogRef = this.dialog.open(DialogComponent, {
      width: '250px',
      data: { title: title, body: bodyPattern },
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.deleteActivity(idItemSelected);
      }
    });
  }

  openDialogForm(): void {
    const dialogRef = this.dialog.open(DialogFinancialComponent, {
      width: '400px',
      // data: { name: this.name, animal: this.animal },
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed', result);
      if (result) {
        this.showItems();
      }
    });
  }

  deleteActivity(idItemSelected: any): void {
    const oldRecords = this.localStorageService.get('financialControl');
    if (oldRecords !== null) {
      try {
        const itemsList = JSON.parse(oldRecords);
        itemsList.splice(itemsList.findIndex((item: any) => item.id === idItemSelected), 1);
        this.localStorageService.set('financialControl', JSON.stringify(itemsList));
        // this.efeitoExcluir = true;
        this.showItems();
        setTimeout(() => {
          // this.efeitoExcluir = false;
        }, 1000)
      } catch (err) {
      }
    }
  }

  showItems(): void {
    if (this.localStorageService.get('financialControl')) {
      this.financialItems = JSON.parse(this.localStorageService.get('financialControl'));
    } else {
      this.financialItems = [];
    }
  }

  getTotalCost() {
    return this.financialItems.map(t => t.value).reduce((acc, value) => acc + value, 0);
  }

}
