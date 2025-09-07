"use client";
import React, { useEffect } from "react";
import { Form, Input, Select } from "antd";
import {
  familyTypesConstant,
  familyValuesConstant,
  siblingOptionsConstant,
  gotraOptionsConstant,
} from "@/constants/dataConstant";
import { useProfileStore } from "@/store/profileStore";

const StepFamily = ({ form }: { form: any }) => {
  const { profileData } = useProfileStore();
  useEffect(() => {
    const {
      fatherName,
      fatherOccupation,
      fatherGotra,
      motherName,
      motherOccupation,
      motherGotra,
      paternalGrandfatherName,
      paternalGrandfatherOccupation,
      paternalGrandfatherGotra,
      paternalGrandmotherName,
      paternalGrandmotherGotra,
      maternalGrandfatherName,
      maternalGrandfatherOccupation,
      maternalGrandfatherGotra,
      maternalGrandmotherName,
      maternalGrandmotherGotra,
      paternalVillage,
      maternalVillage,
      gotra,
      siblingsCount,
      familyType,
      familyValues,
      aboutFamilyBackground,
    } = form.getFieldsValue();

    form.setFieldsValue({
      fatherName: fatherName || profileData.fatherName,
      fatherOccupation: fatherOccupation || profileData.fatherOccupation,
      fatherGotra: fatherGotra || profileData.fatherGotra,
      motherName: motherName || profileData.motherName,
      motherOccupation: motherOccupation || profileData.motherOccupation,
      motherGotra: motherGotra || profileData.motherGotra,
      paternalGrandfatherName:
        paternalGrandfatherName || profileData.paternalGrandfatherName,
      paternalGrandfatherOccupation:
        paternalGrandfatherOccupation ||
        profileData.paternalGrandfatherOccupation,
      maternalGrandfatherName:
        maternalGrandfatherName || profileData.maternalGrandfatherName,
      maternalGrandfatherOccupation:
        maternalGrandfatherOccupation ||
        profileData.maternalGrandfatherOccupation,
      maternalGrandfatherGotra:
        maternalGrandfatherGotra || profileData.maternalGrandfatherGotra,
      maternalGrandmotherName:
        maternalGrandmotherName || profileData.maternalGrandmotherName,
      maternalGrandmotherGotra:
        maternalGrandmotherGotra || profileData.maternalGrandmotherGotra,
      paternalVillage: paternalVillage || profileData.paternalVillage,
      maternalVillage: maternalVillage || profileData.maternalVillage,
      gotra: gotra || profileData.gotra,
      siblingsCount: siblingsCount || profileData.siblingsCount,
      familyType: familyType || profileData.familyType,
      familyValues: familyValues || profileData.familyValues,
      aboutFamilyBackground:
        aboutFamilyBackground || profileData.aboutFamilyBackground,
      paternalGrandmotherName: paternalGrandmotherName
        ? paternalGrandmotherName
        : profileData.paternalGrandmotherName,
      paternalGrandfatherGotra: paternalGrandfatherGotra
        ? paternalGrandfatherGotra
        : profileData.paternalGrandfatherGotra,
      paternalGrandmotherGotra: paternalGrandmotherGotra
        ? paternalGrandmotherGotra
        : profileData.paternalGrandmotherGotra,
    });
  }, [form, profileData]);

  return (
    <Form layout="vertical" form={form}>
      {/* Parent Details */}
      <h3 className="mt-4 mb-2 font-semibold text-gray-700">Parents</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Father */}
        <Form.Item
          label="Father's Name"
          name="fatherName"
          rules={[{ required: true, message: "Please enter father's name" }]}
        >
          <Input placeholder="Enter father's name" />
        </Form.Item>
        <Form.Item
          label="Father's Occupation"
          name="fatherOccupation"
          rules={[
            { required: true, message: "Please enter father's occupation" },
          ]}
        >
          <Input placeholder="Enter father's occupation" />
        </Form.Item>
        <Form.Item
          label="Father's Gotra"
          name="fatherGotra"
          rules={[{ required: true, message: "Please select father's Gotra" }]}
        >
          <Select placeholder="Select father's gotra">
            {gotraOptionsConstant.map((gotra) => (
              <Select.Option key={gotra.value} value={gotra.value}>
                {gotra.label}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>

        {/* Mother */}
        <Form.Item
          label="Mother's Name"
          name="motherName"
          rules={[{ required: true, message: "Please enter mother's name" }]}
        >
          <Input placeholder="Enter mother's name" />
        </Form.Item>
        <Form.Item
          label="Mother's Occupation"
          name="motherOccupation"
          rules={[
            { required: true, message: "Please enter mother's occupation" },
          ]}
        >
          <Input placeholder="Enter mother's occupation" />
        </Form.Item>
        <Form.Item
          label="Mother's Gotra"
          name="motherGotra"
          rules={[{ required: true, message: "Please select mother's Gotra" }]}
        >
          <Select placeholder="Select mother's gotra">
            {gotraOptionsConstant.map((gotra) => (
              <Select.Option key={gotra.value} value={gotra.value}>
                {gotra.label}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
      </div>

      {/* Grandparents */}
      <h3 className="mt-6 mb-2 font-semibold text-gray-700">Grandparents</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Paternal Grandfather */}
        <Form.Item
          label="Paternal Grandfather's Name"
          name="paternalGrandfatherName"
          rules={[
            {
              required: true,
              message: "Please enter paternal grandfather's name",
            },
          ]}
        >
          <Input placeholder="Enter paternal grandfather's name" />
        </Form.Item>
        <Form.Item
          label="Paternal Grandfather's Occupation"
          name="paternalGrandfatherOccupation"
        >
          <Input placeholder="Enter paternal grandfather's occupation" />
        </Form.Item>
        <Form.Item
          label="Paternal Grandfather's Gotra"
          name="paternalGrandfatherGotra"
        >
          <Select placeholder="Select paternal grandfather's gotra">
            {gotraOptionsConstant.map((gotra) => (
              <Select.Option key={gotra.value} value={gotra.value}>
                {gotra.label}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>

        {/* Paternal Grandmother */}
        <Form.Item
          label="Paternal Grandmother's Name"
          name="paternalGrandmotherName"
        >
          <Input placeholder="Enter paternal grandmother's name" />
        </Form.Item>
        <Form.Item
          label="Paternal Grandmother's Gotra"
          name="paternalGrandmotherGotra"
        >
          <Select placeholder="Select paternal grandmother's gotra">
            {gotraOptionsConstant.map((gotra) => (
              <Select.Option key={gotra.value} value={gotra.value}>
                {gotra.label}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>

        {/* Maternal Grandfather */}
        <Form.Item
          label="Maternal Grandfather's Name"
          name="maternalGrandfatherName"
          rules={[
            {
              required: true,
              message: "Please enter maternal grandfather's name",
            },
          ]}
        >
          <Input placeholder="Enter maternal grandfather's name" />
        </Form.Item>
        <Form.Item
          label="Maternal Grandfather's Occupation"
          name="maternalGrandfatherOccupation"
        >
          <Input placeholder="Enter maternal grandfather's occupation" />
        </Form.Item>
        <Form.Item
          label="Maternal Grandfather's Gotra"
          name="maternalGrandfatherGotra"
        >
          <Select placeholder="Select maternal grandfather's gotra">
            {gotraOptionsConstant.map((gotra) => (
              <Select.Option key={gotra.value} value={gotra.value}>
                {gotra.label}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>

        {/* Maternal Grandmother */}
        <Form.Item
          label="Maternal Grandmother's Name"
          name="maternalGrandmotherName"
        >
          <Input placeholder="Enter maternal grandmother's name" />
        </Form.Item>
        <Form.Item
          label="Maternal Grandmother's Gotra"
          name="maternalGrandmotherGotra"
        >
          <Select placeholder="Select maternal grandmother's gotra">
            {gotraOptionsConstant.map((gotra) => (
              <Select.Option key={gotra.value} value={gotra.value}>
                {gotra.label}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
      </div>

      {/* Village Details */}
      <h3 className="mt-6 mb-2 font-semibold text-gray-700">Village Details</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Form.Item
          label="Paternal Village"
          name="paternalVillage"
          rules={[{ required: true, message: "Please enter paternal village" }]}
        >
          <Input placeholder="Enter paternal village" />
        </Form.Item>
        <Form.Item
          label="Maternal Village"
          name="maternalVillage"
          rules={[{ required: true, message: "Please enter maternal village" }]}
        >
          <Input placeholder="Enter maternal village" />
        </Form.Item>
      </div>

      {/* Personal Gotra */}
      <Form.Item
        label="Your Gotra"
        name="gotra"
        rules={[{ required: true, message: "Please select your Gotra" }]}
        className="mt-6"
      >
        <Select placeholder="Select your gotra">
          {gotraOptionsConstant.map((gotra) => (
            <Select.Option key={gotra.value} value={gotra.value}>
              {gotra.label}
            </Select.Option>
          ))}
        </Select>
      </Form.Item>

      {/* Siblings, Family Type, Values */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
        <Form.Item
          label="Number of Siblings"
          name="siblingsCount"
          rules={[
            { required: true, message: "Please select the number of siblings" },
          ]}
        >
          <Select placeholder="Select number">
            {siblingOptionsConstant.map((option) => (
              <Select.Option key={option.value} value={option.value}>
                {option.label}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item
          label="Family Type"
          name="familyType"
          rules={[
            { required: true, message: "Please select your family type" },
          ]}
        >
          <Select placeholder="Select family type">
            {familyTypesConstant.map((type) => (
              <Select.Option key={type.value} value={type.value}>
                {type.label}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
      </div>

      {/* Family Values & Background */}
      <Form.Item
        label="Family Values"
        name="familyValues"
        rules={[
          { required: true, message: "Please select your family values" },
        ]}
        className="mt-4"
      >
        <Select placeholder="Select family values">
          {familyValuesConstant.map((value) => (
            <Select.Option key={value.value} value={value.value}>
              {value.label}
            </Select.Option>
          ))}
        </Select>
      </Form.Item>

      <Form.Item
        label="Family Background"
        name="aboutFamilyBackground"
        rules={[
          {
            min: 10,
            message: "Please write at least 10 characters about your family",
          },
        ]}
        className="mt-4"
      >
        <Input.TextArea
          placeholder="Share more about your family background..."
          rows={4}
        />
      </Form.Item>
    </Form>
  );
};

export default StepFamily;
