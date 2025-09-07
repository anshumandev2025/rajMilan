"use client";

import React from "react";
import { StyleProvider } from "@ant-design/cssinjs";
import { ConfigProvider } from "antd";

export default function AntdStyleWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <StyleProvider layer>
      <ConfigProvider
        theme={{
          token: {
            colorPrimary: "#F59E0B",
          },
          components: {
            Layout: {
              siderBg: "#800000", // Yellow Sider
            },
            Menu: {
              darkItemBg: "#800000", // Menu item background
              darkSubMenuItemBg: "#fadb14", // Submenu item background
              darkItemSelectedBg: "#ffe58f", // Highlighted item
              darkItemSelectedColor: "#000000", // Text color for selected
            },
          },
        }}
      >
        {children}
      </ConfigProvider>
    </StyleProvider>
  );
}
