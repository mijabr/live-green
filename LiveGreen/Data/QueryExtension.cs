using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using LiteDB;

namespace LiveGreen.Data
{
    public static class QueryExtension
    {
        public static Query EQ(Where where)
        {
            return Query.EQ(where.Field, where.Value);
        }

        public static Query EQ(IEnumerable<Where> wheres)
        {
            Query query = null;

            foreach (var where in wheres)
            {
                if (query == null)
                {
                    query = EQ(where);
                }
                else
                {
                    query = Query.And(query, EQ(where));
                }
            }

            return query;
        }
    }
}
