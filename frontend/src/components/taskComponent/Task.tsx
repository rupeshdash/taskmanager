import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Avatars from "./Avatars";
import { Tasksheet } from "./Tasksheet";


export const Task = () => {
  return (
    <div className="rounded-lg bg-white z-10">
      <Card>
        <CardHeader>
          <div className="flex justify-between text-sm mb-2">
            <p className="bg-red-500 text-white font-semibold rounded-md border border-opacity-75 px-5 py-2">
              High
            </p>
            <Tasksheet/>
          </div>
          <CardTitle className="text-base teaaxt-primary-blue font-medium">
            Listing deliverables checklist
          </CardTitle>
          <CardDescription className="text-[#768396] text-sm">
            Create content for peceland App
          </CardDescription>
        </CardHeader>
        <CardFooter>
          <div className="w-full flex justify-between items-center text-sm">
            <p className="text-primary-blue font-medium rounded-md border border-opacity-75 p-2">
              Sep 20, 2021
            </p>
            <div className="flex gap-2 items-center text-[#5A5A5A]">
              <p className="font-medium">Assigned To</p>
              <Avatars />
            </div>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};
