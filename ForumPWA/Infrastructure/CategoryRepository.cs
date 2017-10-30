using ForumPWA.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ForumPWA.Infrastructure
{
    public class CategoryRepository : Repository<Category>
    {
        static List<Category> _categories = new List<Category>
        {
            new Category
            {
                Id = 1,
                Name = "General"
            },
            new Category
            {
                Id = 2,
                Name = "Programming",
            },
            new Category
            {
                Id = 3,
                Name = "Off-Topic"
            }
        };

        public CategoryRepository() 
            : base(_categories)
        {
        }
    }
}
