import React from "react";
import { DatePicker, Input, Select, Form } from "antd";
import dayjs from "dayjs";

const { Option } = Select;
const { TextArea } = Input;

interface Props {
  label: string;
  value: string;
  field: string;
  type?: "text" | "select" | "date" | "textarea";
  options?: any;
  isEditMode: boolean;
  onChange?: (field: string, value: string) => void;
  rules?: any[]; // AntD validation rules
}

const DisplayField: React.FC<Props> = ({
  label,
  value,
  field,
  type = "text",
  options = [],
  isEditMode,
  onChange,
  rules = [],
}) => {
  console.log("value and type-->", value, type);
  return (
    <div className="mb-4">
      <label className="block text-sm font-semibold text-gray-600 mb-2">
        {label}
      </label>

      {isEditMode && onChange ? (
        <Form.Item name={field} rules={rules} className="mb-0">
          {type === "select" ? (
            <Select
              className="w-full"
              placeholder={`Select ${label}`}
              onChange={(val: string) => onChange(field, val)}
            >
              {options.map((opt: any) => (
                <Option key={opt.value} value={opt.value}>
                  {opt.label}
                </Option>
              ))}
            </Select>
          ) : type === "date" ? (
            <DatePicker
              className="w-full"
              format="YYYY-MM-DD"
              onChange={(date) =>
                onChange(field, date ? date.format("YYYY-MM-DD") : "")
              }
            />
          ) : type === "textarea" ? (
            <TextArea
              rows={3}
              className="w-full"
              onChange={(e) => onChange(field, e.target.value)}
            />
          ) : (
            <Input
              className="w-full"
              onChange={(e) => onChange(field, e.target.value)}
            />
          )}
        </Form.Item>
      ) : (
        <div className="p-3 bg-gray-50 rounded-lg">
          <span className="text-gray-800 font-medium">
            {type === "date" && value && dayjs(value).isValid()
              ? dayjs(value).format("MMM DD, YYYY")
              : value || "Not specified"}
          </span>
        </div>
      )}
    </div>
  );
};

export default DisplayField;
