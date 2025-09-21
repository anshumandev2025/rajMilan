"use client";
import React, { useEffect } from "react";
import { Form, Input, Select } from "antd";
import {
  educationLevelsConstant,
  incomeRangesConstant,
  jobProfileOptionConstant,
} from "@/constants/dataConstant";
import { useProfileStore } from "@/store/profileStore";

const StepEducation = ({ form }: { form: any }) => {
  const { profileData } = useProfileStore();
  useEffect(() => {
    const {
      educationLevel,
      degreeOrSpecialialization,
      jobProfile,
      jobTitleOrDesignation,
      companyOrOrganization,
      anualIncome,
    } = form.getFieldsValue();
    form.setFieldsValue({
      educationLevel: educationLevel
        ? educationLevel
        : profileData.educationLevel
        ? profileData.educationLevel
        : null,
      degreeOrSpecialialization: degreeOrSpecialialization
        ? degreeOrSpecialialization
        : profileData.degreeOrSpecialialization
        ? profileData.degreeOrSpecialialization
        : null,
      jobProfile: jobProfile
        ? jobProfile
        : profileData.jobProfile
        ? profileData.jobProfile
        : null,
      jobTitleOrDesignation: jobTitleOrDesignation
        ? jobTitleOrDesignation
        : profileData.jobTitleOrDesignation
        ? profileData.jobTitleOrDesignation
        : null,
      companyOrOrganization: companyOrOrganization
        ? companyOrOrganization
        : profileData.companyOrOrganization
        ? profileData.companyOrOrganization
        : null,
      anualIncome: anualIncome
        ? anualIncome
        : profileData.anualIncome
        ? profileData.anualIncome
        : null,
    });
  }, [form, profileData]);
  return (
    <Form layout="vertical" form={form}>
      {/* Education Level */}
      <Form.Item
        label="Education Level"
        name="educationLevel"
        // rules={[
        //   { required: true, message: "Please select your education level" },
        // ]}
      >
        <Select placeholder="Select education level">
          {educationLevelsConstant.map((level) => (
            <Select.Option key={level.value} value={level.value}>
              {level.label}
            </Select.Option>
          ))}
        </Select>
      </Form.Item>

      {/* Degree */}
      <Form.Item label="Degree/Specialization" name="degreeOrSpecialialization">
        <Input placeholder="e.g., B.Tech Computer Science, MBA Finance" />
      </Form.Item>

      <Form.Item label="Job Profile" name="jobProfile">
        <Select placeholder="Select job profile">
          {jobProfileOptionConstant.map((range) => (
            <Select.Option key={range.value} value={range.value}>
              {range.label}
            </Select.Option>
          ))}
        </Select>
      </Form.Item>

      <Form.Item label="Job Title/Designation" name="jobTitleOrDesignation">
        <Input placeholder="Enter your job title" />
      </Form.Item>

      {/* Company */}
      <Form.Item label="Company/Organization" name="companyOrOrganization">
        <Input placeholder="Enter your company name" />
      </Form.Item>

      {/* Annual Income */}
      <Form.Item label="Annual Income" name="anualIncome">
        <Select placeholder="Select income range">
          {incomeRangesConstant.map((range) => (
            <Select.Option key={range.value} value={range.value}>
              {range.label}
            </Select.Option>
          ))}
        </Select>
      </Form.Item>
    </Form>
  );
};

export default StepEducation;
