
namespace Model
{
    public class TaskEntity
    {
        public int Id { get; set; }
        public required string Title { get; set; }
        public string? Content { get; set; }
        public short Priority { get; set; }
        public DateTime DueDate { get; set; }
        public DateTime CreatedAt { get; set; }
    }
}