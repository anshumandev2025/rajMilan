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
      partnerPreferedSubCast,
      partnerPreferedCity,
      partnerPreferedEducationLevel,
      partnerPreferedProfession,
      partnerAdditionalPreference,
    } = form.getFieldsValue();
    form.setFieldsValue({
      partnerPreferedSubCast: partnerPreferedSubCast
        ? partnerPreferedSubCast
        : profileData.partnerPreferedSubCast
        ? profileData.partnerPreferedSubCast
        : null,
      partnerPreferedCity: partnerPreferedCity
        ? partnerPreferedCity
        : profileData.partnerPreferedCity
        ? profileData.partnerPreferedCity
        : null,
      partnerPreferedEducationLevel: partnerPreferedEducationLevel
        ? partnerPreferedEducationLevel
        : profileData.partnerPreferedEducationLevel
        ? profileData.partnerPreferedEducationLevel
        : null,
      partnerPreferedProfession: partnerPreferedProfession
        ? partnerPreferedProfession
        : profileData.partnerPreferedProfession
        ? profileData.partnerPreferedProfession
        : null,
      partnerAdditionalPreference: partnerAdditionalPreference
        ? partnerAdditionalPreference
        : profileData.partnerAdditionalPreference
        ? profileData.partnerAdditionalPreference
        : null,
    });
  }, [form, profileData]);
  return (
    <Form layout="vertical" form={form}>
      <Form.Item label="Preferred Caste" name="partnerPreferedSubCast">
        <Input placeholder="Enter partner prefered sub caste" />
      </Form.Item>

      <Form.Item label="Preferred City/Region" name="partnerPreferedCity">
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
      >
        <Select placeholder="Select education level">
          {educationLevelsConstant.map((level) => (
            <Select.Option key={level.value} value={level.value}>
              {level.label}
            </Select.Option>
          ))}
        </Select>
      </Form.Item>

      <Form.Item label="Preferred Profession" name="partnerPreferedProfession">
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
