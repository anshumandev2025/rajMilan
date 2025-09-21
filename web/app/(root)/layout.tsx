"use client";
import React, { useState, useEffect } from "react";
import { Avatar, Dropdown, MenuProps } from "antd";
import { UserOutlined, LogoutOutlined } from "@ant-design/icons";
import { usePathname, useRouter } from "next/navigation";
import Footer from "@/components/Footer";
import { HeartHandshake, Home } from "lucide-react";
import apiClient from "@/utils/apiClient";
import { useProfileStore } from "@/store/profileStore";
import { useUser } from "@/store/userStore";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const [screenSize, setScreenSize] = useState<number>(768);
  const { updateProfile, profileData } = useProfileStore();
  const { isUserLogIn, setIsUserLogIn } = useUser();
  const pathname = usePathname();
  useEffect(() => {
    const token = localStorage.getItem("authToken");
    console.log("hihiih", pathname);
    if (token && token.length > 0) {
      setIsUserLogIn(true);
    } else {
      setIsUserLogIn(false);
      router.replace("/");
    }
  }, [profileData, pathname]);
  useEffect(() => {
    const handleResize = () => {
      setScreenSize(window.innerWidth);
    };

    // Set initial screen size
    setScreenSize(window.innerWidth);

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  const menuItems: MenuProps["items"] = [
    {
      key: "home",
      label: "Home",
      icon: <Home size={18} />,
    },
    {
      key: "matches",
      label: "Matches",
      icon: <HeartHandshake size={18} />,
    },
    {
      key: "profile",
      label: "View Profile",
      icon: <UserOutlined />,
    },
    // {
    //   key: "messages",
    //   label: "View Messages",
    //   icon: <MessageOutlined />,
    // },
    {
      type: "divider",
    },
    {
      key: "logout",
      label: "Logout",
      icon: <LogoutOutlined />,
      danger: true,
    },
  ];

  const fetchProfileData = async () => {
    try {
      const response = await apiClient("/user");
      updateProfile(response.data);
    } catch (error: any) {
      if (error?.response?.status == 401) {
        localStorage.removeItem("authToken");
        router.replace("/");
      }
      setIsUserLogIn(false);
      console.log("error-->", error);
    }
  };
  useEffect(() => {
    fetchProfileData();
  }, []);
  const handleMenuClick: MenuProps["onClick"] = ({ key }) => {
    switch (key) {
      case "home":
        router.push("/");
        break;
      case "profile":
        router.push("/my-profile");
        break;
      case "matches":
        router.push("/matches");
        break;
      // case "settings":
      //   router.push("/settings");
      //   break;
      case "logout":
        // Implement your logout logic here
        localStorage.removeItem("authToken");
        setIsUserLogIn(false);
        router.replace("/");
        break;
      default:
        break;
    }
  };
  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-pink-50 to-purple-50">
      {/* Header with Navbar */}
      <header className="px-4 py-3 sm:px-6 sm:py-4 md:px-10 md:py-5">
        <nav className="relative overflow-hidden bg-gradient-to-r from-primary to-secondary shadow-lg backdrop-blur-sm rounded-xl sm:rounded-2xl border border-white/20">
          {/* Animated background elements */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute -top-2 -right-2 w-12 h-12 sm:w-16 sm:h-16 bg-white/10 rounded-full blur-xl animate-pulse"></div>
            <div className="absolute -bottom-2 -left-2 w-16 h-16 sm:w-20 sm:h-20 bg-white/5 rounded-full blur-2xl animate-pulse delay-1000"></div>
          </div>

          <div className="relative flex justify-between items-center px-3 py-2 sm:px-4 sm:py-3 md:px-6 md:py-4">
            {/* Logo Section - Responsive */}
            <div className="flex items-center">
              <h1
                onClick={() => router.push("/")}
                className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-white font-playfair tracking-wide cursor-pointer"
              >
                RajMilan
              </h1>
            </div>

            {/* User Avatar - Responsive */}
            <Dropdown
              menu={{ items: menuItems, onClick: handleMenuClick }}
              trigger={["click"]}
              placement="bottomRight"
              overlayClassName="user-dropdown"
            >
              <div className="relative cursor-pointer group">
                <div className="absolute inset-0 bg-white/20 rounded-full blur-sm group-hover:blur-none transition-all duration-300"></div>
                {isUserLogIn && (
                  <Avatar
                    size={screenSize < 640 ? 32 : screenSize < 768 ? 36 : 40}
                    src={`${
                      profileData?.profileImage
                    }?timestamp=${new Date().getTime()}`}
                    icon={<UserOutlined />}
                    className="relative border-2 border-white/30 hover:border-white/60 transition-all duration-300 hover:scale-105 shadow-lg"
                    style={{
                      backgroundColor: "rgba(255,255,255,0.1)",
                      backdropFilter: "blur(10px)",
                    }}
                  />
                )}
                <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 sm:w-3.5 sm:h-3.5 bg-green-400 border-2 border-white rounded-full"></div>
              </div>
            </Dropdown>
          </div>
        </nav>
      </header>

      {/* Main Content */}
      <main className="px-4 sm:px-6 md:px-10 pb-4 sm:pb-6">
        <div className="bg-white/60 backdrop-blur-sm rounded-xl sm:rounded-2xl md:rounded-3xl shadow-xl border border-white/50 min-h-[calc(100vh-140px)] sm:min-h-[calc(100vh-160px)] md:min-h-[calc(100vh-180px)] overflow-hidden">
          <div className="p-4 sm:p-6 md:p-8">{children}</div>
        </div>
      </main>

      {/* Footer */}
      <div className="px-4 sm:px-6 md:px-10">
        <Footer />
      </div>

      {/* Custom Styles */}
      <style jsx global>{`
        .user-dropdown .ant-dropdown-menu {
          background: rgba(255, 255, 255, 0.95);
          backdrop-filter: blur(20px);
          border: 1px solid rgba(255, 255, 255, 0.2);
          border-radius: 16px;
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
          padding: 8px;
        }

        .user-dropdown .ant-dropdown-menu-item {
          border-radius: 8px;
          margin: 2px 0;
          transition: all 0.2s ease;
        }

        .user-dropdown .ant-dropdown-menu-item:hover {
          background: rgba(219, 39, 119, 0.1);
          color: #db2777;
        }

        .user-dropdown .ant-dropdown-menu-item-danger:hover {
          background: rgba(239, 68, 68, 0.1);
          color: #ef4444;
        }

        @keyframes float {
          0%,
          100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-10px);
          }
        }

        .animate-float {
          animation: float 3s ease-in-out infinite;
        }

        .font-playfair {
          font-family: "Playfair Display", serif;
        }
      `}</style>
    </div>
  );
}
