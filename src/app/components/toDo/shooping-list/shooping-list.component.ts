import { Component, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatAccordion } from '@angular/material/expansion';
import { MatSelectChange } from '@angular/material/select';
import { Guid } from 'guid-typescript';
import { SelectOptions } from 'src/app/model/Select-options';
import { ShoopingList } from 'src/app/model/ShoopingList';

import { DialogShoplistComponent } from './dialog-shoplist/dialog-shoplist.component';

// import { LocalStorageService } from 'src/app/services/local-storage.service';

@Component({
  selector: 'app-shooping-list',
  templateUrl: './shooping-list.component.html',
  styleUrls: ['./shooping-list.component.scss']
})
export class ShoopingListComponent implements OnInit {
  @ViewChild(MatAccordion) accordion: MatAccordion;



  formulario: FormGroup;
  shoopingList: ShoopingList[]

  get subtitlee(): FormArray {
    return this.formulario.get('subTitle') as FormArray;
  }


  constructor(
    private formBuilder: FormBuilder,
    public dialog: MatDialog
    // private localStorageService: LocalStorageService,
  ) {

  }

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogShoplistComponent, {
      width: '100%',
      // data: { name: this.name, animal: this.animal },
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed', result);
      // this.animal = result;
    });
  }


  ngOnInit(): void {
    this.formulario = this.formBuilder.group({
      Id: null,
      categoryName: null,
      products: this.formBuilder.array([this.createFormProducts()])
    })
    // this.createForm(new ShoopingList());
  }


  // createForm(shopList: ShoopingList) {
  //   this.formulario = this.formBuilder.group({
  //     Id: null,
  //     categoryName: null,
  //     products: this.formBuilder.array([this.createFormProducts()])
  //   })
  // }

  createFormProducts() {
    return this.formBuilder.group({
      productId: [""],
      productName: [""],
      productQuantity: [""],
      productSuffix: [""],

    })
  }

  addNewShopList(): void {
    try {
      this.formulario.value.shopId = Guid.create().toString();

      const shoplist: ShoopingList = this.formulario.value;
      this.shoopingList.push(shoplist);

      console.log('dados', shoplist)

      // this.localStorageService.set('activitiesToDo', JSON.stringify(this.activitiesToDo));
      // this.showActivities();

      this.formulario.reset();
    } catch (err) {
    }
  }





  subtitles: SelectOptions[] = []


  teste(evento: MatSelectChange) {
    console.log('mudei', evento.value)
    switch (evento.value) {
      case 'geladeira':
        this.subtitles = [
          { value: 'congelados', viewValue: 'Congelados' },
          { value: 'açougue', viewValue: 'Açougue' },
          { value: 'peixaria', viewValue: 'Peixaria' },
          { value: 'diversos', viewValue: 'Diversos' },
        ]
        // this.subtitles.push(
        //   { value: 'congelados', viewValue: 'Congelados' },
        //   { value: 'açougue', viewValue: 'Açougue' },
        //   { value: 'peixaria', viewValue: 'Peixaria' },
        //   { value: 'diversos', viewValue: 'Diversos' },
        // )
        break
      case 'dispensa':
        this.subtitles = [
          { value: 'temperos', viewValue: 'Temperos' },
          { value: 'diversos', viewValue: 'Diversos' },
        ]
        break
      default:
        this.subtitles = [
          { value: 'diversos', viewValue: 'Diversos' },
        ]
        break
    }
  }

}
