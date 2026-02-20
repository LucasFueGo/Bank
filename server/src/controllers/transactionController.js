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
    const { amount, type, description, categoryId, date, groupId} = req.body;
    try {
        const newTransaction = await prisma.transaction.create({
            data: {
                amount: parseFloat(amount),
                type: type,
                description: description,
                categoryId: categoryId || 1,
                date: date ? new Date(date) : new Date(),
                userId: userId,
                groupId: groupId ? parseInt(groupId) : null,
            }
        });

        res.status(201).json(newTransaction);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Erreur lors de la création de la transaction" });
    }
};

export const getTransactions = async (req, res) => {
    const userId = req.user.userId;
    const { month, year } = req.query;

    try {
        let whereClause = { userId };

        if (month && year) {
            const startDate = new Date(year, month - 1, 1);
            const endDate = new Date(year, month, 0, 23, 59, 59);

            whereClause.date = {
                gte: startDate,
                lte: endDate
            };
        }

        const transactions = await prisma.transaction.findMany({
            where: whereClause,
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

export const getTransactionById = async (req, res) => {
    const { id } = req.params;
    const userId = req.user.userId;

    try {
        const transaction = await prisma.transaction.findFirst({
            where: { 
                id: parseInt(id), 
                userId: userId 
            },
            include: {
                category: true,
                group: true
            }
        });

        if (!transaction) {
            return res.status(404).json({ error: "Transaction introuvable" });
        }

        res.status(200).json(transaction);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Erreur lors de la récupération de la transaction" });
    }
};

export const getMonthlyStats = async (req, res) => {
    const userId = req.user.userId;
    const { month, year } = req.query;

    if (!month || !year) {
        return res.status(400).json({ error: "Mois et année requis pour les statistiques" });
    }

    try {
        const startDate = new Date(year, month - 1, 1);
        const endDate = new Date(year, month, 0, 23, 59, 59);

        const stats = await prisma.transaction.groupBy({
            by: ['type'],
            where: {
                userId: userId,
                date: {
                    gte: startDate,
                    lte: endDate
                }
            },
            _sum: {
                amount: true
            }
        });

        let income = 0;
        let expense = 0;

        stats.forEach(stat => {
            if (stat.type === 'GAIN') income = stat._sum.amount || 0;
            if (stat.type === 'DEPENSE') expense = stat._sum.amount || 0;
        });

        res.status(200).json({
            income,
            expense,
            balance: income - expense
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Erreur lors du calcul des statistiques" });
    }
};

export const getExpensesByCategory = async (req, res) => {
    const userId = req.user.userId;
    const { month, year } = req.query;

    if (!month || !year) return res.status(400).json({ error: "Mois et année requis" });

    try {
        const startDate = new Date(year, month - 1, 1);
        const endDate = new Date(year, month, 0, 23, 59, 59);

        const stats = await prisma.transaction.groupBy({
            by: ['categoryId'],
            where: {
                userId: userId,
                type: 'DEPENSE',
                date: { gte: startDate, lte: endDate }
            },
            _sum: { amount: true }
        });

        const categoryIds = stats.map(s => s.categoryId).filter(id => id !== null);
        const categories = await prisma.category.findMany({
            where: { id: { in: categoryIds } }
        });

        const formattedStats = stats.map(stat => {
            const categoryObj = categories.find(c => c.id === stat.categoryId);
            return {
                name: categoryObj ? categoryObj.name : 'Inconnue',
                value: stat._sum.amount || 0
            };
        }).sort((a, b) => b.value - a.value);

        res.status(200).json(formattedStats);

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Erreur lors du calcul par catégorie" });
    }
};

export const updateTransaction = async (req, res) => {
    const { id } = req.params;
    const userId = req.user.userId;
    
    const { amount, type, description, categoryId, date, groupId } = req.body;

    try {
        const existingTransaction = await prisma.transaction.findFirst({
            where: {
                id: parseInt(id),
                userId: userId
            }
        });

        if (!existingTransaction) {
            return res.status(404).json({ error: "Transaction introuvable ou non autorisée" });
        }

        const updatedTransaction = await prisma.transaction.update({
            where: {
                id: parseInt(id)
            },
            data: {
                amount: parseFloat(amount),
                type,
                description,
                categoryId: parseInt(categoryId), 
                date: date ? new Date(date) : undefined,
                groupId: groupId ? parseInt(groupId) : null
            }
        });

        res.status(200).json(updatedTransaction);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Erreur lors de la modification" });
    }
};