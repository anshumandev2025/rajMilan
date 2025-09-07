"use client";
import React, { useState, useEffect } from "react";
import { Card, Row, Col, Modal } from "antd";
import {
  UserOutlined,
  BankOutlined,
  TeamOutlined,
  HeartOutlined,
  CoffeeOutlined,
} from "@ant-design/icons";
import ProfileHeader from "@/components/profile/ProfileHeader";
import ProfileSection from "@/components/profile/ProfileSection";
import DisplayField from "@/components/profile/DisplayField";
import PhotoGallery from "@/components/profile/PhotoGallery";
import { useParams } from "next/navigation";
import apiClient from "@/utils/apiClient";

// TypeScript interfaces
interface ProfileData {
  fullName: string;
  emailAddress: string;
  mobileNumber: string;
  location: string;
  subCast: string;
  gender: string;
  dateOfBirth: string;
  height: string;
  educationLevel: string;
  degreeOrSpecialialization: string;
  jobTitleOrDesignation: string;
  companyOrOrganization: string;
  anualIncome: string;
  dietPreference: string;
  smokingHabit: string;
  drinkingHabit: string;
  aboutHobbyOrInterset: string;
  fatherOccupation: string;
  motherOccupation: string;
  grandFatherOccupation: string;
  siblingsCount: string;
  familyType: string;
  familyValues: string;
  aboutFamilyBackground: string;
  partnerPreferedMinAge: string;
  partnerPreferedMaxAge: string;
  partnerPreferedMinHeight: string;
  partnerPreferedMaxHeight: string;
  partnerPreferedSubCast: string;
  partnerPreferedCity: string;
  partnerPreferedEducationLevel: string;
  partnerPreferedProfession: string;
  partnerAdditionalPreference: string;
  profileImage: string | null;
  galleryImages: string[];
}
const initialData = {
  fullName: "sdf",
  gender: "",
  dateOfBirth: "",
  height: "",
  emailAddress: "",
  mobileNumber: "",
  location: "",
  subCast: "",
  educationLevel: "",
  degreeOrSpecialialization: "",
  jobTitleOrDesignation: "",
  companyOrOrganization: "",
  anualIncome: "",
  dietPreference: "",
  smokingHabit: "",
  drinkingHabit: "",
  aboutHobbyOrInterset: "",
  fatherOccupation: "",
  motherOccupation: "",
  grandFatherOccupation: "",
  siblingsCount: "",
  familyType: "",
  familyValues: "",
  aboutFamilyBackground: "",
  partnerPreferedMinAge: "",
  partnerPreferedMaxAge: "",
  partnerPreferedMinHeight: "",
  partnerPreferedMaxHeight: "",
  partnerPreferedSubCast: "",
  partnerPreferedCity: "",
  partnerPreferedEducationLevel: "",
  partnerPreferedProfession: "",
  partnerAdditionalPreference: "",
  profileImage: null,
  galleryImages: [],
};
const page = () => {
  const params = useParams();
  const userId = params.userId;
  const [profileData, setProfileData] = useState<ProfileData>(initialData);
  const [previewImage, setPreviewImage] = useState("");
  const [previewVisible, setPreviewVisible] = useState(false);
  const [previewTitle, setPreviewTitle] = useState("");
  useEffect(() => {
    const fetchProfileData = async () => {
      const response = await apiClient.get(`/user/${userId}`);
      setProfileData(response.data);
    };
    fetchProfileData();
  }, [userId]);
  return (
    <div className="p-4 min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <ProfileHeader
          profileImage={profileData.profileImage}
          fullName={profileData.fullName}
          gender={profileData.gender}
          height={profileData.height}
          dateOfBirth={profileData.dateOfBirth}
          isEditMode={false}
        />
        <Row gutter={[24, 24]}>
          <Col xs={24} lg={12}>
            {/* Personal Information */}
            <ProfileSection
              title="Personal Information"
              icon={<UserOutlined />}
            >
              <DisplayField
                label="Full Name"
                field="fullName"
                value={profileData.fullName}
                isEditMode={false}
              />
              <DisplayField
                label="Email Address"
                field="emailAddress"
                value={profileData.emailAddress}
                isEditMode={false}
              />

              <DisplayField
                label="Mobile number"
                field="mobileNumber"
                value={profileData.mobileNumber}
                isEditMode={false}
              />

              <DisplayField
                label="Locatation"
                field="location"
                value={profileData.location}
                isEditMode={false}
              />

              <DisplayField
                label="Sub Cast"
                field="subCast"
                value={profileData.subCast}
                isEditMode={false}
              />

              <DisplayField
                label="Gender"
                field="gender"
                value={profileData.gender}
                isEditMode={false}
              />

              <DisplayField
                label="Date of birth"
                field="dateOfBirth"
                value={profileData.dateOfBirth}
                isEditMode={false}
              />

              <DisplayField
                label="Height"
                field="height"
                value={profileData.height}
                isEditMode={false}
              />
            </ProfileSection>
          </Col>

          <Col xs={24} lg={12}>
            {/* Professional Information */}
            <ProfileSection
              title="Professional Information"
              icon={<BankOutlined />}
            >
              <DisplayField
                label="Education Level"
                field="educationLevel"
                value={profileData.educationLevel}
                isEditMode={false}
              />
              <DisplayField
                label="Degree or Specialialization"
                field="degreeOrSpecialialization"
                value={profileData.degreeOrSpecialialization}
                isEditMode={false}
              />
              <DisplayField
                label="Job Title"
                field="jobTitleOrDesignation"
                value={profileData.jobTitleOrDesignation}
                isEditMode={false}
              />

              <DisplayField
                label="Company or organization"
                field="companyOrOrganization"
                value={profileData.companyOrOrganization}
                isEditMode={false}
              />
              <DisplayField
                label="Annual Income"
                field="anualIncome"
                value={profileData.anualIncome}
                isEditMode={false}
              />
            </ProfileSection>
          </Col>

          <Col xs={24} lg={12}>
            {/* LifeStyle Information */}
            <ProfileSection
              title="LifeStyle Information"
              icon={<CoffeeOutlined />}
            >
              <DisplayField
                label="Diet Preference"
                field="dietPreference"
                value={profileData.dietPreference}
                isEditMode={false}
              />

              <DisplayField
                label="Smoking Habit"
                field="smokingHabit"
                value={profileData.smokingHabit}
                isEditMode={false}
              />

              <DisplayField
                label="Drinking Habit"
                field="drinkingHabit"
                value={profileData.drinkingHabit}
                isEditMode={false}
              />

              <DisplayField
                label="About Hobby"
                field="aboutHobbyOrInterset"
                value={profileData.aboutHobbyOrInterset}
                isEditMode={false}
              />
            </ProfileSection>
          </Col>

          <Col xs={24} lg={12}>
            {/* Family Information */}
            <ProfileSection title="Family Information" icon={<TeamOutlined />}>
              <DisplayField
                label="Father occupation"
                field="fatherOccupation"
                value={profileData.fatherOccupation}
                isEditMode={false}
              />

              <DisplayField
                label="Mother occupation"
                field="motherOccupation"
                value={profileData.motherOccupation}
                isEditMode={false}
              />

              <DisplayField
                label="GrandFather occupation"
                field="grandFatherOccupation"
                value={profileData.grandFatherOccupation}
                isEditMode={false}
              />

              <DisplayField
                label="Sibling Count"
                field="siblingsCount"
                value={profileData.siblingsCount}
                isEditMode={false}
              />

              <DisplayField
                label="Family Type"
                field="familyType"
                value={profileData.familyType}
                isEditMode={false}
              />

              <DisplayField
                label="Family Values"
                field="familyValues"
                value={profileData.familyValues}
                isEditMode={false}
              />

              <DisplayField
                label="About family background"
                field="aboutFamilyBackground"
                value={profileData.aboutFamilyBackground}
                isEditMode={false}
              />
            </ProfileSection>
          </Col>

          <Col xs={24} lg={12}>
            {/* Partner Preferences */}
            <ProfileSection
              title="Partner Preferences"
              icon={<HeartOutlined />}
            >
              <DisplayField
                label="Partner minimum age"
                field="partnerPreferedMinAge"
                value={profileData.partnerPreferedMinAge}
                isEditMode={false}
              />
              <DisplayField
                label="Partner maximum age"
                field="partnerPreferedMaxAge"
                value={profileData.partnerPreferedMaxAge}
                isEditMode={false}
              />
              <DisplayField
                label="Partner minimum height"
                field="partnerPreferedMinHeight"
                value={profileData.partnerPreferedMinHeight}
                isEditMode={false}
              />
              <DisplayField
                label="Partner maximum height"
                field="partnerPreferedMaxHeight"
                value={profileData.partnerPreferedMaxHeight}
                isEditMode={false}
              />
              <DisplayField
                label="Partner SubCast"
                field="partnerPreferedSubCast"
                value={profileData.partnerPreferedSubCast}
                isEditMode={false}
              />
              <DisplayField
                label="Partner prefer city"
                field="partnerPreferedCity"
                value={profileData.partnerPreferedCity}
                isEditMode={false}
              />
              <DisplayField
                label="Partner prefer education level"
                field="partnerPreferedEducationLevel"
                value={profileData.partnerPreferedEducationLevel}
                isEditMode={false}
              />
              <DisplayField
                label="Partner prefered profession"
                field="partnerPreferedProfession"
                value={profileData.partnerPreferedProfession}
                isEditMode={false}
              />
              <DisplayField
                label="Partner additional preference"
                field="partnerAdditionalPreference"
                value={profileData.partnerAdditionalPreference}
                isEditMode={false}
              />
            </ProfileSection>
          </Col>
        </Row>
        <Card className="mt-6 shadow-lg border-0">
          {/* Photo gallery */}
          <PhotoGallery
            images={profileData.galleryImages}
            isEditMode={false}
            galleryImagesLength={profileData.galleryImages.length}
          />
        </Card>
        {/* Preview Modal */}
        <Modal
          open={previewVisible}
          title={previewTitle}
          footer={null}
          onCancel={() => setPreviewVisible(false)}
          centered
        >
          <img src={previewImage} alt={previewTitle} className="w-full" />
        </Modal>
      </div>
    </div>
  );
};

export default page;
