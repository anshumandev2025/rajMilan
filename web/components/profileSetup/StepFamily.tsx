"use client";
import React, { useEffect } from "react";
import { Form, Input, Select } from "antd";
import {
  familyTypesConstant,
  familyValuesConstant,
  siblingOptionsConstant,
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
      paternalGrandmotherName,
      paternalGrandmotherGotra,
      maternalGrandfatherName,
      maternalGrandfatherOccupation,
      maternalGrandmotherName,
      maternalGrandmotherGotra,
      paternalVillage,
      maternalVillage,
      siblingsCount,
      familyType,
      familyValues,
      aboutFamilyBackground,
    } = form.getFieldsValue();

    form.setFieldsValue({
      fatherName: fatherName
        ? fatherName
        : profileData.fatherName
        ? profileData.fatherName
        : null,
      fatherOccupation: fatherOccupation
        ? fatherOccupation
        : profileData.fatherOccupation
        ? profileData.fatherOccupation
        : null,
      fatherGotra: fatherGotra
        ? fatherGotra
        : profileData.fatherGotra
        ? profileData.fatherGotra
        : null,
      motherName: motherName
        ? motherName
        : profileData.motherName
        ? profileData.motherName
        : null,
      motherOccupation: motherOccupation
        ? motherOccupation
        : profileData.motherOccupation
        ? profileData.motherOccupation
        : null,
      motherGotra: motherGotra
        ? motherGotra
        : profileData.motherGotra
        ? profileData.motherGotra
        : null,
      paternalGrandfatherName: paternalGrandfatherName
        ? paternalGrandfatherName
        : profileData.paternalGrandfatherName
        ? profileData.paternalGrandfatherName
        : null,
      paternalGrandfatherOccupation: paternalGrandfatherOccupation
        ? paternalGrandfatherOccupation
        : profileData.paternalGrandfatherOccupation
        ? profileData.paternalGrandfatherOccupation
        : null,
      maternalGrandfatherName: maternalGrandfatherName
        ? maternalGrandfatherName
        : profileData.maternalGrandfatherName
        ? profileData.maternalGrandfatherName
        : null,
      maternalGrandfatherOccupation: maternalGrandfatherOccupation
        ? maternalGrandfatherOccupation
        : profileData.maternalGrandfatherOccupation
        ? profileData.maternalGrandfatherOccupation
        : null,
      maternalGrandmotherName: maternalGrandmotherName
        ? maternalGrandfatherName
        : profileData.maternalGrandmotherName
        ? profileData.maternalGrandmotherName
        : null,
      maternalGrandmotherGotra: maternalGrandmotherGotra
        ? maternalGrandmotherGotra
        : profileData.maternalGrandmotherGotra
        ? profileData.maternalGrandmotherGotra
        : null,
      paternalVillage: paternalVillage
        ? paternalVillage
        : profileData.paternalVillage
        ? profileData.paternalVillage
        : null,
      maternalVillage: maternalVillage
        ? maternalVillage
        : profileData.maternalVillage
        ? profileData.maternalVillage
        : null,
      siblingsCount: siblingsCount
        ? siblingsCount
        : profileData.siblingsCount
        ? profileData.siblingsCount
        : null,
      familyType: familyType
        ? familyType
        : profileData.familyType
        ? profileData.familyType
        : null,
      familyValues: familyValues
        ? familyValues
        : profileData.familyValues
        ? profileData.familyValues
        : null,
      aboutFamilyBackground: aboutFamilyBackground
        ? aboutFamilyBackground
        : profileData.aboutFamilyBackground
        ? profileData.aboutFamilyBackground
        : null,
      paternalGrandmotherName: paternalGrandmotherName
        ? paternalGrandmotherName
        : profileData.paternalGrandmotherName
        ? profileData.paternalGrandfatherName
        : null,
      paternalGrandmotherGotra: paternalGrandmotherGotra
        ? paternalGrandmotherGotra
        : profileData.paternalGrandmotherGotra
        ? profileData.paternalGrandmotherGotra
        : null,
    });
  }, [form, profileData]);

  return (
    <Form layout="vertical" form={form}>
      {/* Parent Details */}
      <h3 className="mt-4 mb-2 font-semibold text-gray-700">Parents</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Father */}
        <Form.Item label="Father's Name" name="fatherName">
          <Input placeholder="Enter father's name" />
        </Form.Item>
        <Form.Item label="Father's Occupation" name="fatherOccupation">
          <Input placeholder="Enter father's occupation" />
        </Form.Item>
        <Form.Item label="Father's Gotra" name="fatherGotra">
          <Input placeholder="Enter father's gotra" />
        </Form.Item>

        {/* Mother */}
        <Form.Item label="Mother's Name" name="motherName">
          <Input placeholder="Enter mother's name" />
        </Form.Item>
        <Form.Item label="Mother's Occupation" name="motherOccupation">
          <Input placeholder="Enter mother's occupation" />
        </Form.Item>
        <Form.Item label="Mother's Gotra" name="motherGotra">
          <Input placeholder="Enter mother's gotra" />
        </Form.Item>
      </div>

      {/* Grandparents */}
      <h3 className="mt-6 mb-2 font-semibold text-gray-700">Grandparents</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Paternal Grandfather */}
        <Form.Item
          label="Paternal Grandfather's Name"
          name="paternalGrandfatherName"
        >
          <Input placeholder="Enter paternal grandfather's name" />
        </Form.Item>
        <Form.Item
          label="Paternal Grandfather's Occupation"
          name="paternalGrandfatherOccupation"
        >
          <Input placeholder="Enter paternal grandfather's occupation" />
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
          <Input placeholder="Enter paternal grandmother's gotra" />
        </Form.Item>

        {/* Maternal Grandfather */}
        <Form.Item
          label="Maternal Grandfather's Name"
          name="maternalGrandfatherName"
        >
          <Input placeholder="Enter maternal grandfather's name" />
        </Form.Item>
        <Form.Item
          label="Maternal Grandfather's Occupation"
          name="maternalGrandfatherOccupation"
        >
          <Input placeholder="Enter maternal grandfather's occupation" />
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
          <Input placeholder="Enter maternal grandmother gotra" />
        </Form.Item>
      </div>

      {/* Village Details */}
      <h3 className="mt-6 mb-2 font-semibold text-gray-700">Village Details</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Form.Item label="Paternal Village" name="paternalVillage">
          <Input placeholder="Enter paternal village" />
        </Form.Item>
        <Form.Item label="Maternal Village" name="maternalVillage">
          <Input placeholder="Enter maternal village" />
        </Form.Item>
      </div>

      {/* Siblings, Family Type, Values */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
        <Form.Item label="Number of Siblings" name="siblingsCount">
          <Select placeholder="Select number">
            {siblingOptionsConstant.map((option) => (
              <Select.Option key={option.value} value={option.value}>
                {option.label}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item label="Family Type" name="familyType">
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
      <Form.Item label="Family Values" name="familyValues" className="mt-4">
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
