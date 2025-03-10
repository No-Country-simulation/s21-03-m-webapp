import React from 'react';
import { useVentas } from '@/hooks/useVentas';
import { Input } from '@/components/ui/input';

export default function RangeFilter() {
    const {
        filteredRange,
        setFilteredRange
    } = useVentas();


    return (
        <>

            <Input
                type="datetime-local"
                className='w-fit text-sm'
                defaultValue={filteredRange.initial}
                onChange={(e) => setFilteredRange(prev =>
                ({
                    ...prev,
                    initial: e.target.value
                })
                )}
            />


            <Input
                type="datetime-local"
                className='w-fit text-sm'
                defaultValue={filteredRange.finish}
                onChange={(e) => setFilteredRange(prev =>
                ({
                    ...prev,
                    finish: e.target.value
                })
                )}
            />
        </>
    );
}
