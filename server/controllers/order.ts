import { Request, Response } from "express";
import Order from "../models/Order";
import Product from "../models/Product";

export const create = async (req: Request, res: Response) => {
    const { tableNumber, people, items, discount, discountPercentage } = req.body;

    if (!tableNumber?.trim() || !people) {
        return res.status(400).json({
            msg: 'Los campos numero de mesa y cantidad de personas son obligatorios.'
        });
    }

    if (!items || items.length === 0) {
        return res.status(400).json({ msg: "La orden debe contener al menos un producto." });
    }

    try {
        const orderExist = await Order.find({ tableNumber, status: 'pending' })
        if (orderExist) {
            return res.status(400).json({ msg: `Existe una orden pendiente en la mesa ${tableNumber}.` });
        }

        let subtotal = 0;
        for (const item of items) {
            const product = await Product.findById(item.productId);
            if (!product) {
                return res.status(404).json({ msg: `Producto con ID ${item.productId} no encontrado` });
            }
            subtotal += product.price * item.quantity;
            item.price = product.price
        }

        const discountPer = discountPercentage ? (subtotal * discountPercentage) / 100 : 0;
        const total = subtotal - (discount || 0) - discountPer;

        const newOrder = new Order({
            ownerId: req.ownerId,
            tableNumber,
            people,
            items,
            subtotal,
            discount,
            total
        });

        await newOrder.save();

        return res.status(201).json({
            msg: 'Orden Creada Correctamente.',
            order: newOrder
        });
    } catch (error) {
        return res.status(500).json({
            msg: 'Ocurrio un problema en el servidor.'
        });
    }
}

export const getAll = async (req: Request, res: Response) => {
    try {
        const orders = await Order.find({ ownerId: req.ownerId })
            .populate("items.productId", "name")
            .select("-__v -createdAt -updatedAt -ownerId -items._id ")

        return res.status(200).json({
            orders: orders
        });
    } catch (error) {
        return res.status(500).json({
            msg: 'Ocurrio un problema en el servidor.'
        });
    }
}

export const edit = async (req: Request, res: Response) => {
    const { id } = req.params
    const { tableNumber, people, items, discount } = req.body;

    try {
        const order = await Order.findOne({ _id: id, status: 'pending' })
        if (!order) {
            return res.status(404).json({
                msg: "No existe la orden o ya no es posible editar."
            })
        }

        if (order.ownerId?.toString() !== req.ownerId?.toString()) {
            return res.status(403).json({
                msg: "No tiene permiso para editar la orden.",
            });
        }

        if (!tableNumber?.trim() || !people) {
            return res.status(400).json({
                msg: 'Los campos numero de mesa y cantidad de personas son obligatorios.'
            });
        }

        if (!items || items.length === 0) {
            return res.status(400).json({ msg: "La orden debe contener al menos un producto." });
        }

        let subtotal = 0;
        for (const item of items) {
            const product = await Product.findById(item.productId);
            if (!product) {
                return res.status(404).json({ msg: `Producto con ID ${item.productId} no encontrado` });
            }
            subtotal += product.price * item.quantity;
        }

        const total = subtotal - (discount || 0);

        order.tableNumber = tableNumber
        order.people = people
        order.items = items
        order.discount = discount
        order.subtotal = subtotal
        order.total = total

        await order.save();

        return res.status(200).json({
            msg: 'Orden Editada Correctamente.',
            order
        });
    } catch (error) {
        return res.status(500).json({
            msg: 'Ocurrio un problema en el servidor.'
        });
    }
}

export const updateStatus = async (req: Request, res: Response) => {
    const { id, status } = req.body;

    const order = await Order.findById(id)
    if (!order) {
        return res.status(404).json({
            msg: "No existe la orden."
        })
    }
    try {
        order.status = status
        await order.save();

        return res.status(200).json({
            msg: 'Estado Actualizado Correctamente.'
        });
    } catch (error) {
        return res.status(500).json({
            msg: 'Ocurrio un problema en el servidor.'
        });
    }
}

/* export const getAllStatusPending = async (req: Request, res: Response) => {
    try {
        const orders = await Order.find({ ownerId: req.ownerId, status: 'pending' })
            .populate("items.productId", "name")
            .select("-__v -createdAt -updatedAt -ownerId -items._id ")

        return res.status(200).json({
            orders: orders
        });
    } catch (error) {
        return res.status(500).json({
            msg: 'Ocurrio un problema en el servidor.'
        });
    }
} */

export const getOrderByTable = async (req: Request, res: Response) => {
    try {
        const { tableNumber } = req.params

        const order = await Order.findOne({ ownerId: req.ownerId, tableNumber: tableNumber, status: 'pending' })
            .populate("items.productId", "name")
            .select("-__v -createdAt -updatedAt -ownerId -items._id ")

        return res.status(200).json({
            order: order
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
        const order = await Order.findById(id)
        if (!order) {
            return res.status(404).json({
                msg: "No existe la orden."
            })
        }

        if (order.ownerId?.toString() !== req.ownerId?.toString()) {
            return res.status(403).json({
                msg: "No tiene permiso para eliminar la orden."
            })
        }

        await order.deleteOne();

        return res.status(200).json({
            msg: 'Orden Eliminada Correctamente.'
        });
    } catch (error) {
        return res.status(500).json({
            msg: 'Ocurrio un problema en el servidor.'
        });
    }
}