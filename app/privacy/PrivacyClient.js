"use client";

import React from "react";
import styled, { keyframes } from "styled-components";
import Footer from "../../components/Footer";
// ==========================================
// ANIMATIONS
// ==========================================
const fadeInUp = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
`;

// ==========================================
// STYLED COMPONENTS
// ==========================================
const Section = styled.section`
  padding: 80px 20px 100px;
  background-color: #f5f5f5; 
  min-height: 100vh;
`;

const Container = styled.div`
  max-width: 900px; /* Kept narrow for optimal reading length */
  margin: 0 auto;
`;

const HeaderWrap = styled.div`
  text-align: center;
  margin-bottom: 60px;
  animation: ${fadeInUp} 0.6s ease-out forwards;

  .pill {
    font-size: 13px;
    font-weight: 700;
    padding: 8px 18px;
    margin-bottom: 20px;
    background: rgba(88, 53, 242, 0.1);
    color: rgb(88, 53, 242);
    display: inline-flex;
    align-items: center;
    justify-content: center;
    text-transform: uppercase;
    letter-spacing: 1px;
  }

  h1 {
    font-size: 38px;
    font-weight: 750;
    color: #0f172a;
    margin: 0 0 16px;
    letter-spacing: -1px;
    line-height: 1.2;

    @media (max-width: 768px) {
      font-size: 32px;
    }
  }

  p {
    font-size: 18px;
    color: #64748b;
    max-width: 600px;
    margin: 0 auto;
    line-height: 1.6;
  }
`;

const VerticalCardLayout = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

const PolicyCard = styled.div`
  background: #ffffff;
  border-radius: 5px;
  padding: 40px;
  position: relative;
  border: 1px solid rgba(226, 232, 240, 0.8);
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.02), 0 10px 15px -3px rgba(0, 0, 0, 0.02);
  transition: all 0.3s ease;
  overflow: hidden;

  /* Animation for each card */
  opacity: 0;
  animation: ${fadeInUp} 0.6s ease-out forwards;
  animation-delay: ${(props) => props.$delay || '0s'};

  /* Subtle accent line on the left to denote a legal/formal block */
  &::before {
    content: '';
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    width: 4px;
    background: rgb(88, 53, 242);
    opacity: 0;
    transition: opacity 0.3s ease;
  }

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.05), 0 8px 10px -6px rgba(0, 0, 0, 0.01);
    
    &::before {
      opacity: 1; /* Shows the accent line on hover */
    }
  }

  h2 {
    font-size: 22px;
    font-weight: 700;
    color: #0f172a;
    margin: 0 0 20px;
    padding-bottom: 15px;
    border-bottom: 1px solid #e2e8f0;
  }

  p {
    font-size: 16px;
    line-height: 1.8;
    color: #475569;
    margin-bottom: 16px;

    &:last-child {
      margin-bottom: 0;
    }
  }

  b, strong {
    color: #1e293b;
    font-weight: 600;
  }

  ul, ol {
    margin: 0 0 16px 20px;
    padding: 0;
    color: #475569;
    font-size: 16px;
    line-height: 1.8;

    li {
      margin-bottom: 8px;
      padding-left: 8px;
    }
  }

  /* Specific styling for the footer/copyright card */
  &.copyright-card {
    background: #ffffff;
    border-color: #0f172a;
    
    h2, p {
      color: #000000;
      border-bottom: none;
      padding-bottom: 0;
      margin-bottom: 8px;
    }
    p {
      color: #000000;
      font-size: 15px;
    }
    &::before {
      background: rgb(88, 53, 242);
    }
  }

  @media (max-width: 768px) {
    padding: 30px 24px;
  }
