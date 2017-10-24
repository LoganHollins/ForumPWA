using ForumPWA.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ForumPWA.Infrastructure
{
    public abstract class Repository<T>
        where T : IdentityObject
    {
        public Repository(IEnumerable<T> items)
        {
            Items = items;
        }

        public IEnumerable<T> Items { get; private set; }

        public T Get(int id) => Items.Where(c => c.Id == id).FirstOrDefault();

        public void Add(T item) => Items = Items.Append(item);
        public void Delete(int id) => Items.ToList().RemoveAll(c => c.Id == id);
    }
}
