using ForumPWA.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ForumPWA.Infrastructure
{
    public class CategoryRepository
    {
        IEnumerable<Category> _categories = new List<Category>
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

        public List<Category> All => _categories.ToList();
        public Category Get(int id) => All.Where(c => c.Id == id).FirstOrDefault();

        public void Add(Category category) => _categories = All.Append(category);
        public void Delete(int id) => All.RemoveAll(c => c.Id == id);
    }
}
