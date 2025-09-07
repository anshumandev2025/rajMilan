"use client";
import React, { useEffect } from "react";
import { Form, Radio, Input } from "antd";
import { useProfileStore } from "@/store/profileStore";

const StepLifestyle = ({ form }: { form: any }) => {
  const { profileData } = useProfileStore();
  useEffect(() => {
    const {
      dietPreference,
      smokingHabit,
      drinkingHabit,
      aboutHobbyOrInterset,
    } = form.getFieldsValue();

    form.setFieldsValue({
      dietPreference: dietPreference
        ? dietPreference
        : profileData.dietPreference,
      smokingHabit: smokingHabit ? smokingHabit : profileData.smokingHabit,
      drinkingHabit: drinkingHabit ? drinkingHabit : profileData.drinkingHabit,
      aboutHobbyOrInterset: aboutHobbyOrInterset
        ? aboutHobbyOrInterset
        : profileData.aboutHobbyOrInterset,
    });
  }, [form, profileData]);
  return (
    <Form layout="vertical" form={form}>
      {/* Diet Preference */}
      <Form.Item
        label="Diet Preference"
        name="dietPreference"
        rules={[
          { required: true, message: "Please select your diet preference" },
        ]}
      >
        <Radio.Group>
          <Radio value="vegetarian">Vegetarian</Radio>
          <Radio value="non-vegetarian">Non-Vegetarian</Radio>
          <Radio value="eggetarian">Eggetarian</Radio>
        </Radio.Group>
      </Form.Item>

      {/* Smoking Habit */}
      <Form.Item
        label="Smoking Habit"
        name="smokingHabit"
        rules={[
          { required: true, message: "Please select your smoking habit" },
        ]}
      >
        <Radio.Group>
          <Radio value="no">No</Radio>
          <Radio value="occasionally">Occasionally</Radio>
          <Radio value="yes">Yes</Radio>
        </Radio.Group>
      </Form.Item>

      {/* Drinking Habit */}
      <Form.Item
        label="Drinking Habit"
        name="drinkingHabit"
        rules={[
          { required: true, message: "Please select your drinking habit" },
        ]}
      >
        <Radio.Group>
          <Radio value="no">No</Radio>
          <Radio value="occasionally">Occasionally</Radio>
          <Radio value="yes">Yes</Radio>
        </Radio.Group>
      </Form.Item>

      {/* Hobbies */}
      <Form.Item
        label="Hobbies & Interests"
        name="aboutHobbyOrInterset"
        rules={[
          {
            min: 10,
            message: "Please write at least 10 characters",
            whitespace: true,
          },
        ]}
      >
        <Input.TextArea
          placeholder="Tell us about your hobbies, interests..."
          rows={4}
        />
      </Form.Item>
    </Form>
  );
};

export default StepLifestyle;
