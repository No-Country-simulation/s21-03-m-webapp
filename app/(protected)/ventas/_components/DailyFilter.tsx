import React from 'react'
import { VentasFilter } from './VentasFilter'
import { useVentas } from '@/hooks/useVentas'
import { days, months, years } from '@/lib/utils';
export default function DailyFilter() {

      const {
        selectedDay,
        selectedMonth,
        selectedYear,
            setSelectedDay,
            setSelectedMonth,
            setSelectedYear,
            initialValues,
        } = useVentas()
  return (
    <>  
        <VentasFilter
                        options={days}
                        placeholder={"Día"}
                        select={setSelectedDay}
                        today={selectedDay ||initialValues.day}
                    />
    
                    <VentasFilter
                        options={months}
                        placeholder={"Mes"}
                        select={setSelectedMonth}
                        today={selectedMonth ||initialValues.month}
                    />
    
    
                    <VentasFilter
                        options={years}
                        placeholder={"Año"}
                        select={setSelectedYear}
                        today={selectedYear ||initialValues.year}
                    />
                    </>
  )
}
