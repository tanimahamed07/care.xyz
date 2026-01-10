import Container from "@/components/common/Container";
import ServiceCard from "@/components/common/ServiceCard";
import { getAllServices } from "@/services/services.service";

// SEO Metadata
export const metadata = {
  title: "All Services | Care.xyz - Trusted Caregiving Solutions",
  description:
    "Explore our expert care services including newborn care, elderly support, dementia care, and more. Professional care delivered by verified experts to fit your schedule.",
  keywords: [
    "Caregiving services",
    "Newborn care",
    "Elderly care",
    "Dementia care",
    "Post-surgery care",
    "Professional caregivers",
  ],
  openGraph: {
    title: "Our Expert Care Services | Care.xyz",
    description:
      "Reliable and professional care services for your loved ones. Book verified caregivers today.",
    url: "https://care.xyz/services", // আপনার অরিজিনাল ইউআরএল দিয়ে পরিবর্তন করুন
    siteName: "Care.xyz",
    images: [
      {
        url: "/og-services.jpg", // পাবলিক ফোল্ডারে এই নামে ইমেজ রাখুন
        width: 1200,
        height: 630,
        alt: "Care.xyz Services Preview",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Expert Care Services | Care.xyz",
    description: "Professional care for children, elderly, and special needs.",
    images: ["/og-services.jpg"],
  },
};

const AllServicesPage = async () => {
  // ডাটা ফেচ করা হচ্ছে
  const services = await getAllServices();

  // যদি কোনো সার্ভিস না থাকে তার জন্য হ্যান্ডেলিং
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
    <section className="py-16 bg-base-100 min-h-screen">
      <Container>
        {/* হেডার সেকশন */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-accent/10 text-accent text-sm font-bold uppercase tracking-wider mb-6">
            All Services
          </div>

          <h1 className="text-4xl md:text-5xl font-extrabold text-neutral leading-tight">
            Our <span className="text-primary italic">Expert</span> Care Services
          </h1>

          <p className="text-neutral/70 mt-6 max-w-3xl mx-auto text-lg leading-relaxed">
            Explore our complete range of professional care services. Each
            service is delivered by verified and experienced experts, with
            flexible scheduling to fit your needs.
          </p>
        </div>

        {/* সার্ভিস গ্রিড */}
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