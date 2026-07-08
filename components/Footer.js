'use client';
import React from 'react';
import Link from 'next/link';
import styled, { keyframes } from 'styled-components';
import {
  FaMapMarkerAlt,
  FaEnvelopeOpen,
  FaPhoneAlt,
  FaFacebookF,
  FaLinkedinIn,
  FaInstagram
} from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';

// --- Animations ---
const floatShape = keyframes`
  0% { transform: translate(0px, 0px) rotate(0deg); }
  33% { transform: translate(30px, -30px) rotate(90deg); }
  66% { transform: translate(-20px, 20px) rotate(180deg); }
  100% { transform: translate(0px, 0px) rotate(360deg); }
`;

const pulseCircle = keyframes`
  0% { transform: scale(1); opacity: 0.5; }
  50% { transform: scale(1.05); opacity: 0.2; }
  100% { transform: scale(1); opacity: 0.5; }
`;

// --- Styled Components ---
const FooterWrapper = styled.footer`
  position: relative;
  z-index: 1;
  background-color: var(--light-color, #f9fafb);
  padding-top: 100px;
  overflow: hidden;
  border-top: 1px solid var(--border-color, #e5e7eb);
  
    /* Background Decorative Shapes */
    
  .bg-shape {
    position: absolute;
    z-index: -1;
    opacity: 0.6;
    animation: ${floatShape} 25s infinite linear;

    &.dots { left: 5%; top: 20%; width: 50px; }
    &.triangle { left: 8%; bottom: 25%; width: 20px; }
    &.close { right: 45%; top: 15%; width: 12px; }
    &.circle { right: 8%; bottom: 20%; width: 15px; }
  }

  /* Large Decorative Background Circles */
  .bg-circle {
    position: absolute;
    z-index: -2;
    border-radius: 50%;
    border: 1px solid var(--border-color, #e5e7eb);
    animation: ${pulseCircle} 8s infinite ease-in-out;

    &.left {
      width: 600px;
      height: 600px;
      left: -300px;
      top: -100px;
    }
    
    &.right {
      width: 500px;
      height: 500px;
      right: -200px;
      bottom: -150px;
    }
  }
`;

const Container = styled.div`
  max-width: 1140px;
  margin: 0 auto;
  padding: 0 20px;
`;

const FooterGrid = styled.div`
  display: grid;
  grid-template-columns: 3fr 2fr 4fr 3fr; /* Custom Proportions */
  gap: 50px;
  margin-bottom: 60px;

  @media (max-width: 1024px) {
    grid-template-columns: 1fr 1fr;
    gap: 40px;
  }

  @media (max-width: 640px) {
    grid-template-columns: 1fr;
  }
`;

const FooterWidget = styled.div`
  .footer-logo {
    margin-bottom: 25px;
   
    img {
      width: 150px;
      max-width: 220px;
    }
  }

  p {
    color: var(--base-color, #4b5563) !important;
    font-size: 14px !important;
    font-weight: 500 !important;
    line-height: 1.7;
    margin: 0;
  }

  .footer-title {
    font-size: 22px !important;
    font-weight: 700 !important;
    color: var(--heading-color, #111827) !important;
    margin: 0 0 25px;
    letter-spacing: -0.3px;

    @media (max-width: 768px) {
      text-align: center;
    }
  }

  @media (max-width: 768px) {
    text-align: center;

    .footer-logo {
      display: flex;
      justify-content: center;
    }
  }
`;

