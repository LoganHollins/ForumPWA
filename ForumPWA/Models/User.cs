﻿using System;

namespace ForumPWA.Models
{
    public class User : IdentityObject
    {
        public string UserName { get; set; }
        public string FullName { get; set; }
        public string AboutMe { get; set; }
        public string PhotoUrl { get; set; }
        public DateTime CreatedAt { get; set; }
    }
}