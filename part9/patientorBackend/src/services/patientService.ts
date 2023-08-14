import patientData from "../data/patientsData";
import { ssnOmit, NewPatientEntry, Patient } from "../types/types";
import { v4 as uuidv4 } from 'uuid';

let myuuid = uuidv4();

const getPatients = (): ssnOmit[] => {
    return patientData.map(({ id,
        name,
        dateOfBirth,
        gender,
        occupation,
        entries }) => ({
            id,
            dateOfBirth,
            name,
            gender,
            occupation, entries
        }))
}


const addPatient = (entry: NewPatientEntry): Patient => {
    const newPatient = {
        id: myuuid,
        ...entry
    };

    patientData.push(newPatient);
    return newPatient;
}

const getPatientById = (id: string): Patient | undefined => {
    const patient = patientData.find(patient => patient.id === id);

    if (!patient) {
        return undefined;
    }

    return patient;
}

export default {
    getPatients,
    addPatient,
    getPatientById
}