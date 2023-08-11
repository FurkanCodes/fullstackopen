import React, { useEffect, useState } from "react";
import { addDiary, fetchDiaries } from "../services/diaryService";
import { DiaryEntry } from "../types";
import { v4 as uuidv4 } from 'uuid';

const myId = uuidv4();
const myIdNumber: number = +myId;


const DiaryList = () => {
    const [diaries, setDiaries] = useState<DiaryEntry[]>([]);
    const [newDiary, setNewDiary] = useState<DiaryEntry>({
        id: myIdNumber, // Replace with appropriate logic in real scenario
        date: '',
        weather: '',
        visibility: '',
        comment: ''
    });
    useEffect(() => {
        fetchDiaries().then((data) => {

            setDiaries(data);
        });
    }, []);

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setNewDiary((prevDiary) => ({
            ...prevDiary,
            [name]: value,
        }));
    };

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();

        try {
            const addedEntry = await addDiary(newDiary);
            setDiaries((prevDiaries) => [...prevDiaries, addedEntry]);

            // Clear the input fields after adding an entry
            setNewDiary({
                id: 0 + 1,
                date: '',
                weather: '',
                visibility: '',
                comment: ''
            });
        } catch (error) {
            console.error('Error adding diary entry:', error);
        }
    };
    return (
        <div>
            <h1>Diary Entries</h1>
            <ul>
                {diaries.map((diary) => (
                    <li key={diary.id}>
                        {diary.date}
                        <p>      Weather: {diary.weather}</p>
                        <p>    Visiblity:{diary.visibility}</p>
                        <p>    Comment:{diary.comment}</p>
                    </li>
                ))}
            </ul>

            <h2>Add New Diary Entry</h2>
            <form onSubmit={handleSubmit}>
                <label>Date:</label>
                <input type="text" name="date" value={newDiary.date} onChange={handleInputChange} />
                <label>Weather:</label>
                <input type="text" name="weather" value={newDiary.weather} onChange={handleInputChange} />
                <label>Visibility:</label>
                <input
                    type="text"
                    name="visibility"
                    value={newDiary.visibility}
                    onChange={handleInputChange}
                />
                <label>Comment:</label>
                <input
                    type="text"
                    name="comment"
                    value={newDiary.comment}
                    onChange={handleInputChange}
                />
                <button type='submit'>Add</button>
            </form>


        </div>
    );

}

export default DiaryList;