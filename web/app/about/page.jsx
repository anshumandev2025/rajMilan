"use client";
import React from "react";
import { Card, Typography, Row, Col, Divider } from "antd";
import {
  HeartOutlined,
  UserOutlined,
  SafetyOutlined,
  CrownOutlined,
} from "@ant-design/icons";
import { useRouter } from "next/router";
import Link from "next/link";

const { Title, Paragraph, Text } = Typography;

const AboutUs = () => {
  const features = [
    {
      icon: <CrownOutlined className="text-4xl text-yellow-500" />,
      title: "Rajput Heritage",
      description:
        "Dedicated exclusively to the noble Rajput community, preserving our rich cultural traditions and values.",
    },
    {
      icon: <HeartOutlined className="text-4xl text-red-800" />,
      title: "Sacred Unions",
      description:
        "Facilitating meaningful connections that honor our ancestral customs and family traditions.",
    },
    {
      icon: <SafetyOutlined className="text-4xl text-yellow-500" />,
      title: "Trusted Platform",
      description:
        "Verified profiles with complete privacy protection ensuring safe and secure matrimonial experience.",
    },
    {
      icon: <UserOutlined className="text-4xl text-red-800" />,
      title: "Personalized Service",
      description:
        "Dedicated support team understanding the unique requirements of Rajput matrimonial alliances.",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-yellow-50">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-red-800 to-red-900 text-white py-20">
        <div className="absolute inset-0 bg-black opacity-20"></div>
        <div className="relative container mx-auto px-4 text-center">
          <Title
            level={1}
            className="text-white mb-4 text-4xl md:text-6xl font-bold"
          >
            About Our Legacy
          </Title>
          <Paragraph className="text-xl text-yellow-100 max-w-3xl mx-auto">
            Connecting hearts, preserving heritage - Your trusted partner in
            finding the perfect life companion within the noble Rajput community
          </Paragraph>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16">
        {/* Mission Statement */}
        <div className="text-center mb-16">
          <Title level={2} className="text-red-800 mb-8">
            Our Mission
          </Title>
          <Card className="max-w-4xl mx-auto shadow-lg border-yellow-200">
            <Paragraph className="text-lg text-gray-700 leading-relaxed">
              We are committed to creating sacred bonds within the Rajput
              community by providing a secure, respectful, and
              culturally-aligned platform for matrimonial alliances. Our mission
              is to honor the glorious traditions of Rajput heritage while
              embracing modern technology to connect compatible souls.
            </Paragraph>
          </Card>
        </div>

        {/* Features Grid */}
        <div className="mb-16">
          <Title level={2} className="text-center text-red-800 mb-12">
            Why Choose Us
          </Title>
          <Row gutter={[24, 24]}>
            {features.map((feature, index) => (
              <Col xs={24} md={12} lg={6} key={index}>
                <Card className="h-full text-center shadow-lg hover:shadow-xl transition-shadow duration-300 border-yellow-200 p-[2rem]">
                  <div className="mb-4">{feature.icon}</div>
                  <Title level={4} className="text-red-800 mb-3">
                    {feature.title}
                  </Title>
                  <Paragraph className="text-gray-600">
                    {feature.description}
                  </Paragraph>
                </Card>
              </Col>
            ))}
          </Row>
        </div>

        {/* Our Story */}
        <Row gutter={[48, 24]} className="mb-16">
          <Col xs={24} lg={12}>
            <Card className="h-full shadow-lg border-yellow-200">
              <Title level={3} className="text-red-800 mb-4">
                Our Story
              </Title>
              <Paragraph className="text-gray-700 mb-4">
                Founded with deep respect for Rajput traditions and values, our
                platform emerged from the understanding that finding a life
                partner within our community requires more than just matching
                profiles - it requires understanding our culture, our customs,
                and our way of life.
              </Paragraph>
              <Paragraph className="text-gray-700 mb-4">
                We recognize that Rajput marriages are not just unions between
                two individuals, but alliances between families, traditions, and
                legacies. Our platform is designed to facilitate these
                meaningful connections while maintaining the dignity and respect
                that our community deserves.
              </Paragraph>
              <Paragraph className="text-gray-700">
                With thousands of successful matches and countless happy
                families, we continue to serve as the bridge between tradition
                and modernity in Rajput matrimonial services.
              </Paragraph>
            </Card>
          </Col>
          <Col xs={24} lg={12}>
            <Card className="h-full shadow-lg border-yellow-200">
              <Title level={3} className="text-red-800 mb-4">
                Our Values
              </Title>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-yellow-500 rounded-full mt-2 flex-shrink-0"></div>
                  <div>
                    <Text strong className="text-red-800">
                      Respect for Tradition:
                    </Text>
                    <Paragraph className="text-gray-700 mt-1 mb-0">
                      Honoring age-old customs while embracing progress
                    </Paragraph>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-yellow-500 rounded-full mt-2 flex-shrink-0"></div>
                  <div>
                    <Text strong className="text-red-800">
                      Family Values:
                    </Text>
                    <Paragraph className="text-gray-700 mt-1 mb-0">
                      Understanding the importance of family bonds and approval
                    </Paragraph>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-yellow-500 rounded-full mt-2 flex-shrink-0"></div>
                  <div>
                    <Text strong className="text-red-800">
                      Privacy & Security:
                    </Text>
                    <Paragraph className="text-gray-700 mt-1 mb-0">
                      Protecting your personal information with utmost care
                    </Paragraph>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-yellow-500 rounded-full mt-2 flex-shrink-0"></div>
                  <div>
                    <Text strong className="text-red-800">
                      Authentic Connections:
                    </Text>
                    <Paragraph className="text-gray-700 mt-1 mb-0">
                      Facilitating genuine relationships based on compatibility
                    </Paragraph>
                  </div>
                </div>
              </div>
            </Card>
          </Col>
        </Row>

        {/* Call to Action */}
        <div className="text-center bg-gradient-to-r from-red-800 to-red-900 text-white p-12 rounded-lg shadow-lg">
          <Title level={2} className="text-white mb-4">
            Ready to Begin Your Journey?
          </Title>
          <Paragraph className="text-yellow-100 text-lg mb-6 max-w-2xl mx-auto">
            Join thousands of Rajput families who have found their perfect match
            through our trusted platform. Your ideal life partner awaits.
          </Paragraph>
          <Link
            href="/auth/signup"
            className="bg-yellow-500 hover:bg-yellow-400 text-red-900 font-bold py-3 px-8 rounded-lg text-lg transition-colors duration-300"
          >
            Get Started Today
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
