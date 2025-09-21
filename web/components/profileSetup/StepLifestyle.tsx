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
        : profileData.dietPreference
        ? profileData.dietPreference
        : null,
      smokingHabit: smokingHabit
        ? smokingHabit
        : profileData.smokingHabit
        ? profileData.smokingHabit
        : null,
      drinkingHabit: drinkingHabit
        ? drinkingHabit
        : profileData.drinkingHabit
        ? profileData.drinkingHabit
        : null,
      aboutHobbyOrInterset: aboutHobbyOrInterset
        ? aboutHobbyOrInterset
        : profileData.aboutHobbyOrInterset
        ? profileData.aboutHobbyOrInterset
        : null,
    });
  }, [form, profileData]);
  return (
    <Form layout="vertical" form={form}>
      {/* Diet Preference */}
      <Form.Item
        label="Diet Preference"
        name="dietPreference"
        // rules={[
        //   { required: true, message: "Please select your diet preference" },
        // ]}
      >
        <Radio.Group>
          <Radio value="vegetarian">Vegetarian</Radio>
          <Radio value="non-vegetarian">Non-Vegetarian</Radio>
          <Radio value="eggetarian">Eggetarian</Radio>
        </Radio.Group>
      </Form.Item>

      {/* Smoking Habit */}
      <Form.Item label="Smoking Habit" name="smokingHabit">
        <Radio.Group>
          <Radio value="no">No</Radio>
          <Radio value="occasionally">Occasionally</Radio>
          <Radio value="yes">Yes</Radio>
        </Radio.Group>
      </Form.Item>

      {/* Drinking Habit */}
      <Form.Item label="Drinking Habit" name="drinkingHabit">
        <Radio.Group>
          <Radio value="no">No</Radio>
          <Radio value="occasionally">Occasionally</Radio>
          <Radio value="yes">Yes</Radio>
        </Radio.Group>
      </Form.Item>

      {/* Hobbies */}
      <Form.Item label="Hobbies & Interests" name="aboutHobbyOrInterset">
        <Input.TextArea
          placeholder="Tell us about your hobbies, interests..."
          rows={4}
        />
      </Form.Item>
    </Form>
  );
};

export default StepLifestyle;
