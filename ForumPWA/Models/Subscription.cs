using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ForumPWA.Models
{
    public class Subscription : IdentityObject
    {
        public string Endpoint { get; set; }
        public DateTime? ExpirationTime { get; set; }
        public Key Keys { get; set; }
    }

    public class Key
    {
        public string Auth { get; set; }
        public string P256dh { get; set; }
    }
}
