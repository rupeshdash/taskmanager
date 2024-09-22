import { Skeleton } from "../ui/skeleton";

export function SkeletonLoading() {
    console.log("kwjefhiweugf");
    
  return (
    <div className="flex flex-col space-y-3 w-full">
      <Skeleton className="h-[200px] w-full rounded-xl bg-custom-grey" />
      <div className="space-y-2">
        <Skeleton className="h-4 w-[250px] bg-custom-grey" />
        <Skeleton className="h-4 w-[200px] bg-custom-grey" />
      </div>
    </div>
  );
}
