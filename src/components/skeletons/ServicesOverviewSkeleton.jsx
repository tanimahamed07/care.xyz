import Container from "../common/Container";

const ServicesOverviewSkeleton = ( ) => {
  return (
    <div className="rounded-2xl border border-gray-200 p-4 space-y-4">
      <div className="h-40 w-full rounded-xl bg-gray-200 animate-pulse" />
      <div className="h-5 w-3/4 bg-gray-200 rounded animate-pulse" />
      <div className="space-y-2">
        <div className="h-4 w-full bg-gray-200 rounded animate-pulse" />
        <div className="h-4 w-5/6 bg-gray-200 rounded animate-pulse" />
      </div>
      <div className="flex gap-4">
        <div className="h-4 w-20 bg-gray-200 rounded animate-pulse" />
        <div className="h-4 w-20 bg-gray-200 rounded animate-pulse" />
      </div>
      <div className="h-10 w-full bg-gray-200 rounded-xl animate-pulse" />
    </div>
  );
};

export default ServicesOverviewSkeleton;
