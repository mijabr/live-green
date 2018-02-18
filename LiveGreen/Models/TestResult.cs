namespace LiveGreen.Models
{
    public class TestResult : IEntity
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string TestId { get; set; }
        public string Scenario { get; set; }
        public string Feature { get; set; }
        public string BuildResultKey { get; set; }
        public string Categories { get; set; }
        public string Message { get; set; }
        public string StackTrace { get; set; }
        public bool Success { get; set; }
        public string Duration { get; set; }
        public string Log { get; set; }
    }
}
