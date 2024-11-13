import { promises as fs } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);


const PAYMENTS_FILE = join(__dirname, 'payments.json');

// Helper function to read payments
export const readPayments=async () =>{
    try {
        const data = await fs.readFile(PAYMENTS_FILE, 'utf8');
        return JSON.parse(data);
    } catch (error) {
        return [];
    }
}

// Helper function to write payments
export const writePayments=async(payments) =>{
    await fs.writeFile(PAYMENTS_FILE, JSON.stringify(payments, null, 2));
}


export const getAllpayments= async (req, res) => {
    try {
        const payments = await readPayments();
        res.json(payments);
    } catch (error) {
        res.status(500).json({ error: 'Error reading payments' });
    }
}
export const getpaymentyId=async (req, res) => {
    try {
        const payments = await readPayments();
        const payment = payments.find(p => p.id === req.params.id);
        if (!payment) {
            return res.status(404).json({ error: 'Payment not found' });
        }
        res.json(payment);
    } catch (error) {
        res.status(500).json({ error: 'Error reading payment' });
    }
}

export const createPayment=async (req, res) => {
    try {
        const payments = await readPayments();
        const newPayment = {
            id: req.body.id,
            studentId: req.body.studentId,
            amount: req.body.amount,
            paymentDate: req.body.paymentDate,
            description: req.body.description,
            status: req.body.status 
        };
        
        payments.push(newPayment);
        await writePayments(payments);
        res.status(201).json(newPayment);
    } catch (error) {
        res.status(500).json({ error: 'Error creating payment' });
    }
}

export const updatePayment=async (req, res) => {
    try {
        const payments = await readPayments();
        const index = payments.findIndex(p => p.id === req.params.id);
        
        if (index === -1) {
            return res.status(404).json({ error: 'Payment not found' });
        }

        payments[index] = {
            ...payments[index],
            ...req.body,
            id: req.params.id
        };

        await writePayments(payments);
        res.json(payments[index]);
    } catch (error) {
        res.status(500).json({ error: 'Error updating payment' });
    }
}

export const deletePayment= async (req, res) => {
    try {
        const payments = await readPayments();
        const filteredPayments = payments.filter(p => p.id !== req.params.id);
        
        if (filteredPayments.length === payments.length) {
            return res.status(404).json({ error: 'Payment not found' });
        }

        await writePayments(filteredPayments);
        res.json({ message: 'Payment deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Error deleting payment' });
    }
}