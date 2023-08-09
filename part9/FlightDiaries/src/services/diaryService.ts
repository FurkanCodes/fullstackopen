import data from '../data/db'
import { DiaryEntry, NewDiaryEntry } from '../types';


const getEntries = () => {
    return data
};

const addDiary = (entry: NewDiaryEntry): DiaryEntry => {
    const newDiary = {
        id: Math.max(...data.map(d => d.id)) + 1,
        ...entry
    }
    data.push(newDiary)
    return newDiary
}



const getNonSensitiveEntries = (): DiaryEntry[] => {
    return data.map(({
        id, date, weather, visibility }) => ({
            id, date, weather, visibility,
        }));
};

const findById = (id: number): DiaryEntry | undefined => {
    const entry = data.find(d => d.id === id)
    return entry
}
export default {
    getEntries,
    getNonSensitiveEntries,
    addDiary,
    findById
}