import * as React from 'react';

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

export function VentasFilter({ placeholder, options, select,today }:
  {
    options: { id: number, label: string }[],
    placeholder?: string,
    select: React.Dispatch<React.SetStateAction<number>>,
    today?:number
  }) {


  return (
    <Select defaultValue={String(today)} onValueChange={(value) => select(Number(value))}>
      <SelectTrigger className="w-[100px]">
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {
            options.map(item => (
              <SelectItem
                key={item.id}
                value={String(item.id)}
              >{item.label}
              </SelectItem>
            ))
          }
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}
