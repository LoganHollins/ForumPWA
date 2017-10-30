using ForumPWA.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ForumPWA.Infrastructure
{
    public class SubscriptionRepository : Repository<Subscription>
    {
        static List<Subscription> _subscriptions = new List<Subscription>()
        {
        };

        public SubscriptionRepository() 
            : base(_subscriptions)
        {
        }
    }
}
