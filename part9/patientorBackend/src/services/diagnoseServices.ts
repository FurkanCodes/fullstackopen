import diagnoseData from "../data/diagnosesData";
import { Diagnose } from "../types/types";

const getDiagnoses = (): Diagnose[] => {
    return diagnoseData.map(({ code, name, latin }) => ({
        code,
        name,
        latin
    }))
}

export default {
    getDiagnoses
}