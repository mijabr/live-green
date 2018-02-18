using LiveGreen.Models;
using System.Collections.Generic;

namespace LiveGreen.Data
{
    public interface IRepository<TEntity> where TEntity : IEntity
    {
        IEnumerable<TEntity> Get(Where where = null);
        IEnumerable<TEntity> Get(IEnumerable<Where> wheres);
        void Insert(IEnumerable<TEntity> entity);
        void Upsert(TEntity entity, Where where = null);
        void Delete(Where where);
        void UpdateDatabase();
    }
}
