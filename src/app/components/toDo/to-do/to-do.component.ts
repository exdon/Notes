import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Guid } from 'guid-typescript';
import * as moment from 'moment';
import { ActivitiesDone, ActivityToDo } from 'src/app/model/Activity-to-do';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { DialogComponent } from 'src/app/shared/dialog/dialog.component';

@Component({
  selector: 'app-to-do',
  templateUrl: './to-do.component.html',
  styleUrls: ['./to-do.component.scss']
})
export class ToDoComponent implements OnInit {

  activitiesToDo: ActivityToDo[] = [];
  activitiesDone: ActivitiesDone[];
  formulario: FormGroup;
  panelOpenState = false;

  efeitoExcluir: boolean;

  displayedColumns: string[] = ['activityName', 'priority', 'action'];
  displayedColumnsDone: string[] = ['activityName', 'conclusionDate'];

  constructor(
    private formBuilder: FormBuilder,
    private localStorageService: LocalStorageService,
    public dialog: MatDialog
    // private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    // this.formulario = this.formBuilder.group({
    //   activityId: [null],
    //   activityName: [null],
    //   isDone: [null],
    // });

    this.createForm(new ActivityToDo());
    this.showActivities();
    this.showActivitiesDone();

    // const par = this.activatedRoute.snapshot.paramMap.get('parametro');
    // console.log(par);
  }

  createForm(activity: ActivityToDo) {
    this.formulario = this.formBuilder.group({
      activityId: [activity.activityId],
      activityName: [activity.activityName],
      priority: [activity.priority],
      isDone: [activity.isDone],
      conclusionDate: [activity.conclusionDate],
    })
  }

  addNewActivity(): void {
    try {
      this.formulario.value.activityId = Guid.create().toString();
      this.formulario.value.isDone = false;

      const activities: ActivityToDo = this.formulario.value;
      this.activitiesToDo.push(activities);

      this.localStorageService.set('activitiesToDo', JSON.stringify(this.activitiesToDo));
      this.showActivities();

      this.formulario.reset();
    } catch (err) {

    }
  }

  deleteActivity(idActivity: any): void {
    const oldRecords = this.localStorageService.get('activitiesToDo');
    if (oldRecords !== null) {
      try {
        const activityList = JSON.parse(oldRecords);
        activityList.splice(activityList.findIndex((item: any) => item.activityId === idActivity), 1);
        this.localStorageService.set('activitiesToDo', JSON.stringify(activityList));
        this.efeitoExcluir = true;
        this.showActivities();
        setTimeout(() => {
          this.efeitoExcluir = false;
        }, 1000)
      } catch (err) {
      }
    }
  }

  showActivities(): void {
    if (this.localStorageService.get('activitiesToDo')) {
      this.activitiesToDo = JSON.parse(this.localStorageService.get('activitiesToDo'));
    } else {
      this.activitiesToDo = [];
    }
  }

  concludeActivity(idActivity: any): void {
    const indice: number = this.activitiesToDo.findIndex(a => a.activityId === idActivity);

    if (this.activitiesToDo[indice].isDone) {
      this.activitiesToDo[indice].isDone = false;
    } else {
      this.activitiesToDo[indice].isDone = true;
      this.activitiesToDo[indice].conclusionDate = moment().format('DD-MM-YYYY, hh:mm a');
    }

    this.localStorageService.set('activitiesToDo', JSON.stringify(this.activitiesToDo));

    const oldRecords = this.localStorageService.get('activitiesToDo');
    const activityList = JSON.parse(oldRecords);
    const activitiesDone = activityList.filter((a: ActivityToDo) => a.isDone);

    this.localStorageService.set('activitiesDone', JSON.stringify(activitiesDone));
    this.showActivitiesDone();

    this.efeitoExcluir = true;
    this.showActivities();
    setTimeout(() => {
      this.efeitoExcluir = false;
    }, 1000)
  }

  showActivitiesDone(): void {
    if (this.localStorageService.get('activitiesDone')) {
      this.activitiesDone = JSON.parse(this.localStorageService.get('activitiesDone'));
    } else {
      this.activitiesDone = [];
    }
  }

  showTable(): boolean {
    if (this.activitiesToDo.length === 0) {
      return true
    } else {
      if (this.activitiesToDo.every(el => el.isDone)) {
        return false
      } else {
        return true
      }
    }
  }

  openDialog(title: string, idActivity: any, method: string): void {
    const bodyPattern = 'Após confirmado esta operação não poderá ser cancelada!'
    const dialogRef = this.dialog.open(DialogComponent, {
      width: '250px',
      data: { title: title, body: bodyPattern },
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        switch (method) {
          case 'delete':
            this.deleteActivity(idActivity);
            break;
          case 'conclude':
            this.concludeActivity(idActivity);
            break;
          default:
            null
        }
      }
    });
  }

}
