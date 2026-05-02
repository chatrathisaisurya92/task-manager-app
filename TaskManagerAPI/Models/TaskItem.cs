using System.ComponentModel.DataAnnotations.Schema;

namespace TaskManagerAPI.Models
{
    public class TaskItem
    {
        public int Id { get; set; }
        public string Title { get; set; } = string.Empty;
        public string? Description { get; set; }
        public bool IsCompleted { get; set; } = false;
        public string Priority { get; set; } = "Medium";
        public DateTime CreatedAt { get; set; } = DateTime.Now;

        public int AssignedTo { get; set; }
        public DateTime? Deadline { get; set; }

        [ForeignKey("AssignedTo")]
        public User? AssignedUser { get; set; }   // ✅ FIXED
    }
}