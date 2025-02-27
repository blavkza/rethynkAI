import { Skeleton } from "@/components/ui/skeleton";

export function ChatSkeletonCard() {
  return (
    <div className="   flex-col space-y-3">
      <Skeleton className="h-6 w-[350px] rounded-md" />
      <Skeleton className="h-6 w-[350px] rounded-md" />
      <Skeleton className="h-6 w-[350px] rounded-md" />
      <Skeleton className="h-6 w-[350px] rounded-md" />
      <Skeleton className="h-6 w-[350px] rounded-md" />
    </div>
  );
}
