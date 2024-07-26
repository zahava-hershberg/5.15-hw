using FavoriteBooks.Data;
using FavoriteBooks.Web.ViewModels;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace FavoriteBooks.Web.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class FavoriteBookController : ControllerBase
    {
        private readonly string _connectionString;
        public FavoriteBookController(IConfiguration configuration)
        {
            _connectionString = configuration.GetConnectionString("ConStr");
        }
        
        [HttpGet("searchbooks")]
        [AllowAnonymous]
        public List<Book> SearchBooks(string query)
        {
            var search = new OpenLibraryAPIService();
            return search.SearchBooks(query);
        }
        [HttpPost("addbook")]

        public void AddBook(FavoriteBook book)
        {
            var repo = new FavoriteBookRepo(_connectionString);
            repo.AddBook(book);
        }
        [HttpGet("getfavorites")]
        public List<FavoriteBook> GetFavoriteBooks(int id)
        {
            var repo = new FavoriteBookRepo(_connectionString);
            return repo.GetFavoriteBooks(id);
        }
        [HttpPost("remove")]
        public void Remove(DeleteViewModel vm)
        {
            var repo = new FavoriteBookRepo(_connectionString);
            repo.Delete(vm.Key);

        }
        [HttpPost("addeditnote")]
        public void AddNote(NoteViewModel vm)
        {
            var repo = new FavoriteBookRepo(_connectionString);
            repo.AddEditNote(vm.Id, vm.Note);
        }
    
    }
}
