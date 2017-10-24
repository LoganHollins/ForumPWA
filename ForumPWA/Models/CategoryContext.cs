using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ForumPWA.Models
{
    public class CategoryContext
    {
        public CategoryContext(Category category, IEnumerable<Topic> topics)
        {
            Category = category;
            Topics = topics;
        }

        public Category Category { get; }
        public IEnumerable<Topic> Topics { get; }
    }
}