const LinkList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  
  &.two-column {
    display: grid;
    grid-template-columns: max-content max-content;
    gap: 10px 45px;
    
    li {
      margin-bottom: 0;
    }

    @media (max-width: 1024px) {
      gap: 8px 20px;
    }
  }

  li {
    margin-bottom: 5px;
  }

  a {
    color: var(--base-color, #4b5563) !important;
    font-size: 14px !important;
    font-weight: 500 !important;
    text-decoration: none;
    transition: all 0.2s ease;
    display: inline-block;

    &:hover {
      color: var(--primary-color, rgb(88, 53, 242)) !important;
      transform: translateX(4px); /* Clean slide effect on hover */
    }
  }

  @media (max-width: 768px) {
    text-align: center;

    &.two-column {
      grid-template-columns: 1fr;
      gap: 5px;
    }
  }
`;

const ContactList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;

  li {
    display: flex;
    align-items: flex-start;
    gap: 15px;
    margin-bottom: 20px;
    font-size: 14px !important;
    font-weight: 500 !important;
    line-height: 1.4;
    color: var(--base-color, #4b5563) !important;

    span, a {
      font-size: 14px !important;
      font-weight: 500 !important;
      color: var(--base-color, #4b5563) !important;
    }

    svg {
      color: var(--primary-color, rgb(88, 53, 242));
      font-size: 16px;
      margin-top: 3px;
      flex-shrink: 0;
    }

    a {
      text-decoration: none;
      transition: color 0.2s ease;

      &:hover {
        color: var(--primary-color, rgb(88, 53, 242)) !important;
      }
    }
  }

  @media (max-width: 768px) {
    li {
      justify-content: flex-start;
      text-align: left;
    }
  }
`;

const SocialLinks = styled.div`
  display: flex;
  gap: 12px;
  margin-top: 25px;

  a {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 40px;
    height: 40px;
    border: 1px #c0c0c0;
    border-radius: 8px;
    background: #ffffff;
    color: var(--heading-color, #111827);
    text-decoration: none;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.05);
    transition: all 0.3s ease;
    
    svg {
      font-size: 16px;
      color: inherit;
      transition: color 0.3s ease;
    }
    
    &:hover {
      background: #5835f2;
      color: #ffffff;
      transform: translateY(-3px);
      box-shadow: 0 8px 20px rgba(88, 53, 242, 0.25);
    }
  }

  @media (max-width: 768px) {
    justify-content: center;
  }
`;

const CopyrightArea = styled.div`
  border-top: 1px solid var(--border-color, #e5e7eb);
  padding: 25px 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 15px;

  p {
    margin: 0;
    color: var(--base-color, #4b5563) !important;
    font-size: 14px !important;
    font-weight: 500 !important;
  }

  .policy-links {
    display: flex;
    gap: 30px;
    
    a {
      color: var(--base-color, #4b5563) !important;
      font-size: 14px !important;
      text-decoration: none;
      font-weight: 500 !important;
      transition: color 0.2s ease;
      
      &:hover {
        color: var(--primary-color, rgb(88, 53, 242)) !important;
      }
    }
  }

  @media (max-width: 768px) {
    flex-direction: column;
    justify-content: center;
    text-align: center;
    
    .policy-links {
      gap: 20px;
    }
  }
`;

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <FooterWrapper>
      <Container>
        <FooterGrid>

          {/* Column 1: About */}
          <FooterWidget>
            <div className="footer-logo">
              <Link href="/home">
                <img src="/assets/images/logos/logo.svg" alt="Fox Lab Logo" className="foxlogo" />
              </Link>
            </div>
            <p>
              At Fox Lab, we blend creativity and technology to build impactful digital
              experiences that inspire, connect, design, code, and turn ideas into lasting stories.
            </p>
          </FooterWidget>

          {/* Column 2: About Links */}
          <FooterWidget>
            <h4 className="footer-title">About</h4>
            <LinkList>
              <li><Link href="/about">Success History</Link></li>
              <li><Link href="/about">Meet The Team</Link></li>
              <li><Link href="/blog">Latest News</Link></li>
              <li><Link href="/contact">Need a Career?</Link></li>
              <li><Link href="/services">Popular Service</Link></li>
            </LinkList>
          </FooterWidget>

          {/* Column 3: Quick Links */}
          <FooterWidget>
            <h4 className="footer-title">Quick Links</h4>
            <LinkList className="two-column">
              <li><Link href="/services">Market Analysis</Link></li>
              <li><Link href="/services">Web Development</Link></li>
              <li><Link href="/services">Digital Marketing</Link></li>
              <li><Link href="/services">Graphics Design</Link></li>
              <li><Link href="/services">Consultations</Link></li>
              <li><Link href="/services">Application Design</Link></li>
              <li><Link href="/services">Success Rate</Link></li>
              <li><Link href="/services">SEO Optimization</Link></li>
              <li><Link href="/services">User Research</Link></li>
            </LinkList>
          </FooterWidget>

          {/* Column 4: Contact & Social */}
          <FooterWidget>
            <h4 className="footer-title">Get in Touch</h4>
            <ContactList>
              <li>
                <FaMapMarkerAlt />
                <span>#CTS.No 3450/3A Banashankari Layout Vidyanagar, Hubballi 580030</span>
              </li>
              <li>
                <FaEnvelopeOpen />
                <a href="mailto:connect@foxlab.in">connect@foxlab.in</a>
              </li>
              <li>
                <FaPhoneAlt />
                <span>Call : <a href="tel:+916362051567">+91-636 205 1567</a></span>
              </li>
            </ContactList>

            <SocialLinks>
              <a href="https://www.facebook.com/people/FOX-LAB/61584138284251/#" target="_blank" rel="noreferrer" aria-label="Facebook"><FaFacebookF /></a>
              <a href="https://x.com/fox_lab_" target="_blank" rel="noreferrer" aria-label="Twitter"><FaXTwitter /></a>
              <a href="https://www.linkedin.com/in/fox-lab-web-application-mobile-app-development-49a830406" target="_blank" rel="noreferrer" aria-label="LinkedIn"><FaLinkedinIn /></a>
              <a href="https://www.instagram.com/foxlab_hubli/" target="_blank" rel="noreferrer" aria-label="Instagram"><FaInstagram /></a>
            </SocialLinks>
          </FooterWidget>

        </FooterGrid>

        {/* Bottom Bar: Copyright & Policies */}
        <CopyrightArea>
          <p>© copyright 2025 FOXLAB</p>

          <div className="policy-links">
            <Link href="/privacy">Privacy Policy</Link>
            <Link href="/terms">Terms and Conditions</Link>
          </div>
        </CopyrightArea>

      </Container>

      {/* Floating Background Shapes */}
      <img className="bg-shape dots" src="/assets/images/shapes/dots.png" alt="" aria-hidden="true" />
      <img className="bg-shape triangle" src="/assets/images/shapes/tringle-two.png" alt="" aria-hidden="true" />
      <img className="bg-shape close" src="/assets/images/shapes/close.png" alt="" aria-hidden="true" />
      <img className="bg-shape circle" src="/assets/images/shapes/circle-two.png" alt="" aria-hidden="true" />
      <div className="bg-circle left"></div>
      <div className="bg-circle right"></div>
    </FooterWrapper>
  );
};

export default Footer;