import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { OrderCompleteResponse } from "@/types/orders";
import { formatDate, formatNumber } from "@/lib/utils";


interface EditableOrderProps {
  order: OrderCompleteResponse;
  onSave: (updatedOrder: OrderCompleteResponse) => void;
}

export default function EditableOrder({ order, onSave }: EditableOrderProps) {
  const [editedOrder, setEditedOrder] = useState<OrderCompleteResponse>(order);

  const handleChange = (field: keyof OrderCompleteResponse, value: any) => {
    setEditedOrder((prev) => ({ ...prev, [field]: value }));
  };

  const handleItemChange = (index: number, field: string, value: any) => {
    const updatedItems = editedOrder.items.map((item, i) =>
      i === index ? { ...item, [field]: value } : item
    );
    setEditedOrder((prev) => ({ ...prev, items: updatedItems }));
  };

  return (
    <Card className="w-full max-w-2xl mx-auto bg-chart-1 p-6 rounded-xl shadow-lg">
      <CardContent>
        <h2 className="text-2xl font-bold text-white mb-6">Orden</h2>
        
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <label className="text-white font-semibold">Fecha:</label>
            <p className="text-white font-semibold">{formatDate(order.createdAt)}</p>
          </div>
          
          <div className="flex justify-between items-center">
            <label className="text-white font-semibold">Personas:</label>
            <Input
              disabled
              className="bg-white border-none text-gray-800 px-3 py-1 w-20 text-center rounded-md"
              type="number"
              value={editedOrder.people}
              onChange={(e) => handleChange("people", Number(e.target.value))}
            />
          </div>
          
          <div className="flex justify-between items-center">
            <label className="text-white font-semibold">Atendido por:</label>
            <Input
              disabled
              className="bg-white border-none text-gray-800 px-3 py-1 w-40 text-center rounded-md"
              value={editedOrder.serviceBy?.name || "Encargado"}
            />
          </div>
        </div>
        
        <h3 className="font-bold text-white mt-6">Productos:</h3>
        <div className="bg-white p-4 rounded-lg shadow-md mt-2 space-y-2">
          {editedOrder.items.map((item, index) => (
            <div key={index} className="flex justify-between border-l-4 border-chart-1 pl-3 py-2">
              <div className="flex items-center gap-2">
                <p className="text-sm text-gray-600">{item.quantity} x</p>
                <p className="text-sm font-medium">{item.name}</p>
              </div>
              <p className="text-sm font-medium">${formatNumber(item.price)}</p>
            </div>
          ))}
        </div>
        
        <div className="mt-6 space-y-2">
          <div className="flex justify-between text-white font-semibold">
            <h2>Subtotal</h2>
            <span>${formatNumber(order.subtotal)}</span>
          </div>
          
          {order.discount > 0 && (
            <div className="flex justify-between text-sm text-gray-600 font-medium">
              <h2>Descuento</h2>
              <span>- ${formatNumber(order.discount)}</span>
            </div>
          )}
          
          {order.discountPercentage > 0 && (
            <div className="flex justify-between text-sm text-gray-600 font-medium">
              <h2>Descuento (%)</h2>
              <span>- ${formatNumber(order.total * order.discountPercentage / 100)}</span>
            </div>
          )}
          
          <div className="flex justify-between text-white font-extrabold text-lg mt-4">
            <h2>TOTAL</h2>
            <span>${formatNumber(order.total)}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
