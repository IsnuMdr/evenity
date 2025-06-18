import {
  FacebookIcon,
  InstagramIcon,
  LinkedinIcon,
  MailIcon,
  MapPinIcon,
  PhoneIcon,
  TwitterIcon,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">Evenity</h3>
            <p className="text-gray-400">
              Discover and book the best events happening around you.
            </p>
            <div className="flex mt-4 space-x-4">
              <Link
                href="#"
                className="text-gray-400 hover:text-white transition"
              >
                <FacebookIcon className="h-6 w-6" />
              </Link>
              <Link
                href="#"
                className="text-gray-400 hover:text-white transition"
              >
                <TwitterIcon className="h-6 w-6" />
              </Link>
              <Link
                href="#"
                className="text-gray-400 hover:text-white transition"
              >
                <InstagramIcon className="h-6 w-6" />
              </Link>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/"
                  className="text-gray-400 hover:text-white transition"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/"
                  className="text-gray-400 hover:text-white transition"
                >
                  Browse Events
                </Link>
              </li>
              <li>
                <Link
                  href="/events/create"
                  className="text-gray-400 hover:text-white transition"
                >
                  Create Event
                </Link>
              </li>
              <li>
                <Link
                  href="/"
                  className="text-gray-400 hover:text-white transition"
                >
                  My Tickets
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Categories</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/?category=Music"
                  className="text-gray-400 hover:text-white transition"
                >
                  Music
                </Link>
              </li>
              <li>
                <Link
                  href="/?category=Technology"
                  className="text-gray-400 hover:text-white transition"
                >
                  Technology
                </Link>
              </li>
              <li>
                <Link
                  href="/?category=Food & Drink"
                  className="text-gray-400 hover:text-white transition"
                >
                  Food &amp; Drink
                </Link>
              </li>
              <li>
                <Link
                  href="/?category=Sports"
                  className="text-gray-400 hover:text-white transition"
                >
                  Sports
                </Link>
              </li>
              <li>
                <Link
                  href="/?category=Arts & Film"
                  className="text-gray-400 hover:text-white transition"
                >
                  Arts &amp; Film
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
            <ul className="space-y-2 text-gray-400">
              <li className="flex items-start">
                <MapPinIcon className="h-5 w-5 mr-2 mt-0.5" />
                <span>123 Event Street, City, Country</span>
              </li>
              <li className="flex items-start">
                <MailIcon className="h-5 w-5 mr-2 mt-0.5" />
                <span>info@evenity.com</span>
              </li>
              <li className="flex items-start">
                <PhoneIcon className="h-5 w-5 mr-2 mt-0.5" />
                <span>+1 234 567 890</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
          <p>© {new Date().getFullYear()} Evenity. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
