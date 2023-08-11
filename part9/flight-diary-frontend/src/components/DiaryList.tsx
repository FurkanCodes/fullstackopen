import React, { useEffect, useState } from "react";
import { addDiary, fetchDiaries } from "../services/diaryService";
import { DiaryEntry } from "../types";
import { v4 as uuidv4 } from 'uuid';
import axios from "axios";
import "../../src/DiaryList.css";
import { error } from "console";

const myId = uuidv4();
const myIdNumber: number = +myId;


const DiaryList = () => {
    const [diaries, setDiaries] = useState<DiaryEntry[]>([]);
    const [newDiary, setNewDiary] = useState<DiaryEntry>({
        id: 0, // Replace with appropriate logic in real scenario
        date: '',
        weather: '',
        visibility: '',
        comment: ''
    });
    const [errorMessage, setErrorMessage] = useState<string>('')

    useEffect(() => {
        fetchDiaries().then((data) => {
            setDiaries(data);
        });

        if (errorMessage) {
            const timeoutId = setTimeout(() => {
                setErrorMessage("");
            }, 2000); // 2000 milliseconds = 2 seconds

            return () => {
                clearTimeout(timeoutId);
            };
        }
    }, [errorMessage]);
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
                id: myIdNumber,
                date: '',
                weather: '',
                visibility: '',
                comment: ''
            });
        } catch (error) {
            if (axios.isAxiosError(error)) {
                if (error.response?.data) {
                    if (typeof error.response.data === 'string') {
                        setErrorMessage(error.response.data)
                        // throw new Error(error.response.data); // If the error is a simple string
                    }

                }
            }
            return;
        }
    };
    const handleCommentChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        const { name, value } = event.target;
        setNewDiary((prevDiary) => ({
            ...prevDiary,
            [name]: value,
        }));
    };

    return (
        <div className="diary-container">
            <h1>Diary Entries</h1>
            <ul>

                {diaries.map((diary) => (
                    <li key={diary.id}>
                        <p>{diary.date}</p>
                        <p>Weather: {diary.weather}</p>
                        <p>Visiblity: {diary.visibility}</p>
                        <p>Comment: {diary.comment}</p>
                    </li>
                ))}
            </ul>

            <h2>Add New Diary Entry</h2>
            {errorMessage && <p className="error-message">{errorMessage}</p>}
            <form onSubmit={handleSubmit}>
                <label>Date:</label>
                <input
                    type="date"
                    name="date"
                    value={newDiary.date}
                    onChange={handleInputChange}
                    required
                />
                <label>Weather:</label>
                <div>
                    <label>
                        <input
                            type="radio"
                            name="weather"
                            value="sunny"
                            checked={newDiary.weather === "sunny"}
                            onChange={handleInputChange}
                            required
                        />
                        Sunny
                    </label>
                    <label>
                        <input
                            type="radio"
                            name="weather"
                            value="cloudy"
                            checked={newDiary.weather === "cloudy"}
                            onChange={handleInputChange}
                        />
                        Cloudy
                    </label>
                    <label>
                        <input
                            type="radio"
                            name="weather"
                            value="rainy"
                            checked={newDiary.weather === "rainy"}
                            onChange={handleInputChange}
                        />
                        Rainy
                    </label>
                </div>
                <label>Visibility:</label>
                <div>
                    <label>
                        <input
                            type="radio"
                            name="visibility"
                            value="good"
                            checked={newDiary.visibility === "good"}
                            onChange={handleInputChange}
                            required
                        />
                        Good
                    </label>
                    <label>
                        <input
                            type="radio"
                            name="visibility"
                            value="ok"
                            checked={newDiary.visibility === "ok"}
                            onChange={handleInputChange}
                        />
                        Okay
                    </label>
                    <label>
                        <input
                            type="radio"
                            name="visibility"
                            value="poor"
                            checked={newDiary.visibility === "poor"}
                            onChange={handleInputChange}
                        />
                        Poor
                    </label>
                    <label>Comment:</label>
                    <textarea
                        name="comment"
                        value={newDiary.comment}
                        onChange={handleCommentChange}
                        rows={3}
                    />
                </div>
                <button type="submit">Add</button>
            </form>
        </div>
    );

}

export default DiaryList;