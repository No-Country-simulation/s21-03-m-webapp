import React from 'react'
import { VentasFilter } from './VentasFilter'
import { CalendarSearch } from 'lucide-react';
import { days, formatNumber, months, years } from '@/lib/utils';
import { useVentas } from '@/hooks/useVentas';


export type Options = {
    id: number,
    label: string
}
export default function VentasMenu() {

    const {
        setSelectedDay,
        setSelectedMonth,
        setSelectedYear,
        initialValues,
        totalFacturation,
        totalPeople,
        avaragePerPeople,
        sortedOrders
    } = useVentas()




    return (
        <div className='border p-2 rounded-lg shadow-sm min-w-fit w-full'>
            <div className='flex p-2 gap-5 items-center justify-evenly '>
                <CalendarSearch className='min-w-8' />
                <VentasFilter
                    options={days}
                    placeholder={"Día"}
                    select={setSelectedDay}
                    today={initialValues.day}
                />
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


            {
                sortedOrders.length > 0 &&
                <div className='my-5 flex justify-center items-center gap-5'>

                    <p className='text-sm  font-bold'>Personas:
                        <span className='text-gray-500 font-normal'> {totalPeople}</span></p>
                    <p className='text-sm  font-bold'>Promedio por Persona:
                        <span className='text-gray-500 font-normal'> ${formatNumber(avaragePerPeople)} </span></p>
                    <p className='text-sm  font-bold'>Facturación Total:
                        <span className='text-gray-500 font-normal'> ${formatNumber(totalFacturation)}</span></p>
                </div>

            }


        </div>
    )
}
