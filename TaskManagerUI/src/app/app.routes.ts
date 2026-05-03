import { LoginComponent } from './components/login/login';
import { TaskListComponent } from './components/task-list/task-list';
import { authGuard } from './guards/auth-guard';

export const routes = [
  { path: '', component: LoginComponent },
  { path: 'tasks', component: TaskListComponent, canActivate: [authGuard] },
  { path: 'admin', component: TaskListComponent, canActivate: [authGuard] }
];