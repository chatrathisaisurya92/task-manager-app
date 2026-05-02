import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TaskService } from '../../services/task';
import { Task } from '../../models/task';
import { MatButtonModule } from '@angular/material/button';
import { UserService, User } from '../../services/user.service';
@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [CommonModule, FormsModule,MatButtonModule],
  templateUrl: './task-list.html',
  styleUrls: ['./task-list.css']
})
export class TaskListComponent implements OnInit {
  tasks: Task[] = [];
  users: User[] = [];
  showForm = false;
  editMode = false;

  newTask: Task = {
  id: 0,
  title: '',
  description: '',
  isCompleted: false,
  priority: 'Medium',
  createdAt: new Date().toISOString(),
  assignedTo: 0,         // ✅ ADD
  deadline: '',          // ✅ ADD
  assignedUser: {        // ✅ ADD
    id: 0,
    username: '',
    role: ''
  }
};

  constructor(
    private taskService: TaskService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.loadTasks();
    this.loadUsers();
  }

  loadTasks(): void {
    this.taskService.getAllTasks().subscribe(tasks => {
      this.tasks = tasks;
    });
  }
loadUsers(): void {
  this.userService.getUsers().subscribe(data => {
    this.users = data;
  });
}
  saveTask(): void {
    if (this.editMode) {
      this.taskService.updateTask(this.newTask.id, this.newTask).subscribe(() => {
        this.loadTasks();
        this.resetForm();
      });
    } else {
      this.taskService.createTask(this.newTask).subscribe(() => {
        this.loadTasks();
        this.resetForm();
      });
    }
  }

  editTask(task: Task): void {
    this.newTask = { ...task };
    this.editMode = true;
    this.showForm = true;
  }

  deleteTask(id: number): void {
    this.taskService.deleteTask(id).subscribe(() => {
      this.loadTasks();
    });
  }

  toggleComplete(task: Task): void {
    task.isCompleted = !task.isCompleted;
    this.taskService.updateTask(task.id, task).subscribe();
  }

 resetForm(): void {
  this.newTask = {
    id: 0,
    title: '',
    description: '',
    isCompleted: false,
    priority: 'Medium',
    createdAt: new Date().toISOString(),
    assignedTo: 0,
    deadline: '',
    assignedUser: {
      id: 0,
      username: '',
      role: ''
    }
  };
  this.showForm = false;
  this.editMode = false;
}
}
