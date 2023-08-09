import express from 'express';
import diagnoseRouter from './routes/diagnoses'
import patientRouter from './routes/patients'
const app = express();
app.use(express.json());

const PORT = 3001;


// Add middleware to enable CORS
app.use((_req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*'); // '*' allows any domain; you can specify specific origins
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    next();
});


app.use('/api/diagnoses', diagnoseRouter);
app.use('/api/patients', patientRouter);

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});