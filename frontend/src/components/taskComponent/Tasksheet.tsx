import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import Priority from "./Priority"
import { DatePicker } from "./DatePicker"
import MemberSelector from "./MemberSelector"
import { PlusIcon } from "lucide-react"


export function Tasksheet() {

  
  return (
    <Sheet>
      <SheetTrigger asChild>
      <button className='bg-[#E8EAFF] rounded-lg p-2 hover:bg-[#b3b8f9]'><PlusIcon strokeWidth={3} size={20} color='#6772FE'/>
      </button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Edit profile</SheetTitle>
          <SheetDescription>
            Make changes to your profile here. Click save when you're done.
          </SheetDescription>
        </SheetHeader>
        <div className="grid gap-4 py-4 ">
          <div className="flex flex-col md:grid md:grid-cols-4 md:items-center gap-4">
            <Label htmlFor="title" className="text-left mb-2">
              Title
            </Label>
            <Input id="title" defaultValue="Profile ui" className="col-span-3" />
          </div>
          <div className="flex flex-col md:grid md:grid-cols-4 md:items-center gap-4">
            <Label htmlFor="description" className="text-left">
              Description
            </Label>
            <Input id="description" defaultValue="design the ui for the profile" className="col-span-3" />
          </div>
        </div>
        <div className="flex gap-5 my-8 flex-wrap">
          <Priority/>
          <DatePicker/>
          <MemberSelector/>
        </div>
        <SheetFooter>
          <SheetClose asChild>
            <Button type="submit">Save changes</Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  )
}
