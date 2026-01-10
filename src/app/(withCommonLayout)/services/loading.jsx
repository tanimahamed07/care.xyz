import Container from "@/components/common/Container";

const loading = () => {
  return (
    <section className="py-16 bg-base-100 min-h-screen">
      <Container>
        {/* Header Skeleton */}
        <div className="text-center mb-16 space-y-4">
          {/* "All Services" badge skeleton */}
          <div className="inline-flex items-center px-4 py-1.5 rounded-full bg-accent/10 mx-auto">
            <div className="h-5 w-24 bg-accent/20 rounded-full animate-pulse" />
          </div>

          {/* Title Skeleton */}
          <div className="flex flex-col items-center space-y-3">
            <div className="h-10 md:h-12 w-3/4 max-w-lg bg-gray-200 rounded-lg animate-pulse" />
            <div className="h-10 md:h-12 w-1/2 max-w-sm bg-gray-200 rounded-lg animate-pulse" />
          </div>

          {/* Description Skeleton */}
          <div className="flex flex-col items-center space-y-2 mt-6">
            <div className="h-5 w-full max-w-2xl bg-gray-200 rounded animate-pulse" />
            <div className="h-5 w-2/3 max-w-xl bg-gray-200 rounded animate-pulse" />
          </div>
        </div>

        {/* Cards Grid Skeleton (matching the 4-column layout) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {[...Array(8)].map((_, index) => (
            <div
              key={index}
              className="rounded-2xl border border-gray-100 p-6 space-y-6 bg-white shadow-sm"
            >
              {/* Image placeholder */}
              <div className="h-48 w-full rounded-xl bg-gray-200 animate-pulse" />

              {/* Title */}
              <div className="h-7 w-3/4 bg-gray-200 rounded animate-pulse" />

              {/* Description */}
              <div className="space-y-3">
                <div className="h-4 w-full bg-gray-100 rounded animate-pulse" />
                <div className="h-4 w-5/6 bg-gray-100 rounded animate-pulse" />
                <div className="h-4 w-4/5 bg-gray-100 rounded animate-pulse" />
              </div>

              {/* Price/Button Area */}
              <div className="h-10 w-full bg-gray-200 rounded-xl animate-pulse" />
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
};

export default loading;