"use client";

import React, { useState, useEffect, useRef } from "react";
import styled, { keyframes, css } from "styled-components";
import Footer from "../../components/Footer";
import {
  FiPhone,
  FiMail,
  FiMapPin,
  FiFacebook,
  FiInstagram,
  FiLinkedin,
} from "react-icons/fi";
import { FaXTwitter } from "react-icons/fa6";
import { BsFillSendFill, BsCheckCircleFill } from "react-icons/bs";
import ThemeButton from "@/components/ThemeButton";

// ==========================================
// ANIMATIONS
// ==========================================
const fadeInUp = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
`;

const scaleIn = keyframes`
  from { opacity: 0; transform: scale(0.8) translateY(20px); }
  to { opacity: 1; transform: scale(1) translateY(0); }
`;

const slideInLeft = keyframes`
  from { opacity: 0; transform: translateX(-40px); }
  to { opacity: 1; transform: translateX(0); }
`;

const slideInRight = keyframes`
  from { opacity: 0; transform: translateX(40px); }
  to { opacity: 1; transform: translateX(0); }
`;

const AnimatedLeft = styled.div`
  opacity: 0;
  transform: translateX(-40px);
  animation: ${(props) =>
    props.$visible
      ? css`${slideInLeft} 0.8s ease-out forwards`
      : "none"};
`;

const AnimatedRight = styled.div`
  opacity: 0;
  transform: translateX(40px);
  animation: ${(props) =>
    props.$visible
      ? css`${slideInRight} 0.8s ease-out forwards`
      : "none"};
