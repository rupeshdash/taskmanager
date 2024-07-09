import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const AvatarComp = ({src, fallback}:{src:string,fallback:string}) => {
  return (
    <div>
      <Avatar className="w-6 h-6">
        <AvatarImage src={src} />
        <AvatarFallback>{fallback}</AvatarFallback>
      </Avatar>
    </div>
  );
};

export default AvatarComp;
