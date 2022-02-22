import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Card } from 'src/app/model/card';
import { LocalStorageService } from 'src/app/services/local-storage.service';

@Component({
  selector: 'app-postit-saturday',
  templateUrl: './postit-saturday.component.html',
  styleUrls: ['./postit-saturday.component.scss']
})
export class PostitSaturdayComponent implements OnInit {

  public storedJson: any;
  public notesSaved: Card[] = [];

  public success: boolean
  public error: boolean
  public idCard: any
  public msgSubmit: string;
  public disabledFields: boolean;

  constructor(
    private localStorageService: LocalStorageService,
    public dialog: MatDialog
  ) {
    this.storedJson = JSON.parse(this.localStorageService.get('postit-saturday'))
    this.notesSaved = this.storedJson ? this.storedJson : [];
  }

  ngOnInit(): void {
  }

  setId() {
    const oldRecords = this.localStorageService.get('postit-saturday');
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
  //   const oldRecords = this.localStorageService.get('postit-saturday');
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
      this.localStorageService.set('postit-saturday', JSON.stringify(this.notesSaved));
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
    const oldRecords = this.localStorageService.get('postit-saturday');
    if (oldRecords !== null) {
      try {
        const cardList = JSON.parse(oldRecords);
        cardList.splice(cardList.findIndex((item: any) => item.id === cardId), 1);
        this.localStorageService.set('postit-saturday', JSON.stringify(cardList));
        this.success = true;
        this.idCard = cardId;
        this.msgSubmit = 'Excluído com Sucesso!'
        this.disabledFields = true;
        setTimeout(() => {
          this.error = false;
          this.disabledFields = false;
          this.notesSaved = JSON.parse(this.localStorageService.get('postit-saturday'));
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
