import prisma from '../config/db.js';

export const createGroup = async (req, res) => {
    const userId = req.user.userId;
    const { name, icon } = req.body;

    try {
        const group = await prisma.group.create({
            data: { name, icon, userId }
        });
        res.status(201).json(group);
    } catch (error) {
        res.status(500).json({ error: "Erreur création groupe" });
    }
};

export const getGroups = async (req, res) => {
    const userId = req.user.userId;

    try {
        const groups = await prisma.group.findMany({
            where: { userId },
            include: {
                transactions: true
            }
        });

        const groupsWithTotal = groups.map(group => {
            const total = group.transactions
                .filter(t => t.type === 'DEPENSE')
                .reduce((sum, t) => sum + t.amount, 0);
            const { transactions, ...groupData } = group;
            return { ...groupData, total };
        });

        res.json(groupsWithTotal);
    } catch (error) {
        res.status(500).json({ error: "Erreur récupération groupes" });
    }
};

export const getGroupById = async (req, res) => {
    const { id } = req.params;
    const userId = req.user.userId;

    try {
        const group = await prisma.group.findFirst({
            where: { id: parseInt(id), userId },
            include: {
                transactions: {
                    orderBy: { date: 'desc' }
                }
            }
        });

        if (!group) return res.status(404).json({ error: "Groupe introuvable" });
        res.json(group);
    } catch (error) {
        res.status(500).json({ error: "Erreur serveur" });
    }
};

export const getGroupStats = async (req, res) => {
    const { id } = req.params;
    const userId = req.user.userId;

    try {
        const group = await prisma.group.findFirst({
            where: { id: parseInt(id), userId }
        });

        if (!group) return res.status(404).json({ error: "Groupe introuvable" });

        const stats = await prisma.transaction.groupBy({
            by: ['category'],
            where: {
                groupId: parseInt(id),
                type: 'DEPENSE'
            },
            _sum: { amount: true }
        });

        const formattedStats = stats.map(stat => ({
            name: stat.category,
            value: stat._sum.amount || 0
        })).sort((a, b) => b.value - a.value);

        res.json(formattedStats);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Erreur lors du calcul des stats du groupe" });
    }
};