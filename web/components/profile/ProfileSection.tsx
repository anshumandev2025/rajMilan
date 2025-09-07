import React from "react";
import { Card } from "antd";

interface Props {
  title: string;
  icon: React.ReactNode;
  children: React.ReactNode;
  className?: string;
}

const ProfileSection: React.FC<Props> = ({
  title,
  icon,
  children,
  className = "",
}) => (
  <Card className={`mb-6 shadow-lg border-0 ${className}`}>
    <div className="flex items-center mb-4">
      <div className="w-10 h-10 bg-[#800000] rounded-full flex items-center justify-center mr-3 text-white">
        {icon}
      </div>
      <h3 className="text-xl font-bold text-gray-800 m-0">{title}</h3>
    </div>
    {children}
  </Card>
);

export default ProfileSection;
