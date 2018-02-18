using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace LiveGreen.Data
{
    public class Where
    {
        public static Where EQ(string field, string value)
        {
            return new Where(field, value);
        }

        public static IEnumerable<Where> EQ(string field1, string value1, string field2, string value2)
        {
            return new List<Where>() { EQ(field1, value1), EQ(field2, value2) };
        }

        private Where(string field, string value)
        {
            this.Field = field;
            this.Value = value;
        }

        public string Field { get; set; }
        public string Value { get; set; }
        public string Operator { get { return "EQ"; } }
    }
}
