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
        public Repository(List<T> items)
        {
            Items = items;
        }

        public List<T> Items { get; private set; }

        public int NextId => Items.Select(i => i.Id).DefaultIfEmpty().Max(i => i) + 1 ?? 0;

        public T Get(int id) => Items.Where(c => c.Id == id).FirstOrDefault();

        public void Add(T item) => Items = Items.Append(item).ToList();
        public void Delete(int id) => Items.ToList().RemoveAll(c => c.Id == id);
    }
}
