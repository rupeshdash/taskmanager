import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const Avatars = () => {
  return (
    <div>
      <Avatar className="w-6 h-6">
        <AvatarImage src="https://github.com/shadcn.png" />
        <AvatarFallback>CN</AvatarFallback>
        <AvatarFallback>CN</AvatarFallback>
        <AvatarFallback>kn</AvatarFallback>
      </Avatar>
    </div>
  );
};

export default Avatars;
