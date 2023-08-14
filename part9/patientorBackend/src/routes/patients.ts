import express from 'express';
import patientService from '../services/patientService';
const router = express.Router();

router.get('/', (_req, res) => {
    res.send(patientService.getPatients());
});



router.post('/', (req, res) => {
    const { name, dateOfBirth, ssn, gender, occupation, entries } = req.body;

    const addedEntry = patientService.addPatient(
        { name, dateOfBirth, ssn, gender, occupation, entries })
    res.json(addedEntry);
});

router.get('/:id', (req, res) => {
    const patientId = req.params.id;

    const patient = patientService.getPatientById(patientId);

    if (!patient) {
        return res.status(404).json({ error: 'Patient not found' });
    }

    return res.json(patient);
});


export default router;