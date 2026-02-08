import prisma from '../config/db.js';

export const getAllTransactions = async (req, res) => {
    try {
        const transactions = await prisma.transaction.findMany({
            where: {
                userId: req.user.userId
            },
            orderBy: {
                date: 'desc'
            }
        });

        res.status(200).json(transactions);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Erreur lors de la récupération des transactions" });
    }
};

export const createTransaction = async (req, res) => {
    const userId = req.user.userId;
    const { amount, type, description, date} = req.body;
    console.log(userId);
    console.log(amount);
    console.log(type);
    console.log(description);
    try {
        const newTransaction = await prisma.transaction.create({
            data: {
                amount: parseFloat(amount),
                type: type,
                description: description,
                userId: userId,
            }
        });

        res.status(201).json(newTransaction);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Erreur lors de la création de la transaction" });
    }
};