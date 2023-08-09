import express from 'express';
import diaryService from '../services/diaryService';
import toNewDiaryEntry from '../utils'

const router = express.Router();

router.get('/', (_req, res) => {
    const diary = diaryService.getNonSensitiveEntries()
    if (diary) {
        res.send(diary)
    } else {
        res.sendStatus(404)
    }
});

router.post('/', (req, res) => {
    try {
        const newDiaryEntry = toNewDiaryEntry(req.body)
        const addedEntry = diaryService.addDiary(newDiaryEntry)
        res.json(addedEntry)
    } catch (error) {
        let errMsg = "something went wrong";
        if (error instanceof Error) {
            errMsg += 'Error: ' + error.message;
        }
        res.status(400).send(errMsg)
    }

});

export default router;