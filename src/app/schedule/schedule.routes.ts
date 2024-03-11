import { Routes } from '@angular/router';
import { ScheduleComponent } from './schedule.component';

export const routes: Routes = [
  { path: '', component: ScheduleComponent },
  { path: ':column/:columnId', component: ScheduleComponent },
];
