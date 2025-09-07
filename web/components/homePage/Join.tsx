"use client";
import { useUser } from "@/store/userStore";
import { Button } from "antd";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import React from "react";

const Join = () => {
  const { isUserLogIn } = useUser();
  return (
    <section className="py-20 px-4 bg-gradient-to-r from-primary to-primary/90">
      <div className="container mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-6 font-playfair">
          Begin Your Journey Today
        </h2>
        <p className="text-xl text-white/90 max-w-3xl mx-auto mb-8">
          Join thousands of Rajput families who have found perfect matches for
          their loved ones
        </p>
        {isUserLogIn && (
          <Link href="/auth/signup">
            <Button
              size="large"
              className="bg-secondary hover:bg-secondary/90 text-black font-medium px-8"
            >
              Create Your Profile <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        )}
      </div>
    </section>
  );
};

export default Join;
