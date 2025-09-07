"use client";
import React, { createContext, useContext } from "react";
import { message } from "antd";

const ToastContext = createContext<any>(null);

export const ToastProvider = ({ children }: { children: React.ReactNode }) => {
  const [messageApi, contextHolder] = message.useMessage();

  const successToast = (content: string) => {
    messageApi.open({ type: "success", content });
  };

  const errorToast = (content: string) => {
    messageApi.open({ type: "error", content });
  };

  const warningToast = (content: string) => {
    messageApi.open({ type: "warning", content });
  };

  return (
    <ToastContext.Provider value={{ successToast, errorToast, warningToast }}>
      {contextHolder}
      {children}
    </ToastContext.Provider>
  );
};

export const useToast = () => {
  return useContext(ToastContext);
};
