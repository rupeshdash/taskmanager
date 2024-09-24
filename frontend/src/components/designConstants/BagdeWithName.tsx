import { Badge } from "../ui/badge";
import CustomAvatar from "./CustomAvatar";

interface PropType {
    _id : string;
    name : string;
    avatar : string;
}
const BagdeWithName = ({_id , name , avatar }: PropType) => {
  return (
    <Badge
      variant={"secondary"}
      className="max-w-max mr-2 mb-2 gap-1 pt-1 pb-1"
    >
      <CustomAvatar src={avatar} alt="avatar" size="20px" />
      {_id === localStorage.getItem("userId") ? "You" : name}
    </Badge>
  );
}

export default BagdeWithName