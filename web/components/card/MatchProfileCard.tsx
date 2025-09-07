import React from "react";
import { Button, Tag } from "antd";
import Link from "next/link";

export interface Profile {
  _id: number;
  fullName: string;
  age: number;
  location: string;
  subCast: string;
  profession: string;
  profileImage: string;
}

interface MatchProfileCardProps {
  profile: Profile;
}

const MatchProfileCard: React.FC<MatchProfileCardProps> = ({ profile }) => {
  return (
    <div className="bg-white rounded-lg border border-gray-100 shadow-sm overflow-hidden hover:shadow-md transition-shadow">
      <div className="h-48 overflow-hidden">
        <img
          src={profile.profileImage}
          alt={profile.fullName}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="p-4">
        <h3 className="font-medium text-lg text-gray-800">
          {profile.fullName}, {profile.age}
        </h3>
        <p className="text-sm text-gray-500">{profile.location}</p>
        <div className="flex items-center space-x-1 mt-1">
          <Tag className="bg-secondary/20 text-black border-secondary/20">
            {profile.subCast}
          </Tag>
          <Tag className="bg-gray-100 text-gray-700 border-gray-200">
            {profile.profession}
          </Tag>
        </div>
        <div className="mt-4">
          <Link href={`/profile/${profile._id}`}>
            <Button block className="bg-primary text-white hover:bg-primary/90">
              View Profile
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default MatchProfileCard;
