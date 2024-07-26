using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Internal;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http.Json;
using System.Text;
using System.Threading.Tasks;

namespace FavoriteBooks.Data
{
    public class FavoriteBookRepo
    {
        private readonly string _connectionString;
        public FavoriteBookRepo(string connectionString)
        {
            _connectionString = connectionString;
        }
        public void AddBook(FavoriteBook book)
        {
            using var context = new FavoriteBooksDataContext(_connectionString);
            context.FavoriteBooks.Add(book);
            context.SaveChanges();

        }
        public List<FavoriteBook> GetFavoriteBooks(int id)
        {
            using var context = new FavoriteBooksDataContext(_connectionString);
            return context.FavoriteBooks.Where(f => f.UserId == id).ToList();
        }
        public void Delete(string key)
        {
            using var context = new FavoriteBooksDataContext(_connectionString);
            context.Database.ExecuteSqlInterpolated($"DELETE FROM FavoriteBooks WHERE [Key]={key}");
        }
        public void AddEditNote(int id, string note)
        {
            using var context = new FavoriteBooksDataContext(_connectionString);
            context.Database.ExecuteSqlInterpolated($"UPDATE FavoriteBooks set Note={note} WHERE Id={id}");

        }
       
       
    }
}
