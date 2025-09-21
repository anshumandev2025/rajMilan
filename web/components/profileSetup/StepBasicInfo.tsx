"use client";
import React, { useEffect, useRef } from "react";
import { Form, Input, DatePicker, Select } from "antd";
import {
  bodyTypeOptionConstant,
  heightConstant,
} from "@/constants/dataConstant";
import dayjs from "dayjs";
import { useProfileStore } from "@/store/profileStore";

const StepBasicInfo = ({ form }: { form: any }) => {
  const { profileData } = useProfileStore();
  useEffect(() => {
    const currentValues = form.getFieldsValue();
    form.setFieldsValue({
      fullName: currentValues.fullName
        ? currentValues.fullName
        : profileData.fullName
        ? profileData.fullName
        : null,
      gender: currentValues.gender
        ? currentValues.gender
        : profileData.gender
        ? profileData.gender
        : null,
      dateOfBirth: currentValues.dateOfBirth
        ? dayjs(currentValues.dateOfBirth)
        : profileData.dateOfBirth
        ? dayjs(profileData.dateOfBirth)
        : null,
      height: currentValues.height
        ? currentValues.height
        : profileData.height
        ? profileData.height
        : null,
      bodyType: currentValues.bodyType
        ? currentValues.bodyType
        : profileData.bodyType
        ? profileData.bodyType
        : null,
      fullAddress: currentValues.fullAddress
        ? currentValues.fullAddress
        : profileData.fullAddress
        ? profileData.fullAddress
        : null,
    });
  }, [form, profileData]);
  return (
    <Form layout="vertical" form={form}>
      <Form.Item
        label="Full Name"
        name="fullName"
        rules={[
          { required: true, message: "Please enter your full name" },
          { min: 2, message: "Name must be at least 2 characters" },
          {
            pattern: /^[a-zA-Z\s]+$/,
            message: "Name must contain only letters",
          },
        ]}
      >
        <Input placeholder="Enter your full name" />
      </Form.Item>

      <Form.Item
        label="Gender"
        name="gender"
        rules={[{ required: true, message: "Please select your gender" }]}
      >
        <Select placeholder="Select gender">
          <Select.Option value="male">Male</Select.Option>
          <Select.Option value="female">Female</Select.Option>
        </Select>
      </Form.Item>

      <Form.Item
        label="Date of Birth"
        name="dateOfBirth"
        rules={[
          // {
          //   required: true,
          //   message: "Please select your date of birth",
          // },
          {
            //@ts-ignore
            validator: (_, value) => {
              if (!value) return Promise.resolve();

              const dob = dayjs(value);
              const age = dayjs().diff(dob, "year");

              if (age >= 18) {
                return Promise.resolve();
              }
              return Promise.reject("You must be at least 18 years old");
            },
          },
        ]}
      >
        <DatePicker className="w-full" />
      </Form.Item>

      <Form.Item label="Height" name="height">
        <Select placeholder="Select height">
          {heightConstant.map((h) => (
            <Select.Option key={h.value} value={h.value}>
              {h.label}
            </Select.Option>
          ))}
        </Select>
      </Form.Item>

      <Form.Item label="Body Type" name="bodyType">
        <Select placeholder="Select Body Type">
          {bodyTypeOptionConstant.map((h) => (
            <Select.Option key={h.value} value={h.value}>
              {h.label}
            </Select.Option>
          ))}
        </Select>
      </Form.Item>

      <Form.Item label="Full Address" name="fullAddress">
        <Input placeholder="Enter your full address" />
      </Form.Item>
    </Form>
  );
};

export default StepBasicInfo;
