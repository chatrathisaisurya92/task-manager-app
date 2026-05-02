export interface Task {
  id: number;
  title: string;
  description: string;
  isCompleted: boolean;
  priority: string;
  createdAt: string;
  assignedTo: number;
  deadline: string;

  assignedUser?: {   // ✅ make it OPTIONAL
    id: number;
    username: string;
    role: string;
  };
}