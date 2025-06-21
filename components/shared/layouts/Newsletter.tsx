export default function Newsletter() {
  return (
    <section className="py-16 bg-gradient-to-r from-indigo-600 to-purple-700 text-white">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl font-bold mb-4">Never Miss an Event</h2>
        <p className="text-xl mb-8 max-w-2xl mx-auto">
          Subscribe to our newsletter and be the first to know about upcoming
          events and exclusive offers.
        </p>
        <div className="flex justify-center">
          <div className="relative w-full max-w-lg">
            <input
              type="email"
              placeholder="Your email address"
              className="w-full px-6 py-3 rounded-full text-gray-800 focus:outline-none focus:ring-2 focus:ring-purple-300"
            />
            <button className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-purple-800 hover:bg-purple-900 text-white px-4 py-2 rounded-full transition">
              Subscribe
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