`;

// ==========================================
// STYLED COMPONENTS
// ==========================================
const Wrapper = styled.section`
  min-height: 100vh;
  font-family: "Poppins", sans-serif;
  overflow: hidden;

  /* --- Image Banner --- */
  .image-banner {
    width: 100%;
    margin-top: 30px;
    padding: 0 20px;
    animation: ${fadeInUp} 0.6s ease-out forwards;

    img {
      display: block;
      width: 100%;
      max-width: 600px;
      height: auto;
      margin: 0 auto;
    }

    @media (max-width: 768px) {
      margin-top: 80px;
      img {
        max-width: 280px;
      }
    }
  }

  /* --- Main Content Container --- */
  .content {
    max-width: 1150px;
    margin: 0 auto;
    padding: 60px 20px 120px;
    animation: ${fadeInUp} 0.6s ease-out forwards;
    animation-delay: 0.1s;
  }

  /* --- Header --- */
  .contact-header {
    text-align: center;
    max-width: 600px;
    margin: 0 auto 60px;

    .sub-title {
      font-size: 13px !important;
      font-weight: 600 !important;
      padding: 6px 14px;
      border-radius: 4px;
      margin-bottom: 20px;
      background: #f3f1fe;
      color: rgb(88, 53, 242) !important;
      display: inline-flex;
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }

    h1 {
      font-size: 42px;
      font-weight: 800;
      color: #111827;
      margin-bottom: 16px;
      letter-spacing: -0.5px;
      line-height: 1.2;

      @media (max-width: 768px) {
        font-size: 32px;
      }
    }

    p {
      font-size: 17px;
      line-height: 1.6;
      color: #6b7280;
    }
  }

  /* --- Grid Layout --- */
  .contact-container {
    display: grid;
    grid-template-columns: 1.5fr 1fr;
    gap: 80px;
    align-items: flex-start;

    @media (max-width: 992px) {
      grid-template-columns: 1fr;
      gap: 60px;
    }
  }

  /* --- Form --- */
  .contact-form {
    border-radius: 16px;
    padding: 48px;

    @media (max-width: 768px) {
      padding: 32px 24px;
    }

    .form-row {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 24px;
      margin-bottom: 24px;

      @media (max-width: 600px) {
        grid-template-columns: 1fr;
      }
    }

    .form-group {
      margin-bottom: 24px;

      label {
        display: block;
        font-size: 14px !important;
        font-weight: 500 !important;
        color: #374151 !important;
        margin-bottom: 8px;
        text-align: left;
      }

      input,
      textarea {
        width: 100%;
        padding: 12px 16px;
        background: #ffffff;
        border: 1px solid #d1d5db;
        border-radius: 8px;
        font-size: 15px !important;
        color: #111827 !important;
        font-family: inherit;
        transition: all 0.2s ease;
        box-sizing: border-box;

        &:focus {
          outline: none;
          border-color: rgb(88, 53, 242);
          box-shadow: 0 0 0 3px rgba(88, 53, 242, 0.1);
        }
      }

      textarea {
        min-height: 120px;
        resize: vertical;
      }
    }


  }

  .success-message {
    text-align: center;
    padding: 60px 20px;
    animation: ${scaleIn} 0.5s ease forwards;

    svg {
      font-size: 50px;
      color: #10b981;
      margin-bottom: 20px;
    }

    h3 {
      font-size: 26px;
      font-weight: 700;
      color: #111827;
      margin-bottom: 10px;
    }

    p {
      color: #6b7280;
      font-size: 16px;
      margin-bottom: 20px;
    }
  }

  /* --- Contact Info --- */
  .contact-info {
    display: flex;
    flex-direction: column;
    gap: 40px;
    padding-top: 10px;

    .info-section {
      text-align: left;
      h3 {
        font-family: var(--base-font) !important;
        font-size: 18px !important;
        font-weight: 600 !important;
        color: #111827 !important;
        margin-bottom: 8px;
      }

      p {
        color: #0f172a !important;
        font-size: 15px !important;
        line-height: 1.6 !important;
        margin-bottom: 16px;
      }
    }

    .contact-detail {
      display: flex;
      align-items: flex-start;
      gap: 12px;
      color: #111827 !important;
      font-weight: 500 !important;
      font-size: 15px !important;

      svg {
        font-size: 20px !important;
        color: rgb(88, 53, 242) !important;
        flex-shrink: 0;
        margin-top: 2px;
      }

      a,
      address,
      span {
        font-size: 15px !important;
        font-weight: 500 !important;
        color: #111827 !important;
        text-decoration: none;
        font-style: normal;
        line-height: 1.5;
        transition: color 0.2s ease;

        &:hover {
          color: rgb(88, 53, 242) !important;
        }
      }
    }

    .social-links {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 12px;

      .social-link {
        display: flex;
        align-items: center;
        gap: 10px;
        padding: 12px 16px;
        border-radius: 8px;
        border: 1px solid #e5e7eb;
        background: #ffffff;
        font-size: 14px !important;
        font-weight: 500 !important;
        color: #4b5563 !important;
        text-decoration: none;
        transition: all 0.2s ease;

        svg {
          font-size: 16px !important;
          color: #6b7280 !important;
          transition: all 0.2s ease;
        }

        &:hover {
          border-color: rgb(88, 53, 242) !important;
          color: rgb(88, 53, 242) !important;
          background: #f5f3ff !important;

          svg {
            color: rgb(88, 53, 242) !important;
          }
        }
      }

      @media (max-width: 400px) {
        grid-template-columns: 1fr;
      }
    }
  }
