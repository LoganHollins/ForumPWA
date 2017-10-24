using ForumPWA.Infrastructure;
using ForumPWA.Models;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ForumPWA.Controllers
{
    public class CategoryController : Controller
    {
        public CategoryController()
        {
            Repository = new CategoryRepository();
            TopicRepository = new TopicRepository();
        }

        CategoryRepository Repository { get; set; }
        TopicRepository TopicRepository { get; }

        [HttpGet("categories")]
        public IActionResult Index() =>
            View(Repository.Items);

        [HttpGet("categories/{id}")]
        public IActionResult Show(int id) =>
            View(new CategoryContext(Repository.Get(id), TopicRepository.GetByCategoryId(id)));
    }
}
