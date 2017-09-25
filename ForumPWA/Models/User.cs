using System;

namespace ForumPWA.Models
{
    public class User
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string AboutMe { get; set; }
        public DateTime CreatedAt { get; set; }
    }
}