`;

export default function ContactClient() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    message: "",
  });
  const [leftVisible, setLeftVisible] = useState(false);
  const [rightVisible, setRightVisible] = useState(false);
  const leftRef = useRef(null);
  const rightRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.target === leftRef.current && entry.isIntersecting) {
            setLeftVisible(true);
          }
          if (entry.target === rightRef.current && entry.isIntersecting) {
            setRightVisible(true);
          }
        });
      },
      { threshold: 0.2 }
    );

    if (leftRef.current) observer.observe(leftRef.current);
    if (rightRef.current) observer.observe(rightRef.current);

    return () => observer.disconnect();
  }, []);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setIsSubmitted(true);
        setFormData({
          firstName: "",
          lastName: "",
          email: "",
          phone: "",
          message: "",
        });
        setTimeout(() => setIsSubmitted(false), 5000);
      } else {
        alert("Something went wrong. Please try again.");
      }
    } catch (err) {
      console.error(err);
      alert("Error sending message.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Wrapper>
        <div className="image-banner">
          <img src="/assets/images/contact.svg" alt="Contact FOX LAB" />
        </div>

        <div className="content">
          <div className="contact-header">
            <span className="sub-title">Get in Touch</span>
            <h1>Contact our team</h1>
            <p className="custom-lead-text">
              Have a project in mind or need help scaling your business? Our team is always ready to talk.
            </p>
          </div>

          <div className="contact-container">
            <AnimatedLeft ref={leftRef} $visible={leftVisible}>
              <div className="contact-form">
                {isSubmitted ? (
                <div className="success-message">
                  <BsCheckCircleFill />
                  <h3>Message Sent!</h3>
                  <p>Our team will get back to you shortly.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit}>
                  <div className="form-row">
                    <div className="form-group">
                      <label>First name</label>
                      <input
                        type="text"
                        name="firstName"
                        required
                        value={formData.firstName}
                        onChange={handleChange}
                        placeholder="John"
                      />
                    </div>
                    <div className="form-group">
                      <label>Last name</label>
                      <input
                        type="text"
                        name="lastName"
                        required
                        value={formData.lastName}
                        onChange={handleChange}
                        placeholder="Doe"
                      />
                    </div>
                  </div>
                  <div className="form-group">
                    <label>Email Address</label>
                    <input
                      type="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="john@example.com"
                    />
                  </div>
                  <div className="form-group">
                    <label>Phone number</label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="+91 00000 00000"
                    />
                  </div>
                  <div className="form-group">
                    <label>Message</label>
                    <textarea
                      name="message"
                      required
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="How can we help?"
                    />
                  </div>
                  <ThemeButton type="submit" className="get-started" disabled={isSubmitting}>
                    {isSubmitting ? "Sending..." : "Send Message"} <BsFillSendFill />
                  </ThemeButton>
                </form>
              )}
            </div>
            </AnimatedLeft>

            <AnimatedRight ref={rightRef} $visible={rightVisible}>
              <div className="contact-info">
                <div className="info-section">
                <h3>Call us</h3>
                <p>Call our team Mon-Sat 9:00AM to 6:00PM.</p>
                <div className="contact-detail">
                  <FiPhone />
                  <a href="tel:+916362051567">+91-636 205 1567</a>
                </div>
              </div>

              <div className="info-section">
                <h3>Email</h3>
                <p>Email us and get a response within hours.</p>
                <div className="contact-detail">
                  <FiMail />
                  <a href="mailto:connect@foxlab.in">connect@foxlab.in</a>
                </div>
              </div>

              <div className="info-section">
                <h3>Visit us</h3>
                <p>Chat with us in person at our Hubballi HQ.</p>
                <div className="contact-detail">
                  <FiMapPin />
                  <address>
                    #CTS No 3450, Banashankari Layout,<br />
                    Vidyanagar, Hubballi, Karnataka 580031
                  </address>
                </div>
              </div>

              <div className="info-section">
                <h3>Social Media</h3>
                <div className="social-links">
                  <a href="https://www.facebook.com/people/FOX-LAB/61584138284251/#" target="_blank" rel="noreferrer" className="social-link"><FiFacebook /> Facebook</a>
                  <a href="https://www.instagram.com/foxlab_hubli/" target="_blank" rel="noreferrer" className="social-link"><FiInstagram /> Instagram</a>
                  <a href="https://www.linkedin.com/in/fox-lab-web-application-mobile-app-development-49a830406" target="_blank" rel="noreferrer" className="social-link"><FiLinkedin /> LinkedIn</a>
                  <a href="https://x.com/fox_lab_" target="_blank" rel="noreferrer" className="social-link"><FaXTwitter /> X.com</a>
                </div>
              </div>
            </div>
            </AnimatedRight>
          </div>
        </div>
      </Wrapper>
      <Footer />
    </>
  );
}
