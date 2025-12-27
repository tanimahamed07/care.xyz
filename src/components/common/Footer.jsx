import Link from "next/link";

const Footer = () => {
  return (
    <footer className="bg-base-200 mt-16">
      <div className="max-w-7xl mx-auto px-6 py-10 grid grid-cols-1 md:grid-cols-4 gap-8">
        
        {/* Brand */}
        <div>
          <h2 className="text-xl font-bold text-primary">
            Care<span className="text-accent">.xyz</span>
          </h2>
          <p className="text-sm text-neutral/70 mt-3">
            Trusted baby sitting & elderly care services at your home.
          </p>
        </div>

        {/* Services */}
        <div>
          <h3 className="font-semibold mb-3">Services</h3>
          <ul className="space-y-2 text-sm">
            <li>Baby Care</li>
            <li>Elderly Care</li>
            <li>Sick Care</li>
          </ul>
        </div>

        {/* Links */}
        <div>
          <h3 className="font-semibold mb-3">Quick Links</h3>
          <ul className="space-y-2 text-sm">
            <li>
              <Link href="/">Home</Link>
            </li>
            <li>
              <Link href="/my-bookings">My Bookings</Link>
            </li>
            <li>
              <Link href="/login">Login</Link>
            </li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h3 className="font-semibold mb-3">Contact</h3>
          <p className="text-sm">Email: support@care.xyz</p>
          <p className="text-sm">Phone: +880 1234-567890</p>
        </div>
      </div>

      <div className="text-center text-sm text-neutral/60 py-4 border-t">
        © {new Date().getFullYear()} Care.xyz — All Rights Reserved
      </div>
    </footer>
  );
};

export default Footer;
