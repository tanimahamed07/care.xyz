import Container from "../common/Container";

const ServicesOverviewSkeleton = () => {
  return (
    <section className="py-20 bg-base-100">
      <Container>
        {/* Header Skeleton */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-16 gap-6">
          <div className="text-center md:text-left space-y-4">
            {/* "Available Services" badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/10 mx-auto md:mx-0">
              <div className="h-4 w-32 bg-accent/20 rounded-full animate-pulse" />
            </div>

            {/* Title */}
            <div className="space-y-2">
              <div className="h-10 md:h-12 lg:h-14 w-96 bg-gray-200 rounded-lg animate-pulse mx-auto md:mx-0" />
              <div className="h-10 md:h-12 lg:h-14 w-80 bg-gray-200 rounded-lg animate-pulse mx-auto md:mx-0 -mt-3" />
            </div>

            {/* Description */}
            <div className="h-5 w-96 md:w-[28rem] bg-gray-200 rounded animate-pulse mx-auto md:mx-0 mt-4" />
            <div className="h-5 w-80 bg-gray-200 rounded animate-pulse mx-auto md:mx-0 mt-2" />
          </div>

          {/* View All Button - Desktop */}
          <div className="hidden md:block">
            <div className="h-12 w-48 bg-gray-200 rounded-xl animate-pulse" />
          </div>
        </div>

        {/* Cards Grid Skeleton */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {[...Array(6)].map((_, index) => (
            <div
              key={index}
              className="rounded-2xl border border-gray-100 p-6 space-y-6 bg-white" // ServiceCard-এর সাথে মিল রাখতে p-6 এবং bg-white ধরে নিচ্ছি
            >
              {/* Image placeholder */}
              <div className="h-48 w-full rounded-xl bg-gray-200 animate-pulse" />

              {/* Title */}
              <div className="h-7 w-3/4 bg-gray-200 rounded animate-pulse" />

              {/* Description */}
              <div className="space-y-3">
                <div className="h-4 w-full bg-gray-200 rounded animate-pulse" />
                <div className="h-4 w-5/6 bg-gray-200 rounded animate-pulse" />
                <div className="h-4 w-4/5 bg-gray-200 rounded animate-pulse" />
              </div>

              {/* Button or price area */}
              <div className="h-10 w-full bg-gray-200 rounded-xl animate-pulse" />
            </div>
          ))}
        </div>

        {/* Mobile View All Button */}
        <div className="mt-10 md:hidden">
          <div className="h-12 w-full bg-primary/10 rounded-2xl animate-pulse" />
        </div>
      </Container>
    </section>
  );
};

export default ServicesOverviewSkeleton;