`;

// ==========================================
// COMPONENT
// ==========================================
const Privacy = () => {
    return (
        <>
            <Section>
            <Container>
                <HeaderWrap>
                    <div className="pill">Legal & Compliance</div>
                    <h1>Privacy Policy & Copyright Protection FOX LAB</h1>

                </HeaderWrap>

                <VerticalCardLayout>

                    <PolicyCard $delay="0.1s">
                        <h2>1. Introduction</h2>
                        <p>Welcome to <b>FOX LAB.</b></p>
                        <p>
                            This Privacy Policy explains how we collect, use, disclose, and
                            protect your personal information when you visit or use our
                            website and services.
                        </p>
                        <p>
                            By accessing or using this website, you agree to the terms of this
                            Privacy Policy, the Terms & Conditions, and the Copyright Disclaimer
                            herein.
                        </p>
                        <p>
                            FOX LAB is committed to maintaining the <b>privacy, security, and integrity</b> of your data and upholding the <b>laws of the Republic of India</b>, including the <b>Information Technology Act, 2000</b>, and the <b>Information Technology (Reasonable Security Practices and Procedures and Sensitive Personal Data or Information) Rules, 2011</b>, as well as the <b>Copyright Act, 1957</b>, and <b>Indian Penal Code (IPC)</b> provisions related to cybercrime.
                        </p>
                    </PolicyCard>

                    <PolicyCard $delay="0.2s">
                        <h2>2. Information We Collect</h2>
                        <p>When you visit or interact with our website, we may collect the following types of information:</p>

                        <p><b>A. Personal Information</b></p>
                        <ul>
                            <li>Name, email address, phone number, and other contact details when you register, subscribe, or contact us.</li>
                            <li>Employment details if you apply for an internship position or job opportunity with FOX LAB.</li>
                        </ul>

                        <p><b>B. Non-Personal / Technical Information</b></p>
                        <ul>
                            <li>IP address, browser type, operating system, device information.</li>
                            <li>Cookies, session data, and analytics information for website improvement.</li>
                        </ul>

                        <p><b>C. User-Generated Data</b></p>
                        <ul>
                            <li>Feedback, testimonials, and communication data shared through forms or chat.</li>
                            <li>Uploaded files, portfolios, or submissions made through our website.</li>
                        </ul>
                    </PolicyCard>

                    <PolicyCard $delay="0.3s">
                        <h2>3. Purpose of Data Collection</h2>
                        <p>Your data is collected and used for:</p>
                        <ul>
                            <li>Providing and improving our services.</li>
                            <li>Responding to inquiries or support requests.</li>
                            <li>Sending updates, offers, or newsletters (with your consent).</li>
                            <li>Verifying identity and maintaining website security.</li>
                            <li>Analyzing traffic, trends, and user engagement for better experience.</li>
                        </ul>
                        <p>We do not sell or share your data with unauthorized third parties.</p>
                    </PolicyCard>

                    <PolicyCard $delay="0.4s">
                        <h2>4. Data Protection and Security</h2>
                        <p>FOX LAB uses industry-standard encryption, firewalls, and secure access control mechanisms to protect your personal and technical information.</p>
                        <p>All data transmission is secured using SSL (Secure Socket Layer) technology.</p>
                        <p>Our systems comply with the Information Technology Act, 2000 and IT Rules, 2011, ensuring:</p>
                        <ul>
                            <li>Reasonable security practices and procedures.</li>
                            <li>Confidentiality and integrity of user data.</li>
                            <li>Protection against unauthorized access, alteration, disclosure, or destruction.</li>
                        </ul>
                        <p>If any data breach occurs, we will:</p>
                        <ol>
                            <li>Notify affected users within 72 hours.</li>
                            <li>Report the incident to the Indian Computer Emergency Response Team (CERT-In).</li>
                            <li>Take immediate legal and technical action against the perpetrators.</li>
                        </ol>
                    </PolicyCard>

                    <PolicyCard $delay="0.5s">
                        <h2>5. Copyright & Intellectual Property Rights</h2>
                        <p>All contents on the FOX LAB website, including but not limited to:</p>
                        <ul>
                            <li>Text, graphics, logos, videos, animations, icons, UI/UX designs, and images;</li>
                            <li>Code, layout, structure, and databases;</li>
                            <li>Brand name “FOX LAB” and logo</li>
                        </ul>
                        <p>are exclusive intellectual property of FOX LAB, protected under the Indian Copyright Act, 1957, Trade Marks Act, 1999, and relevant cyber and intellectual property laws.</p>
                        <p><b>Copyright Ownership:</b></p>
                        <ul>
                            <li>© 2025 FOX LAB. All rights reserved.</li>
                            <li>Unauthorized copying, modification, reproduction, or distribution of any content from this website is strictly prohibited.</li>
                            <li>Any violation will result in immediate legal action under Sections 63, 65, 66, and 72 of the Indian IT Act and Sections 51 to 63 of the Copyright Act, 1957.</li>
                        </ul>
                    </PolicyCard>

                    <PolicyCard $delay="0.6s">
                        <h2>6. Prohibited Acts</h2>
                        <p>The following activities are strictly prohibited:</p>
                        <ul>
                            <li>Attempting to hack, inject malicious code, or compromise FOX LAB systems.</li>
                            <li>Copying or duplicating website content, designs, or source code.</li>
                            <li>Republishing FOX LAB data or using it for commercial gain without permission.</li>
                            <li>Using bots, scrapers, or crawlers to extract data.</li>
                            <li>Impersonating FOX LAB representatives or misusing our name for fraudulent purposes.</li>
                        </ul>
                        <p>Any such attempt will be treated as a cybercrime under:</p>
                        <ul>
                            <li>Section 43 & 66 of the IT Act, 2000 (unauthorized access, data theft, and hacking).</li>
                            <li>Section 379, 420, and 468 of the Indian Penal Code (theft, cheating, and forgery).</li>
                            <li>Section 63 of the Copyright Act, 1957 (copyright infringement).</li>
                        </ul>
                    </PolicyCard>

                    <PolicyCard $delay="0.7s">
                        <h2>7. Legal Actions in Case of Website Attack or Copying</h2>
                        <p>If FOX LAB detects any attack, hacking, or unauthorized copying of its website or materials, the following <b>serious legal actions</b> will be initiated:</p>
                        <ol>
                            <li><b>Immediate Blocking and Tracing:</b> Our cyber team will trace the attacker’s IP, collect digital forensic evidence, and block all access.</li>
                            <li><b>Complaint Filing:</b> A formal complaint (FIR) will be filed with the Cyber Crime Cell under the IT Act, 2000 and IPC Sections 379, 420, 465, 468, and 471.</li>
                            <li><b>Copyright Infringement Lawsuit:</b> Civil and criminal proceedings will be initiated for damages under Section 55 and 63 of the Copyright Act, 1957.</li>
                            <li><b>Penalty and Compensation Claims:</b> FOX LAB will claim compensation for:
                                <ul>
                                    <li>Financial loss,</li>
                                    <li>Reputational damage, and</li>
                                    <li>Unauthorized commercial gain by the offender.</li>
                                </ul>
                            </li>
                            <li><b>Court Proceedings:</b> The offender may face imprisonment up to 3 years and/or a fine up to ₹2,00,000 or more, depending on the offense.</li>
                        </ol>
                        <p>FOX LAB will fully cooperate with <b>CERT-In, Cyber Police</b>, and <b>Judicial Authorities</b> to ensure strict legal punishment.</p>
                    </PolicyCard>

                    <PolicyCard $delay="0.8s">
                        <h2>8. Third-Party Links and Services</h2>
                        <p>Our website may include links to external websites. FOX LAB is <b>not responsible</b> for their content or privacy practices. Please review their respective privacy policies before sharing your information.</p>
                    </PolicyCard>

                    <PolicyCard $delay="0.9s">
                        <h2>9. Your Rights</h2>
                        <p>As per Indian data protection standards, you have the right to:</p>
                        <ul>
                            <li>Access your personal information.</li>
                            <li>Request correction or deletion of data.</li>
                            <li>Withdraw consent for processing.</li>
                            <li>Lodge a complaint if you believe your data is misused.</li>
                        </ul>
                        <p>You can exercise these rights by contacting us at:</p>
                        <ul>
                            <li><b>Email:</b> connectfoxlab@gmail.com</li>
                            <li><b>Phone:</b> +91-94820-25816, 88675-23779</li>
                        </ul>
                    </PolicyCard>

                    <PolicyCard $delay="1.0s">
                        <h2>10. Changes to This Policy</h2>
                        <p>FOX LAB reserves the right to modify or update this Privacy Policy at any time. Updated versions will be posted on this page with the revised date.</p>
                    </PolicyCard>

                    <PolicyCard $delay="1.1s">
                        <h2>11. Governing Law and Jurisdiction</h2>
                        <p>This Policy shall be governed by and construed in accordance with the <b>laws of India</b>. All disputes are subject to the <b>exclusive jurisdiction of the courts of Hubballi-Dharwad, Karnataka, India.</b></p>
                    </PolicyCard>
                    <PolicyCard $delay="1.1s">
                        <h2>12. Contact Information</h2>
                        <p>If you have any questions or concerns about this Privacy Policy, please contact us at:</p>


                    </PolicyCard>

                    <PolicyCard $delay="1.2s" className="copyright-card">
                        <h2>© 2026 FOX LAB. All Rights Reserved.</h2>
                        <p>Unauthorized use, copying, or reproduction of any material from this website will result in strict legal action under Indian Law.</p>
                    </PolicyCard>

                </VerticalCardLayout>
            </Container>
        </Section>
        <Footer />
        </>

    );
};

export default Privacy;