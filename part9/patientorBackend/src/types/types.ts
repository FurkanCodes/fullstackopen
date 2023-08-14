export type Diagnose = {
    code: string;
    name: string;
    latin?: string;
};

export type Patient = {
    id: string,
    name: string,
    dateOfBirth: string,
    ssn: string,
    gender: Gender
    occupation: string,
    entries: Entry[];
}

export enum Gender {
    Male = "male",
    Female = "female",
    Other = "other",
}

export interface BaseEntry {
    id: string;
    description: string;
    date: string;
    specialist: string;
    diagnosisCodes?: Array<Diagnose['code']>;
}

export enum HealthCheckRating {
    "Healthy" = 0,
    "LowRisk" = 1,
    "HighRisk" = 2,
    "CriticalRisk" = 3
}

export interface OccupationalHealthcareEntry extends BaseEntry {
    type: 'OccupationalHealthcare';
    employerName: string;
    sickLeave?: {
        startDate: string;
        endDate: string;
    };
}

export interface HospitalEntry extends BaseEntry {
    type: 'Hospital';
    discharge: {
        date: string;
        criteria: string;
    };
}

interface HealthCheckEntry extends BaseEntry {
    type: "HealthCheck";
    healthCheckRating: HealthCheckRating;
}

export type Entry =
    | HospitalEntry
    | OccupationalHealthcareEntry
    | HealthCheckEntry;

export type ssnOmit = Omit<Patient, "ssn">;
export type NewPatientEntry = Omit<Patient, 'id'>;
