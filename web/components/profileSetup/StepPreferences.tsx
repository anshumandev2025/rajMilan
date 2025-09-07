"use client";
import React, { useEffect } from "react";
import { Form, Input, Select } from "antd";
import {
  bodyTypeOptionConstant,
  casteOptionsConstant,
  educationLevelsConstant,
  heightConstant,
  jobProfileOptionConstant,
  locationOptionsConstant,
} from "@/constants/dataConstant";
import { useProfileStore } from "@/store/profileStore";

const { Option } = Select;

const ages = Array.from({ length: 40 }, (_, i) => 18 + i);

const StepPreferences = ({ form }: { form: any }) => {
  const { profileData } = useProfileStore();
  useEffect(() => {
    const {
      partnerPreferedBodyType,
      partnerPreferedSubCast,
      partnerPreferedCity,
      partnerPreferedEducationLevel,
      partnerPreferedProfession,
      partnerAdditionalPreference,
    } = form.getFieldsValue();
    form.setFieldsValue({
      partnerPreferedBodyType: partnerPreferedBodyType
        ? partnerPreferedBodyType
        : profileData.partnerPreferedBodyType,
      partnerPreferedSubCast: partnerPreferedSubCast
        ? partnerPreferedSubCast
        : profileData.partnerPreferedSubCast,
      partnerPreferedCity: partnerPreferedCity
        ? partnerPreferedCity
        : profileData.partnerPreferedCity,
      partnerPreferedEducationLevel: partnerPreferedEducationLevel
        ? partnerPreferedEducationLevel
        : profileData.partnerPreferedEducationLevel,
      partnerPreferedProfession: partnerPreferedProfession
        ? partnerPreferedProfession
        : profileData.partnerPreferedProfession,
      partnerAdditionalPreference: partnerAdditionalPreference
        ? partnerAdditionalPreference
        : profileData.partnerAdditionalPreference,
    });
  }, [form, profileData]);
  return (
    <Form layout="vertical" form={form}>
      {/* <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Form.Item
          label="Preferred Age (Min)"
          name="partnerPreferedMinAge"
          rules={[
            { required: true, message: "Please select minimum preferred age" },
          ]}
        >
          <Select placeholder="Select age">
            {ages.map((age) => (
              <Option key={age} value={age}>
                {age}
              </Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item
          label="Preferred Age (Max)"
          name="partnerPreferedMaxAge"
          rules={[
            { required: true, message: "Please select maximum preferred age" },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue("partnerPreferedMinAge") <= value) {
                  return Promise.resolve();
                }
                return Promise.reject(
                  new Error(
                    "Max age should be greater than or equal to Min age"
                  )
                );
              },
            }),
          ]}
        >
          <Select placeholder="Select age">
            {ages.map((age) => (
              <Option key={age} value={age}>
                {age}
              </Option>
            ))}
          </Select>
        </Form.Item>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Form.Item
          label="Preferred Height (Min)"
          name="partnerPreferedMinHeight"
          rules={[
            {
              required: true,
              message: "Please select minimum preferred height",
            },
          ]}
        >
          <Select placeholder="Select height">
            {heightConstant.map((h) => (
              <Select.Option key={h.value} value={h.value}>
                {h.label}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item
          label="Preferred Height (Max)"
          name="partnerPreferedMaxHeight"
          rules={[
            {
              required: true,
              message: "Please select maximum preferred height",
            },
          ]}
        >
          <Select placeholder="Select height">
            {heightConstant.map((h) => (
              <Select.Option key={h.value} value={h.value}>
                {h.label}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
      </div> */}

      <Form.Item
        label="Partner Prefered Body Type"
        name="partnerPreferedBodyType"
        rules={[
          {
            required: true,
            message: "Please select your partner prefered body type",
          },
        ]}
      >
        <Select placeholder="Select body type">
          {bodyTypeOptionConstant.map((h) => (
            <Select.Option key={h.value} value={h.value}>
              {h.label}
            </Select.Option>
          ))}
        </Select>
      </Form.Item>
      <Form.Item
        label="Preferred Caste"
        name="partnerPreferedSubCast"
        rules={[
          { required: true, message: "Please select a caste preference" },
        ]}
      >
        <Select placeholder="Select caste">
          {casteOptionsConstant.map((option) => (
            <Select.Option key={option.value} value={option.value}>
              {option.label}
            </Select.Option>
          ))}
        </Select>
      </Form.Item>

      <Form.Item
        label="Preferred City/Region"
        name="partnerPreferedCity"
        rules={[
          {
            required: true,
            message: "Please enter a preferred city or region",
          },
          { min: 2, message: "Must be at least 2 characters" },
        ]}
      >
        <Select placeholder="Select location">
          {locationOptionsConstant.map((option) => (
            <Select.Option key={option.value} value={option.value}>
              {option.label}
            </Select.Option>
          ))}
        </Select>
      </Form.Item>

      <Form.Item
        label="Preferred Education Level"
        name="partnerPreferedEducationLevel"
        rules={[
          { required: true, message: "Please select an education level" },
        ]}
      >
        <Select placeholder="Select education level">
          {educationLevelsConstant.map((level) => (
            <Select.Option key={level.value} value={level.value}>
              {level.label}
            </Select.Option>
          ))}
        </Select>
      </Form.Item>

      <Form.Item
        label="Preferred Profession"
        name="partnerPreferedProfession"
        rules={[
          { required: true, message: "Please enter a preferred profession" },
        ]}
      >
        <Select placeholder="Select job profile">
          {jobProfileOptionConstant.map((range) => (
            <Select.Option key={range.value} value={range.value}>
              {range.label}
            </Select.Option>
          ))}
        </Select>
      </Form.Item>

      <Form.Item
        label="Additional Preferences"
        name="partnerAdditionalPreference"
        rules={[
          {
            min: 10,
            message: "Please write at least 10 characters or leave it blank",
            whitespace: true,
          },
        ]}
      >
        <Input.TextArea
          placeholder="Any other preferences you'd like to specify..."
          rows={4}
        />
      </Form.Item>
    </Form>
  );
};

export default StepPreferences;
