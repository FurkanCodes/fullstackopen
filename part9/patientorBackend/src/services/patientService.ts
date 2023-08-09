import patientData from "../data/patientsData";
import { ssnOmit, NewPatientEntry, Patient } from "../types/types";
import { v4 as uuidv4 } from 'uuid';

let myuuid = uuidv4();

const getPatients = (): ssnOmit[] => {
    return patientData.map(({ id,
        name,
        dateOfBirth,
        gender,
        occupation }) => ({
            id,
            dateOfBirth,
            name,
            gender,
            occupation
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



export default {
    getPatients,
    addPatient
}