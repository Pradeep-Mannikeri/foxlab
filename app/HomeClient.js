"use client";
import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import styled, { keyframes, createGlobalStyle, css } from "styled-components";
import Footer from "../components/Footer";
import FeatureSection from "@/components/FeatureSection";
import ServicesSection from "@/components/ServicesSection";
import Testimonials from "@/components/Testimonals";
import { FaDownload, FaArrowRight, FaTimes } from "react-icons/fa";

// --- Global Styles & Variables ---
const GlobalStyle = createGlobalStyle`
  :root {
    --base-color: #4b5563; 
    --heading-color: #111827; 
    --primary-color: #5138ee;
    --light-color: #f9fafb; 
    --border-color: #e5e7eb;
    --base-font: 'Inter', sans-serif;
    --heading-font: 'Playfair Display', Georgia, serif; 
  }
  
  body {
    color: var(--base-color);
    font-size: 19px; 
    font-family: var(--base-font);
    line-height: 1.6;
    margin: 0;
    padding: 0;
    -webkit-font-smoothing: antialiased; 
  }

  h1, h2, h3, h4, h5, h6 {
    font-family: var(--heading-font);
  }
`;

// --- Animations ---
const scrollLeft = keyframes`
  0% { transform: translate3d(0, 0, 0); }
  100% { transform: translate3d(-50%, 0, 0); }
`;

const scrollRight = keyframes`
  0% { transform: translate3d(-50%, 0, 0); }
  100% { transform: translate3d(0, 0, 0); }
`;

const fadeInRight = keyframes`
  from { opacity: 0; transform: translateX(-15px); }
  to { opacity: 1; transform: translateX(0); }
`;

const fadeInLeft = keyframes`
  from { opacity: 0; transform: translateX(15px); }
  to { opacity: 1; transform: translateX(0); }
`;

const fadeInUp = keyframes`
  from { opacity: 0; transform: translateY(15px); }
  to { opacity: 1; transform: translateY(0); }
`;

const floatShape = keyframes`
  0% { transform: translate(0px, 0px) rotate(0deg); }
  33% { transform: translate(30px, -50px) rotate(90deg); }
  66% { transform: translate(-20px, 20px) rotate(180deg); }
  100% { transform: translate(0px, 0px) rotate(360deg); }
`;

const floatIllustration = keyframes`
  0%, 100% { transform: translateY(0) rotate(0deg); }
  50% { transform: translateY(-15px) rotate(1deg); }
`;

// --- Reusable Styled Components ---
const Container = styled.div`
  max-width: 1140px;
  margin: 0 auto;
  padding: 0 20px;
  position: relative;
  z-index: 2;
  font-family: var(--base-font);
`;

const SectionTitle = styled.div`
  margin-bottom: ${(props) => props.$mb || "40px"};
  text-align: ${(props) => (props.$center ? "center" : "left")};

  .sub-title {
    line-height: 1;
    font-size: 13px;
    font-weight: 600;
    padding: 6px 14px;
    border-radius: 4px;
    margin-bottom: 15px;
    background: #f3f1fe;
    display: inline-block;
    text-transform: uppercase;
    letter-spacing: 0.5px;
    color: var(--primary-color);
  }

  h1 {
    font-size: 40px;
    line-height: 1.3;
    font-weight: 700;
    color: var(--heading-color);
    font-family: var(--heading-font);
    margin: 0;
    letter-spacing: -0.5px;
  }

  @media (max-width: 991px) {
    text-align: ${(props) =>
      props.$centerMobile || props.$center ? "center" : "left"};
  }

  @media (max-width: 768px) {
    h2 {
      font-size: 26px;
    }
  }
`;

const ButtonWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;

  @media (max-width: 991px) {
    justify-content: center;
  }

  @media (max-width: 480px) {
    flex-direction: column;
    gap: 12px;
    width: 100%;
  }
