
export class ActivityToDo {
    activityId: string;
    activityName: string;
    priority: string;
    isDone: boolean;
    conclusionDate: string;
}

export class ActivitiesDone {
    activityId: string;
    activityName: string;
    conclusionDate: Date;
}