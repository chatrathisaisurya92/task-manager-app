import { Routes } from '@angular/router';
import { TaskListComponent } from './components/task-list/task-list';

export const routes: Routes = [
  {
    path: '',
    component: TaskListComponent   // ✅ FIXED
  }
];