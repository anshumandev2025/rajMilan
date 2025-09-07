"use client";
import Footer from "@/components/Footer";
import Navbar from "@/components/homePage/Navbar";
import { useToast } from "@/context/ToastContext";
import { useUser } from "@/store/userStore";
import apiClient from "@/utils/apiClient";
import { Button, Input, Checkbox, Form, Typography, Card } from "antd";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

const { Title, Text } = Typography;

const page = () => {
  const [form] = Form.useForm();
  const { errorToast } = useToast();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const { setIsUserLogIn } = useUser();
  const handleFinish = async (values: any) => {
    try {
      setIsLoading(true);
      const response = await apiClient.post(`/auth/userLogin`, values);
      localStorage.setItem("authToken", response.data.token);

      setIsUserLogIn(true);
      if (response.data.isProfileCompleted) {
        router.replace("/matches");
      } else {
        router.push("/profile-setup");
      }
    } catch (error: any) {
      console.log("error-->", error);
      errorToast(error?.response?.data?.message);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-grow pt-20 pb-12 px-4">
        <div className="container mx-auto max-w-md">
          <Card className="shadow-md border border-secondary/20">
            <div className="space-y-1 text-center mb-6">
              <Title level={3} className="font-playfair text-primary !mb-0">
                Login
              </Title>
              <Text type="secondary">
                Enter your credentials to access your account
              </Text>
            </div>

            <Form
              layout="vertical"
              className="space-y-4"
              onFinish={handleFinish}
              form={form}
            >
              <Form.Item
                label="Email"
                name="emailAddress"
                className="mb-4"
                rules={[
                  { required: true, message: "Please enter your email" },
                  {
                    type: "email",
                    message: "Please enter a valid email address",
                  },
                ]}
              >
                <Input type="email" placeholder="Enter your email" />
              </Form.Item>

              <Form.Item
                label="Password"
                name="password"
                className="mb-4"
                rules={[
                  { required: true, message: "Please enter your password" },
                ]}
              >
                <div className="flex relative items-center justify-between mb-1">
                  <Input.Password
                    id="password"
                    placeholder="Enter your password"
                  />
                  {/* <Link
                    href="/forgot-password"
                    className="text-sm text-primary top-10 right-0 absolute hover:underline"
                  >
                    Forgot password?
                  </Link> */}
                </div>
              </Form.Item>
              <Form.Item className="mb-4 mt-10">
                <Button
                  loading={isLoading}
                  iconPosition="end"
                  type="primary"
                  htmlType="submit"
                  className="w-full bg-primary text-white font-bold hover:bg-primary/90 border-none"
                >
                  Sign In
                </Button>
              </Form.Item>
            </Form>

            <p className="text-center text-sm text-gray-500 mt-6">
              Don't have an account?{" "}
              <Link
                href="/auth/signup"
                className="text-primary hover:underline font-medium"
              >
                Sign up
              </Link>
            </p>
          </Card>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default page;
