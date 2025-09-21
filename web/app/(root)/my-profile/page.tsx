"use client";
import React, { useState, useEffect } from "react";
import { Card, Modal, UploadFile, Form, message } from "antd";
import ProfileHeader from "@/components/profile/ProfileHeader";
import DisplayField from "@/components/profile/DisplayField";
import PhotoGallery from "@/components/profile/PhotoGallery";
import {
  bodyTypeOptionConstant,
  casteOptionsConstant,
  dietPreferenceConstant,
  educationLevelsConstant,
  familyTypesConstant,
  familyValuesConstant,
  genderOptionConstant,
  habitOptionConstant,
  heightConstant,
  incomeRangesConstant,
  jobProfileOptionConstant,
  locationOptionsConstant,
  siblingOptionsConstant,
} from "@/constants/dataConstant";
import apiClient from "@/utils/apiClient";
import dayjs from "dayjs";
import { useProfileStore } from "@/store/profileStore";
import { ProfileData } from "@/types";
import { initialProfileData } from "@/constants/defaultData";

// TypeScript interfaces
const ProfilePage: React.FC = () => {
  const [profileData, setProfileData] =
    useState<ProfileData>(initialProfileData);
  const [editedData, setEditedData] = useState<ProfileData>(initialProfileData);
  const [isEditMode, setIsEditMode] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [previewVisible, setPreviewVisible] = useState(false);
  const [previewTitle, setPreviewTitle] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [profileFileList, setProfileFileList] = useState<UploadFile[]>([]);
  const { updateProfile, profileData: profileDataStore } = useProfileStore();
  const [galleryFileList, setGalleryFileList] = useState<UploadFile[]>([]);
  const [form] = Form.useForm();
  useEffect(() => {
    setProfileData(profileDataStore);
    setEditedData(profileDataStore);
  }, [profileDataStore]);

  useEffect(() => {
    if (isEditMode) {
      form.setFieldsValue({
        ...editedData,
        dateOfBirth: editedData?.dateOfBirth
          ? dayjs(editedData.dateOfBirth)
          : null, // Must be dayjs
      });
    }
  }, [isEditMode, editedData]);

  const handleEdit = () => {
    setIsEditMode(true);
    setEditedData(profileData);
  };

  const handleCancel = () => {
    setIsEditMode(false);
    setEditedData(profileData);
  };

  const handleInputChange = (field: keyof ProfileData, value: string) => {
    setEditedData((prev) => ({ ...prev, [field]: value }));
  };

  const handleImageDelete = async (url: string, index: number) => {
    const updatedImages = [...editedData.galleryImages];
    updatedImages.splice(index, 1);
    setEditedData({ ...editedData, galleryImages: updatedImages });
    await apiClient.delete(`/user/galleryImage/?url=${url}`);
  };
  const handleProfileImageChange = async ({
    fileList,
  }: {
    fileList: UploadFile[];
  }) => {
    const latestFile = fileList[fileList.length - 1];
    setProfileFileList(fileList);

    // If using URL from upload response
    if (latestFile?.originFileObj) {
      const base64 = await getBase64(latestFile.originFileObj);
      handleInputChange("profileImage", base64); // set base64 string
    }
  };
  const handleGalleryImageChange = async ({
    fileList,
  }: {
    fileList: UploadFile[];
  }) => {
    const latestFile = fileList[fileList.length - 1];
    setGalleryFileList(fileList);

    // If using URL from upload response
    if (latestFile?.originFileObj) {
      const base64 = await getBase64(latestFile.originFileObj);
      handleInputChange("profileImage", base64); // set base64 string
    }
  };
  const getBase64 = (file: File): Promise<string> =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = (error) => reject(error);
    });
  const handlePreview = async (file: UploadFile) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj as File);
    }
    setPreviewImage(file.url || (file.preview as string));
    setPreviewTitle(
      file.name || file.url!.substring(file.url!.lastIndexOf("/") + 1)
    );
    setPreviewVisible(true);
  };

  const handleFormSubmit = async () => {
    try {
      setIsLoading(true);
      // 1. Validate form fields
      const values = await form.validateFields();
      values.dateOfBirth = values.dateOfBirth
        ? values.dateOfBirth.toISOString()
        : null;
      // 2. Construct payload to match API format
      const formData = new FormData();

      // 3. Append basic form fields

      Object.entries(values).forEach(([key, value]) => {
        if (key !== "profileImage" && key !== "galleryImages") {
          if (value !== undefined && value !== null) {
            formData.append(key, String(value)); // ✅ Cast to string
          }
        }
      });

      // 4. Append profile image file if exists
      if (profileFileList?.[0]?.originFileObj) {
        formData.append("profileImageUpdate", profileFileList[0].originFileObj);
      }

      // 5. Append gallery images
      if (Array.isArray(galleryFileList)) {
        galleryFileList.forEach((file, index) => {
          if (file.originFileObj) {
            formData.append("galleryImagesUpdate", file.originFileObj);
          }
        });
      }

      // 6. Submit to API
      const response = await apiClient.put("/user", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      updateProfile(response.data);
      setGalleryFileList([]);
      setIsEditMode(false);
      message.success("Profile updated successfully");
    } catch (errorInfo) {
      console.log("❌ Validation Failed or Upload Error:", errorInfo);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="p-4 min-h-screen bg-white">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <ProfileHeader
          profileImage={editedData.profileImage}
          fullName={editedData.fullName}
          gender={editedData.gender}
          height={editedData.height}
          dateOfBirth={editedData.dateOfBirth}
          isEditMode={isEditMode}
          onEdit={handleEdit}
          onSave={handleFormSubmit}
          onCancel={handleCancel}
          loading={isLoading}
          profileFileList={profileFileList}
          onProfileImageChange={handleProfileImageChange}
          bioData={editedData.bioDataPdf}
        />
        <Form
          layout="vertical"
          form={form}
          onFinish={handleFormSubmit} // your submission logic
          initialValues={editedData} // populate with current values
        >
          <div className="flex flex-col space-y-10 mt-5">
            <h1 className="text-left text-lg md:text-2xl font-bold">
              Personl Information
            </h1>
            <div className="grid grid-col-1 md:grid-cols-2 gap-x-16 gap-y-8">
              <DisplayField
                label="Full Name"
                field="fullName"
                value={editedData.fullName}
                isEditMode={isEditMode}
                onChange={
                  handleInputChange as (field: string, value: string) => void
                }
                rules={[
                  { required: true, message: "Please enter your full name" },
                  { min: 2, message: "Name must be at least 2 characters" },
                  {
                    pattern: /^[a-zA-Z\s]+$/,
                    message: "Name must contain only letters",
                  },
                ]}
              />

              <DisplayField
                label="Email Address"
                field="emailAddress"
                value={editedData.emailAddress}
                isEditMode={isEditMode}
                onChange={
                  handleInputChange as (field: string, value: string) => void
                }
                rules={[
                  { required: true, message: "Please enter your email" },
                  {
                    type: "email",
                    message: "Please enter a valid email address",
                  },
                ]}
              />

              <DisplayField
                label="Mobile number"
                field="mobileNumber"
                value={editedData.mobileNumber}
                isEditMode={isEditMode}
                onChange={
                  handleInputChange as (field: string, value: string) => void
                }
                rules={[
                  {
                    required: true,
                    message: "Please enter your mobile number",
                  },
                  {
                    pattern: /^[0-9]{10}$/,
                    message: "Mobile number must be 10 digits",
                  },
                ]}
              />

              <DisplayField
                label="Locatation"
                field="location"
                value={editedData.location}
                isEditMode={isEditMode}
                type="select"
                options={locationOptionsConstant}
                onChange={
                  handleInputChange as (field: string, value: string) => void
                }
                rules={[
                  {
                    required: true,
                    message: "Please select your location",
                  },
                ]}
              />

              <DisplayField
                label="Sub Cast"
                field="subCast"
                value={editedData.subCast}
                isEditMode={isEditMode}
                type="select"
                options={casteOptionsConstant}
                onChange={
                  handleInputChange as (field: string, value: string) => void
                }
                rules={[
                  {
                    required: true,
                    message: "Please select your sub cast",
                  },
                ]}
              />

              <DisplayField
                label="Gender"
                field="gender"
                value={editedData.gender}
                isEditMode={isEditMode}
                type="select"
                options={genderOptionConstant}
                onChange={
                  handleInputChange as (field: string, value: string) => void
                }
                rules={[
                  {
                    required: true,
                    message: "Please select your gender",
                  },
                ]}
              />

              <DisplayField
                label="Date of birth"
                field="dateOfBirth"
                value={editedData.dateOfBirth}
                isEditMode={isEditMode}
                type="date"
                onChange={
                  handleInputChange as (field: string, value: string) => void
                }
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
                      return Promise.reject(
                        "You must be at least 18 years old"
                      );
                    },
                  },
                ]}
              />

              <DisplayField
                label="Height"
                field="height"
                value={editedData.height}
                isEditMode={isEditMode}
                type="select"
                options={heightConstant}
                onChange={
                  handleInputChange as (field: string, value: string) => void
                }
              />

              <DisplayField
                label="Body Type"
                field="bodyType"
                value={editedData.bodyType}
                isEditMode={isEditMode}
                type="select"
                options={bodyTypeOptionConstant}
                onChange={
                  handleInputChange as (field: string, value: string) => void
                }
              />

              <DisplayField
                label="Full Address"
                field="fullAddress"
                value={editedData.fullAddress}
                isEditMode={isEditMode}
                type="textarea"
                onChange={
                  handleInputChange as (field: string, value: string) => void
                }
              />
            </div>

            <h1 className="text-left text-lg md:text-2xl font-bold">
              Professional Information
            </h1>
            <div className="grid grid-col-1 md:grid-cols-2 gap-x-16 gap-y-8">
              <DisplayField
                label="Education Level"
                field="educationLevel"
                value={editedData.educationLevel}
                isEditMode={isEditMode}
                type="select"
                options={educationLevelsConstant}
                onChange={
                  handleInputChange as (field: string, value: string) => void
                }
              />
              <DisplayField
                label="Degree or Specialialization"
                field="degreeOrSpecialialization"
                value={editedData.degreeOrSpecialialization}
                isEditMode={isEditMode}
                onChange={
                  handleInputChange as (field: string, value: string) => void
                }
              />

              <DisplayField
                label="Job Profile"
                field="jobProfile"
                value={editedData.jobProfile}
                isEditMode={isEditMode}
                onChange={
                  handleInputChange as (field: string, value: string) => void
                }
              />
              <DisplayField
                label="Job Title"
                field="jobTitleOrDesignation"
                value={editedData.jobTitleOrDesignation}
                isEditMode={isEditMode}
                type="select"
                options={jobProfileOptionConstant}
                onChange={
                  handleInputChange as (field: string, value: string) => void
                }
              />

              <DisplayField
                label="Company or organization"
                field="companyOrOrganization"
                value={editedData.companyOrOrganization}
                isEditMode={isEditMode}
                onChange={
                  handleInputChange as (field: string, value: string) => void
                }
              />
              <DisplayField
                label="Annual Income"
                field="anualIncome"
                value={editedData.anualIncome}
                isEditMode={isEditMode}
                type="select"
                options={incomeRangesConstant}
                onChange={
                  handleInputChange as (field: string, value: string) => void
                }
              />
            </div>
            <h1 className="text-left text-lg md:text-2xl font-bold">
              LifeStyle Information
            </h1>
            <div className="grid grid-col-1 md:grid-cols-2 gap-x-16 gap-y-8">
              <DisplayField
                label="Diet Preference"
                field="dietPreference"
                value={editedData.dietPreference}
                isEditMode={isEditMode}
                type="select"
                options={dietPreferenceConstant}
                onChange={
                  handleInputChange as (field: string, value: string) => void
                }
              />

              <DisplayField
                label="Smoking Habit"
                field="smokingHabit"
                value={editedData.smokingHabit}
                isEditMode={isEditMode}
                type="select"
                options={habitOptionConstant}
                onChange={
                  handleInputChange as (field: string, value: string) => void
                }
              />

              <DisplayField
                label="Drinking Habit"
                field="drinkingHabit"
                value={editedData.drinkingHabit}
                isEditMode={isEditMode}
                type="select"
                options={habitOptionConstant}
                onChange={
                  handleInputChange as (field: string, value: string) => void
                }
              />

              <DisplayField
                label="About Hobby"
                field="aboutHobbyOrInterset"
                value={editedData.aboutHobbyOrInterset}
                isEditMode={isEditMode}
                type="textarea"
                onChange={
                  handleInputChange as (field: string, value: string) => void
                }
              />
            </div>

            <h1 className="text-left text-lg md:text-2xl font-bold">
              Family Information
            </h1>
            <div className="grid grid-col-1 md:grid-cols-2 gap-x-16 gap-y-8">
              <DisplayField
                label="Father name"
                field="fatherName"
                value={editedData.fatherName}
                isEditMode={isEditMode}
                onChange={
                  handleInputChange as (field: string, value: string) => void
                }
              />

              <DisplayField
                label="Father occupation"
                field="fatherOccupation"
                value={editedData.fatherOccupation}
                isEditMode={isEditMode}
                onChange={
                  handleInputChange as (field: string, value: string) => void
                }
              />

              <DisplayField
                label="Father gotra"
                field="fatherGotra"
                value={editedData.fatherGotra}
                isEditMode={isEditMode}
                onChange={
                  handleInputChange as (field: string, value: string) => void
                }
              />

              <DisplayField
                label="Mother name"
                field="motherName"
                value={editedData.motherName}
                isEditMode={isEditMode}
                onChange={
                  handleInputChange as (field: string, value: string) => void
                }
              />

              <DisplayField
                label="Mother occupation"
                field="motherOccupation"
                value={editedData.motherOccupation}
                isEditMode={isEditMode}
                onChange={
                  handleInputChange as (field: string, value: string) => void
                }
              />

              <DisplayField
                label="Mother gotra"
                field="motherGotra"
                value={editedData.motherGotra}
                isEditMode={isEditMode}
                onChange={
                  handleInputChange as (field: string, value: string) => void
                }
              />

              <DisplayField
                label="Paternal Grandfather's Name"
                field="paternalGrandfatherName"
                value={editedData.paternalGrandfatherName}
                isEditMode={isEditMode}
                onChange={
                  handleInputChange as (field: string, value: string) => void
                }
              />

              <DisplayField
                label="Paternal Grandfather's Occupation"
                field="paternalGrandfatherGotra"
                value={editedData.paternalGrandfatherOccupation}
                isEditMode={isEditMode}
                onChange={
                  handleInputChange as (field: string, value: string) => void
                }
              />

              <DisplayField
                label="Paternal Grandmother's Name"
                field="paternalGrandmotherName"
                value={editedData.paternalGrandmotherName}
                isEditMode={isEditMode}
                onChange={
                  handleInputChange as (field: string, value: string) => void
                }
              />

              <DisplayField
                label="Paternal Grandmother's Gotra"
                field="paternalGrandmotherGotra"
                value={editedData.paternalGrandmotherGotra}
                isEditMode={isEditMode}
                onChange={
                  handleInputChange as (field: string, value: string) => void
                }
              />
              <DisplayField
                label="Maternal Grandfather's Name"
                field="maternalGrandfatherName"
                value={editedData.maternalGrandfatherName}
                isEditMode={isEditMode}
                onChange={
                  handleInputChange as (field: string, value: string) => void
                }
              />

              <DisplayField
                label="Maternal Grandfather's Occupation"
                field="maternalGrandfatherOccupation"
                value={editedData.maternalGrandfatherOccupation}
                isEditMode={isEditMode}
                onChange={
                  handleInputChange as (field: string, value: string) => void
                }
              />

              <DisplayField
                label="Maternal Grandmother's Name"
                field="maternalGrandmotherName"
                value={editedData.maternalGrandmotherName}
                isEditMode={isEditMode}
                onChange={
                  handleInputChange as (field: string, value: string) => void
                }
              />

              <DisplayField
                label="Maternal Grandmother's Gotra"
                field="maternalGrandmotherGotra"
                value={editedData.paternalGrandmotherGotra}
                isEditMode={isEditMode}
                onChange={
                  handleInputChange as (field: string, value: string) => void
                }
              />

              <DisplayField
                label="Sibling Count"
                field="siblingsCount"
                value={editedData.siblingsCount}
                isEditMode={isEditMode}
                type="select"
                options={siblingOptionsConstant}
                onChange={
                  handleInputChange as (field: string, value: string) => void
                }
              />

              <DisplayField
                label="Family Type"
                field="familyType"
                value={editedData.familyType}
                isEditMode={isEditMode}
                type="select"
                options={familyTypesConstant}
                onChange={
                  handleInputChange as (field: string, value: string) => void
                }
              />

              <DisplayField
                label="Family Values"
                field="familyValues"
                value={editedData.familyValues}
                isEditMode={isEditMode}
                type="select"
                options={familyValuesConstant}
                onChange={
                  handleInputChange as (field: string, value: string) => void
                }
              />

              <DisplayField
                label="About family background"
                field="aboutFamilyBackground"
                value={editedData.aboutFamilyBackground}
                isEditMode={isEditMode}
                type="textarea"
                onChange={
                  handleInputChange as (field: string, value: string) => void
                }
              />
            </div>

            <h1 className="text-left text-lg md:text-2xl font-bold">
              Partner Preferences
            </h1>
            <div className="grid grid-col-1 md:grid-cols-2 gap-x-16 gap-y-8">
              <DisplayField
                label="Partner Prefered Body Type"
                field="partnerPreferedBodyType"
                value={editedData.partnerPreferedBodyType}
                isEditMode={isEditMode}
                type="select"
                options={bodyTypeOptionConstant}
                onChange={
                  handleInputChange as (field: string, value: string) => void
                }
              />

              <DisplayField
                label="Partner SubCast"
                field="partnerPreferedSubCast"
                value={editedData.partnerPreferedSubCast}
                isEditMode={isEditMode}
                type="select"
                options={casteOptionsConstant}
                onChange={
                  handleInputChange as (field: string, value: string) => void
                }
              />
              <DisplayField
                label="Partner prefer city"
                field="partnerPreferedCity"
                value={editedData.partnerPreferedCity}
                isEditMode={isEditMode}
                type="select"
                options={locationOptionsConstant}
                onChange={
                  handleInputChange as (field: string, value: string) => void
                }
              />
              <DisplayField
                label="Partner prefer education level"
                field="partnerPreferedEducationLevel"
                value={editedData.partnerPreferedEducationLevel}
                isEditMode={isEditMode}
                type="select"
                options={educationLevelsConstant}
                onChange={
                  handleInputChange as (field: string, value: string) => void
                }
              />
              <DisplayField
                label="Partner prefered profession"
                field="partnerPreferedProfession"
                value={editedData.partnerPreferedProfession}
                isEditMode={isEditMode}
                type="select"
                options={jobProfileOptionConstant}
                onChange={
                  handleInputChange as (field: string, value: string) => void
                }
              />
              <DisplayField
                label="Partner additional preference"
                field="partnerAdditionalPreference"
                value={editedData.partnerAdditionalPreference}
                isEditMode={isEditMode}
                type="textarea"
                onChange={
                  handleInputChange as (field: string, value: string) => void
                }
              />
            </div>
          </div>
          <Card className="mt-6 shadow-lg border-0">
            {/* Photo gallery */}
            <PhotoGallery
              images={editedData.galleryImages}
              isEditMode={isEditMode}
              onImageDelete={handleImageDelete}
              galleryFileList={galleryFileList}
              onGalleryImageChange={handleGalleryImageChange}
              preview={handlePreview}
              galleryImagesLength={editedData.galleryImages.length}
            />
          </Card>
        </Form>
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

export default ProfilePage;
