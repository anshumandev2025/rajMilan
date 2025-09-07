"use client";
import React, { useState } from "react";
import { Upload, message, Form, Modal } from "antd";
import type { UploadFile, UploadProps } from "antd/es/upload/interface";
import {
  PlusOutlined,
  CameraOutlined,
  PictureOutlined,
  FileTextOutlined,
} from "@ant-design/icons";

const UploadImages = ({ form }: { form: any }) => {
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [previewTitle, setPreviewTitle] = useState("");

  const profilePic = Form.useWatch("profileImage", form) || [];
  const galleryPics = Form.useWatch("galleryImages", form) || [];
  const bioDataPdf = Form.useWatch("bioDataPdf", form) || [];

  // Profile Picture Handlers
  const handleProfileChange = ({ fileList }: { fileList: UploadFile[] }) => {
    const list = fileList.slice(-1); // keep only 1
    form.setFieldsValue({ profileImage: list });
  };

  const beforeProfileUpload = (file: File): boolean => {
    const isImage = file.type.startsWith("image/");
    if (!isImage) {
      message.error("You can only upload image files!");
      return false;
    }

    const isLt5M = file.size / 1024 / 1024 < 5;
    if (!isLt5M) {
      message.error("Image must be smaller than 5MB!");
      return false;
    }

    if (profilePic.length >= 1) {
      message.error("Only one profile picture allowed.");
      return false;
    }
    return true;
  };

  // Gallery Images Handlers
  const handleGalleryChange = ({ fileList }: { fileList: UploadFile[] }) => {
    if (fileList.length > 5) {
      message.error("You can upload a maximum of 5 images.");
      return;
    }
    form.setFieldsValue({ galleryImages: fileList });
  };

  const beforeGalleryUpload = (_file: File, fileList: File[]): boolean => {
    const file = _file;
    const isImage = file.type.startsWith("image/");
    if (!isImage) {
      message.error("You can only upload image files!");
      return false;
    }

    const isLt5M = file.size / 1024 / 1024 < 5;
    if (!isLt5M) {
      message.error("Image must be smaller than 5MB!");
      return false;
    }

    if (galleryPics.length + fileList.length > 5) {
      message.error("Max 5 gallery images allowed.");
      return false;
    }
    return true;
  };

  // Bio Data PDF Handlers
  const handleBioDataChange = ({ fileList }: { fileList: UploadFile[] }) => {
    const list = fileList.slice(-1); // keep only 1
    form.setFieldsValue({ bioDataPdf: list });
  };

  const beforeBioDataUpload = (file: File): boolean => {
    const isPdf = file.type === "application/pdf";
    if (!isPdf) {
      message.error("You can only upload PDF files!");
      return false;
    }

    const isLt3M = file.size / 1024 / 1024 < 3;
    if (!isLt3M) {
      message.error("PDF must be smaller than 3MB!");
      return false;
    }

    if (bioDataPdf.length >= 1) {
      message.error("Only one bio data PDF allowed.");
      return false;
    }
    return true;
  };

  // Preview Handlers
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
    setPreviewOpen(true);
  };

  const handleCancel = () => setPreviewOpen(false);

  // Upload Button Components
  const ProfileUploadButton = (
    <div className="flex flex-col  items-center justify-evenly w-full h-full p-4 border-2 border-dashed border-amber-300 rounded-lg hover:border-amber-500 hover:bg-amber-50 transition-all duration-300 cursor-pointer">
      <div className="bg-amber-500 rounded-full flex items-center justify-center mb-3 text-white">
        <PlusOutlined className="text-lg" />
      </div>
      <div className="text-center">
        <div className="text-sm font-medium text-amber-600 mb-1">
          Upload Profile
        </div>
      </div>
    </div>
  );

  const GalleryUploadButton = (
    <div className="w-full p-4 border-2 border-dashed border-amber-300 rounded-lg hover:border-amber-500 hover:bg-amber-50 transition-all duration-300 cursor-pointer">
      <div className="flex items-center gap-4">
        <div className="w-9 h-9 bg-amber-100 rounded-full flex items-center justify-center text-amber-600 flex-shrink-0">
          <PlusOutlined />
        </div>
        <div className="flex-1">
          <div className="text-sm font-medium text-amber-600 mb-1">
            Add Gallery Images
          </div>
          <div className="text-xs text-gray-500">
            Upload up to {5 - galleryPics.length} more images
          </div>
        </div>
        <div className="px-3 py-1 bg-amber-500 text-white text-xs font-medium rounded-full">
          Browse
        </div>
      </div>
    </div>
  );

  const BioDataUploadButton = (
    <div className="w-full p-4 border-2 border-dashed border-amber-300 rounded-lg hover:border-amber-500 hover:bg-amber-50 transition-all duration-300 cursor-pointer">
      <div className="flex items-center gap-4">
        <div className="w-9 h-9 bg-amber-100 rounded-full flex items-center justify-center text-amber-600 flex-shrink-0">
          <PlusOutlined />
        </div>
        <div className="flex-1">
          <div className="text-sm font-medium text-amber-600 mb-1">
            Upload Bio Data
          </div>
          <div className="text-xs text-gray-500">PDF file, max 3MB</div>
        </div>
        <div className="px-3 py-1 bg-amber-500 text-white text-xs font-medium rounded-full">
          Browse
        </div>
      </div>
    </div>
  );

  return (
    <div className="space-y-6 p-4 sm:p-6 bg-white rounded-xl shadow-sm border border-gray-100">
      <Form layout="vertical" form={form}>
        {/* Profile Picture Section */}
        <Form.Item
          rules={[
            { required: true, message: "Please upload a profile picture." },
          ]}
          label={
            <div className="flex items-center gap-2 mb-4">
              <CameraOutlined className="text-lg text-amber-600" />
              <span className="text-base font-semibold text-gray-800">
                Profile Picture
              </span>
              <span className="text-xs px-2 py-1 bg-red-100 text-red-600 rounded-full font-medium">
                Required
              </span>
            </div>
          }
          name="profileImage"
          valuePropName="fileList"
          getValueFromEvent={() => profilePic}
        >
          <Upload
            listType="picture-card"
            fileList={profilePic}
            onChange={handleProfileChange}
            beforeUpload={beforeProfileUpload}
            onPreview={handlePreview}
            maxCount={1}
            className="profile-upload"
          >
            {profilePic.length >= 1 ? null : ProfileUploadButton}
          </Upload>
        </Form.Item>

        {/* Gallery Images Section */}
        <Form.Item
          rules={[
            {
              validator: async (_, value) => {
                if (!value || value.length < 2) {
                  throw new Error("Please upload at least 2 gallery images.");
                }
                if (value.length > 5) {
                  throw new Error(
                    "You can upload a maximum of 5 gallery images."
                  );
                }
              },
            },
          ]}
          label={
            <div className="flex items-center gap-2 mb-4">
              <PictureOutlined className="text-lg text-amber-600" />
              <span className="text-base font-semibold text-gray-800">
                Gallery Images
              </span>
              <span className="text-xs px-2 py-1 bg-amber-100 text-amber-600 rounded-full font-medium">
                {galleryPics.length}/5
              </span>
            </div>
          }
          name="galleryImages"
          valuePropName="fileList"
          getValueFromEvent={() => galleryPics}
        >
          <Upload
            listType="picture"
            fileList={galleryPics}
            onChange={handleGalleryChange}
            beforeUpload={beforeGalleryUpload}
            onPreview={handlePreview}
            multiple
            className="gallery-upload"
          >
            {galleryPics.length < 5 && GalleryUploadButton}
          </Upload>
        </Form.Item>

        {/* Bio Data PDF Section */}
        <Form.Item
          label={
            <div className="flex items-center gap-2 mb-4">
              <FileTextOutlined className="text-lg text-amber-600" />
              <span className="text-base font-semibold text-gray-800">
                Bio Data PDF
              </span>
              <span className="text-xs px-2 py-1 bg-gray-100 text-gray-600 rounded-full font-medium">
                Optional
              </span>
            </div>
          }
          name="bioDataPdf"
          valuePropName="fileList"
          getValueFromEvent={() => bioDataPdf}
        >
          <Upload
            listType="text"
            fileList={bioDataPdf}
            onChange={handleBioDataChange}
            beforeUpload={beforeBioDataUpload}
            maxCount={1}
            accept=".pdf"
            className="bio-data-upload"
          >
            {bioDataPdf.length >= 1 ? null : BioDataUploadButton}
          </Upload>
        </Form.Item>
      </Form>

      {/* Preview Modal */}
      <Modal
        open={previewOpen}
        title={previewTitle}
        footer={null}
        onCancel={handleCancel}
        width="80%"
        style={{ maxWidth: "800px" }}
        centered
        className="rounded-lg overflow-hidden"
      >
        <img
          alt="preview"
          style={{
            width: "100%",
            maxHeight: "70vh",
            objectFit: "contain",
          }}
          src={previewImage}
          className="rounded-lg"
        />
      </Modal>
    </div>
  );
};

export default UploadImages;
