import patientData from "../data/patientsData";
import { ssnOmit } from "../types/types";

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

export default {
    getPatients,
}