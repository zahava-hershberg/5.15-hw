import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../AuthContext';

const Search = () => {
    const { user } = useAuth();
    const [searchText, setSearchText] = useState("");
    const [books, setBooks] = useState([]);
    const [favorites, setFavorites] = useState([]);
    const isLoggedIn = Boolean(user);

    const getFavoriteBooks = async () => {
        const { data } = await axios.get(`/api/favoritebook/getfavorites?id=${user.id}`)
        setFavorites(data.map(book => book.key));

    }
    useEffect(() => {
        getFavoriteBooks();
    }, []);

    const onSearchClick = async (e) => {
        e.preventDefault();
        const { data } = await axios.get(`/api/favoritebook/searchbooks?query=${searchText}`);
        setBooks(data);
        getFavoriteBooks();
    }
    const addToFavorites = async (book) => {
        await axios.post('/api/favoritebook/addbook', {
            key: book.id, title: book.title, author: book.author, cover: book.cover, userId: user.id
        })
        setFavorites([...favorites, book.id])
    }

    const removeFromFavorites = async (book) => {
        await axios.post('/api/favoritebook/remove', { key: book.id });
        console.log(book.id);
        setFavorites(favorites.filter(f => f !== book.id))
    }

    return (
        <div className='container mt-5' >
            <div className='container mt-5' style={{ marginTop: '80 px' }}>
                <h2>Search for Books</h2>
                <form>
                    <div className='input-group mb-3'>
                        <input type='text' onChange={e => setSearchText(e.target.value)} className='form-control' placeholder='Enter book title, author, or ISBN' />
                        <button onClick={onSearchClick} className='btn btn-primary' type='submit'>Search</button>
                    </div>
                </form>
                <div className='row'>
                    {books.map(b => (
                        <div className='col-md-4 mb-3' key={b.id}>
                            <div className='card h-100'>
                                <div className='d-flex align-items-center justify-content-center' style={{ height: '200px' }}>
                                    <img src={b.cover} className='card-img-top' style={{ maxHeight: '100%', maxWidth: '100%', objectFit: 'contain' }}></img>
                                </div>
                                <div className='card-body d-flex flex-column'>
                                    <h5 className='card-title' >{b.title}</h5>
                                    <p className='card=text'>by {b.author}</p>
                                    {!isLoggedIn ? 
                                        <button disabled className='btn btn-success'>Sign in to add favorites</button>
                                     : !favorites.includes(b.id) ? 
                                            <button onClick={() => addToFavorites(b)} className='btn btn-success mt-auto'>Add to favorites</button>
                                         : 
                                            <button onClick={() => removeFromFavorites(b)} className='btn btn-danger mt-auto'>Remove from favorites</button>
                                        
                                    }
                                  


                            </div>


                        </div>
                        </div>


                    ))}
            </div>
        </div>

        </div >
    )
}
export default Search