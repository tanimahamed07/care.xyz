import Container from "@/components/common/Container";
import Link from "next/link";
import {
  FaShieldAlt,
  FaHandHoldingHeart,
  FaUserCheck,
} from "react-icons/fa";

export const metadata = {
  title: "About Us | Care.xyz",
  description:
    "Learn about Care.xyz – a trusted caregiving platform for children, elderly, and special care services.",
};

const AboutPage = () => {
  return (
    <section className="bg-base-100">
      <Container>
        {/* Hero */}
        <div className="py-16 text-center mx-auto">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-accent/10 text-accent text-sm font-bold uppercase tracking-wider mb-6">
            About Care.xyz
          </span>

          <h1 className="text-4xl md:text-5xl font-extrabold text-neutral leading-tight">
            Trusted <span className="text-primary italic">Care</span> for the
            People You Love
          </h1>

          <p className="text-neutral/60 mt-6 text-lg">
            Care.xyz is built to connect families with verified and professional
            caregivers, making caregiving easy, secure, and accessible for
            everyone.
          </p>
        </div>

        {/* Mission Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center py-12">
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase">
              Our Mission
            </div>

            <h2 className="text-3xl md:text-4xl font-extrabold text-neutral">
              Peace of mind through{" "}
              <span className="text-primary italic">reliable caregiving</span>
            </h2>

            <p className="text-neutral/70 leading-relaxed">
              We understand how important it is to find someone you can trust
              with your family members. Our platform ensures verified caregivers,
              transparent pricing, and flexible booking options.
            </p>

            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <span className="w-2.5 h-2.5 rounded-full bg-primary mt-2"></span>
                <p className="text-neutral/80">
                  Care services for children, elderly, and sick individuals.
                </p>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-2.5 h-2.5 rounded-full bg-primary mt-2"></span>
                <p className="text-neutral/80">
                  Location-based dynamic booking system.
                </p>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-2.5 h-2.5 rounded-full bg-primary mt-2"></span>
                <p className="text-neutral/80">
                  Secure authentication and booking tracking.
                </p>
              </li>
            </ul>
          </div>

          {/* Feature Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="bg-base-200 p-6 rounded-3xl border border-base-300 hover:border-primary/30 transition">
              <div className="w-12 h-12 bg-primary/10 text-primary rounded-xl flex items-center justify-center mb-4">
                <FaShieldAlt className="text-2xl" />
              </div>
              <h4 className="text-lg font-bold">Secure & Trusted</h4>
              <p className="text-sm text-neutral/60 mt-2">
                NID verified and background-checked caregivers.
              </p>
            </div>

            <div className="bg-base-200 p-6 rounded-3xl border border-base-300 hover:border-accent/30 transition">
              <div className="w-12 h-12 bg-accent/10 text-accent rounded-xl flex items-center justify-center mb-4">
                <FaUserCheck className="text-2xl" />
              </div>
              <h4 className="text-lg font-bold">Professional Care</h4>
              <p className="text-sm text-neutral/60 mt-2">
                Certified caregivers for baby and elderly care.
              </p>
            </div>

            <div className="bg-base-200 p-6 rounded-3xl border border-base-300 hover:border-info/30 transition sm:col-span-2">
              <div className="w-12 h-12 bg-info/10 text-info rounded-xl flex items-center justify-center mb-4">
                <FaHandHoldingHeart className="text-2xl" />
              </div>
              <h4 className="text-lg font-bold">Easy Booking</h4>
              <p className="text-sm text-neutral/60 mt-2">
                Simple booking flow with dynamic cost calculation.
              </p>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="py-16 text-center">
          <h3 className="text-2xl md:text-3xl font-extrabold text-neutral">
            Ready to find the right caregiver?
          </h3>
          <p className="text-neutral/60 mt-4">
            Explore our services and book trusted care today.
          </p>

          <Link
            href="/services"
            className="inline-block mt-8 px-10 py-4 bg-primary text-primary-content rounded-2xl font-bold shadow-lg shadow-primary/20 hover:scale-105 transition"
          >
            Explore Services
          </Link>
        </div>
      </Container>
    </section>
  );
};

export default AboutPage;
