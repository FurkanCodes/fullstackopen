import { DiaryEntry } from "../types";

const API_URL = "http://localhost:3001/"

export const fetchDiaries = async (): Promise<DiaryEntry[]> => {
    const response = await fetch(`${API_URL}api/diaries`);
    const data = await response.json();
    return data as DiaryEntry[];
}