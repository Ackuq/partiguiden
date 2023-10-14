import LoadingCard from "./card";

export default function LoadingListWithFilter() {
  return (
    <div
      role="status"
      className="mx-4 mb-4 flex gap-2 2xl:container 2xl:mx-auto"
    >
      <div className="flex w-full flex-col gap-4">
        <LoadingCard />
        <LoadingCard />
        <LoadingCard />
        <LoadingCard />
        <LoadingCard />
      </div>
      <div className="hidden w-80 animate-pulse bg-slate-200 dark:bg-slate-800 sm:block" />
    </div>
  );
}
