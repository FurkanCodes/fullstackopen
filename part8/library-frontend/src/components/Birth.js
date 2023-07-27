import { useState } from 'react'
import { useMutation, useQuery } from '@apollo/client'

import { EDIT_AUTHOR, GET_ALL_AUTHORS } from './queries'

const BirthForm = () => {
    const [name, setName] = useState('');
    const [birthYear, setBirthYear] = useState('');

    const [createOrUpdateAuthor] = useMutation(EDIT_AUTHOR);
    const { loading, error, data } = useQuery(GET_ALL_AUTHORS);
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const { data } = await createOrUpdateAuthor({
                variables: {
                    name,
                    setBornTo: parseInt(birthYear),
                },
            });

            if (data.editAuthor.id) {
                console.log('Author updated successfully!');
            } else {
                console.log('Author added successfully!');
            }

            setName('');
            setBirthYear('');
        } catch (error) {
            console.error('An error occurred:', error.message);
        }
    };
    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;


    return (
        <form onSubmit={handleSubmit}>
            <label htmlFor="name">Name:</label>
            <select id="name" value={name} onChange={(e) => setName(e.target.value)} required>
                <option value="">Select an author</option>
                {data && data.allAuthors.map((author) => (
                    <option key={author.name} value={author.name}>
                        {author.name}
                    </option>
                ))}
            </select>
            <br />
            <label htmlFor="birthYear">Birth Year:</label>
            <input type="number" id="birthYear" value={birthYear} onChange={(e) => setBirthYear(e.target.value)} required />
            <br />
            <button type="submit">Add/Update Author</button>
        </form>
    );
};

export default BirthForm