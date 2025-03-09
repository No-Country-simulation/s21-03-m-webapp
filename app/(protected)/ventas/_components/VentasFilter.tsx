import * as React from "react"

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

export function VentasFilter({ placeholder, options, select,today }:
  {
    options: { id: number, label: string }[],
    placeholder: string,
    select: React.Dispatch<React.SetStateAction<number>>,
    today:number
  }) {


  return (
    <Select defaultValue={today as any} onValueChange={(value) => select(Number(value))}>
      <SelectTrigger className="w-[100px]">
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {
            options.map(item => (
              <SelectItem
                key={item.id}
                value={item.id as any}
              >{item.label}
              </SelectItem>
            ))
          }
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}