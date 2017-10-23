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
        }

        CategoryRepository Repository { get; set; }

        [HttpGet()]
        public IActionResult Index() =>
            View(Repository.All);

        [HttpGet("show/{id}")]
        public IActionResult Show(int id) =>
            View(Repository.Get(id));
    }
}
