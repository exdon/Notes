import { Component, Inject, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Guid } from 'guid-typescript';
import { map, Observable, startWith } from 'rxjs';
import { DialogData } from 'src/app/model/Dialog-data';
import { SelectOptions } from 'src/app/model/Select-options';
import { ShoopingList } from 'src/app/model/ShoopingList';

export interface State {
  flag: string;
  name: string;
  population: string;
}

@Component({
  selector: 'app-dialog-shoplist',
  templateUrl: './dialog-shoplist.component.html',
  styleUrls: ['./dialog-shoplist.component.scss']
})
export class DialogShoplistComponent implements OnInit {

  listName: string;
  categoryName: string
  productsItems: string[]

  formulario: FormGroup;
  shoopingList: ShoopingList[]

  get categories(): FormArray {
    return this.formulario.get('categories') as FormArray;
  }

  get products(): FormArray {
    return this.formulario.get('products') as FormArray;
  }

  stateCtrl = new FormControl();
  filteredStates: Observable<State[]>;
  toppings = new FormControl();
  toppingList: string[] = ['Extra cheese', 'Mushroom', 'Onion', 'Pepperoni', 'Sausage', 'Tomato'];

  states: State[] = [
    {
      name: 'Arkansas',
      population: '2.978M',
      // https://commons.wikimedia.org/wiki/File:Flag_of_Arkansas.svg
      flag: 'https://upload.wikimedia.org/wikipedia/commons/9/9d/Flag_of_Arkansas.svg',
    },
    {
      name: 'California',
      population: '39.14M',
      // https://commons.wikimedia.org/wiki/File:Flag_of_California.svg
      flag: 'https://upload.wikimedia.org/wikipedia/commons/0/01/Flag_of_California.svg',
    },
    {
      name: 'Florida',
      population: '20.27M',
      // https://commons.wikimedia.org/wiki/File:Flag_of_Florida.svg
      flag: 'https://upload.wikimedia.org/wikipedia/commons/f/f7/Flag_of_Florida.svg',
    },
    {
      name: 'Texas',
      population: '27.47M',
      // https://commons.wikimedia.org/wiki/File:Flag_of_Texas.svg
      flag: 'https://upload.wikimedia.org/wikipedia/commons/f/f7/Flag_of_Texas.svg',
    },
  ];

  constructor(
    private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<DialogShoplistComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
  ) {
    this.filteredStates = this.stateCtrl.valueChanges.pipe(
      startWith(''),
      map(state => (state ? this._filterStates(state) : this.states.slice())),
    );
  }

  private _filterStates(value: string): State[] {
    const filterValue = value.toLowerCase();

    return this.states.filter(state => state.name.toLowerCase().includes(filterValue));
  }

  ngOnInit(): void {
    this.shoopingList.push(new ShoopingList());
    this.formulario = this.formBuilder.group({
      Id: null,
      listName: null,
      categories: this.formBuilder.array([this.createFormCategories()])
    })
  }

  createFormCategories() {
    return this.formBuilder.group({
      categoryid: [""],
      categoryName: [""],
      products: this.formBuilder.array([this.createFormProducts()])
    })
  }

  createFormProducts() {
    return this.formBuilder.group({
      productId: [''],
      productName: [''],
      productQuantity: [''],
      productUnit: [''],
      producPrice: [''],
      producPicture: [''],
      producNote: [''],
    })
  }

  addCategories() {
    this.categories.push(this.createFormCategories());
  }

  addProducts() {
    this.products.push(this.createFormProducts());
  }

  categoriesSelect: SelectOptions[] = [
    { value: 'geladeira', viewValue: 'Geladeira' },
    { value: 'dispensa', viewValue: 'Dispensa' },
    { value: 'hp', viewValue: 'Higiene Pessoal' },
    { value: 'limpeza', viewValue: 'Limpeza' },
    { value: 'fv', viewValue: 'Frutas e Legumes' },
    { value: 'padaria', viewValue: 'Padaria' },
    { value: 'bebidas', viewValue: 'Bebidas' },
    { value: 'outros', viewValue: 'Outros' },
  ];

  unit: any = [
    { value: 'litro', viewValue: 'L' },
    { value: 'caixa', viewValue: 'cx' },
    { value: 'mililitro', viewValue: 'ml' },
    { value: 'gramas', viewValue: 'g' },
    { value: 'kilogramas', viewValue: 'kg' },
  ];

  cancel(): void {
    this.dialogRef.close();
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

}
