import { Skeleton } from "@/components/ui/skeleton";

export function ChatViewSkeletonCard() {
  return (
    <div className=" flex-1  flex-col space-y-3">
      <div className="flex bg-muted items-center space-x-4 p-2 rounded-lg">
        <Skeleton className="h-9 w-9 rounded-full bg-slate-700" />
      </div>
      <div className="space-y-2">
        <Skeleton className="h-[125px]  rounded-md" />
      </div>
    </div>
  );
}
