using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FavoriteBooks.Data
{
    public class FavoriteBook
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public string Author { get; set; }
        public string Cover { get; set; }
        public string Note { get; set; }
        public string Key { get; set; }
        public int UserId { get; set; }

    }
}
