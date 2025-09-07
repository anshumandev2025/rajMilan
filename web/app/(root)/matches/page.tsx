"use client";
import RecentMatchesCard from "@/components/card/RecentMatchesCard";
import apiClient from "@/utils/apiClient";
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
  return (
    <div className="flex flex-col gap-5">
      <RecentMatchesCard profiles={profiles} />
    </div>
  );
};

export default page;
