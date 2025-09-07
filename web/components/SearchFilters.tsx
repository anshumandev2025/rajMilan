"use client";

import React, { useState } from "react";
import {
  Button,
  Card,
  Checkbox,
  Col,
  Form,
  Input,
  Row,
  Select,
  Slider,
} from "antd";
import { SearchOutlined, FilterOutlined } from "@ant-design/icons";
import {
  casteOptionsConstant,
  educationLevelsConstant,
  locationOptionsConstant,
} from "@/constants/dataConstant";

const { Option } = Select;
const SearchFilters = ({ onFilterApply }: { onFilterApply: any }) => {
  const [form] = Form.useForm();
  const [showFilters, setShowFilters] = useState(true);

  const handleFinish = (values: any) => {
    onFilterApply(values);
  };

  const handleReset = () => {
    form.resetFields();
    onFilterApply({});
  };

  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-grow pb-12 px-4">
        <div className="container mx-auto max-w-7xl">
          {/* Filter Section */}
          <div className="mb-6">
            <div className="flex items-center justify-between md:justify-start mb-4">
              <h2 className="text-xl font-semibold">Search Filters</h2>
              <Button
                icon={<FilterOutlined />}
                className="md:hidden"
                onClick={() => setShowFilters(!showFilters)}
              >
                {showFilters ? "Hide Filters" : "Show Filters"}
              </Button>
            </div>

            {showFilters && (
              <Card className="shadow-sm">
                <Form
                  form={form}
                  layout="vertical"
                  onFinish={handleFinish}
                  initialValues={{
                    ageRange: [18, 60],
                    education: "any",
                    maritalStatus: "any",
                    location: "any",
                  }}
                >
                  <Row gutter={[16, 16]}>
                    <Col xs={24} md={6}>
                      <Form.Item name="searchQuery" label="Search">
                        <Input
                          prefix={<SearchOutlined />}
                          placeholder="Search by name, location..."
                        />
                      </Form.Item>
                    </Col>

                    <Col xs={24} md={6}>
                      <Form.Item name="ageRange" label="Age Range">
                        <Slider range min={18} max={60} />
                      </Form.Item>
                    </Col>

                    <Col xs={24} md={6}>
                      <Form.Item name="location" label="Location">
                        <Select className="w-full">
                          {locationOptionsConstant.map((opt: any) => (
                            <Option key={opt.value} value={opt.value}>
                              {opt.label}
                            </Option>
                          ))}
                          {/* Add more options as needed */}
                        </Select>
                      </Form.Item>
                    </Col>

                    <Col xs={24} md={6}>
                      <Form.Item name="subCaste" label="Sub-Caste">
                        <Checkbox.Group style={{ width: "100%" }}>
                          <Row>
                            {casteOptionsConstant.map(({ label, value }) => (
                              <Col span={12} key={value}>
                                <Checkbox value={value}>
                                  {value.charAt(0).toUpperCase() +
                                    value.slice(1)}
                                </Checkbox>
                              </Col>
                            ))}
                          </Row>
                        </Checkbox.Group>
                      </Form.Item>
                    </Col>

                    <Col xs={24} md={6}>
                      <Form.Item name="education" label="Education">
                        <Select className="w-full">
                          {educationLevelsConstant.map((opt: any) => (
                            <Option key={opt.value} value={opt.value}>
                              {opt.label}
                            </Option>
                          ))}
                        </Select>
                      </Form.Item>
                    </Col>

                    {/* <Col xs={24} md={6}>
                      <Form.Item name="maritalStatus" label="Marital Status">
                        <Select className="w-full">
                          <Option value="any">Any Status</Option>
                          <Option value="never_married">Never Married</Option>
                          <Option value="divorced">Divorced</Option>
                          <Option value="widowed">Widowed</Option>
                        </Select>
                      </Form.Item>
                    </Col> */}

                    <Col xs={24} md={12} className="flex gap-4 mt-4">
                      <Button
                        type="primary"
                        htmlType="submit"
                        className="w-full"
                      >
                        Apply Filters
                      </Button>
                      <Button className="w-full" onClick={handleReset}>
                        Reset
                      </Button>
                    </Col>
                  </Row>
                </Form>
              </Card>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default SearchFilters;
