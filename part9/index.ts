import express from 'express';
import { calculateBmi } from './calculateBmi';
import { Request, Response } from 'express';

const app = express();
const PORT = 3003;
app.get('/hello', (_req, res) => {
    res.send("Hello full stack")

})


interface ReqQuery {
    weight: string;
    height: string;
}

app.get('/bmi', (req: Request<ReqQuery>, res: Response) => {
    const { weight, height } = req.query

    const weightInt = parseFloat(weight as string)
    const heightInt = parseFloat(height as string)
    const bmi = calculateBmi(weightInt, heightInt);

    if (!weightInt || !heightInt || weightInt <= 0 || heightInt <= 0) {
        res.status(400).json({ error: 'Malformatted parameters' });
        return;
    }

    const response = {
        weight: weight,
        height: height,
        bmi: bmi
    };
    res.json(response);
    console.log(response);
});

app.listen(PORT, () => {

    console.log(`Server running at ${PORT}`)
})