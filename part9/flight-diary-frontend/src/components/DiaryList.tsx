import React, { useEffect, useState } from "react";
import { fetchDiaries } from "../services/diaryService";
import { DiaryEntry } from "../types";


const DiaryList = () => {
    const [diaries, setDiaries] = useState<DiaryEntry[]>([])
    useEffect(() => {
        fetchDiaries()
            .then((data) => setDiaries(data))
            .catch((error) => console.error('Error fetching diaries:', error));
    }, []);

    return (
        <div>
            <h1>Diary Entries</h1>
            <ul>
                {diaries.map((diary) => (
                    <li key={diary.id}>
                        {diary.date}
                        <p>      Weather: {diary.weather}</p>
                        <p>    Visiblity:{diary.visibility}</p>
                    </li>
                ))}
            </ul>
        </div>
    );

}

export default DiaryList;