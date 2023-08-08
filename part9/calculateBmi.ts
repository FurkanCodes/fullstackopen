

// #BMI is defined as the body mass divided by the square of the body height,

export const calculateBmi = (height: number, weight: number) => {

    const heightInCm = height / 10000
    const index = weight / (heightInCm * height)
    if (index > 25) {
        return "Abnormal (unhealthy weight)"
    } else if (index < 25) {
        return "Normal (healthy weight)"
    } else {
        return "Normal (healthy weight)"; // Handle the case when BMI is exactly 25
    }
}

console.log(calculateBmi(180, 74))