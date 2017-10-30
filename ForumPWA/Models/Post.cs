using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ForumPWA.Models
{
    public class Post : IdentityObject
    {
        public User Author { get; set; }
        public int TopicId { get; set; }
        public string Content { get; set; }
        public DateTime CreatedAt { get; set; }
    }
}
