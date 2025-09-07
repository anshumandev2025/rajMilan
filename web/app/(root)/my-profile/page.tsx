"use client";
import React, { useState, useEffect } from "react";
import { Card, Row, Col, message, Modal, UploadFile, Form } from "antd";
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
import {
  casteOptionsConstant,
  dietPreferenceConstant,
  educationLevelsConstant,
  familyTypesConstant,
  familyValuesConstant,
  genderOptionConstant,
  habitOptionConstant,
  heightConstant,
  incomeRangesConstant,
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
  // const fetchProfileData = async () => {
  //   try {
  //     const response = await apiClient("/user");
  //     setProfileData(response.data);
  //     setEditedData(response.data);
  //   } catch (error) {
  //     console.log("error-->", error);
  //   }
  // };
  useEffect(() => {
    setProfileData(profileDataStore);
    setEditedData(profileDataStore);
  }, [profileData]);

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
      values.dateOfBirth = values.dateOfBirth.toISOString();
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
      setIsEditMode(false);
      console.log("✅ Profile updated successfully");
    } catch (errorInfo) {
      console.log("❌ Validation Failed or Upload Error:", errorInfo);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="p-4 min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
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
        />
        <Form
          layout="vertical"
          form={form}
          onFinish={handleFormSubmit} // your submission logic
          initialValues={editedData} // populate with current values
        >
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
                    {
                      required: true,
                      message: "Please select your date of birth",
                    },
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
                  rules={[
                    {
                      required: true,
                      message: "Please select your height",
                    },
                  ]}
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
                  value={editedData.educationLevel}
                  isEditMode={isEditMode}
                  type="select"
                  options={educationLevelsConstant}
                  onChange={
                    handleInputChange as (field: string, value: string) => void
                  }
                  rules={[
                    {
                      required: true,
                      message: "Please select your education level",
                    },
                  ]}
                />
                <DisplayField
                  label="Degree or Specialialization"
                  field="degreeOrSpecialialization"
                  value={editedData.degreeOrSpecialialization}
                  isEditMode={isEditMode}
                  onChange={
                    handleInputChange as (field: string, value: string) => void
                  }
                  rules={[
                    {
                      required: true,
                      message: "Please enter your degree",
                    },
                  ]}
                />
                <DisplayField
                  label="Job Title"
                  field="jobTitleOrDesignation"
                  value={editedData.jobTitleOrDesignation}
                  isEditMode={isEditMode}
                  onChange={
                    handleInputChange as (field: string, value: string) => void
                  }
                  rules={[
                    {
                      required: true,
                      message: "Please enter your job title",
                    },
                  ]}
                />

                <DisplayField
                  label="Company or organization"
                  field="companyOrOrganization"
                  value={editedData.companyOrOrganization}
                  isEditMode={isEditMode}
                  onChange={
                    handleInputChange as (field: string, value: string) => void
                  }
                  rules={[
                    {
                      required: true,
                      message: "Please enter your current company",
                    },
                  ]}
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
                  rules={[
                    {
                      required: true,
                      message: "Please select your annual income",
                    },
                  ]}
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
                  value={editedData.dietPreference}
                  isEditMode={isEditMode}
                  type="select"
                  options={dietPreferenceConstant}
                  onChange={
                    handleInputChange as (field: string, value: string) => void
                  }
                  rules={[
                    {
                      required: true,
                      message: "Please select your diet preference",
                    },
                  ]}
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
                  rules={[
                    {
                      required: true,
                      message: "Please select your smoking habit",
                    },
                  ]}
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
                  rules={[
                    {
                      required: true,
                      message: "Please select your drinking habit",
                    },
                  ]}
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
                  rules={[
                    { required: true, message: "Please describe your hobbies" },
                  ]}
                />
              </ProfileSection>
            </Col>

            <Col xs={24} lg={12}>
              {/* Family Information */}
              <ProfileSection
                title="Family Information"
                icon={<TeamOutlined />}
              >
                <DisplayField
                  label="Father occupation"
                  field="fatherOccupation"
                  value={editedData.fatherOccupation}
                  isEditMode={isEditMode}
                  onChange={
                    handleInputChange as (field: string, value: string) => void
                  }
                  rules={[
                    {
                      required: true,
                      message: "Please enter father's occupation",
                    },
                  ]}
                />

                <DisplayField
                  label="Mother occupation"
                  field="motherOccupation"
                  value={editedData.motherOccupation}
                  isEditMode={isEditMode}
                  onChange={
                    handleInputChange as (field: string, value: string) => void
                  }
                  rules={[
                    {
                      required: true,
                      message: "Please enter mother's occupation",
                    },
                  ]}
                />

                <DisplayField
                  label="GrandFather occupation"
                  field="grandFatherOccupation"
                  value={editedData.grandFatherOccupation}
                  isEditMode={isEditMode}
                  onChange={
                    handleInputChange as (field: string, value: string) => void
                  }
                  rules={[
                    {
                      required: true,
                      message: "Please enter your grandfather occupation",
                    },
                  ]} // optional
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
                  rules={[
                    { required: true, message: "Please select sibling count" },
                  ]}
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
                  rules={[
                    { required: true, message: "Please select family type" },
                  ]}
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
                  rules={[
                    { required: true, message: "Please select family values" },
                  ]}
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
                  rules={[{ required: false }]} // optional
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
                  value={editedData.partnerPreferedMinAge}
                  isEditMode={isEditMode}
                  onChange={
                    handleInputChange as (field: string, value: string) => void
                  }
                  rules={[
                    {
                      required: true,
                      message: "Please select your partner min age",
                    },
                  ]}
                />
                <DisplayField
                  label="Partner maximum age"
                  field="partnerPreferedMaxAge"
                  value={editedData.partnerPreferedMaxAge}
                  isEditMode={isEditMode}
                  onChange={
                    handleInputChange as (field: string, value: string) => void
                  }
                  rules={[
                    {
                      required: true,
                      message: "Please select your partner max age",
                    },
                  ]}
                />
                <DisplayField
                  label="Partner minimum height"
                  field="partnerPreferedMinHeight"
                  value={editedData.partnerPreferedMinHeight}
                  isEditMode={isEditMode}
                  type="select"
                  options={heightConstant}
                  onChange={
                    handleInputChange as (field: string, value: string) => void
                  }
                  rules={[
                    {
                      required: true,
                      message: "Please select your partner min height",
                    },
                  ]}
                />
                <DisplayField
                  label="Partner maximum height"
                  field="partnerPreferedMaxHeight"
                  value={editedData.partnerPreferedMaxHeight}
                  isEditMode={isEditMode}
                  type="select"
                  options={heightConstant}
                  onChange={
                    handleInputChange as (field: string, value: string) => void
                  }
                  rules={[
                    {
                      required: true,
                      message: "Please select your max height",
                    },
                  ]}
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
                  rules={[
                    {
                      required: true,
                      message: "Please select your partner sub cast",
                    },
                  ]}
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
                  rules={[
                    {
                      required: true,
                      message: "Please select your partner prefer city",
                    },
                  ]}
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
                  rules={[
                    {
                      required: true,
                      message: "Please select your partner education level",
                    },
                  ]}
                />
                <DisplayField
                  label="Partner prefered profession"
                  field="partnerPreferedProfession"
                  value={editedData.partnerPreferedProfession}
                  isEditMode={isEditMode}
                  onChange={
                    handleInputChange as (field: string, value: string) => void
                  }
                  rules={[
                    {
                      required: true,
                      message: "Please enter your partner prefered prefession",
                    },
                  ]}
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
              </ProfileSection>
            </Col>
          </Row>
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
