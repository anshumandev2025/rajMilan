"use client";
import { useUser } from "@/store/userStore";
import { Button } from "antd";
import Link from "next/link";
import React from "react";

const Hero = () => {
  const { isUserLogIn } = useUser();
  return (
    <section className="relative h-[600px] md:h-[700px] flex items-center">
      <div className="absolute inset-0 bg-[url('/images/heroImage.jpeg')] bg-cover bg-center">
        <div className="absolute inset-0 bg-primary/60"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 font-playfair">
            Find Your Perfect Rajput Match
          </h1>
          <p className="text-xl md:text-2xl text-white mb-8">
            Join the premier matrimonial service exclusively for the Rajput
            community
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            {isUserLogIn && (
              <>
                <Link href="/auth/signup">
                  <Button
                    size="large"
                    className="bg-secondary hover:bg-secondary/90 text-primary font-medium px-8"
                  >
                    Sign Up Free
                  </Button>
                </Link>
                <Link href="/auth/login">
                  <Button
                    size="large"
                    variant="outlined"
                    className="border-white hover:text-white hover:bg-white/10 font-medium px-8 text-primary"
                  >
                    Login
                  </Button>
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
