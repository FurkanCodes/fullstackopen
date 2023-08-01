import { useQuery } from '@apollo/client';
import React from 'react';
import { BOOKS_BY_FAVORITE_GENRE, CURRENT_USER } from './queries';

const BooksByFavoriteGenreView = ({ show }) => {

    const { loading: favBooksLoading, error: favBooksError, data: favBooksData } = useQuery(BOOKS_BY_FAVORITE_GENRE);
    const { loading: currentUserLoading, error: currentUserError, data: currentUserData } = useQuery(CURRENT_USER);

    if (favBooksLoading || currentUserLoading) return <p>Loading...</p>;
    if (favBooksError || currentUserError) return <p>Error: {favBooksError?.message || currentUserError?.message}</p>;

    const favBooks = favBooksData.booksByFavoriteGenre;
    const favoriteGenre = currentUserData.currentUser.favoriteGenre
    const author = favBooks[0].author.name
    console.log(favBooks)
    if (!show) {
        return null
    }
    return (
        <div>

            <>
                <h2>Books by Favorite Genre: {favoriteGenre}</h2>

                <table>
                    <tbody>
                        <tr>
                            <th>title</th>
                            <th>published</th>
                            <th>author</th>
                        </tr>
                        {favBooks.map((book, idx) => (
                            <tr key={idx}>

                                <td>{book.title}</td>
                                <td>{book.genres.join(', ')}</td>
                                <td>{author}</td>

                            </tr>
                        ))}
                    </tbody>
                </table>
            </>
        </div>
    );
};

export default BooksByFavoriteGenreView;
