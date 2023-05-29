

// #BMI is defined as the body mass divided by the square of the body height,
const calculateBmi = (height: number, weight: number) => {
    const heightInCm = height / 10000
    const index = weight / (heightInCm * height)
    if (index > 25) {
        return "Abnormal (unhealthy weight)"
    } else if (index < 25) {
        return "Normal (healthy weight)"
    }
}


console.log(calculateBmi(180, 74))