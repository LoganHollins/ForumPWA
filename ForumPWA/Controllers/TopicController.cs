using ForumPWA.Infrastructure;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ForumPWA.Controllers
{
    [Route("[controller]")]
    public class TopicController : Controller
    {
        public TopicController()
        {
            Repository = new TopicRepository();
        }

        TopicRepository Repository { get; set; }

        [HttpGet]
        public IActionResult Index(int categoryId) =>
            View(Repository.Items);

        [HttpGet("show/{id}")]
        public IActionResult Show(int id) =>
            View(Repository.Get(id));
    }
}
