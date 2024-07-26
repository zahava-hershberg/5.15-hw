import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../AuthContext';

const Favorites = () => {
    const { user } = useAuth();
    const [favorites, setFavorites] = useState([]);
    const [currentBook, setCurrentBook] = useState('');
    const [addMode, setAddMode] = useState(false);
    const [editMode, setEditMode] = useState(false);
    const [showMode, setShowMode] = useState(false);
    const [note, setNote] = useState('');

    const getFavoriteBooks = async () => {
        const { data } = await axios.get(`/api/favoritebook/getfavorites?id=${user.id}`);
        setFavorites(data);
    };

    useEffect(() => {
        getFavoriteBooks();
    }, []);
    
    const onAddClick=(book)=>{
        setAddMode(true); 
        setCurrentBook(book); 
        setNote('');
    }

    const onEditClick = (book) => {
        setCurrentBook(book);
        setEditMode(true);
        setAddMode(false);
        setNote(book.note);
    };

    const saveNote = async (book) => {
        await axios.post('/api/favoritebook/addeditnote', { id: book.id, note: note });
        setEditMode(false);
        setCurrentBook(book);
        getFavoriteBooks();
    };

    const removeFromFavorites = async (book) => {
        await axios.post('/api/favoritebook/remove', { key: book.key });
        setFavorites(favorites.filter(f => f.key !== book.key));
    }
    return (
        <div className='container mt-5'>
            <div style={{ marginTop: '80px' }}>
                <div className='container mt-5'>
                    <h2 className='mb-4 text-primary'>My Favorites</h2>
                    <div className='row'>
                        {favorites.map(f => (
                            <div className='col-md-4 mb-4' key={f.id}>
                                <div className='card h-100 shadow-sm border-0'>
                                    <div className='position-relative'>
                                        <div className='d-flex align-items-center justify-content-center' style={{ height: '200px' }}>
                                            <img src={f.cover} className='card-img-top' style={{ maxHeight: '100%', maxWidth: '100%', objectFit: 'contain' }}></img>
                                            <button onClick={() => removeFromFavorites(f)} className='btn btn-danger btn-sm position-absolute top-0 end-0 m-2'><i className='bi bi-trash' /></button>
                                        </div>
                                    </div>
                                    <div className='card-body d-flex flex-column'>
                                        <h5 className='card-title text-truncate'>{f.title}</h5>
                                        <p className='card-text text-muted'>by {f.author}</p>
                                        <div className='mt-auto'>
                                            {!f.note && currentBook.id !== f.id && 
                                                <button onClick={() =>onAddClick(f)} className='btn btn-outline-primary w-100 mb-2'>Add Note</button>
                                            }
                                            {f.note && 
                                                <>
                                                    <button onClick={() => onEditClick(f)} className='btn btn-outline-primary w-100 mb-2'>Edit Note</button>
                                                    <button className='btn btn-outline-dark w-100' onClick={() => { setShowMode(!showMode); setCurrentBook(f); }}>{!showMode ? 'Show Note' : 'Hide Note'}</button>
                                                </>
                                            }
                                        </div>
                                        <div className='mt-3'>
                                            {addMode && currentBook.id === f.id || editMode && currentBook.id === f.id && 
                                                <>
                                                    <textarea onChange={e => setNote(e.target.value)} value={note} className='form-control' rows='3' placeholder='Add your notes here...'></textarea>
                                                    <div className='d-flex justify-content-between mt-2'>
                                                        <button onClick={() => saveNote(f)} className='btn btn-success'>Save Note</button>
                                                        <button onClick={() => { setAddMode(false); setEditMode(false); }} className='btn btn-outline-secondary ms-2'>Cancel</button>                                                       
                                                    </div>
                                                </>
                                            }
                                            {showMode && currentBook?.id === f.id && 
                                                <>
                                                    <h6>Note</h6>
                                                    <p>{f.note}</p>
                                                </>
                                            }
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Favorites;

