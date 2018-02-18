using System;

namespace LiveGreen.Models
{
    public class TestFeature : IEntity
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string BuildResultKey { get; set; }
        public int TestCount { get; set; }
        public int TestPassCount { get; set; }
        public DateTime RunDate { get; set; }
        public string Duration { get; set; }
    }
}