`;

import ThemeButton from "@/components/ThemeButton";

// --- Specific Section Layouts ---
const HeroSection = styled.section`
  position: relative;
  padding: 50px 0 60px;
  z-index: 2;
  overflow: hidden;

  .grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 50px;
    align-items: center;

    @media (max-width: 991px) {
      grid-template-columns: 1fr;
      text-align: center;
    }
  }

  h1 {
    font-size: 44px;
    font-weight: 800;
    letter-spacing: -1px;
    line-height: 1.15;
    color: var(--heading-color);
    font-family: var(--heading-font);
    margin-bottom: 20px;
    animation: ${fadeInUp} 0.6s ease-out;
    @media (max-width: 768px) {
      font-size: 36px;
    }
  }

  p {
    font-size: 19px;
    line-height: 1.7;
    color: var(--base-color);
    max-width: 500px;
    margin-bottom: 35px;
    animation: ${fadeInUp} 0.8s ease-out;
    @media (max-width: 991px) {
      margin: 0 auto 35px;
    }
  }

  .hero-image {
    animation: ${fadeInRight} 0.8s ease-out forwards;
  }

  .hero-image img {
    max-width: 100%;
    animation: ${floatIllustration} 8s ease-in-out infinite;
    filter: drop-shadow(0 20px 40px rgba(88, 53, 242, 0.08));
  }

  .bg-shape {
    position: absolute;
    z-index: -1;
    opacity: 0.6;
    animation: ${floatShape} 20s infinite linear;
    &.dots {
      left: 5%;
      top: 20%;
      width: 52px;
    }
    &.triangle {
      left: 10%;
      bottom: 15%;
      width: 20px;
    }
    &.close {
      right: 10%;
      top: 15%;
      width: 12px;
    }
    &.circle {
      right: 5%;
      bottom: 20%;
      width: 18px;
    }
  }
`;

const ModalDialog = styled.dialog`
  border: none;
  border-radius: 20px;
  padding: 40px;
  width: 90%;
  max-width: 500px;
  text-align: center;
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
  background: white;
  overflow: hidden;

  &::backdrop {
    background: rgba(15, 23, 42, 0.8);
    backdrop-filter: blur(8px);
  }

  .working-img {
    width: 100%;
    max-width: 350px;
    height: auto;
    margin: 0 auto 25px;
    display: block;
  }

  .close-icon {
    position: absolute;
    top: 20px;
    right: 20px;
    cursor: pointer;
    font-size: 24px;
    color: #94a3b8;
    transition: all 0.3s ease;
    padding: 5px;

    &:hover {
      color: var(--primary-color);
      transform: rotate(90deg);
    }
  }

  h1 {
    color: var(--heading-color);
    font-size: 28px;
    font-weight: 700;
    margin-bottom: 12px;
    line-height: 1.2;
    font-family: var(--heading-font);
  }

  p {
    color: var(--base-color);
    font-size: 17px;
    margin-bottom: 30px;
    line-height: 1.6;
  }

  /* Tablets */
  @media (max-width: 768px) {
    padding: 35px 30px;
    max-width: 450px;

    h1 {
      font-size: 24px;
    }
    p {
      font-size: 16px;
    }
    .working-img {
      max-width: 300px;
    }
  }

  /* Mobile Large & Medium */
  @media (max-width: 480px) {
    padding: 30px 20px;
    width: 92%;

    h1 {
      font-size: 22px;
    }
    p {
      font-size: 15px;
      margin-bottom: 25px;
    }
    .working-img {
      max-width: 260px;
    }
    .close-icon {
      top: 15px;
      right: 15px;
      font-size: 20px;
    }
  }

  /* Mobile Small */
  @media (max-width: 360px) {
    padding: 25px 15px;

    h1 {
      font-size: 20px;
    }
    p {
      font-size: 14px;
    }
    .working-img {
      max-width: 220px;
    }
  }
