import axios from "axios";
import { DiaryEntry } from "../types";

const API_URL = "http://localhost:3001/"

export const fetchDiaries = async () => {
    const response = await axios.get(`${API_URL}api/diaries`);
    return response.data;
};

export const addDiary = async (newEntry: DiaryEntry): Promise<DiaryEntry> => {
    const response = await axios.post<DiaryEntry>(`${API_URL}api/diaries`, newEntry);
    return response.data;
};