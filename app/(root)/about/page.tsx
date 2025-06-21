import {
  CalendarIcon,
  DollarSignIcon,
  FingerprintIcon,
  HeartIcon,
  LightbulbIcon,
  MapPinIcon,
  PuzzleIcon,
  ShieldCheckIcon,
  SparklesIcon,
  UsersRoundIcon,
} from "lucide-react";
import Link from "next/link";

const AboutPage = () => {
  return (
    <>
      <section className="hero-pattern py-20 md:py-32">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center text-white">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              About Evenity
            </h1>
            <p className="text-xl md:text-2xl opacity-90 mb-10">
              Connecting people through unforgettable experiences since 2025
            </p>
            {/* <div className="flex flex-wrap justify-center gap-4">
              <a
                href="#our-story"
                className="bg-white text-purple-700 hover:bg-purple-50 px-6 py-3 rounded-lg font-medium transition"
              >
                Our Story
              </a>
              <a
                href="#our-team"
                className="bg-purple-800 bg-opacity-30 hover:bg-opacity-40 text-white border border-purple-300 border-opacity-40 px-6 py-3 rounded-lg font-medium transition"
              >
                Meet the Team
              </a>
            </div> */}
          </div>
        </div>
      </section>
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12">
              <div className="w-full md:w-1/3">
                <div className="bg-gradient-to-br from-purple-500 to-indigo-600 p-8 rounded-2xl shadow-lg text-white text-center flex flex-col justify-center items-center">
                  <FingerprintIcon className="h-12 w-12 mb-4" />
                  <h2 className="text-2xl font-bold mb-2">Our Mission</h2>
                  <p className="opacity-90">
                    To create a world where experiences bring people together
                    and create lasting memories.
                  </p>
                </div>
              </div>
              <div className="w-full md:w-2/3">
                <h3 className="text-xl font-semibold text-purple-700 mb-2">
                  What drives us
                </h3>
                <h2 className="text-3xl font-bold text-gray-800 mb-6">
                  Connecting People Through Shared Experiences
                </h2>
                <p className="text-gray-600 mb-6 text-lg">
                  At Evenity, we believe in the power of live experiences to
                  transform lives, build communities, and create memories that
                  last a lifetime. Our platform is designed to make discovering
                  and attending events seamless, while helping event creators
                  reach their perfect audience.
                </p>
                <p className="text-gray-600 text-lg">
                  Whether it's a local workshop, a major concert, or a
                  professional conference, we're passionate about bringing
                  people together in meaningful ways.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">
              Evenity by the Numbers
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our growing community of event creators and attendees continues to
              make an impact around the world.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Stat 1 */}
            <div className="stat-card bg-white rounded-xl shadow-md p-8 text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-purple-100 text-purple-600 rounded-full mb-4">
                <UsersRoundIcon className="h-8 w-8" />
              </div>
              <h3 className="text-4xl font-bold text-gray-800 mb-2">5M+</h3>
              <p className="text-gray-600">Active Users</p>
            </div>
            {/* Stat 2 */}
            <div className="stat-card bg-white rounded-xl shadow-md p-8 text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-indigo-100 text-indigo-600 rounded-full mb-4">
                <CalendarIcon className="h-8 w-8" />
              </div>
              <h3 className="text-4xl font-bold text-gray-800 mb-2">250K+</h3>
              <p className="text-gray-600">Events Hosted</p>
            </div>
            {/* Stat 3 */}
            <div className="stat-card bg-white rounded-xl shadow-md p-8 text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-pink-100 text-pink-600 rounded-full mb-4">
                <MapPinIcon className="h-8 w-8" />
              </div>
              <h3 className="text-4xl font-bold text-gray-800 mb-2">75+</h3>
              <p className="text-gray-600">Countries</p>
            </div>
            {/* Stat 4 */}
            <div className="stat-card bg-white rounded-xl shadow-md p-8 text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 text-green-600 rounded-full mb-4">
                <div className="flex items-center bg-gray-50 justify-center p-4 rounded-full">
                  <DollarSignIcon className="h-8 w-8" />
                </div>
              </div>
              <h3 className="text-4xl font-bold text-gray-800 mb-2">$500M+</h3>
              <p className="text-gray-600">Ticket Sales</p>
            </div>
          </div>
        </div>
      </section>
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">
              Our Values
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              These core principles guide everything we do at Evenity.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {/* Value 1 */}
            <div className="bg-white rounded-xl shadow-md overflow-hidden">
              <div className="h-3 bg-purple-600" />
              <div className="p-6">
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                  <UsersRoundIcon className="h-8 w-8 text-purple-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">
                  Community First
                </h3>
                <p className="text-gray-600">
                  We believe in the power of bringing people together. Every
                  feature we build is designed to strengthen connections and
                  foster community.
                </p>
              </div>
            </div>
            {/* Value 2 */}
            <div className="bg-white rounded-xl shadow-md overflow-hidden">
              <div className="h-3 bg-indigo-600" />
              <div className="p-6">
                <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center mb-4">
                  <LightbulbIcon className="h-8 w-8 text-indigo-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">
                  Innovation
                </h3>
                <p className="text-gray-600">
                  We're constantly exploring new ways to improve the event
                  experience, from discovery to attendance, for both creators
                  and attendees.
                </p>
              </div>
            </div>
            {/* Value 3 */}
            <div className="bg-white rounded-xl shadow-md overflow-hidden">
              <div className="h-3 bg-pink-600" />
              <div className="p-6">
                <div className="w-12 h-12 bg-pink-100 rounded-lg flex items-center justify-center mb-4">
                  <PuzzleIcon className="h-8 w-8 text-pink-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">
                  Diversity
                </h3>
                <p className="text-gray-600">
                  We celebrate the rich diversity of events and communities. Our
                  platform is designed to be inclusive and accessible to
                  everyone.
                </p>
              </div>
            </div>
            {/* Value 4 */}
            <div className="bg-white rounded-xl shadow-md overflow-hidden">
              <div className="h-3 bg-green-600" />
              <div className="p-6">
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                  <ShieldCheckIcon className="h-8 w-8 text-green-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">
                  Trust &amp; Safety
                </h3>
                <p className="text-gray-600">
                  We're committed to creating a trusted platform where users can
                  discover events with confidence and peace of mind.
                </p>
              </div>
            </div>
            {/* Value 5 */}
            <div className="bg-white rounded-xl shadow-md overflow-hidden">
              <div className="h-3 bg-yellow-600" />
              <div className="p-6">
                <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center mb-4">
                  <SparklesIcon className="h-8 w-8 text-yellow-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">
                  Empowerment
                </h3>
                <p className="text-gray-600">
                  We empower event creators with the tools they need to succeed
                  and attendees with the information to make the most of every
                  experience.
                </p>
              </div>
            </div>
            {/* Value 6 */}
            <div className="bg-white rounded-xl shadow-md overflow-hidden">
              <div className="h-3 bg-red-600" />
              <div className="p-6">
                <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mb-4">
                  <HeartIcon className="h-8 w-8 text-red-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">
                  Passion
                </h3>
                <p className="text-gray-600">
                  We're passionate about events and experiences. This passion
                  drives us to continuously improve and innovate our platform.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="py-16 bg-gradient-to-r from-purple-600 to-indigo-700 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-6">
              Ready to Experience EventHub?
            </h2>
            <p className="text-xl opacity-90 mb-8">
              Join millions of users discovering and attending amazing events
              every day.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                href="/"
                className="bg-white text-purple-700 hover:bg-purple-50 px-8 py-3 rounded-lg font-medium transition"
              >
                Browse Events
              </Link>
              <Link
                href="/events/create"
                className="bg-purple-800 bg-opacity-30 hover:bg-opacity-40 text-white border border-purple-300 border-opacity-40 px-8 py-3 rounded-lg font-medium transition"
              >
                Create an Event
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default AboutPage;
