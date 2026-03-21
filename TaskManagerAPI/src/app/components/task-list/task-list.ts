import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TaskService } from '../../services/task';
import { Task } from '../../models/task';

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './task-list.html',
styleUrl: './task-list.css'
})
export class TaskListComponent implements OnInit {
  tasks: Task[] = [];
  showForm = false;
  editMode = false;

  newTask: Task = {
    id: 0,
    title: '',
    description: '',
    isCompleted: false,
    priority: 'Medium',
    createdAt: new Date().toISOString()
  };

  constructor(private taskService: TaskService) {}

  ngOnInit(): void {
    this.loadTasks();
  }

  loadTasks(): void {
    this.taskService.getAllTasks().subscribe(tasks => {
      this.tasks = tasks;
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
      createdAt: ''
    };
    this.showForm = false;
    this.editMode = false;
  }
}