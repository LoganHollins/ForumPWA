using ForumPWA.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ForumPWA.Infrastructure
{
    public class TopicRepository
    {
        IEnumerable<Topic> _topics = new List<Topic>
        {
            new Topic
            {
                Id = 1,
                Title = "General",
                CategoryId = 1
            },
            new Topic
            {
                Id = 2,
                Title = "Programming",
            },
            new Topic
            {
                Id = 3,
                Title = "Off-Topic"
            }
        };

        public List<Topic> All => _topics.ToList();
        public Topic Get(int id) => All.Where(c => c.Id == id).FirstOrDefault();

        public void Add(Topic Topic) => _topics = All.Append(Topic);
        public void Delete(int id) => All.RemoveAll(c => c.Id == id);
    }
}
