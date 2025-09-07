import React from "react";

const Testimonials = () => {
  return (
    <section className="py-20 px-4 bg-gray-50">
      <div className="container mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4 font-playfair">
            Success Stories
          </h2>
          <p className="text-lg text-gray-600">
            Hear from couples who found their perfect match on RajputVivah
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-5xl mx-auto">
          <div className="bg-white rounded-xl shadow-md p-8 border border-gray-100 relative">
            <div className="absolute top-0 right-0 transform -translate-y-1/2 translate-x-0">
              <div className="h-16 w-16 bg-primary rounded-full border-4 border-white flex items-center justify-center overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1548142813-c348350df52b?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&q=80"
                  alt="Couple"
                  className="h-full w-full object-cover"
                />
              </div>
            </div>
            <div className="flex flex-col h-full">
              <blockquote className="flex-grow">
                <p className="text-gray-600 italic">
                  "RajputVivah helped us find each other despite living in
                  different states. The platform's focus on Rajput traditions
                  made our families comfortable from the very beginning."
                </p>
              </blockquote>
              <footer className="mt-6">
                <p className="font-semibold text-primary">Rajveer & Padmini</p>
                <p className="text-sm text-gray-500">
                  Married Dec 2023 • Jaipur
                </p>
              </footer>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-md p-8 border border-gray-100 relative">
            <div className="absolute top-0 right-0 transform -translate-y-1/2 translate-x-0">
              <div className="h-16 w-16 bg-primary rounded-full border-4 border-white flex items-center justify-center overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1513279922550-250c2129b13a?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&q=80"
                  alt="Couple"
                  className="h-full w-full object-cover"
                />
              </div>
            </div>
            <div className="flex flex-col h-full">
              <blockquote className="flex-grow">
                <p className="text-gray-600 italic">
                  "The verification process gave us confidence in the
                  authenticity of profiles. We connected instantly and our
                  families were impressed with the respectful approach of the
                  platform."
                </p>
              </blockquote>
              <footer className="mt-6">
                <p className="font-semibold text-primary">
                  Suryaveer & Kanishka
                </p>
                <p className="text-sm text-gray-500">
                  Married Mar 2024 • Udaipur
                </p>
              </footer>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
