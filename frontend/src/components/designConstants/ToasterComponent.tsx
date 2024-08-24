import { useEffect } from "react"
import { useToast } from "@/components/ui/use-toast";
export const ToasterComponent = () => {
const { toast } = useToast();
console.log("ddewd");
         toast({
           title: "Scheduled: Catch up",
           description: "Friday, February 10, 2023 at 5:57 PM",
         });
}

export default ToasterComponent