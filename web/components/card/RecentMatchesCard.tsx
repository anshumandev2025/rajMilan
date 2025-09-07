import React from "react";
import { Card } from "antd";
import MatchProfileCard, { Profile } from "./MatchProfileCard";

interface RecentMatchesCardProps {
  profiles: Profile[];
}

const RecentMatchesCard: React.FC<RecentMatchesCardProps> = ({ profiles }) => {
  return (
    <Card
      title={<span className="font-playfair text-lg">Matches</span>}
      className="shadow-sm"
      extra={
        <span className="text-sm text-gray-500">
          Profiles that match your preferences
        </span>
      }
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {profiles.map((profile) => (
          <MatchProfileCard key={profile._id} profile={profile} />
        ))}
      </div>

      {/* <div className="border-t border-gray-100 bg-gray-50 mt-6 pt-4">
        <Link href="/feed" className="w-full block">
          <Button type="link" className="w-full text-primary">
            See All Matches <ArrowRightOutlined className="ml-1" />
          </Button>
        </Link>
      </div> */}
    </Card>
  );
};

export default RecentMatchesCard;
