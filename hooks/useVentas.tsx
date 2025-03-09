import { VentasContext } from "@/context/VentasContext"
import { useContext } from "react"


export const useVentas=()=>{
    const context=useContext(VentasContext)
    if(!context) throw new Error("No existe tal contexto")
    return context
}