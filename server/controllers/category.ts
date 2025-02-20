import { Request, Response } from "express";
import Category from "../models/Category";

export const create = async (req: Request, res: Response) => {
    const { name, description } = req.body;

    if (!name?.trim() || !description?.trim()) {
        return res.status(400).json({
            msg: 'Debes ingresar un nombre y una descripcion.'
        });
    }

    try {
        await new Category({ ownerId: req.ownerId, name, description }).save();

        return res.status(200).json({
            msg: 'Categoria Creada Correctamente.'
        });
    } catch (error) {
        return res.status(500).json({
            msg: 'Ocurrio un problema en el servidor.'
        });
    }
}

export const getAll = async (req: Request, res: Response) => {
    try {
        const categories = await Category.find({ ownerId: req.ownerId }).select("_id name description image")

        return res.status(200).json({
            categories: categories
        });
    } catch (error) {
        return res.status(500).json({
            msg: 'Ocurrio un problema en el servidor.'
        });
    }
}

export const edit = async (req: Request, res: Response) => {
    const { id } = req.params
    const { name, description } = req.body;

    const category = await Category.findById(id)
    if (!category) {
        return res.status(404).json({
            msg: "No existe la categoria."
        })
    }

    if (category.ownerId?.toString() !== req.ownerId?.toString()) {
        return res.status(403).json({
            msg: "No tiene permiso para editar categoria."
        })
    }

    if (!name?.trim() || !description?.trim()) {
        return res.status(400).json({
            msg: 'Debes ingresar un nombre y una descripcion.'
        });
    }

    try {
        category.name = name
        category.description = description

        await category.save();

        return res.status(200).json({
            msg: 'Categoria Editada Correctamente.'
        });
    } catch (error) {
        return res.status(500).json({
            msg: 'Ocurrio un problema en el servidor.'
        });
    }
}

export const remove = async (req: Request, res: Response) => {
    const { id } = req.params

    const category = await Category.findById(id)
    if (!category) {
        return res.status(404).json({
            msg: "No existe la categoria."
        })
    }

    if (category.ownerId?.toString() !== req.ownerId?.toString()) {
        return res.status(403).json({
            msg: "No tiene permiso para eliminar categoria."
        })
    }

    try {
        await category.deleteOne();

        return res.status(200).json({
            msg: 'Categoria Eliminada Correctamente.'
        });
    } catch (error) {
        return res.status(500).json({
            msg: 'Ocurrio un problema en el servidor.'
        });
    }
}
