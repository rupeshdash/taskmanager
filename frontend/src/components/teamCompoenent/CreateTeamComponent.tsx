import { addImage } from "@/assets/Images";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useAppDispatch } from "@/Redux/store";
import {
  createTeam,
  getAllTeams,
} from "@/Redux/TeamsDetails/TeamDetailsActions";

import { PlusIcon } from "lucide-react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { DatePicker } from "../taskComponent/DatePicker";
import MemberSelector from "../taskComponent/MemberSelector";
import Priority from "../taskComponent/Priority";
import { Textarea } from "../ui/textarea";
import AddMembers from "./AddMembers";
import { getTodayDate } from "./teamsHelper";

export function CreateTeamComponent() {
  const authData = useSelector((state: any) => state.authData);
  const teamData = useSelector((state: any) => state.teamData);
  const dispatch = useAppDispatch();
  const [newMembers, setNewMembers] = useState([]);
  const [teamDetails, setTeamDetails] = useState({
    admin: "",
    members: [],
    description: "",
    title: "",
    createdAt: "",
  });
   function handleCreateTeam() {
    const requestHeader = {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    };

    const requestBody = {
      ...teamDetails,
      admin: authData?.userEmail,
      createdAt: getTodayDate(),
      members: newMembers,
    };
    setTeamDetails({
      admin: "",
      members: [],
      description: "",
      title: "",
      createdAt: "",
    });
     dispatch(createTeam(requestBody, { headers: requestHeader } ,authData?.userEmail ));

   
  }
  return (
    <Sheet>
      <SheetTrigger asChild>
        <button className="bg-[#E8EAFF] rounded-lg p-2 hover:bg-[#b3b8f9]">
          <div className="team-add">{addImage()}</div>
        </button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Create your team</SheetTitle>
          <SheetDescription>
            Create a team to kickstart collaboration and achieve your goals...
          </SheetDescription>
        </SheetHeader>
        <div className="grid gap-4 py-4 ">
          <div className="flex flex-col md:grid md:grid-cols-4 md:items-center gap-4">
            <Label htmlFor="title" className="text-left mb-2">
              Title
            </Label>
            <Input
              id="title"
              placeholder="Enter your team's title here."
              className="col-span-3"
              onChange={(e: any) => {
                setTeamDetails((prev) => {
                  return {
                    ...prev,
                    title: e.target.value,
                  };
                });
              }}
            />
          </div>
          <div className="flex flex-col md:grid md:grid-cols-4 md:items-center gap-4">
            <Label htmlFor="description" className="text-left">
              Description
            </Label>
            <Textarea
              id="description"
              placeholder="design the ui for the profile"
              className="col-span-3"
              onChange={(e: any) => {
                setTeamDetails((prev) => {
                  return {
                    ...prev,
                    description: e.target.value,
                  };
                });
              }}
            />
          </div>
        </div>
        <div className=" gap-5 my-8 flex-wrap">
          <AddMembers newMembers={newMembers} setNewMembers={setNewMembers} />
        </div>
        <SheetFooter>
          {/* <SheetClose asChild> */}
          <Button type="submit" onClick={handleCreateTeam} disabled={!teamDetails.title || !teamDetails?.members}>
            {teamData?.createTeamLoading ? "Creating..." : "Create"}
          </Button>
          {/* </SheetClose> */}
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
