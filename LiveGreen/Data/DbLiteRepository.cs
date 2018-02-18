using LiteDB;
using LiveGreen.Models;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;

namespace LiveGreen.Data
{
    public class DbLiteRepository<TEntity> : IRepository<TEntity> where TEntity : class, IEntity
    {
        private DbLite dbLite;
        private ILogger<DbLiteRepository<TEntity>> logger;

        public DbLiteRepository(DbLite dbLite, ILogger<DbLiteRepository<TEntity>> logger)
        {
            this.dbLite = dbLite;
            this.logger = logger;
        }

        public IEnumerable<TEntity> Get(Where where = null)
        {
            var func = new Func<LiteDatabase, dynamic>((db) =>
            {
                logger.LogInformation($"Processing 'Get' request");

                IEnumerable<TEntity> results = null;
                var dbCollection = db.GetCollection<TEntity>();

                if (where == null)
                {
                    results = dbCollection.FindAll().ToList();
                }
                else
                {
                    results = dbCollection.Find(QueryExtension.EQ(where)).ToList();
                }

                logger.LogInformation($"Returning {results?.Count()} {typeof(TEntity).Name}");
                return results;
            });

            var result = dbLite.DoDatabaseAction(func);
            return result;
        }

        public IEnumerable<TEntity> Get(IEnumerable<Where> wheres)
        {
            var func = new Func<LiteDatabase, dynamic>((db) =>
            {
                logger.LogInformation($"Processing 'Get' request");

                IEnumerable<TEntity> results = null;
                var dbCollection = db.GetCollection<TEntity>();

                results = dbCollection.Find(QueryExtension.EQ(wheres)).ToList();

                logger.LogInformation($"Returning {results?.Count()} {typeof(TEntity).Name}");
                return results;
            });

            return dbLite.DoDatabaseAction(func);
        }

        public void Insert(IEnumerable<TEntity> entities)
        {
            var action = new Func<LiteDatabase, dynamic>((db) =>
            {
                logger.LogInformation($"Processing 'Insert' request");

                var dbCollection = db.GetCollection<TEntity>();
                dbCollection.Insert(entities);

                logger.LogInformation($"Inserted {entities?.Count()} {typeof(TEntity).Name}");
                return 0;
            });

            dbLite.DoDatabaseAction(action);
        }

        public void Upsert(TEntity entity, Where where = null)
        {
            var action = new Func<LiteDatabase, dynamic>((db) =>
            {
                logger.LogInformation($"Processing 'Upsert' request");

                var dbCollection = db.GetCollection<TEntity>();

                if (where != null)
                {
                    var existingEntities = dbCollection.Find(QueryExtension.EQ(where));

                    if (existingEntities.Count() == 1)
                    {
                        entity.Id = existingEntities.First().Id;
                    }
                }

                bool inserted = dbCollection.Upsert(entity);

                logger.LogInformation($"{(inserted ? "Inserted" : "Updated")} {typeof(TEntity).Name} with Id {entity.Id}");
                return 0;
            });

            dbLite.DoDatabaseAction(action);
        }

        public void Delete(Where where)
        {
            var action = new Func<LiteDatabase, dynamic>((db) =>
            {
                logger.LogInformation($"Processing 'Delete' request");

                var dbCollection = db.GetCollection<TEntity>();
                var deleteCount = 0;

                if (where != null)
                {
                    deleteCount = dbCollection.Delete(QueryExtension.EQ(where));
                }

                logger.LogInformation($"Deleted {deleteCount} {typeof(TEntity).Name}");
                return 0;
            });

            dbLite.DoDatabaseAction(action);
        }

        public void UpdateDatabase()
        {
            var action = new Func<LiteDatabase, dynamic>((db) =>
            {
                logger.LogInformation($"Updating database");

                var results = db.GetCollection<TestResult>();

                if (results.EnsureIndex("Feature"))
                {
                    logger.LogInformation($"Added 'Feature' index");
                }

                if (results.EnsureIndex("BuildResultKey"))
                {
                    logger.LogInformation($"Added 'BuildResultKey' index");
                }

                if (results.EnsureIndex("TestId"))
                {
                    logger.LogInformation($"Added 'TestId' index");
                }

                logger.LogInformation($"Database update complete");
                return 0;
            });

            dbLite.DoDatabaseAction(action);
        }
    }
}
