"use client";
import React, { useState, useEffect } from "react";
import { Card, Row, Col, Modal } from "antd";
import ProfileHeader from "@/components/profile/ProfileHeader";
import DisplayField from "@/components/profile/DisplayField";
import PhotoGallery from "@/components/profile/PhotoGallery";
import { useParams } from "next/navigation";
import apiClient from "@/utils/apiClient";
import { ProfileData } from "@/types";
import { initialProfileData } from "@/constants/defaultData";

// TypeScript interfaces
const page = () => {
  const params = useParams();
  const userId = params.userId;
  const [profileData, setProfileData] =
    useState<ProfileData>(initialProfileData);
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

        <div className="flex flex-col space-y-10 mt-5">
          <h1 className="text-left text-lg md:text-2xl font-bold">
            Personl Information
          </h1>
          <div className="grid grid-col-1 md:grid-cols-2 gap-x-16 gap-y-8">
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
              type="select"
            />

            <DisplayField
              label="Gender"
              field="gender"
              value={profileData.gender}
              isEditMode={false}
              type="select"
            />

            <DisplayField
              label="Date of birth"
              field="dateOfBirth"
              value={profileData.dateOfBirth}
              isEditMode={false}
              type="date"
            />

            <DisplayField
              label="Height"
              field="height"
              value={profileData.height}
              isEditMode={false}
            />

            <DisplayField
              label="Body Type"
              field="bodyType"
              value={profileData.bodyType}
              isEditMode={false}
              type="select"
            />

            <DisplayField
              label="Full Address"
              field="fullAddress"
              value={profileData.fullAddress}
              isEditMode={false}
            />
          </div>

          <h1 className="text-left text-lg md:text-2xl font-bold">
            Professional Information
          </h1>
          <div className="grid grid-col-1 md:grid-cols-2 gap-x-16 gap-y-8">
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
              label="Job Profile"
              field="jobProfile"
              value={profileData.jobProfile}
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
          </div>
          <h1 className="text-left text-lg md:text-2xl font-bold">
            LifeStyle Information
          </h1>
          <div className="grid grid-col-1 md:grid-cols-2 gap-x-16 gap-y-8">
            <DisplayField
              label="Diet Preference"
              field="dietPreference"
              value={profileData.dietPreference}
              isEditMode={false}
              type="select"
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
              type="select"
            />

            <DisplayField
              label="About Hobby"
              field="aboutHobbyOrInterset"
              value={profileData.aboutHobbyOrInterset}
              isEditMode={false}
            />
          </div>

          <h1 className="text-left text-lg md:text-2xl font-bold">
            Family Information
          </h1>
          <div className="grid grid-col-1 md:grid-cols-2 gap-x-16 gap-y-8">
            <DisplayField
              label="Father name"
              field="fatherName"
              value={profileData.fatherName}
              isEditMode={false}
            />

            <DisplayField
              label="Father occupation"
              field="fatherOccupation"
              value={profileData.fatherOccupation}
              isEditMode={false}
            />

            <DisplayField
              label="Father gotra"
              field="fatherGotra"
              value={profileData.fatherGotra}
              isEditMode={false}
            />

            <DisplayField
              label="Mother name"
              field="motherName"
              value={profileData.motherName}
              isEditMode={false}
            />

            <DisplayField
              label="Mother occupation"
              field="motherOccupation"
              value={profileData.motherOccupation}
              isEditMode={false}
            />

            <DisplayField
              label="Mother gotra"
              field="motherGotra"
              value={profileData.motherGotra}
              isEditMode={false}
            />

            <DisplayField
              label="Paternal Grandfather's Name"
              field="paternalGrandfatherName"
              value={profileData.paternalGrandfatherName}
              isEditMode={false}
            />

            <DisplayField
              label="Paternal Grandfather's Occupation"
              field="paternalGrandfatherGotra"
              value={profileData.paternalGrandfatherOccupation}
              isEditMode={false}
            />

            <DisplayField
              label="Paternal Grandmother's Name"
              field="paternalGrandmotherName"
              value={profileData.paternalGrandmotherName}
              isEditMode={false}
            />

            <DisplayField
              label="Paternal Grandmother's Gotra"
              field="paternalGrandmotherGotra"
              value={profileData.paternalGrandmotherGotra}
              isEditMode={false}
            />
            <DisplayField
              label="Maternal Grandfather's Name"
              field="maternalGrandfatherName"
              value={profileData.maternalGrandfatherName}
              isEditMode={false}
            />

            <DisplayField
              label="Maternal Grandfather's Occupation"
              field="maternalGrandfatherOccupation"
              value={profileData.maternalGrandfatherOccupation}
              isEditMode={false}
            />

            <DisplayField
              label="Maternal Grandmother's Name"
              field="maternalGrandmotherName"
              value={profileData.maternalGrandmotherName}
              isEditMode={false}
            />

            <DisplayField
              label="Maternal Grandmother's Gotra"
              field="maternalGrandmotherGotra"
              value={profileData.paternalGrandmotherGotra}
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
          </div>

          <h1 className="text-left text-lg md:text-2xl font-bold">
            Partner Preferences
          </h1>
          <div className="grid grid-col-1 md:grid-cols-2 gap-x-16 gap-y-8">
            <DisplayField
              label="Partner Prefered Body Type"
              field="partnerPreferedBodyType"
              value={profileData.partnerPreferedBodyType}
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
              type="textarea"
            />
          </div>
        </div>
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
