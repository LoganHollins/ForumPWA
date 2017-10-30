using ForumPWA.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ForumPWA.Infrastructure
{
    public class TopicRepository : Repository<Topic>
    {
        static List<Topic> _topics = new List<Topic>
        {
            new Topic
            {
                Id = 1,
                Title = "Why does my dog float?",
                Content = "My dog keeps floating around the house and I am not sure why?  Does anyone have any advice on how to make him stop floating?  Please reply quickly... I don't want him to float through an open window :(",
                CategoryId = 1
            },
            new Topic
            {
                Id = 2,
                Title = "Best way to tie your shoes?",
                Content = "What is your favorite way to tie your shoes?  Ps. I only use velcro shoes",
                CategoryId = 1
            },
            new Topic
            {
                Id = 3,
                Title = "Floor mats.",
                Content = "So I took my 2012 Scion xb to THIS dealer for the first time for an oil change. When  I picked up my car the drivers side floor mat was missing and the two hooks holding the mat from sliding forward were also missing.  I told the rep and he said Toyota does not allow floor mats to be stacked and the mat can be found on the passenger side.  His English was not too good so I left it at that. I went back to my car and started to wonder what is going on. I had only the Scion mat on the carpet on my drivers side. Anyways I think I will phone the manager on Monday morning and ask for some clarification. Feedback please.",
                CategoryId = 1
            },
            new Topic
            {
                Id = 4,
                Title = "Imposter Lady Bugs in your Area?",
                Content = "These Imposter Lady Bugs are not only a Manitoba problem but we get them here as well. They are Asian Lady Beetles and the little buggers bite.Back in 2013 the Star did an article on them. Get your caulking guns out and seal your windows.Railton",
                CategoryId = 3
            },
            new Topic
            {
                Id = 5,
                Title = "Use two themes in asp.net mvc",
                Content = "I want to use one theme for Admin Panel and one theme is a separate which I want to show my visitors. I mean to say that there should be separate themes for visitor and Administrator of a website. How to do in asp.net mvc? Because in mvc we have only one file _Layout.cshtml and here we have to attach only one theme.",
                CategoryId = 2
            },
                        new Topic
            {
                Id = 6,
                Title = "How do you create a dropdownlist from an enum in ASP.NET MVC?",
                Content = "How do I go about creating a dropdown with these values using the Html.DropDownList extension method? Or is my best bet to simply create a for loop and create the Html elements manually?",
                CategoryId = 2
            },
        };

        public TopicRepository()
            : base(_topics)
        {
        }

        public IEnumerable<Topic> GetByCategoryId(int categoryId) => Items.Where(t => t.CategoryId == categoryId);
    }
}
