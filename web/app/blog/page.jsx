"use client";
import React, { useEffect, useState } from "react";
import {
  Card,
  Typography,
  Row,
  Col,
  Button,
  Tag,
  Input,
  Select,
  Pagination,
  Image,
} from "antd";
import {
  ReadOutlined,
  CalendarOutlined,
  UserOutlined,
  SearchOutlined,
  HeartOutlined,
  CrownOutlined,
  HomeOutlined,
  StarOutlined,
  GiftOutlined,
  TeamOutlined,
} from "@ant-design/icons";
import apiClient from "@/utils/apiClient";

const { Title, Paragraph, Text } = Typography;
const { Search } = Input;
const { Option } = Select;

const BlogsPage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [blogs, setBlogs] = useState([]);
  const blogsPerPage = 6;

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const res = await apiClient("/blog");
        setBlogs(res.data);
      } catch (error) {
        console.error("Error fetching blogs:", error);
      }
    };
    fetchBlogs();
  }, []);

  const categories = [
    { value: "all", label: "All Categories", icon: <ReadOutlined /> },
    { value: "traditions", label: "Traditions", icon: <CrownOutlined /> },
    { value: "relationships", label: "Relationships", icon: <HeartOutlined /> },
    { value: "culture", label: "Culture", icon: <HomeOutlined /> },
    { value: "astrology", label: "Astrology", icon: <StarOutlined /> },
    { value: "fashion", label: "Fashion", icon: <GiftOutlined /> },
    { value: "modern", label: "Modern", icon: <TeamOutlined /> },
  ];

  const filteredBlogs = blogs.filter((blog) => {
    const matchesCategory =
      selectedCategory === "all" ||
      (blog.category && blog.category.includes(selectedCategory));
    const matchesSearch =
      blog.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (blog.description || "").toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const indexOfLastBlog = currentPage * blogsPerPage;
  const indexOfFirstBlog = indexOfLastBlog - blogsPerPage;
  const currentBlogs = filteredBlogs.slice(indexOfFirstBlog, indexOfLastBlog);

  const getCategoryColor = (category) => {
    const colors = {
      traditions: "red",
      relationships: "pink",
      culture: "orange",
      astrology: "purple",
      fashion: "magenta",
      modern: "blue",
    };
    return colors[category] || "default";
  };

  const handleReadMore = (blogId) => {
    console.log(`Reading blog ${blogId}`);
    // Replace with navigation logic, e.g., router.push(`/blog/${blogId}`)
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-yellow-50 px-10">
      {/* Header */}
      <div className="bg-gradient-to-r from-red-800 to-red-900 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <ReadOutlined className="text-6xl text-yellow-400 mb-4" />
          <Title
            level={1}
            className="text-white mb-4 text-4xl md:text-6xl font-bold"
          >
            Rajput Heritage Blog
          </Title>
          <Paragraph className="text-xl text-yellow-100 max-w-3xl mx-auto">
            Discover insights, traditions, and wisdom from our rich Rajput
            culture. Stories that connect hearts and preserve heritage.
          </Paragraph>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        {/* Search & Filter */}
        <div className="mb-8">
          <Row gutter={[16, 16]} className="mb-6">
            <Col xs={24} md={12}>
              <Search
                placeholder="Search blogs..."
                allowClear
                size="large"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full"
              />
            </Col>
            <Col xs={24} md={12}>
              <Select
                size="large"
                value={selectedCategory}
                onChange={setSelectedCategory}
                className="w-full"
                placeholder="Select Category"
              >
                {categories.map((cat) => (
                  <Option key={cat.value} value={cat.value}>
                    <span className="flex items-center">
                      {cat.icon}
                      <span className="ml-2">{cat.label}</span>
                    </span>
                  </Option>
                ))}
              </Select>
            </Col>
          </Row>
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <Tag
                key={cat.value}
                className={`cursor-pointer transition-all duration-300 ${
                  selectedCategory === cat.value
                    ? "bg-red-800 text-white border-red-800"
                    : "hover:bg-red-100 hover:border-red-300"
                }`}
                onClick={() => setSelectedCategory(cat.value)}
              >
                {cat.icon}
                <span className="ml-1">{cat.label}</span>
              </Tag>
            ))}
          </div>
        </div>

        {/* Info */}
        <div className="mb-6">
          <Text className="text-gray-600">
            Showing {currentBlogs.length} of {filteredBlogs.length} blogs
            {selectedCategory !== "all" &&
              ` in ${categories.find((c) => c.value === selectedCategory)?.label}`}
            {searchTerm && ` matching "${searchTerm}"`}
          </Text>
        </div>

        {/* Blog Grid */}
        <Row gutter={[24, 24]} className="mb-8">
          {currentBlogs.map((blog) => (
            <Col xs={24} md={12} lg={8} key={blog._id || blog.id}>
              <Card
                className="h-full shadow-lg hover:shadow-xl transition-all duration-300 border-yellow-200 hover:border-red-300"
                cover={
                  blog.image ? (
                    <img
                      alt={blog.title}
                      src={blog.image}
                      style={{ height: 200, objectFit: "cover", width: "100%" }}
                    />
                  ) : (
                    <div className="h-48 bg-gradient-to-r from-red-100 to-yellow-100 flex items-center justify-center">
                      <ReadOutlined className="text-4xl text-red-300" />
                    </div>
                  )
                }
                actions={[
                  <Button
                    type="primary"
                    className="bg-red-800 hover:bg-red-700 border-red-800 hover:border-red-700 text-white"
                    onClick={() => handleReadMore(blog.slug)}
                  >
                    Read More
                  </Button>,
                ]}
              >
                <div className="mb-3">
                  {blog.category && blog.category.length > 0 && (
                    <Tag
                      color={getCategoryColor(blog.category[0])}
                      className="mb-2"
                    >
                      {
                        categories.find((c) => c.value === blog.category[0])
                          ?.label
                      }
                    </Tag>
                  )}
                  <div className="flex items-center text-gray-500 text-sm space-x-4">
                    {blog.createdAt && (
                      <span className="flex items-center">
                        <CalendarOutlined className="mr-1" />
                        {new Date(blog.createdAt).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                        })}
                      </span>
                    )}
                    <span className="flex items-center">
                      <UserOutlined className="mr-1" />
                      {blog.minute_to_read} min read
                    </span>
                  </div>
                </div>

                <Title level={4} className="text-red-800 mb-3 line-clamp-2">
                  {blog.title}
                </Title>
                <Paragraph className="text-gray-700 mb-4 line-clamp-3">
                  {blog.description}
                </Paragraph>

                <div className="flex flex-wrap gap-1 mb-3">
                  {(blog.category || []).slice(0, 3).map((tag) => (
                    <Tag key={tag} size="small" className="text-xs">
                      {tag}
                    </Tag>
                  ))}
                </div>

                <div className="flex items-center text-gray-500 text-sm">
                  <UserOutlined className="mr-1" />
                  <Text className="text-gray-600">{blog.author}</Text>
                </div>
              </Card>
            </Col>
          ))}
        </Row>

        {/* No Results */}
        {currentBlogs.length === 0 && (
          <div className="text-center py-12">
            <SearchOutlined className="text-6xl text-gray-300 mb-4" />
            <Title level={3} className="text-gray-500 mb-2">
              No blogs found
            </Title>
            <Paragraph className="text-gray-400">
              Try adjusting your search terms or category filter
            </Paragraph>
            <Button
              type="primary"
              className="bg-red-800 hover:bg-red-700 border-red-800"
              onClick={() => {
                setSearchTerm("");
                setSelectedCategory("all");
              }}
            >
              Clear Filters
            </Button>
          </div>
        )}

        {/* Pagination */}
        {filteredBlogs.length > blogsPerPage && (
          <div className="flex justify-center mt-8">
            <Pagination
              current={currentPage}
              total={filteredBlogs.length}
              pageSize={blogsPerPage}
              onChange={setCurrentPage}
              showSizeChanger={false}
              showQuickJumper
              showTotal={(total, range) =>
                `${range[0]}-${range[1]} of ${total} blogs`
              }
              className="custom-pagination"
            />
          </div>
        )}

        {/* Newsletter */}
        <div className="bg-gradient-to-r from-red-800 to-red-900 text-white p-8 rounded-lg shadow-lg mt-12">
          <div className="text-center">
            <Title level={3} className="text-white mb-4">
              Stay Updated with Our Latest Blogs
            </Title>
            <Paragraph className="text-yellow-100 mb-6 max-w-2xl mx-auto">
              Subscribe to our newsletter and never miss insights about Rajput
              culture, matrimonial wisdom, and community stories.
            </Paragraph>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <Input
                placeholder="Enter your email"
                size="large"
                className="flex-1"
              />
              <Button
                type="primary"
                size="large"
                className="bg-yellow-500 hover:bg-yellow-400 text-red-900 border-yellow-500 hover:border-yellow-400 font-semibold"
              >
                Subscribe
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogsPage;
