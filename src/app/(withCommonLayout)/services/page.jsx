import Container from "@/components/common/Container";
import ServiceCard from "@/components/common/ServiceCard";
import { getAllServices } from "@/services/services.service";


const AllServicesPage = async () => {
  const services = await getAllServices();

  if (!services || services.length === 0) {
    return (
      <section className="py-20 bg-base-100 min-h-screen">
        <Container>
          <div className="text-center py-20">
            <h2 className="text-3xl font-bold text-neutral mb-4">
              No services available at the moment.
            </h2>
            <p className="text-neutral/60">Please check back later.</p>
          </div>
        </Container>
      </section>
    );
  }

  return (
    <section className="py-20 bg-base-100 min-h-screen">
      <Container>
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-accent/10 text-accent text-sm font-bold uppercase tracking-wider mb-6">
            All Services
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-neutral leading-tight">
            Our <span className="text-primary italic">Expert</span> Care Services
          </h1>

          <p className="text-neutral/70 mt-6 max-w-3xl mx-auto text-lg">
            Explore our complete range of professional care services. Each service is delivered by verified and experienced experts, with flexible scheduling to fit your needs.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {services.map((service) => (
            <ServiceCard service={service} key={service._id} />
          ))}
        </div>

      </Container>
    </section>
  );
};

export default AllServicesPage;