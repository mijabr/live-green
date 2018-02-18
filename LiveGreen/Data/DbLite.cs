using LiteDB;
using LiveGreen.Models;
using Microsoft.Extensions.Logging;
using System;
using System.Threading;

namespace LiveGreen.Data
{
    public class DbLite
    {
        private static Mutex mutex = new Mutex();
        private ILogger<DbLiteRepository<IEntity>> logger;
        private LiteDatabase db = new LiteDatabase(@".\TestResults.db");

        public DbLite(ILogger<DbLiteRepository<IEntity>> logger)
        {
            this.logger = logger;
        }

        public dynamic DoDatabaseAction(Func<LiteDatabase, dynamic> action)
        {
            dynamic result = null;

            try
            {
                mutex.WaitOne();

                result = action.Invoke(db);
            }
            catch (Exception x)
            {
                logger.LogCritical($"An error occurred: {x.Message}");
            }
            finally
            {
                mutex.ReleaseMutex();
            }

            return result;
        }
    }
}
