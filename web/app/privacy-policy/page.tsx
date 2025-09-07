"use client";
import React from "react";
import { Card, Typography, Divider, Anchor, Row, Col, Alert } from "antd";
import {
  EyeOutlined,
  LockOutlined,
  UserOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import { ShieldCheck } from "lucide-react";

const { Title, Paragraph, Text } = Typography;

const PrivacyPolicy = () => {
  const sections = [
    { key: "introduction", href: "#introduction", title: "Introduction" },
    { key: "collection", href: "#collection", title: "Information Collection" },
    { key: "usage", href: "#usage", title: "How We Use Information" },
    { key: "sharing", href: "#sharing", title: "Information Sharing" },
    { key: "security", href: "#security", title: "Data Security" },
    { key: "rights", href: "#rights", title: "Your Privacy Rights" },
    { key: "cookies", href: "#cookies", title: "Cookies & Tracking" },
    { key: "retention", href: "#retention", title: "Data Retention" },
    { key: "updates", href: "#updates", title: "Policy Updates" },
    { key: "contact", href: "#contact", title: "Contact Us" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-yellow-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-red-800 to-red-900 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <ShieldCheck className="text-6xl text-yellow-400 mb-4" />
          <Title
            level={1}
            className="text-white mb-4 text-4xl md:text-5xl font-bold"
          >
            Privacy Policy
          </Title>
          <Paragraph className="text-xl text-yellow-100 max-w-3xl mx-auto">
            Your privacy is sacred to us. Learn how we protect and handle your
            personal information.
          </Paragraph>
          <Text className="text-yellow-200">Last updated: June 2025</Text>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <Row gutter={[24, 24]}>
          {/* Navigation Sidebar */}
          <Col xs={24} lg={6}>
            <Card className="sticky top-4 shadow-lg border-yellow-200">
              <LockOutlined className="text-2xl text-red-800 mb-3" />
              <Title level={4} className="text-red-800 mb-4">
                Privacy Sections
              </Title>
              <Anchor className="custom-anchor" items={sections} />
            </Card>
          </Col>

          {/* Main Content */}
          <Col xs={24} lg={18}>
            <Card className="shadow-lg border-yellow-200">
              {/* Trust Banner */}
              <Alert
                message="Your Trust, Our Commitment"
                description="We understand the sensitive nature of matrimonial information and are committed to maintaining the highest standards of privacy protection for the Rajput community."
                type="info"
                showIcon
                className="mb-8 border-blue-200 bg-blue-50"
              />

              {/* Introduction */}
              <section id="introduction" className="mb-8">
                <Title level={3} className="text-red-800 mb-4">
                  <EyeOutlined className="mr-2" />
                  1. Introduction
                </Title>
                <Paragraph className="text-gray-700 mb-4">
                  Welcome to our Privacy Policy. This document explains how we
                  collect, use, protect, and share your personal information
                  when you use our Rajput matrimonial platform. We understand
                  that matrimonial information is highly sensitive and personal,
                  and we are committed to maintaining your privacy with the
                  utmost care and respect.
                </Paragraph>
                <div className="bg-red-50 p-4 rounded-lg">
                  <Text strong className="text-red-800">
                    Our Privacy Commitment:
                  </Text>
                  <Paragraph className="text-gray-700 mt-2 mb-0">
                    We pledge to handle your personal information in accordance
                    with Indian privacy laws, cultural sensitivities of the
                    Rajput community, and international best practices for data
                    protection.
                  </Paragraph>
                </div>
              </section>

              <Divider />

              {/* Information Collection */}
              <section id="collection" className="mb-8">
                <Title level={3} className="text-red-800 mb-4">
                  2. Information We Collect
                </Title>
                <Paragraph className="text-gray-700 mb-4">
                  We collect information that helps us provide you with the best
                  matrimonial matching experience while respecting Rajput
                  traditions and family values.
                </Paragraph>

                <Row gutter={[16, 16]} className="mb-6">
                  <Col xs={24} md={12}>
                    <div className="bg-yellow-50 p-4 rounded-lg h-full">
                      <UserOutlined className="text-2xl text-yellow-600 mb-3" />
                      <Text strong className="text-red-800">
                        Personal Information:
                      </Text>
                      <ul className="text-gray-700 mt-2 space-y-1 text-sm">
                        <li>• Full name and family lineage</li>
                        <li>• Date of birth and age</li>
                        <li>• Contact information (phone, email)</li>
                        <li>• Address and location details</li>
                        <li>• Educational qualifications</li>
                        <li>• Professional information</li>
                        <li>• Rajput community verification</li>
                      </ul>
                    </div>
                  </Col>
                  <Col xs={24} md={12}>
                    <div className="bg-blue-50 p-4 rounded-lg h-full">
                      <SettingOutlined className="text-2xl text-blue-600 mb-3" />
                      <Text strong className="text-red-800">
                        Matrimonial Preferences:
                      </Text>
                      <ul className="text-gray-700 mt-2 space-y-1 text-sm">
                        <li>• Partner preferences and criteria</li>
                        <li>• Family background requirements</li>
                        <li>• Cultural and traditional preferences</li>
                        <li>• Lifestyle and value preferences</li>
                        <li>• Photos and family pictures</li>
                        <li>• Horoscope and astrological details</li>
                        <li>• Communication preferences</li>
                      </ul>
                    </div>
                  </Col>
                </Row>

                <div className="bg-gray-50 p-4 rounded-lg">
                  <Text strong className="text-gray-800">
                    Additional Data Collection:
                  </Text>
                  <ul className="text-gray-700 mt-2 space-y-1">
                    <li>• Device information and IP addresses for security</li>
                    <li>• Usage patterns and platform interaction data</li>
                    <li>• Communication records within the platform</li>
                    <li>• Payment information for premium services</li>
                    <li>
                      • Verification documents for community authentication
                    </li>
                  </ul>
                </div>
              </section>

              <Divider />

              {/* How We Use Information */}
              <section id="usage" className="mb-8">
                <Title level={3} className="text-red-800 mb-4">
                  3. How We Use Your Information
                </Title>
                <Paragraph className="text-gray-700 mb-4">
                  Your information is used exclusively for matrimonial purposes
                  and to enhance your experience on our platform. We respect the
                  sanctity of this information and use it responsibly.
                </Paragraph>

                <Row gutter={[16, 16]}>
                  <Col xs={24} md={8}>
                    <div className="bg-green-50 p-4 rounded-lg h-full">
                      <Text strong className="text-green-800">
                        Primary Uses:
                      </Text>
                      <ul className="text-gray-700 mt-2 space-y-1 text-sm">
                        <li>• Profile matching and recommendations</li>
                        <li>• Facilitating introductions</li>
                        <li>• Community verification</li>
                        <li>• Account management</li>
                      </ul>
                    </div>
                  </Col>
                  <Col xs={24} md={8}>
                    <div className="bg-blue-50 p-4 rounded-lg h-full">
                      <Text strong className="text-blue-800">
                        Communication:
                      </Text>
                      <ul className="text-gray-700 mt-2 space-y-1 text-sm">
                        <li>• Sending match notifications</li>
                        <li>• Platform updates and news</li>
                        <li>• Customer support</li>
                        <li>• Security alerts</li>
                      </ul>
                    </div>
                  </Col>
                  <Col xs={24} md={8}>
                    <div className="bg-purple-50 p-4 rounded-lg h-full">
                      <Text strong className="text-purple-800">
                        Improvements:
                      </Text>
                      <ul className="text-gray-700 mt-2 space-y-1 text-sm">
                        <li>• Platform enhancement</li>
                        <li>• Algorithm refinement</li>
                        <li>• User experience optimization</li>
                        <li>• Security strengthening</li>
                      </ul>
                    </div>
                  </Col>
                </Row>
              </section>

              <Divider />

              {/* Information Sharing */}
              <section id="sharing" className="mb-8">
                <Title level={3} className="text-red-800 mb-4">
                  4. Information Sharing
                </Title>
                <Paragraph className="text-gray-700 mb-4">
                  We understand the importance of discretion in matrimonial
                  matters. Your information sharing is strictly controlled and
                  purposeful.
                </Paragraph>

                <Alert
                  message="No Third-Party Selling"
                  description="We never sell, rent, or lease your personal information to third parties for commercial purposes."
                  type="success"
                  showIcon
                  className="mb-4"
                />

                <div className="space-y-4">
                  <div className="bg-yellow-50 p-4 rounded-lg">
                    <Text strong className="text-yellow-800">
                      Within Platform Sharing:
                    </Text>
                    <Paragraph className="text-gray-700 mt-2 mb-0">
                      Your profile information is shared with potential matches
                      based on compatibility criteria. You control what
                      information is visible and to whom through privacy
                      settings.
                    </Paragraph>
                  </div>

                  <div className="bg-orange-50 p-4 rounded-lg">
                    <Text strong className="text-orange-800">
                      Legal Requirements:
                    </Text>
                    <Paragraph className="text-gray-700 mt-2 mb-0">
                      We may share information when required by law, court
                      orders, or to protect the safety and security of our users
                      and platform.
                    </Paragraph>
                  </div>

                  <div className="bg-red-50 p-4 rounded-lg">
                    <Text strong className="text-red-800">
                      Service Providers:
                    </Text>
                    <Paragraph className="text-gray-700 mt-2 mb-0">
                      Trusted third-party service providers (payment processors,
                      hosting services, customer support) may access limited
                      information necessary to provide their services under
                      strict confidentiality agreements.
                    </Paragraph>
                  </div>
                </div>
              </section>

              <Divider />

              {/* Data Security */}
              <section id="security" className="mb-8">
                <Title level={3} className="text-red-800 mb-4">
                  <LockOutlined className="mr-2" />
                  5. Data Security Measures
                </Title>
                <Paragraph className="text-gray-700 mb-4">
                  We employ industry-leading security measures to protect your
                  sensitive matrimonial information from unauthorized access,
                  alteration, disclosure, or destruction.
                </Paragraph>

                <Row gutter={[16, 16]}>
                  <Col xs={24} md={12}>
                    <div className="bg-green-50 p-4 rounded-lg">
                      <Text strong className="text-green-800">
                        Technical Security:
                      </Text>
                      <ul className="text-gray-700 mt-2 space-y-1">
                        <li>• SSL/TLS encryption for data transmission</li>
                        <li>• Advanced firewall protection</li>
                        <li>• Regular security audits and updates</li>
                        <li>• Secure data centers with 24/7 monitoring</li>
                        <li>• Multi-factor authentication options</li>
                      </ul>
                    </div>
                  </Col>
                  <Col xs={24} md={12}>
                    <div className="bg-blue-50 p-4 rounded-lg">
                      <Text strong className="text-blue-800">
                        Operational Security:
                      </Text>
                      <ul className="text-gray-700 mt-2 space-y-1">
                        <li>• Employee background verification</li>
                        <li>• Limited access on need-to-know basis</li>
                        <li>• Regular staff training on privacy</li>
                        <li>• Incident response procedures</li>
                        <li>• Regular backup and recovery testing</li>
                      </ul>
                    </div>
                  </Col>
                </Row>
              </section>

              <Divider />

              {/* Your Privacy Rights */}
              <section id="rights" className="mb-8">
                <Title level={3} className="text-red-800 mb-4">
                  6. Your Privacy Rights
                </Title>
                <Paragraph className="text-gray-700 mb-4">
                  You have significant control over your personal information
                  and how it's used on our platform. We believe in empowering
                  you with comprehensive privacy rights.
                </Paragraph>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-purple-50 p-4 rounded-lg">
                    <Text strong className="text-purple-800">
                      Access & Control:
                    </Text>
                    <ul className="text-gray-700 mt-2 space-y-1 text-sm">
                      <li>• View all your stored information</li>
                      <li>• Update or correct your profile</li>
                      <li>• Control profile visibility settings</li>
                      <li>• Manage communication preferences</li>
                    </ul>
                  </div>
                  <div className="bg-teal-50 p-4 rounded-lg">
                    <Text strong className="text-teal-800">
                      Data Management:
                    </Text>
                    <ul className="text-gray-700 mt-2 space-y-1 text-sm">
                      <li>• Download your data (data portability)</li>
                      <li>• Request data deletion</li>
                      <li>• Restrict processing of your data</li>
                      <li>• Object to certain uses of your data</li>
                    </ul>
                  </div>
                </div>

                <div className="bg-yellow-50 p-4 rounded-lg mt-4">
                  <Text strong className="text-yellow-800">
                    How to Exercise Your Rights:
                  </Text>
                  <Paragraph className="text-gray-700 mt-2 mb-0">
                    Contact our privacy team through the platform's settings or
                    customer support. We will respond to your requests within 30
                    days and may require identity verification for security
                    purposes.
                  </Paragraph>
                </div>
              </section>

              <Divider />

              {/* Cookies & Tracking */}
              <section id="cookies" className="mb-8">
                <Title level={3} className="text-red-800 mb-4">
                  7. Cookies & Tracking Technologies
                </Title>
                <Paragraph className="text-gray-700 mb-4">
                  We use cookies and similar technologies to enhance your
                  browsing experience, provide personalized content, and analyze
                  platform usage patterns.
                </Paragraph>

                <Row gutter={[16, 16]}>
                  <Col xs={24} md={8}>
                    <div className="bg-gray-50 p-4 rounded-lg h-full">
                      <Text strong className="text-gray-800">
                        Essential Cookies:
                      </Text>
                      <Paragraph className="text-gray-700 mt-2 mb-0 text-sm">
                        Required for platform functionality, login sessions, and
                        security features. These cannot be disabled.
                      </Paragraph>
                    </div>
                  </Col>
                  <Col xs={24} md={8}>
                    <div className="bg-gray-50 p-4 rounded-lg h-full">
                      <Text strong className="text-gray-800">
                        Analytics Cookies:
                      </Text>
                      <Paragraph className="text-gray-700 mt-2 mb-0 text-sm">
                        Help us understand how users interact with our platform
                        to improve services. These can be controlled through
                        settings.
                      </Paragraph>
                    </div>
                  </Col>
                  <Col xs={24} md={8}>
                    <div className="bg-gray-50 p-4 rounded-lg h-full">
                      <Text strong className="text-gray-800">
                        Preference Cookies:
                      </Text>
                      <Paragraph className="text-gray-700 mt-2 mb-0 text-sm">
                        Remember your preferences and settings to provide a
                        personalized experience. Optional and manageable.
                      </Paragraph>
                    </div>
                  </Col>
                </Row>
              </section>

              <Divider />

              {/* Data Retention */}
              <section id="retention" className="mb-8">
                <Title level={3} className="text-red-800 mb-4">
                  8. Data Retention Policy
                </Title>
                <Paragraph className="text-gray-700 mb-4">
                  We retain your information only as long as necessary to
                  provide our services and comply with legal obligations.
                </Paragraph>

                <div className="space-y-4">
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <Text strong className="text-blue-800">
                      Active Accounts:
                    </Text>
                    <Paragraph className="text-gray-700 mt-2 mb-0">
                      Information is retained while your account is active and
                      for a reasonable period thereafter to allow for account
                      reactivation.
                    </Paragraph>
                  </div>

                  <div className="bg-green-50 p-4 rounded-lg">
                    <Text strong className="text-green-800">
                      Successful Matches:
                    </Text>
                    <Paragraph className="text-gray-700 mt-2 mb-0">
                      When you find your life partner and deactivate your
                      account, we retain minimal information for historical and
                      security purposes, with most personal data deleted.
                    </Paragraph>
                  </div>

                  <div className="bg-orange-50 p-4 rounded-lg">
                    <Text strong className="text-orange-800">
                      Legal Requirements:
                    </Text>
                    <Paragraph className="text-gray-700 mt-2 mb-0">
                      Some information may be retained longer if required by
                      law, for fraud prevention, or to resolve disputes.
                    </Paragraph>
                  </div>
                </div>
              </section>

              <Divider />

              {/* Policy Updates */}
              <section id="updates" className="mb-8">
                <Title level={3} className="text-red-800 mb-4">
                  9. Privacy Policy Updates
                </Title>
                <Paragraph className="text-gray-700 mb-4">
                  We may update this Privacy Policy periodically to reflect
                  changes in our practices, technology, legal requirements, or
                  other factors.
                </Paragraph>

                <div className="bg-yellow-50 p-4 rounded-lg">
                  <Text strong className="text-yellow-800">
                    Update Notifications:
                  </Text>
                  <ul className="text-gray-700 mt-2 space-y-1">
                    <li>• Significant changes will be notified via email</li>
                    <li>• Platform notifications for important updates</li>
                    <li>• Updated policy date will be clearly indicated</li>
                    <li>• Continued use implies acceptance of changes</li>
                  </ul>
                </div>
              </section>

              <Divider />

              {/* Contact Information */}
              <section id="contact" className="mb-8">
                <Title level={3} className="text-red-800 mb-4">
                  10. Contact Our Privacy Team
                </Title>
                <Paragraph className="text-gray-700 mb-4">
                  We welcome your questions, concerns, or feedback regarding our
                  privacy practices. Our dedicated privacy team is here to
                  assist you.
                </Paragraph>

                <div className="bg-gradient-to-r from-red-800 to-red-900 text-white p-6 rounded-lg">
                  <Row gutter={[24, 24]}>
                    <Col xs={24} md={12}>
                      <Title level={5} className="text-white mb-3">
                        Privacy Inquiries:
                      </Title>
                      <ul className="text-yellow-100 space-y-2">
                        <li>• Email: privacy@rajputmatrimony.com</li>
                        <li>• Phone: +91-XXXX-XXXXXX</li>
                        <li>• Response time: Within 48 hours</li>
                      </ul>
                    </Col>
                    <Col xs={24} md={12}>
                      <Title level={5} className="text-white mb-3">
                        Data Protection Officer:
                      </Title>
                      <Paragraph className="text-yellow-100 mb-0">
                        For formal privacy complaints or data protection
                        matters, you can reach our Data Protection Officer who
                        will ensure your concerns are addressed promptly and
                        thoroughly.
                      </Paragraph>
                    </Col>
                  </Row>
                </div>
              </section>

              {/* Final Note */}
              <div className="bg-red-50 p-6 rounded-lg border border-red-200">
                <Title level={4} className="text-red-800 mb-3">
                  <ShieldCheck className="mr-2" />
                  Our Privacy Promise
                </Title>
                <Paragraph className="text-gray-700 mb-0">
                  Your trust is the foundation of our service. We pledge to
                  continue investing in privacy protection, maintaining
                  transparency in our practices, and putting your interests
                  first. Our commitment to protecting your matrimonial journey
                  extends beyond compliance – it's about respecting the sacred
                  nature of the relationships we help foster within our Rajput
                  community.
                </Paragraph>
              </div>
            </Card>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
