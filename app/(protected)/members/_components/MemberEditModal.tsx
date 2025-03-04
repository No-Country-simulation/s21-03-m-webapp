
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

import { MemberForm } from "./MemberForm"
import { useState } from "react";
import { Pencil } from "lucide-react";
import { Member } from "@/types/member";


export function MemberEditModal({member}:{member:Member}) {

  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild >
      <Pencil className="w-4 hover:text-chart-1 cursor-pointer" />
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Editar Miembro</DialogTitle>
          <DialogDescription>
           Edita los datos del miembro del staff
          </DialogDescription>
        </DialogHeader>
        <MemberForm member={member}  setOpen={setOpen}/>
      </DialogContent>
    </Dialog>
  )
}