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
  background-color: #f8fafc; /* Soft cool gray background for readability */
  min-height: 100vh;
`;

const Container = styled.div`
  max-width: 900px; /* Optimal reading width */
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
    font-size: 42px;
    font-weight: 800;
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

  opacity: 0;
  animation: ${fadeInUp} 0.6s ease-out forwards;
  animation-delay: ${(props) => props.$delay || '0s'};

  /* Subtle accent line on the left */
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
      opacity: 1; 
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
      margin-bottom: 12px;
      padding-left: 8px;
    }
  }

  &.copyright-card {
    background: #fbfbfb;
   
    
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
const Terms = () => {
    return (
        <>
            <Section>
                <Container>
                    <HeaderWrap>
                        <div className="pill">Legal & Compliance</div>
                        <h1>Terms and Conditions</h1>

                    </HeaderWrap>

                    <VerticalCardLayout>

                        <PolicyCard $delay="0.1s">
                            <h2>1. Introduction</h2>
                            <p>Welcome to <b>FOX LAB.</b></p>
                            <p>
                                These Terms and Conditions ("Terms", "Agreement") govern your
                                access to and use of our website, services, and all related
                                digital content provided by FOX LAB.
                            </p>
                            <p>
                                By using our website or availing any service, you agree to
                                comply with these Terms. If you do not agree, please refrain
                                from using our services.
                            </p>
                        </PolicyCard>

                        <PolicyCard $delay="0.2s">
                            <h2>2. Scope of Services</h2>
                            <p>FOX LAB offers a wide range of creative, technical, and digital services, including but not limited to the following:</p>
                            <p><b>Our Services Include:</b></p>
                            <ol>
                                <li>
                                    <b>Video Editing</b><br />
                                    Professional editing for films, ads, reels, YouTube videos, and corporate projects with cinematic quality, VFX, sound design, and storytelling precision.
                                </li>
                                <li>
                                    <b>App Development</b><br />
                                    Custom Android and iOS app development with sleek UI, powerful functionality, and seamless user experience for businesses and individuals.
                                </li>
                                <li>
                                    <b>Elevation & Walkthrough</b><br />
                                    High-quality 3D architectural renderings and walkthroughs with realistic textures and lighting to visualize projects before construction.
                                </li>
                                <li>
                                    <b>2D | 3D Animation</b><br />
                                    Character animation, product visuals, and explainer videos that engage audiences and convey complex ideas creatively.
                                </li>
                                <li>
                                    <b>Digital Marketing</b><br />
                                    Comprehensive online marketing solutions including SEO, SEM, paid ads, social media campaigns, and content strategy to grow brand presence.
                                </li>
                                <li>
                                    <b>Brand Building & Strategy</b><br />
                                    Complete brand identity creation, logo design, storytelling, and strategic campaigns for emotional and market connection.
                                </li>
                                <li>
                                    <b>Motion Graphics</b><br />
                                    Dynamic motion visuals, kinetic typography, and animated infographics for advertisements, presentations, and social media.
                                </li>
                                <li>
                                    <b>YouTube Services</b><br />
                                    Channel setup, video optimization, branding, and growth strategies for creators and businesses aiming for digital reach.
                                </li>
                                <li>
                                    <b>VFX (Visual Effects)</b><br />
                                    Advanced visual effects, compositing, CGI, and cinematic enhancements for professional media productions.
                                </li>
                                <li>
                                    <b>Cyber Security</b><br />
                                    Security audits, vulnerability testing, and real-time monitoring to protect digital assets from cyber threats.
                                </li>
                                <li>
                                    <b>Web Development</b><br />
                                    Responsive websites, e-commerce solutions, and business platforms with robust backends and creative frontends.
                                </li>
                            </ol>
                        </PolicyCard>

                        <PolicyCard $delay="0.3s">
                            <h2>3. Ownership of Content</h2>
                            <p>
                                All content, designs, code, graphics, animations, and intellectual property created by FOX LAB remain the exclusive property of FOX LAB unless otherwise agreed in writing.
                            </p>
                            <p>
                                Unauthorized copying, redistribution, or resale of our materials is strictly prohibited under the Indian Copyright Act, 1957 and the Information Technology Act, 2000.
                            </p>
                        </PolicyCard>

                        <PolicyCard $delay="0.4s">
                            <h2>4. Client Responsibilities</h2>
                            <p>Clients agree to:</p>
                            <ul>
                                <li>Provide accurate project details, materials, and feedback.</li>
                                <li>Make payments on agreed timelines.</li>
                                <li>Not request illegal or unethical content or actions.</li>
                                <li>Obtain any required licenses or third-party permissions for submitted content (music, footage, logos, etc.).</li>
                            </ul>
                            <p>
                                FOX LAB is not responsible for legal issues arising from unauthorized client-provided materials.
                            </p>
                        </PolicyCard>

                        <PolicyCard $delay="0.5s">
                            <h2>5. Payment Terms</h2>
                            <ul>
                                <li>50% advance payment is required before project initiation.</li>
                                <li>Remaining balance must be cleared before final delivery.</li>
                                <li>Delay in payments may suspend project progress or final handover.</li>
                                <li>Payments are non-refundable under any circumstance once work has commenced.</li>
                            </ul>
                        </PolicyCard>

                        <PolicyCard $delay="0.6s">
                            <h2>6. No Refund / No Money-Back Policy</h2>
                            <p>FOX LAB maintains a strict <b>"No Money-Back"</b> policy.</p>
                            <p>
                                All payments made are final and non-refundable due to the nature of digital and creative services. This policy applies to:
                            </p>
                            <ul>
                                <li>Completed or ongoing projects.</li>
                                <li>Change of mind after project initiation.</li>
                                <li>Client delays, communication gaps, or project cancellations from the client's side.</li>
                            </ul>
                            <p>
                                Refunds will only be considered if FOX LAB fails to deliver work beyond reasonable time without communication for over 45 working days and no deliverable has been produced.
                            </p>
                        </PolicyCard>

                        <PolicyCard $delay="0.7s">
                            <h2>7. Project Delivery and Revisions</h2>
                            <ul>
                                <li>Delivery timelines depend on the project scope, requirements, and client feedback.</li>
                                <li>Revisions are limited to the number agreed in the proposal or quotation.</li>
                                <li>Additional revisions beyond the limit will incur extra charges.</li>
                                <li>FOX LAB reserves the right to charge additional fees for major project changes after approval.</li>
                            </ul>
                        </PolicyCard>

                        <PolicyCard $delay="0.8s">
                            <h2>8. Confidentiality and Data Protection</h2>
                            <p>
                                FOX LAB ensures that all client data, materials, and project information are kept confidential and secure in accordance with the <b>Information Technology (Reasonable Security Practices and Procedures and Sensitive Personal Data or Information) Rules, 2011</b>.
                            </p>
                            <p>
                                We do not share client data with third parties unless required by law.
                            </p>
                        </PolicyCard>

                        <PolicyCard $delay="0.9s">
                            <h2>9. Copyright and Intellectual Property Rights</h2>
                            <p>All creative outputs (designs, code, video edits, animation files, or digital assets) produced by FOX LAB are protected under:</p>
                            <ul>
                                <li>The Indian Copyright Act, 1957</li>
                                <li>The Trade Marks Act, 1999</li>
                                <li>The Information Technology Act, 2000</li>
                            </ul>
                            <p>
                                Clients may use the final delivered product only for agreed purposes. Reselling, redistributing, or modifying FOX LAB content without written consent is a violation and will result in legal action under the Copyright Act, 1957.
                            </p>
                        </PolicyCard>

                        <PolicyCard $delay="1.0s">
                            <h2>10. Limitation of Liability</h2>
                            <p>FOX LAB shall not be liable for:</p>
                            <ul>
                                <li>Loss of data, profits, or revenue.</li>
                                <li>Damages caused by third-party hosting, cyberattacks, or unforeseen technical issues.</li>
                                <li>Delays caused by client feedback or external dependencies.</li>
                            </ul>
                            <p>
                                Our total liability shall not exceed the total amount paid by the client for the specific service.
                            </p>
                        </PolicyCard>

                        <PolicyCard $delay="1.1s">
                            <h2>11. Website Attacks, Misuse, and Copying</h2>
                            <p>Any attempt to:</p>
                            <ul>
                                <li>Hack or attack the FOX LAB website,</li>
                                <li>Copy or duplicate our content, or</li>
                                <li>Use our designs or code without permission</li>
                            </ul>
                            <p>will lead to immediate legal proceedings under:</p>
                            <ul>
                                <li>Section 43 & 66 of the IT Act, 2000 (Hacking & Data Theft)</li>
                                <li>Section 63 of the Copyright Act, 1957 (Infringement)</li>
                                <li>Section 420, 468, and 471 of the Indian Penal Code (Fraud & Forgery)</li>
                            </ul>
                            <p>
                                FOX LAB will file complaints with the <b>Cyber Crime Cell, CERT-In</b>, and pursue civil and criminal remedies including fines and imprisonment as per Indian law.
                            </p>
                        </PolicyCard>

                        <PolicyCard $delay="1.2s">
                            <h2>12. Termination of Services</h2>
                            <p>FOX LAB reserves the right to terminate services if:</p>
                            <ul>
                                <li>The client breaches these Terms.</li>
                                <li>The project involves unethical, illegal, or harmful content.</li>
                                <li>Payments are delayed or withheld without cause.</li>
                            </ul>
                            <p>
                                Termination does not exempt the client from pending payments or liabilities.
                            </p>
                        </PolicyCard>

                        <PolicyCard $delay="1.3s">
                            <h2>13. Disclaimer of Warranties</h2>
                            <p>All services are provided on an "as-is" basis. FOX LAB makes no guarantees regarding:</p>
                            <ul>
                                <li>Uninterrupted availability of services.</li>
                                <li>Future compatibility with third-party platforms.</li>
                                <li>Specific business outcomes or sales results from digital campaigns.</li>
                            </ul>
                        </PolicyCard>

                        <PolicyCard $delay="1.4s">
                            <h2>14. Governing Law and Jurisdiction</h2>
                            <p>
                                These Terms shall be governed by and construed in accordance with the <b>laws of India</b>. Any dispute shall be subject to the <b>exclusive jurisdiction of the courts at Hubballi-Dharwad, Karnataka</b>.
                            </p>
                        </PolicyCard>

                        <PolicyCard $delay="1.5s" className="copyright-card">
                            <h2>© 2026 FOX LAB. All Rights Reserved.</h2>
                            <p>
                                By using our services, you acknowledge that you have read, understood, and agree to be bound by these Terms and Conditions.
                            </p>
                        </PolicyCard>

                    </VerticalCardLayout>
                </Container>

            </Section>
            <Footer />
        </>
    );
};

export default Terms;