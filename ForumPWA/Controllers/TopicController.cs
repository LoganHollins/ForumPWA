using ForumPWA.Infrastructure;
using ForumPWA.Models;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebPush;

namespace ForumPWA.Controllers
{
    [Route("[controller]")]
    public class TopicController : Controller
    {
        public TopicController(SubscriptionRepository subRepository, TopicRepository repository)
        {
            SubRepository = subRepository;
            Repository = repository;
        }

        SubscriptionRepository SubRepository { get; }
        TopicRepository Repository { get; set; }

        [HttpGet]
        public IActionResult Index(int categoryId) =>
            View(Repository.Items);

        [HttpGet("show/{id}")]
        public IActionResult Show(int id) =>
            View(Repository.Get(id));

        [HttpGet("create")]
        public IActionResult Create() =>
            View();

        [HttpPost("create")]
        public IActionResult Create(Topic topic)
        {
            topic.Id = Repository.NextId;
            Repository.Add(topic);
            NotifyUser(topic.Id.Value);
            return RedirectToAction("Index", "Category");
        }

        [HttpPost("subscription")]
        public void Subscription([FromBody]Subscription sub)
        {
            sub.Id = SubRepository.NextId;
            SubRepository.Add(sub);
        }


        private void NotifyUser(int topicId)
        {
            var vapidDetails = new VapidDetails(
                @"mailto:logan.hollins1@gmail.com",
                "BIzudo5gPnMUVAhQrTRDEuIMPOLwtIInO-KHrukWLkguSyCyKNrYnaHr36_zK4bfvJ5hMxu7HFWlAr0n579-tbE",
                "eCB1JO4enyxjbeXxzMbTDiYHVhJeeweq3hWMXkOHliU");

            var subscriptions = SubRepository.Items;
            var topic = Repository.Get(topicId);

            var payload = JsonConvert.SerializeObject(
                new
                {
                    topic = new { title = topic.Title, id = topic.Id }
                });

            var webPushClient = new WebPushClient();

            foreach(var subscription in subscriptions.Select(s => new PushSubscription(s.Endpoint, s.Keys.P256dh, s.Keys.Auth)))
            {
                try
                {
                    webPushClient.SendNotification(subscription, payload, vapidDetails);
                }
                catch (WebPushException ex)
                {

                }
            }
        }
    }
}
