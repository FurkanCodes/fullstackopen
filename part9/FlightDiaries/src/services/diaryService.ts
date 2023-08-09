import data from '../data/db'
import { DiaryEntry } from '../types';


const getEntries = () => {
    return data
};

const addDiary = () => {
    return null;
}



const getNonSensitiveEntries = (): DiaryEntry[] => {
    return data.map(({
        id, date, weather, visibility }) => ({
            id, date, weather, visibility,
        }));
};
export default {
    getEntries,
    getNonSensitiveEntries,
    addDiary
}