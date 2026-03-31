import prisma from '../config/db.js';

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

export const getYearStats = async (req, res) => {
    const userId = req.user.userId;
    const { year } = req.query;

    if (!year) {
        return res.status(400).json({ error: "L'année est requise pour les statistiques" });
    }

    try {
        const startDate = new Date(year, 0, 1); 
        const endDate = new Date(year, 11, 31, 23, 59, 59);

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
        res.status(500).json({ error: "Erreur lors du calcul des statistiques annuelles" });
    }
};

export const getExpensesByCategory = async (req, res) => {
    const userId = req.user.userId;
    const { month, year } = req.query;

    if (!year) return res.status(400).json({ error: "L'année est requise" });

    try {
        let startDate, endDate;

        if (month) {
            startDate = new Date(year, month - 1, 1);
            endDate = new Date(year, month, 0, 23, 59, 59);
        } else {
            startDate = new Date(year, 0, 1);
            endDate = new Date(year, 11, 31, 23, 59, 59);
        }

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