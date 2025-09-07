"use client";
import React from "react";
import { Card, Typography, Divider, Anchor, Row, Col } from "antd";
import { FileTextOutlined, ExclamationCircleOutlined } from "@ant-design/icons";
import { ShieldCheck } from "lucide-react";

const { Title, Paragraph, Text } = Typography;

const TermsAndConditions = () => {
  const sections = [
    { key: "acceptance", href: "#acceptance", title: "Acceptance of Terms" },
    { key: "eligibility", href: "#eligibility", title: "Eligibility Criteria" },
    {
      key: "registration",
      href: "#registration",
      title: "Registration & Account",
    },
    { key: "conduct", href: "#conduct", title: "User Conduct" },
    { key: "content", href: "#content", title: "Content Guidelines" },
    { key: "privacy", href: "#privacy", title: "Privacy & Data Protection" },
    { key: "payment", href: "#payment", title: "Payment Terms" },
    { key: "termination", href: "#termination", title: "Account Termination" },
    { key: "liability", href: "#liability", title: "Limitation of Liability" },
    { key: "updates", href: "#updates", title: "Terms Updates" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-yellow-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-red-800 to-red-900 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <FileTextOutlined className="text-6xl text-yellow-400 mb-4" />
          <Title
            level={1}
            className="text-white mb-4 text-4xl md:text-5xl font-bold"
          >
            Terms & Conditions
          </Title>
          <Paragraph className="text-xl text-yellow-100 max-w-3xl mx-auto">
            Please read these terms carefully before using our Rajput
            matrimonial platform
          </Paragraph>
          <Text className="text-yellow-200">Last updated: June 2025</Text>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <Row gutter={[24, 24]}>
          {/* Navigation Sidebar */}
          <Col xs={24} lg={6}>
            <Card className="sticky top-4 shadow-lg border-yellow-200">
              <Title level={4} className="text-red-800 mb-4">
                Quick Navigation
              </Title>
              <Anchor className="custom-anchor" items={sections} />
            </Card>
          </Col>

          {/* Main Content */}
          <Col xs={24} lg={18}>
            <Card className="shadow-lg border-yellow-200">
              {/* Acceptance of Terms */}
              <section id="acceptance" className="mb-8">
                <Title level={3} className="text-red-800 mb-4">
                  <ShieldCheck className="mr-2" />
                  1. Acceptance of Terms
                </Title>
                <Paragraph className="text-gray-700 mb-4">
                  By accessing and using our Rajput matrimonial platform, you
                  acknowledge that you have read, understood, and agree to be
                  bound by these Terms and Conditions. These terms constitute a
                  legally binding agreement between you and our platform.
                </Paragraph>
                <Paragraph className="text-gray-700">
                  If you do not agree with any part of these terms, please do
                  not use our services. Your continued use of the platform
                  constitutes acceptance of any modifications to these terms.
                </Paragraph>
              </section>

              <Divider />

              {/* Eligibility Criteria */}
              <section id="eligibility" className="mb-8">
                <Title level={3} className="text-red-800 mb-4">
                  2. Eligibility Criteria
                </Title>
                <Paragraph className="text-gray-700 mb-3">
                  To use our platform, you must meet the following criteria:
                </Paragraph>
                <div className="bg-yellow-50 p-4 rounded-lg mb-4">
                  <ul className="text-gray-700 space-y-2">
                    <li>
                      • Be at least 18 years of age (21 for males, 18 for
                      females as per Indian matrimonial customs)
                    </li>
                    <li>
                      • Belong to the Rajput community and provide valid
                      verification
                    </li>
                    <li>
                      • Be legally eligible for marriage under applicable laws
                    </li>
                    <li>
                      • Provide accurate and truthful information about yourself
                    </li>
                    <li>
                      • Have the legal capacity to enter into binding agreements
                    </li>
                  </ul>
                </div>
                <Paragraph className="text-gray-700">
                  We reserve the right to verify your eligibility and may
                  request additional documentation to confirm your community
                  membership and personal details.
                </Paragraph>
              </section>

              <Divider />

              {/* Registration & Account */}
              <section id="registration" className="mb-8">
                <Title level={3} className="text-red-800 mb-4">
                  3. Registration & Account Management
                </Title>
                <Paragraph className="text-gray-700 mb-4">
                  <Text strong>Account Creation:</Text> You must create an
                  account to access our services. You are responsible for
                  maintaining the confidentiality of your login credentials and
                  for all activities that occur under your account.
                </Paragraph>
                <div className="bg-red-50 p-4 rounded-lg mb-4">
                  <Text strong className="text-red-800">
                    Important Requirements:
                  </Text>
                  <ul className="text-gray-700 mt-2 space-y-1">
                    <li>• One person can maintain only one active account</li>
                    <li>• All information must be current and accurate</li>
                    <li>• Profile photos must be recent and genuine</li>
                    <li>• Community verification documents must be provided</li>
                  </ul>
                </div>
              </section>

              <Divider />

              {/* User Conduct */}
              <section id="conduct" className="mb-8">
                <Title level={3} className="text-red-800 mb-4">
                  4. User Conduct Guidelines
                </Title>
                <Paragraph className="text-gray-700 mb-4">
                  Our platform maintains high standards of conduct in keeping
                  with Rajput values and traditions. Users must adhere to the
                  following behavioral guidelines:
                </Paragraph>

                <Row gutter={[16, 16]}>
                  <Col xs={24} md={12}>
                    <div className="bg-green-50 p-4 rounded-lg">
                      <Text strong className="text-green-800">
                        Encouraged Behavior:
                      </Text>
                      <ul className="text-gray-700 mt-2 space-y-1">
                        <li>• Respectful communication</li>
                        <li>• Honest representation</li>
                        <li>• Cultural sensitivity</li>
                        <li>• Family involvement</li>
                        <li>• Serious matrimonial intent</li>
                      </ul>
                    </div>
                  </Col>
                  <Col xs={24} md={12}>
                    <div className="bg-red-50 p-4 rounded-lg">
                      <Text strong className="text-red-800">
                        Prohibited Behavior:
                      </Text>
                      <ul className="text-gray-700 mt-2 space-y-1">
                        <li>• Harassment or abusive language</li>
                        <li>• False information or fake profiles</li>
                        <li>• Commercial solicitation</li>
                        <li>• Inappropriate content sharing</li>
                        <li>• Discriminatory behavior</li>
                      </ul>
                    </div>
                  </Col>
                </Row>
              </section>

              <Divider />

              {/* Content Guidelines */}
              <section id="content" className="mb-8">
                <Title level={3} className="text-red-800 mb-4">
                  5. Content Guidelines
                </Title>
                <Paragraph className="text-gray-700 mb-4">
                  All content shared on the platform must align with our
                  community standards and cultural values:
                </Paragraph>
                <div className="bg-yellow-50 p-4 rounded-lg">
                  <ul className="text-gray-700 space-y-2">
                    <li>
                      • Profile information must be accurate and verifiable
                    </li>
                    <li>
                      • Photos should be appropriate and recent (within 2 years)
                    </li>
                    <li>
                      • Content should respect Rajput cultural values and
                      traditions
                    </li>
                    <li>• No offensive, explicit, or inappropriate material</li>
                    <li>
                      • Family photos and traditional attire are encouraged
                    </li>
                  </ul>
                </div>
              </section>

              <Divider />

              {/* Privacy & Data Protection */}
              <section id="privacy" className="mb-8">
                <Title level={3} className="text-red-800 mb-4">
                  6. Privacy & Data Protection
                </Title>
                <Paragraph className="text-gray-700 mb-4">
                  We are committed to protecting your privacy and personal
                  information. Your data will be handled in accordance with our
                  Privacy Policy and applicable data protection laws.
                </Paragraph>
                <div className="bg-blue-50 p-4 rounded-lg">
                  <Text strong className="text-blue-800">
                    Data Usage:
                  </Text>
                  <Paragraph className="text-gray-700 mt-2 mb-0">
                    Your information will only be used for matrimonial matching
                    purposes and will not be shared with third parties without
                    your explicit consent, except as required by law.
                  </Paragraph>
                </div>
              </section>

              <Divider />

              {/* Payment Terms */}
              <section id="payment" className="mb-8">
                <Title level={3} className="text-red-800 mb-4">
                  7. Payment Terms
                </Title>
                <Paragraph className="text-gray-700 mb-4">
                  Our platform offers both free and premium services. Premium
                  features require payment according to our published pricing
                  plans.
                </Paragraph>
                <ul className="text-gray-700 space-y-2 mb-4">
                  <li>
                    • All payments are processed securely through verified
                    payment gateways
                  </li>
                  <li>
                    • Subscription fees are non-refundable except as required by
                    law
                  </li>
                  <li>
                    • Premium features are activated immediately upon successful
                    payment
                  </li>
                  <li>• Auto-renewal can be disabled from account settings</li>
                </ul>
              </section>

              <Divider />

              {/* Account Termination */}
              <section id="termination" className="mb-8">
                <Title level={3} className="text-red-800 mb-4">
                  8. Account Termination
                </Title>
                <Paragraph className="text-gray-700 mb-4">
                  Either party may terminate the account relationship under the
                  following circumstances:
                </Paragraph>
                <Row gutter={[16, 16]}>
                  <Col xs={24} md={12}>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <Text strong>User Initiated:</Text>
                      <ul className="text-gray-700 mt-2 space-y-1">
                        <li>• Account deletion request</li>
                        <li>• Successful matrimonial match</li>
                        <li>• Change in matrimonial status</li>
                      </ul>
                    </div>
                  </Col>
                  <Col xs={24} md={12}>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <Text strong>Platform Initiated:</Text>
                      <ul className="text-gray-700 mt-2 space-y-1">
                        <li>• Terms violation</li>
                        <li>• Suspicious or fraudulent activity</li>
                        <li>• Extended inactivity</li>
                      </ul>
                    </div>
                  </Col>
                </Row>
              </section>

              <Divider />

              {/* Limitation of Liability */}
              <section id="liability" className="mb-8">
                <Title level={3} className="text-red-800 mb-4">
                  9. Limitation of Liability
                </Title>
                <div className="bg-orange-50 p-4 rounded-lg mb-4">
                  <ExclamationCircleOutlined className="text-orange-600 mr-2" />
                  <Text strong className="text-orange-800">
                    Important Disclaimer:
                  </Text>
                </div>
                <Paragraph className="text-gray-700 mb-4">
                  Our platform serves as a meeting ground for matrimonial
                  purposes. We do not guarantee:
                </Paragraph>
                <ul className="text-gray-700 space-y-2">
                  <li>• Successful matrimonial matches or relationships</li>
                  <li>• Accuracy of information provided by other users</li>
                  <li>• Compatibility between matched profiles</li>
                  <li>
                    • Outcomes of meetings or communications between users
                  </li>
                </ul>
                <Paragraph className="text-gray-700 mt-4">
                  Users are advised to verify all information independently and
                  exercise due diligence in their interactions with other
                  members.
                </Paragraph>
              </section>

              <Divider />

              {/* Terms Updates */}
              <section id="updates" className="mb-8">
                <Title level={3} className="text-red-800 mb-4">
                  10. Terms Updates
                </Title>
                <Paragraph className="text-gray-700 mb-4">
                  We reserve the right to modify these terms at any time. Users
                  will be notified of significant changes through email or
                  platform notifications. Continued use of the platform after
                  modifications constitutes acceptance of the updated terms.
                </Paragraph>
                <div className="bg-yellow-50 p-4 rounded-lg">
                  <Text strong className="text-yellow-800">
                    Stay Informed:
                  </Text>
                  <Paragraph className="text-gray-700 mt-2 mb-0">
                    We recommend reviewing these terms periodically to stay
                    updated on any changes that may affect your use of the
                    platform.
                  </Paragraph>
                </div>
              </section>

              {/* Contact Information */}
              <div className="bg-gradient-to-r from-red-800 to-red-900 text-white p-6 rounded-lg mt-8">
                <Title level={4} className="text-white mb-3">
                  Questions About These Terms?
                </Title>
                <Paragraph className="text-yellow-100 mb-0">
                  If you have any questions or concerns about these Terms and
                  Conditions, please contact our support team. We're here to
                  help you understand your rights and responsibilities as a
                  member of our Rajput matrimonial community.
                </Paragraph>
              </div>
            </Card>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default TermsAndConditions;