`;

const PartnersSection = styled.section`
  padding: 180px 0 80px;
  background-color: transparent;
  border-bottom: 1px solid var(--border-color);
  position: relative;
  z-index: 1;
  text-align: left;

  .partner-marquee-wrapper {
    display: flex;
    flex-direction: column;
    gap: 30px;
    overflow: hidden;
    width: 60%;
    margin-top: 30px;

    @media (max-width: 768px) {
      width: 100%;
    }
  }

  .partner-marquee-row {
    display: flex;
    padding: 10px;
    width: 100%;
    overflow: hidden;
    justify-content: flex-start;
  }

  .partner-marquee-track {
    display: flex;
    width: max-content;
    align-items: center;

    &:hover {
      animation-play-state: paused;
    }

    &.left {
      animation: ${scrollLeft} 25s linear infinite;
    }

    &.right {
      animation: ${scrollRight} 25s linear infinite;
    }
  }

  .partner-item {
    transition: all 0.1s ease;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: 80px;
    flex-shrink: 0;

    &:hover {
      filter: grayscale(0) opacity(1);
      transform: translateY(-3px);
    }

    img {
      max-height: 100%;
      max-width: 100%;
      object-fit: contain;
      width: 140px;
      height: 50px;
    }
  }

  .hero-about-bg {
    position: absolute;
    z-index: -1;
    left: 0;
    top: -650px;
    width: 100%;
    pointer-events: none;

    @media (max-width: 1400px) {
      top: -450px;
    }
    @media (max-width: 991px) {
      top: -300px;
    }
    @media (max-width: 768px) {
      top: -150px;
    }

    img {
      width: 100%;
      height: auto;
      object-fit: cover;
    }
  }
`;

const SolutionsSection = styled.section`
  padding: 100px 0;
  background: var(--light-color);

  .solutions-grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 25px;

    @media (max-width: 1024px) {
      grid-template-columns: repeat(2, 1fr);
    }
    @media (max-width: 768px) {
      grid-template-columns: 1fr;
    }
  }

  .solution-card {
    padding: 30px 25px;
    border-radius: 8px;
    border: 1px solid var(--border-color);
    transition: all 0.2s ease;
    background: white;

    .featureIcon {
      height: 55px;
      width: 55px;
    }

    &:hover {
      border-color: var(--primary-color);
      box-shadow: 0 10px 30px rgba(81, 56, 238, 0.08);
      transform: translateY(-5px) !important;
    }

    h3 {
      font-size: 20px;
      font-weight: 600;
      color: var(--heading-color);
      margin-bottom: 10px;
    }

    p {
      color: var(--base-color);
      font-size: 18px !important;
      line-height: 1.6 !important;
      margin: 0;
    }
  }

  .solutions-grid.in-view .solution-card {
    animation: ${fadeInUp} 0.6s ease-out both;
  }
  .solutions-grid.in-view .solution-card:nth-child(1) {
    animation-delay: 0.3s;
  }
  .solutions-grid.in-view .solution-card:nth-child(2) {
    animation-delay: 0.6s;
  }
  .solutions-grid.in-view .solution-card:nth-child(3) {
    animation-delay: 0.9s;
  }
  .solutions-grid.in-view .solution-card:nth-child(4) {
    animation-delay: 01.12s;
  }
`;

const AboutSectionWrapper = styled.section`
  padding: 100px 0 45px;
  position: relative;
  z-index: 1;

  @media (max-width: 768px) {
    padding-bottom: 15px;
  }

  .about-grid {
    display: grid;
    grid-template-columns: 1.2fr 1fr;
    gap: 60px;
    align-items: center;

    @media (max-width: 991px) {
      grid-template-columns: 1fr;
    }
  }
  p {
    font-size: 19px;
    line-height: 1.7;
    color: var(--base-color);
    max-width: 500px;
    margin-bottom: 35px;
    animation: ${fadeInUp} 0.8s ease-out;
    @media (max-width: 991px) {
      margin: 0 auto 35px;
    }
  }
  .about-image {
    img {
      max-width: 100%;
      height: auto;
      animation: ${floatIllustration} 8s ease-in-out infinite;
    }
  }

  .about-content {
    p {
      margin-bottom: 30px;
    }
  }

  &.in-view .about-image {
    animation: ${fadeInRight} 0.8s ease-out forwards;
  }

  &.in-view .about-content {
    animation: ${fadeInLeft} 0.8s ease-out forwards;
  }
