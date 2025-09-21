"use client";
import RecentMatchesCard from "@/components/card/RecentMatchesCard";
import apiClient from "@/utils/apiClient";
import { Button, Image } from "antd";
import React, { useEffect, useState } from "react";

const page = () => {
  const [profiles, setProfiles] = useState([]);
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await apiClient.get("/user/matches");
        setProfiles(response.data);
      } catch (error) {
        console.log("error-->", error);
      }
    };
    fetchProfile();
  }, []);
  if (profiles && profiles.length == 0) {
    return (
      <div className="w-full h-full flex-col flex items-center justify-center">
        <Image
          preview={false}
          src="images/brideGroom.jpg"
          height={500}
          width={500}
          className="object-contain"
        />
      </div>
    );
  } else {
    return (
      <div className="flex flex-col gap-5">
        <RecentMatchesCard profiles={profiles} />
      </div>
    );
  }
};

export default page;
