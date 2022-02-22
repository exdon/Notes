import { Component, Input, OnInit } from '@angular/core';
import { Card } from 'src/app/model/card';
import { LocalStorageService } from 'src/app/services/local-storage.service';

@Component({
  selector: 'app-postit-card',
  templateUrl: './postit-card.component.html',
  styleUrls: ['./postit-card.component.scss']
})
export class PostitCardComponent implements OnInit {

  @Input() public weekName: string;

  public storedJson: any;
  public notesSaved: Card[] = [];

  public postitSavedmonday: Card[] = [];
  public postitSavedtuesday: Card[] = [];
  public postitSavedwednesday: Card[] = [];
  public postitSavedthursday: Card[] = [];
  public postitSavedfriday: Card[] = [];
  public postitSavedsaturday: Card[] = [];
  public postitSavedsunday: Card[] = [];


  public success: boolean
  public error: boolean
  public idCard: any
  public msgSubmit: string;
  public disabledFields: boolean;

  constructor(
    private localStorageService: LocalStorageService,
  ) {
    this.storedJson = JSON.parse(this.localStorageService.get(`postit-${this.weekName}`))
    this.notesSaved = this.storedJson ? this.storedJson : [];
  }

  ngOnInit(): void {
    console.log('weekname', this.weekName);
  }

  setId() {
    const oldRecords = this.localStorageService.get(`postit-${this.weekName}`);
    const randomNumber = Math.floor(Math.random() * 100);
    if (oldRecords !== null) {
      const cardIds: any = [];
      const cardList = JSON.parse(oldRecords);
      cardList.forEach((dado: Card) => { cardIds.push(dado.id) })
      for (let i = 0; i < cardIds.length; i++) {
        if (cardIds[i] !== randomNumber) {
          return randomNumber
        } else {
          return randomNumber + cardList.length + 1
        }
      }
    } else {
      return randomNumber;
    }
  }

  // getNewCardId() {
  //   const oldRecords = this.localStorageService.get("notes");
  //   if (oldRecords !== null) {
  //     const cardList = JSON.parse(oldRecords);
  //     return cardList.length + 1;
  //   } else {
  //     return 1;
  //   }
  // }

  addMarkdown() {
    const latestId = this.setId();
    this.notesSaved.unshift({ id: latestId, title: '', bodyComments: '' });
  }

  saveMarkdown(cardId: any) {
    try {
      this.localStorageService.set(`postit-${this.weekName}`, JSON.stringify(this.notesSaved));
      this.success = true;
      this.idCard = cardId;
      this.msgSubmit = 'Salvo com Sucesso!'
      this.disabledFields = true;
      setTimeout(() => {
        this.success = false;
        this.disabledFields = false;
      }, 5000)
    } catch (err) {
      this.error = true;
      this.idCard = cardId
      this.msgSubmit = 'Erro ao Salvar os Dados!'
      this.disabledFields = true;
      setTimeout(() => {
        this.error = false;
        this.disabledFields = false;
      }, 5000)
    }
  }

  deleteMarkdown(cardId: any) {
    const oldRecords = this.localStorageService.get(`postit-${this.weekName}`);
    if (oldRecords !== null) {
      try {
        const cardList = JSON.parse(oldRecords);
        cardList.splice(cardList.findIndex((item: any) => item.id === cardId), 1);
        this.localStorageService.set(`postit-${this.weekName}`, JSON.stringify(cardList));
        this.success = true;
        this.idCard = cardId;
        this.msgSubmit = 'Excluído com Sucesso!'
        this.disabledFields = true;
        setTimeout(() => {
          this.error = false;
          this.disabledFields = false;
          this.notesSaved = JSON.parse(this.localStorageService.get(`postit-${this.weekName}`));
        }, 5000)
      } catch (err) {
        this.error = true;
        this.idCard = cardId
        this.msgSubmit = 'Erro ao Excluir os Dados!'
        this.disabledFields = true;
        setTimeout(() => {
          this.error = false;
          this.disabledFields = false;
        }, 5000)
      }
    }
  }

}
