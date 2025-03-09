import React, { useState } from 'react'
import { VentasFilter } from './VentasFilter'
import { CalendarSearch } from 'lucide-react';
import { days, months, years } from '@/lib/utils';
import { useVentas } from '@/hooks/useVentas';


export type Options = {
    id: number,
    label: string
}
export default function VentasMenu() {

    const date= new Date()

     const initialValues={
           day:date.getDay()+2,
           month:date.getMonth()+1,
           year:date.getFullYear()
       }
    const {setSelectedDay,
        setSelectedMonth,
        setSelectedYear}=useVentas()
  
        
    return (
        <div className='border p-2 rounded-lg shadow-sm'>
            <div className='flex p-2 gap-5 items-center justify-evenly'>
                <CalendarSearch />
                <VentasFilter
                    options={days}
                    placeholder={"Día"}
                    select={setSelectedDay}
                    today={initialValues.day}
                />

                <VentasFilter
                    options={months}
                    placeholder={"Mes"}
                    select={setSelectedMonth}
                    today={initialValues.month}
                />


                <VentasFilter
                    options={years}
                    placeholder={"Año"}
                    select={setSelectedYear}
                    today={initialValues.year}
                />

            </div>


            <div className='flex justify-end'>
                Facturación Total:
            </div>

        </div>
    )
}
