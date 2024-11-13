
import express from 'express'
import { writePayments,readPayments,getAllpayments,getpaymentyId,createPayment,updatePayment,deletePayment} from './controllers/paymentcontrollers.js';
const app = express();
const PORT = 3000;

app.use(express.json());

// Get all payments
app.get('/api/payments',getAllpayments);

// Get payment by ID
app.get('/api/payments/:id', getpaymentyId);

// Create new payment
app.post('/api/payments',createPayment );

// Update payment
app.put('/api/payments/:id', updatePayment);

// Delete payment
app.delete('/api/payments/:id',deletePayment);


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});