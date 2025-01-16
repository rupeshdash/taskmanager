import {  editIcon } from "@/assets/Images";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Sheet,
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
} from "@/Redux/TeamsDetails/TeamDetailsActions";

import {  useState } from "react";
import { useSelector } from "react-redux";
import { Textarea } from "../ui/textarea";
import AddMembers from "./AddMembers";
import { getTodayDate } from "./teamsHelper";

export interface MemberType {
  _id: string;
  email: string;
  name: string;
  avatar: string;
}
interface TeamProps {
  _id: string;
  title: string;
  description: string;
  admin: {
    email: string;
  };
  isAdmin: boolean;
  members: MemberType[];
}
interface PropType {
  source: string;
  team?: TeamProps;
  isAdmin?: boolean;
}
export function CreateTeamComponent({ source, team, isAdmin }: PropType) {
  const authData = useSelector((state: any) => state.authData);
  const dispatch = useAppDispatch();
  const [newMembers, setNewMembers] = useState<
    { _id: string; email: string; avatar: string; name: string; }[]
  >(
    team?.members || [
      {
        _id: authData?.userId,
        email: authData?.userEmail,
        avatar: authData?.avatar,
        name: authData?.userName,
      },
    ]
  );
  const [teamDetails, setTeamDetails] = useState({
    admin: team?.admin?.email || "",
    members: team?.members || [],
    description: team?.description || "",
    title: team?.title || "",
    createdAt: "",
    [team?._id ? "_id" : ""]: team?._id,
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
    dispatch(
      createTeam(requestBody, { headers: requestHeader }, authData?.userEmail)
    );
  }
  return (
    <div onClick={(e) => e.stopPropagation()}>
      <Sheet>
        {source === "update" && isAdmin && (
          <>
            <SheetTrigger asChild>
              <span
                className="absolute right-3 h-6 top-[0.8rem] cursor-pointer"
                onClick={(e) => e.stopPropagation()}
              >
                {editIcon()}
              </span>
            </SheetTrigger>
          </>
        )}
        {source === "create" && (
          <SheetTrigger asChild>
            <button className="btn-primary flex items-center gap-3 bg-primary-purple-2">
              <span className="text-primary-purple font-semibold">+</span>
              <span className="text-primary-purple font-semibold">
                Create team
              </span>
            </button>
          </SheetTrigger>
        )}
        <SheetContent>
          {source === "create" && (
            <SheetHeader>
              <SheetTitle>Create your team</SheetTitle>
              <SheetDescription>
                Create a team to kickstart collaboration and achieve your
                goals...
              </SheetDescription>
            </SheetHeader>
          )}

          {source === "update" && (
            <SheetHeader>
              <SheetTitle>Update your team details</SheetTitle>
              <SheetDescription>
                View and update your team details ...
              </SheetDescription>
            </SheetHeader>
          )}

          <div className="grid gap-4 py-4 ">
            <div className="flex flex-col md:grid md:grid-cols-4 md:items-center gap-4">
              <Label htmlFor="title" className="text-left mb-2">
                Title
              </Label>
              <Input
                id="title"
                placeholder="Enter your team's title here."
                defaultValue={teamDetails?.title}
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
                defaultValue={teamDetails?.description}
                maxLength={150}
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
            <Button
              onClick={handleCreateTeam}
              disabled={!teamDetails.title || !teamDetails?.members}
            >
              {source === "create" ? "Create" : "Update"}
            </Button>
            {/* </SheetClose> */}
          </SheetFooter>
        </SheetContent>
      </Sheet>
    </div>
  );
}
