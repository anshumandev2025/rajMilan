"use client";
import React, { useState } from "react";
import { Card, Form, Input, Select, Checkbox, Button, Typography } from "antd";
import Footer from "@/components/Footer";
import Navbar from "@/components/homePage/Navbar";
import Link from "next/link";
import { signUpFlow } from "@/constants/layoutContant";
import apiClient from "@/utils/apiClient";
import { useToast } from "@/context/ToastContext";
import { useRouter } from "next/navigation";
import {
  casteOptionsConstant,
  locationOptionsConstant,
} from "@/constants/dataConstant";

const { Title, Paragraph } = Typography;
const { Option } = Select;

const Signup = () => {
  const [form] = Form.useForm();
  const { errorToast, successToast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const handleFinish = async (values: any) => {
    delete values.terms;
    try {
      setIsLoading(true);
      const response = await apiClient.post(`/auth/userSignUp`, values);
      router.push("/auth/login");
    } catch (error: any) {
      console.log("error-->", error);
      errorToast(error.response.data.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-grow pt-20 pb-12 px-4">
        <div className="container mx-auto max-w-4xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Left Panel */}
            <div className="hidden md:flex flex-col justify-center">
              <div className="space-y-4">
                <Title level={2} className="text-primary font-playfair">
                  Join RajputMilan
                </Title>
                <Paragraph className="text-lg text-gray-600">
                  Create your profile to connect with suitable matches from the
                  Rajput community.
                </Paragraph>

                <div className="space-y-3 mt-8">
                  {signUpFlow.map((step, index) => (
                    <div key={index} className="flex items-start">
                      <div className="h-10 w-10 bg-primary/10 rounded-full flex items-center justify-center mr-4 mt-1">
                        <span className="text-primary font-bold">
                          {index + 1}
                        </span>
                      </div>
                      <div>
                        <h3 className="font-medium text-gray-800">
                          {step.title}
                        </h3>
                        <p className="text-gray-600 text-sm">{step.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Panel - Signup Form */}
            <div>
              <Card className="shadow-md border border-secondary/20">
                <Title level={3} className="text-primary font-playfair">
                  Sign Up
                </Title>
                <Paragraph>Enter your details to create your account</Paragraph>

                <Form
                  layout="vertical"
                  form={form}
                  onFinish={handleFinish}
                  className="space-y-4 mt-4"
                >
                  <div className="grid grid-cols-2 gap-4">
                    <Form.Item
                      label="Full Name"
                      name="fullName"
                      rules={[
                        {
                          required: true,
                          message: "Please enter your full name",
                        },
                      ]}
                    >
                      <Input placeholder="Enter your full name" />
                    </Form.Item>

                    <Form.Item
                      label="Gender"
                      name="gender"
                      rules={[
                        {
                          required: true,
                          message: "Please select your gender",
                        },
                      ]}
                    >
                      <Select placeholder="Select gender">
                        <Option value="male">Male</Option>
                        <Option value="female">Female</Option>
                      </Select>
                    </Form.Item>
                  </div>

                  <Form.Item
                    label="Email"
                    name="emailAddress"
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
                    rules={[
                      { required: true, message: "Please enter your password" },
                      {
                        pattern:
                          /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/,
                        message:
                          "Password must be at least 8 characters, and include uppercase, lowercase, number, and special character",
                      },
                    ]}
                  >
                    <Input.Password placeholder="Create a strong password" />
                  </Form.Item>

                  <Form.Item
                    label="Mobile Number"
                    name="mobileNumber"
                    rules={[
                      {
                        required: true,
                        message: "Please enter your mobile number",
                      },
                      {
                        pattern: /^[0-9]{10}$/,
                        message: "Mobile number must be 10 digits",
                      },
                    ]}
                  >
                    <Input placeholder="Enter your mobile number" />
                  </Form.Item>

                  <div className="grid grid-cols-2 gap-4">
                    <Form.Item
                      label="Location"
                      name="location"
                      rules={[
                        {
                          required: true,
                          message: "Please select your location",
                        },
                      ]}
                    >
                      <Select placeholder="Select location">
                        {locationOptionsConstant.map((option) => (
                          <Select.Option
                            key={option.value}
                            value={option.value}
                          >
                            {option.label}
                          </Select.Option>
                        ))}
                      </Select>
                    </Form.Item>

                    <Form.Item
                      label="Sub-Caste"
                      name="subCast"
                      rules={[
                        {
                          required: true,
                          message: "Please select your sub-caste",
                        },
                      ]}
                    >
                      <Select placeholder="Select sub-caste">
                        {casteOptionsConstant.map((option) => (
                          <Select.Option
                            key={option.value}
                            value={option.value}
                          >
                            {option.label}
                          </Select.Option>
                        ))}
                      </Select>
                    </Form.Item>
                  </div>

                  <Form.Item
                    name="terms"
                    valuePropName="checked"
                    className="!mb-2"
                    rules={[
                      {
                        validator: (_, value) =>
                          value
                            ? Promise.resolve()
                            : Promise.reject("You must accept the terms"),
                      },
                    ]}
                  >
                    <Checkbox>
                      I agree to the{" "}
                      <Link
                        href="/terms-and-condition"
                        className="text-primary hover:underline"
                      >
                        Terms & Conditions
                      </Link>{" "}
                      and{" "}
                      <Link
                        href="/privacy-policy"
                        className="text-primary hover:underline"
                      >
                        Privacy Policy
                      </Link>
                    </Checkbox>
                  </Form.Item>

                  <Form.Item>
                    <Button
                      loading={isLoading}
                      iconPosition="end"
                      type="primary"
                      htmlType="submit"
                      className="w-full text-white font-bold bg-primary hover:bg-primary/90 border-none"
                    >
                      Sign Up
                    </Button>
                  </Form.Item>
                </Form>
                <p className="text-center text-sm text-gray-500 mt-4">
                  Already have an account?{" "}
                  <Link
                    href="/auth/login"
                    className="text-primary hover:underline font-medium"
                  >
                    Log in
                  </Link>
                </p>
              </Card>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Signup;
