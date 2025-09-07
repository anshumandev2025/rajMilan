import React from "react";
import {
  Button,
  Image,
  Popconfirm,
  Upload,
  UploadFile,
  UploadProps,
} from "antd";
import {
  CameraOutlined,
  DeleteOutlined,
  EyeOutlined,
  PlusOutlined,
} from "@ant-design/icons";

interface Props {
  images: string[];
  isEditMode: boolean;
  onImageDelete?: (url: string, index: number) => void;
  galleryFileList?: UploadFile[];
  onGalleryImageChange?: UploadProps["onChange"];
  preview?: (file: UploadFile) => void;
  galleryImagesLength?: number;
}

const PhotoGallery: React.FC<Props> = ({
  images,
  isEditMode,
  onImageDelete,
  galleryFileList,
  onGalleryImageChange,
  preview,
  galleryImagesLength,
}) => (
  <div>
    <div className="flex items-center justify-between mb-4">
      <div className="flex items-center">
        <div className="w-10 h-10 bg-[#800000] rounded-full flex items-center justify-center mr-3">
          <CameraOutlined className="text-white text-lg" />
        </div>
        <h3 className="text-xl font-bold text-gray-800 m-0">Photo Gallery</h3>
      </div>
      {isEditMode && galleryFileList && galleryImagesLength && (
        <Upload
          listType="picture"
          fileList={galleryFileList}
          onChange={onGalleryImageChange}
          beforeUpload={() => {
            return false;
          }}
          onPreview={preview}
        >
          {galleryFileList.length + galleryImagesLength < 5 && (
            <Button
              icon={<PlusOutlined />}
              className="bg-[#800000] px-4 border-[#800000] text-white"
            >
              Add Photos
            </Button>
          )}
        </Upload>
      )}
    </div>
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {images.map((url, index) => (
        <div key={index} className="relative group rounded overflow-hidden">
          <Image
            src={url}
            alt={`Photo ${index + 1}`}
            className="w-full h-48 object-cover"
          />
          {isEditMode && onImageDelete && (
            <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center gap-4 opacity-0 group-hover:opacity-100 transition-opacity">
              <Button
                icon={<EyeOutlined />}
                shape="circle"
                onClick={() => window.open(url, "_blank")}
              />
              <Popconfirm
                title="Delete this photo?"
                onConfirm={() => onImageDelete(url, index)}
              >
                <Button icon={<DeleteOutlined />} shape="circle" danger />
              </Popconfirm>
            </div>
          )}
        </div>
      ))}
    </div>
  </div>
);

export default PhotoGallery;
