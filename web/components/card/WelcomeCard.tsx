"use client";
import { Card, Button, Avatar } from "antd";
import { useRouter } from "next/navigation";

const WelcomeCard = () => {
  const router = useRouter();
  return (
    <Card className="relative overflow-hidden shadow-md p-0">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-r from-primary to-primary/80 z-0" />

      {/* Content */}
      <div className="relative z-10 p-3">
        <div className="flex flex-col md:flex-row items-center justify-between">
          <div className="flex items-center space-x-4 mb-4 md:mb-0">
            <Avatar
              size={"large"}
              src="https://images.unsplash.com/photo-1599566150163-29194dcaad36?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&q=80"
            />
            <div>
              <h2 className="text-2xl font-bold text-white font-playfair">
                Welcome, Rajveer Singh
              </h2>
              <p className="text-white/90">Last login: Today at 9:30 AM</p>
            </div>
          </div>
          <div className="flex flex-col items-end">
            <Button
              onClick={() => router.push("/my-profile")}
              className="bg-white text-primary hover:bg-white/90 border-none"
            >
              View My Profile
            </Button>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default WelcomeCard;