`;

const ListStyleOne = styled.ul`
  display: flex;
  flex-wrap: wrap;
  padding: 0;
  margin: 30px 0 45px;
  list-style: none;

  li {
    font-family: var(--heading-font);
    color: var(--heading-color);
    font-size: 18px;
    font-weight: 600;
    width: 100%;
    display: flex;
    align-items: center;
    margin-bottom: 15px;

    &::before {
      content: "✓";
      height: 24px;
      width: 24px;
      background: var(--primary-color);
      color: white;
      border-radius: 50%;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      margin-right: 15px;
      font-size: 12px;
      flex-shrink: 0;
    }

    &:nth-child(1) {
      @media (max-width: 768px) {
        width: 100%;
      }
    }
  }
`;

// --- Main Home Component ---

const HomeClient = () => {
  const solutionsRef = useRef(null);
  const [solutionsInView, setSolutionsInView] = useState(false);
  const aboutRef = useRef(null);
  const [aboutInView, setAboutInView] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setAboutInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.05, rootMargin: "0px" },
    );

    if (aboutRef.current) {
      observer.observe(aboutRef.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setSolutionsInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.05, rootMargin: "0px" },
    );

    if (solutionsRef.current) {
      observer.observe(solutionsRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const openModal = () => {
    const modal = document.getElementById("workingModal");
    if (modal) modal.showModal();
  };

  const closeModal = () => {
    const modal = document.getElementById("workingModal");
    if (modal) modal.close();
  };

  return (
    <>
      <GlobalStyle />
      {/* Hero Section */}
      <HeroSection>
        <Container>
          <div className="grid">
            <div>
              <SectionTitle $mb="0" $centerMobile>
                <span className="sub-title">Software Company</span>
                <h1>Advanced analytics software solutions</h1>
              </SectionTitle>
              <p>
                We bring technology and creativity together to build powerful
                digital experiences. From cutting-edge IT solutions to creative
                productions, we deliver everything under one roof.
              </p>
              <ButtonWrapper>
                <ThemeButton onClick={openModal}>
                  Download <FaDownload />
                </ThemeButton>
                <ThemeButton href="/services" className="get-started">
                  Get Started <FaArrowRight />
                </ThemeButton>
              </ButtonWrapper>
            </div>
            <div className="hero-image">
              <img src="/assets/images/hero/hero.png" alt="Hero Illustration" />
            </div>
          </div>
        </Container>

        <img
          className="bg-shape dots"
          src="/assets/images/shapes/dots.png"
          alt=""
        />
        <img
          className="bg-shape triangle"
          src="/assets/images/shapes/tringle-two.png"
          alt=""
        />
        <img
          className="bg-shape close"
          src="/assets/images/shapes/close.png"
          alt=""
        />
        <img
          className="bg-shape circle"
          src="/assets/images/shapes/circle-two.png"
          alt=""
        />
      </HeroSection>

      <ModalDialog id="workingModal">
        <FaTimes className="close-icon" onClick={closeModal} />
        <img
          src="/assets/images/working.svg"
          alt="Working"
          className="working-img"
        />
        <h1>Oops! We are still working on it</h1>
        <p>We will get back to you on this.</p>
        <ThemeButton onClick={closeModal}>Let's Go Back</ThemeButton>
      </ModalDialog>

      {/* Partners Section - Adjusted to Left Alignment */}
      <PartnersSection>
        <div className="hero-about-bg">
          <img src="/assets/images/shapes/hero-about-bg.png" alt="Background" />
        </div>

        <Container>
          <SectionTitle $mb="60px" $centerMobile>
            <h1>Trusted by Amazing Brands</h1>
          </SectionTitle>
          <div className="partner-marquee-wrapper">
            {/* Upper row */}
            <div className="partner-marquee-row">
              <div className="partner-marquee-track left">
                {[
                  ...[1, 2, 3, 4, '14'],
                  ...[1, 2, 3, 4, '14'],
                  ...[1, 2, 3, 4, '14'],
                  ...[1, 2, 3, 4, '14'],
                ].map((item, idx) => {
                  const isClient = item === '14';
                  const src = isClient 
                    ? `/assets/images/clients/14.png` 
                    : `/assets/images/partners/partner${item}.png`;
                  const alt = isClient ? "AI Solutions" : `Partner ${item}`;
                  return (
                    <Link href="" className="partner-item" key={`upper-${idx}`}>
                      <img src={src} alt={alt} />
                    </Link>
                  );
                })}
              </div>
            </div>
            {/* Down row */}
            <div className="partner-marquee-row">
              <div className="partner-marquee-track right">
                {[
                  ...[8, 7, 6, 5, '14'],
                  ...[8, 7, 6, 5, '14'],
                  ...[8, 7, 6, 5, '14'],
                  ...[8, 7, 6, 5, '14'],
                ].map((item, idx) => {
                  const isClient = item === '14';
                  const src = isClient 
                    ? `/assets/images/clients/14.png` 
                    : `/assets/images/partners/partner${item}.png`;
                  const alt = isClient ? "AI Solutions" : `Partner ${item}`;
                  return (
                    <Link href="" className="partner-item" key={`lower-${idx}`}>
                      <img src={src} alt={alt} />
                    </Link>
                  );
                })}
              </div>
            </div>
          </div>
        </Container>
      </PartnersSection>

      {/* Solutions Section */}
      <SolutionsSection>
        <Container>
          <SectionTitle $center>
            <span className="sub-title">Our Special Solutions</span>
            <h1>We Customize Your Software in Smart Ways</h1>
            <p className="custom-lead-text" style={{ color: "#4b5563", marginTop: "15px", maxWidth: "750px", margin: "15px auto 0" }}>
              Explore our wide range of premium digital services designed to scale your business,<br />elevate your brand, and craft extraordinary experiences.
            </p>
          </SectionTitle>
          <div
            className={`solutions-grid ${solutionsInView ? "in-view" : ""}`}
            ref={solutionsRef}
          >
            <div className="solution-card">
              <img
                src="/assets/icons/brandBuiling.svg"
                className="featureIcon"
                alt="Brand"
              />
              <h3>Brand Building & Strategy</h3>
              <p>
                We craft strong brand identities with effective strategy and
                creative design.
              </p>
            </div>
            <div className="solution-card">
              <img
                src="/assets/icons/mobileApp.svg"
                className="featureIcon"
                alt="App"
              />
              <h3>App Development</h3>
              <p>
                We build modern mobile applications with sleek design and smooth
                performance.
              </p>
            </div>
            <div className="solution-card">
              <img
                src="/assets/icons/digital.svg"
                className="featureIcon"
                alt="Digital"
              />
              <h3>Digital Marketing</h3>
              <p>
                We offer result-driven Digital Marketing services including SEO
                and social media.
              </p>
            </div>
            <div className="solution-card">
              <img
                src="/assets/icons/web_dev3.svg"
                className="featureIcon"
                alt="Web"
              />
              <h3>Web Development</h3>
              <p>
                We create responsive, modern websites with clean design and
                robust functionality.
              </p>
            </div>
          </div>
        </Container>
      </SolutionsSection>

      {/* About Section (User Friendly Experience) */}
      <AboutSectionWrapper
        className={aboutInView ? "in-view" : ""}
        ref={aboutRef}
      >
        <Container>
          <div className="about-grid">
            <div className="about-image">
              <img
                src="/assets/images/about/what-we-provide.png"
                alt="What We Provide"
              />
            </div>
            <div className="about-content">
              <SectionTitle $mb="25px" $centerMobile>
                <span className="sub-title">What We Provides</span>
                <h1>We are the Creative Digital Team</h1>
              </SectionTitle>
              <p>
                We are the Creative Digital Team – a passionate blend of
                innovators, designers, and developers shaping the future of
                technology and creativity. For the past 15 years, our company
                has been dedicated to building impactful digital experiences and
                delivering cutting-edge creative solutions.
              </p>
              <ListStyleOne>
                <li>Try our premium product & services</li>
                <li>100% Satisfaction - Upto clients needs</li>
                <li>Lifetime IT support & Maintainance</li>
              </ListStyleOne>
              <ThemeButton as={Link} href="/about">
                Know us <FaArrowRight />
              </ThemeButton>
            </div>
          </div>
        </Container>
      </AboutSectionWrapper>

      <FeatureSection />
      <ServicesSection />
      <Testimonials />
      <Footer />
    </>
  );
};

export default HomeClient;
