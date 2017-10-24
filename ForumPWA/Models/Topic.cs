using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ForumPWA.Models
{
    public class Topic : IdentityObject
    {
        public override int Id { get; set; }
        public string Title { get; set; }
        public int CategoryId { get; set; }
        public string Content { get; set; }
        public DateTime CreatedAt { get; set; }
    }
}
