import prisma from '../config/db.js';

export const createCategory = async (req, res) => {
    const userId = req.user.userId;
    const { name } = req.body;

    try {
        const group = await prisma.group.create({
            data: { name, userId }
        });
        res.status(201).json(group);
    } catch (error) {
        res.status(500).json({ error: "Erreur création catégorie" });
    }
};

export const getCategories = async (req, res) => {
    const userId = req.user.userId;

    try {
        const categories = await prisma.group.findMany({
            where: { userId },
            include: {
                transactions: true
            }
        });

        res.json(categories);
    } catch (error) {
        res.status(500).json({ error: "Erreur récupération groupes" });
    }
};

export const getCategoryById = async (req, res) => {
    const { id } = req.params;
    const userId = req.user.userId;

    try {
        const category = await prisma.group.findFirst({
            where: { id: parseInt(id), userId },
        });

        if (!category) return res.status(404).json({ error: "Catégorie introuvable" });
        res.json(group);
    } catch (error) {
        res.status(500).json({ error: "Erreur serveur" });
    }
};