import { MessageSquare, Search, Users } from "lucide-react";
import React from "react";

export const Featured = () => {
  return (
    <section className="py-20 px-4">
      <div className="container mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4 font-playfair">
            Why Choose RajputMilan?
          </h2>
          <p className="text-lg text-gray-600">
            We understand Rajput traditions and values, offering you a platform
            that respects your heritage
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100 hover:shadow-lg transition-shadow">
            <div className="h-14 w-14 bg-primary/10 rounded-full flex items-center justify-center mb-6">
              <Users className="h-7 w-7 text-primary" />
            </div>
            <h3 className="text-xl font-bold mb-3 text-gray-800">
              Verified Rajput Profiles
            </h3>
            <p className="text-gray-600">
              We verify each profile to ensure authenticity and maintain the
              sanctity of the Rajput community.
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100 hover:shadow-lg transition-shadow">
            <div className="h-14 w-14 bg-primary/10 rounded-full flex items-center justify-center mb-6">
              <Search className="h-7 w-7 text-primary" />
            </div>
            <h3 className="text-xl font-bold mb-3 text-gray-800">
              Caste & Location Filters
            </h3>
            <p className="text-gray-600">
              Find matches from specific sub-castes and locations that match
              your preferences and requirements.
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100 hover:shadow-lg transition-shadow">
            <div className="h-14 w-14 bg-primary/10 rounded-full flex items-center justify-center mb-6">
              <MessageSquare className="h-7 w-7 text-primary" />
            </div>
            <h3 className="text-xl font-bold mb-3 text-gray-800">
              Connect with Privacy
            </h3>
            <p className="text-gray-600">
              Our platform ensures your privacy while allowing you to connect
              with potential matches easily.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
