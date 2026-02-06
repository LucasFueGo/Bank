import bcrypt from 'bcryptjs';
import prisma from '../config/db.js';

export const register = async (req, res) => {
    const { name, password } = req.body;
    try {
        const existingUser = await prisma.user.findUnique({ where: { name } });
        if (existingUser) return res.status(400).json({ error: "Ce nom est déjà utilisé." });

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = await prisma.user.create({
            data: { name, password: hashedPassword }
        });

        res.status(201).json({ 
            message: "Utilisateur créé !", 
            user: { id: newUser.id, name: newUser.name } 
        });
    } catch (error) {
        res.status(500).json({ error: "Erreur lors de la création du compte." });
    }
};

export const login = async (req, res) => {
    const { name, password } = req.body;
    if (!name || !password) return res.status(400).json({ error: "Name and password required" });

    try {
        const user = await prisma.user.findUnique({ where: { name } });
        if (!user) return res.status(404).json({ error: "incorrect name/password" });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(401).json({ error: "incorrect name/password" });

        res.status(200).json({ userId: user.id });
    } catch (error) {
        res.status(500).json({ error: "Erreur serveur" });
    }
};