using ForumPWA.Infrastructure;
using ForumPWA.Models;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ForumPWA.Controllers
{
    [Route("[controller]")]
    public class CategoryController : Controller
    {
        public CategoryController(TopicRepository topicRepository, CategoryRepository categoryRepository)
        {
            TopicRepository = topicRepository;
            CategoryRepository = categoryRepository;
        }

        TopicRepository TopicRepository { get; }
        public CategoryRepository CategoryRepository { get; }

        [HttpGet("categories")]
        public IActionResult Index() =>
            View(CategoryRepository.Items);

        [HttpGet("categories/{id}")]
        public IActionResult Show(int id) =>
            View(new CategoryContext(CategoryRepository.Get(id), TopicRepository.GetByCategoryId(id)));
    }
}
