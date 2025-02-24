import { Request, Response } from "express";
import Product from "../models/Product";

export const create = async (req: Request, res: Response) => {
    const { categoryId, name, description, price, target } = req.body;

    if (!categoryId?.trim() || !name?.trim() || !description?.trim() || !price) {
        return res.status(400).json({
            msg: 'Los campos nombre, precio, descripcion, objetivo y categoria son obligatorios.'
        });
    }

    try {

      const product= await new Product({ ownerId: req.ownerId, categoryId, name, description, price, target:target.toLowerCase() }).save();
  
        return res.status(200).json({
            msg: 'Producto Creado Correctamente.',
            product
        });
    } catch (error) {
        return res.status(500).json({
            msg: 'Ocurrio un problema en el servidor.',
            error
        });
    }
}

export const getAll = async (req: Request, res: Response) => {
    try {
        const products = await Product.find({ ownerId: req.ownerId }).select("_id name description price image target categoryId")

        return res.status(200).json({
            products
        });
    } catch (error) {
        return res.status(500).json({
            msg: 'Ocurrio un problema en el servidor.'
        });
    }
}

export const getByCategory = async (req: Request, res: Response) => {
    const { categoryId } = req.params
    try {
        const products = await Product.find({ ownerId: req.ownerId, categoryId }).select("_id name description price image target")

        return res.status(200).json({
            products
        });
    } catch (error) {
        return res.status(500).json({
            msg: 'Ocurrio un problema en el servidor.'
        });
    }
}

export const edit = async (req: Request, res: Response) => {
    const { id } = req.params
    const { categoryId, name, description, price, target } = req.body;

    const product = await Product.findById(id)
    if (!product) {
        return res.status(404).json({
            msg: "No existe el producto.",
            product
        })
    }

    if (product.ownerId?.toString() !== req.ownerId?.toString()) {
        return res.status(400).json({
            msg: "No tiene permiso para editar producto.",
        });
    }

    if (!categoryId?.trim() || !name?.trim() || !description?.trim() || !price) {
        return res.status(400).json({
            msg: 'Los campos nombre, precio, descripcion, objetivo y categoria son obligatorios.'
        });
    }

    try {
        product.categoryId = categoryId
        product.name = name
        product.description = description
        product.price = price
        product.target = target

        await product.save();

        return res.status(200).json({
            msg: 'Producto Editado Correctamente.'
        });
    } catch (error) {
        return res.status(500).json({
            msg: 'Ocurrio un problema en el servidor.'
        });
    }
}

export const remove = async (req: Request, res: Response) => {
    const { id } = req.params
    try {
        const product = await Product.findById(id)
        if (!product) {
            return res.status(404).json({
                msg: "No existe el producto."
            })
        }

        if (product.ownerId?.toString() !== req.ownerId?.toString()) {
            return res.status(403).json({
                msg: "No tiene permiso para eliminar producto."
            })
        }

        await product.deleteOne();

        return res.status(200).json({
            msg: 'Producto Eliminado Correctamente.'
        });
    } catch (error) {
        return res.status(500).json({
            msg: 'Ocurrio un problema en el servidor.'
        });
    }
}
