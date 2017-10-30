using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ForumPWA.Models
{
    public class Category : IdentityObject
    {
        public User Author { get; set; }
        public string Name { get; set; }
    }
}
