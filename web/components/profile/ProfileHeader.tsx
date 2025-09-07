"use client";
import React from "react";
import { Avatar, Button, Space, Tag, Upload } from "antd";
import {
  CameraOutlined,
  CloseOutlined,
  EditOutlined,
  SaveOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { UploadFile, UploadProps } from "antd/es/upload/interface";
import { useUser } from "@/store/userStore";

interface Props {
  profileImage: string | null;
  fullName: string;
  gender: string;
  height: string;
  dateOfBirth: string;
  isEditMode: boolean;
  onEdit?: () => void;
  onCancel?: () => void;
  onSave?: () => void;
  loading?: boolean;
  profileFileList?: UploadFile[];
  onProfileImageChange?: UploadProps["onChange"];
  //   onPreview: (file: UploadFile) => void;
}

const ProfileHeader: React.FC<Props> = ({
  profileImage,
  fullName,
  gender,
  height,
  dateOfBirth,
  isEditMode,
  onEdit,
  onCancel,
  onSave,
  loading,
  profileFileList,
  onProfileImageChange,
  //   onPreview,
}) => {
  const age = dateOfBirth
    ? new Date().getFullYear() - new Date(dateOfBirth).getFullYear()
    : "N/A";
  const { isUserLogIn } = useUser();

  return (
    <div className="flex flex-col md:flex-row items-center justify-between text-white bg-primary p-4 rounded-2xl">
      <div className="flex items-center mb-4 md:mb-0">
        <div className="relative">
          {isUserLogIn && (
            <Avatar
              size={80}
              src={`${profileImage}?timestamp=${new Date().getTime()}`}
              icon={<UserOutlined />}
              className="mr-4 border-4 border-white shadow-lg"
            />
          )}
          {isEditMode && (
            <Upload
              listType="picture-circle"
              fileList={profileFileList}
              onChange={onProfileImageChange}
              //   onPreview={onPreview}
              maxCount={1}
              className="absolute -bottom-3 right-1"
              showUploadList={false}
              beforeUpload={() => false}
            >
              <Button
                shape="circle"
                icon={<CameraOutlined />}
                size="small"
                className="bg-[#ffd602] border-[#ffd602] text-black"
              />
            </Upload>
          )}
        </div>
        <div>
          <h1 className="text-3xl font-bold mb-2">{fullName}</h1>
          <div className="flex flex-wrap gap-2">
            <Tag color="#ffd602" className="text-black font-medium">
              {gender}
            </Tag>
            <Tag color="#ffd602" className="text-black font-medium">
              Age: {age}
            </Tag>
            <Tag color="#ffd602" className="text-black font-medium">
              {height}
            </Tag>
          </div>
        </div>
      </div>
      <div className="flex gap-2">
        {onEdit && (
          <>
            {!isEditMode ? (
              <Button
                type="primary"
                icon={<EditOutlined />}
                onClick={onEdit}
                size="large"
                className="bg-[#ffd602] border-[#ffd602] text-black hover:bg-[#e6c102] font-semibold"
              >
                Edit Profile
              </Button>
            ) : (
              <Space>
                <Button
                  icon={<SaveOutlined />}
                  onClick={onSave}
                  loading={loading}
                  size="large"
                  className="bg-[#ffd602] border-[#ffd602] text-black hover:bg-[#e6c102] font-semibold"
                >
                  Save Changes
                </Button>
                <Button
                  icon={<CloseOutlined />}
                  onClick={onCancel}
                  size="large"
                  className="bg-white text-[#800000] border-white hover:bg-gray-100 font-semibold"
                >
                  Cancel
                </Button>
              </Space>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default ProfileHeader;
