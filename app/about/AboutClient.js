"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import styled, { keyframes } from "styled-components";
import Footer from "../../components/Footer";
import { FiLayers, FiGlobe, FiTarget } from "react-icons/fi";

const slideInFromLeft = keyframes`
  from { opacity: 0; transform: translateX(-50px); }
  to { opacity: 1; transform: translateX(0); }
`;

const slideInFromRight = keyframes`
  from { opacity: 0; transform: translateX(50px); }
  to { opacity: 1; transform: translateX(0); }
`;

// --- New Animation for Background Shapes ---
const floatShape = keyframes`
  0% { transform: translate(0px, 0px) rotate(0deg); }
  33% { transform: translate(30px, -50px) rotate(90deg); }
  66% { transform: translate(-20px, 20px) rotate(180deg); }
  100% { transform: translate(0px, 0px) rotate(360deg); }
`;

const fadeInUp = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
`;

const float = keyframes`
  0% { transform: translateY(0px); }
  50% { transform: translateY(-15px); }
  100% { transform: translateY(0px); }
`;

const scrollMarquee = keyframes`
  from { transform: translateX(0); }
  to { transform: translateX(-50%); }
`;

const gentleFloat = keyframes`
  0% { transform: translateY(0px); }
  50% { transform: translateY(-8px); } 
  100% { transform: translateY(0px); }
`;

// --- New Styled Component for Shapes ---
const BackgroundShape = styled.img`
  position: absolute;
  z-index: -1;
  opacity: 0.6;
  animation: ${floatShape} 20s infinite linear;
  pointer-events: none;

  &.dots {
    left: 5%;
    top: 10%;
    width: 50px;
  }
  &.triangle {
    left: 8%;
    bottom: 15%;
    width: 15px;
  }
  &.close {
    right: 10%;
    top: 15%;
    width: 10px;
  }
  &.circle {
    right: 5%;
    bottom: 20%;
    width: 12px;
  }
`;

// --- Shared Components ---
const Section = styled.section`
  padding-bottom: 100px;
  background-color: ${(props) => props.$bg || "#ffffff"};
  position: relative;
  z-index: 1;
  overflow: hidden;
  padding: 100px 20px;
  @media (max-width: 991px) {
    padding: 80px 20px;
  }

  @media (max-width: 600px) {
    padding: 60px 15px;
  }
`;

const Container = styled.div`
  max-width: 1140px;
  margin: 0 auto;
  padding: 0 20px;
  position: relative; /* Ensure content stays above absolute shapes */
  z-index: 2;
`;

const SectionTitle = styled.div`
  text-align: ${(props) => (props.$center ? "center" : "left")};
  margin-bottom: ${(props) => props.$mb || "50px"};
  animation: ${fadeInUp} 0.6s ease-out forwards;

  .sub-title {
    font-size: 13px;
    font-weight: 600;
    padding: 6px 14px;
    border-radius: 4px;
    margin-bottom: 15px;
    background: #f3f1fe;
    color: rgb(88, 53, 242);
    display: inline-block;
    text-transform: uppercase;
    letter-spacing: 0.5px;
  }

  h2 {
    font-size: 40px;
    font-weight: 800;
    line-height: 1.25;
    color: #111827;
    margin: 0;
    letter-spacing: -0.5px;

    @media (max-width: 768px) {
      font-size: 32px;
    }

    @media (max-width: 480px) {
      font-size: 28px;
      line-height: 1.3;
    }

    @media (max-width: 320px) {
      font-size: 26px;
    }
  }

  @media (max-width: 991px) {
    text-align: ${(props) =>
      props.$centerMobile || props.$center ? "center" : "left"};
  }
`;

const AboutGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 60px;
  align-items: center;

  @media (max-width: 991px) {
    grid-template-columns: 1fr;
    text-align: center;
  }
`;

const AboutContent = styled.div`
  p {
    font-size: 16px;
    line-height: 1.7;
    color: #4b5563;
    margin-top: 20px;
    margin-bottom: 30px;
    animation: ${fadeInUp} 0.7s ease-out forwards;
  }

  ul {
    list-style: none;
    padding: 0;
    margin: 0 0 30px;
    text-align: left;
    animation: ${fadeInUp} 0.8s ease-out forwards;

    li {
      font-family: "Playfair Display", Georgia, serif !important;
      font-size: 18px;
      font-weight: 400 !important;
      font-style: italic !important;
      color: #111827;
      margin-bottom: 12px;
      position: relative;
      padding-left: 28px;

      &::before {
        content: "✔";
        position: absolute;
        left: 0;
        top: -1px;
        color: rgb(88, 53, 242);
        font-size: 15px;
        font-style: normal !important;
      }
    }
  }

  @media (max-width: 991px) {
    ul {
      display: inline-block;
      margin: 0 auto 30px;
      text-align: left;
    }
  }
`;

const AboutImage = styled.div`
  img {
    width: 100%;
    height: auto;
    object-fit: contain;
  }
`;

const SolutionsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 30px;
  padding-top: 30px;
  padding-bottom: 30px;

  &.in-view > div:nth-child(1),
  &.in-view > div:nth-child(2) {
    animation: ${slideInFromLeft} 0.8s ease-out forwards;
  }

  &.in-view > div:nth-child(3),
  &.in-view > div:nth-child(4) {
    animation: ${slideInFromRight} 0.8s ease-out forwards;
  }

  &.in-view > div:nth-child(1) {
    animation-delay: 0.1s;
  }
  &.in-view > div:nth-child(2) {
    animation-delay: 0.3s;
  }
  &.in-view > div:nth-child(3) {
    animation-delay: 0.3s;
  }
  &.in-view > div:nth-child(4) {
    animation-delay: 0.1s;
  }

  @media (max-width: 1024px) {
    grid-template-columns: repeat(2, 1fr);
  }
  @media (max-width: 600px) {
    grid-template-columns: 1fr;
  }
`;

const SolutionCard = styled.div`
  opacity: 0;
  background: #ffffff;
  padding: 40px 30px;
  border-radius: 12px;
  text-align: center;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.04);
  border: 1px solid #f3f4f6;

  .number {
    font-size: 32px;
    font-weight: 700;
    color: rgb(88, 53, 242);
    display: block;
    margin-bottom: 15px;
  }

  h4 {
    font-size: 20px;
    font-weight: 700;
    color: #111827;
    margin-bottom: 12px;
  }
  p {
    font-size: 16px;
    line-height: 1.6;
    color: #4b5563;
    margin: 0;
  }
`;

const VMGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 30px;
  padding: 20px 0;

  &.in-view > div {
    animation: ${fadeInUp} 0.6s ease-out forwards;
  }
  &.in-view > div:nth-child(1) {
    animation-delay: 0.2s;
  }
  &.in-view > div:nth-child(2) {
    animation-delay: 0.5s;
  }
  &.in-view > div:nth-child(3) {
    animation-delay: 0.8s;
  }

  @media (max-width: 991px) {
    grid-template-columns: repeat(2, 1fr);
  }
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const VMCard = styled.div`
  opacity: 0;
  background: #ffffff;
  padding: 40px 35px;
  border-radius: 16px;
  text-align: center;
  position: relative;
  border: 1px solid #f3f4f6;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.03);
  transition: all 0.4s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 15px 40px rgba(88, 53, 242, 0.08);
    border-color: rgba(88, 53, 242, 0.2);
  }

  .icon-wrapper {
    width: 50px;
    height: 50px;
    margin: 0 auto 25px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 38px;
    border-radius: 50%;
    background: rgba(88, 53, 242, 0.08);
    color: rgb(88, 53, 242);
    transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);

    svg {
      color: inherit !important;
      width: 40% !important;
      height: 40% !important;
    }
  }

  &:hover .icon-wrapper {
    background: rgb(88, 53, 242);
    color: #ffffff;
    transform: scale(1.15) rotate(10deg);
  }
  h4 {
    font-size: 22px;
    font-weight: 700;
    color: #111827;
    margin: 0 0 15px;
  }
  p {
    font-size: 14px !important;
    line-height: 1.5 !important;
    color: #4b5563;
    margin: 0 auto 12px;
    max-width: 95%;
  }
`;

const LogoSliderContainer = styled.div`
  overflow: hidden;
  white-space: nowrap;
  position: relative;
  width: 100%;
  &::before,
  &::after {
    content: "";
    position: absolute;
    top: 0;
    width: 100px;
    height: 100%;
    z-index: 2;
  }
  &::before {
    left: 0;
    background: linear-gradient(
      to right,
      #f9fafb 0%,
      rgba(249, 250, 251, 0) 100%
    );
  }
  &::after {
    right: 0;
    background: linear-gradient(
      to left,
      #f9fafb 0%,
      rgba(249, 250, 251, 0) 100%
    );
  }
`;

const MarqueeTrack = styled.div`
  display: inline-flex;
  width: max-content;
  animation: ${scrollMarquee} 45s linear infinite;
  &:hover {
    animation-play-state: paused;
  }
`;

const LogoBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
  cursor: pointer;
  width: 170px;
  height: 70px;
  margin-right: 90px;
  flex-shrink: 0;

  img {
    width: 170px;
    height: 70px;
    max-height: 100%;
    max-width: 100%;
    object-fit: contain;
  }

  &:hover {
    filter: grayscale(0) opacity(1);
    transform: scale(1.05);
  }
`;

export default function AboutClient() {
  const logos = [
    "1.png",
    "2.png",
    "3.png",
    "4.png",
    "5.png",
    "6.png",
    "7.png",
    "8.png",
    "9.png",
    "10.png",
    "12.png",
    "13.png",
    "14.png",
  ];

  const solutionsRef = useRef(null);
  const [solutionsInView, setSolutionsInView] = useState(false);
  const vmRef = useRef(null);
  const [vmInView, setVmInView] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setSolutionsInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3, rootMargin: "0px 0px -150px 0px" },
    );
    if (solutionsRef.current) observer.observe(solutionsRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVmInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3, rootMargin: "0px 0px -150px 0px" },
    );
    if (vmRef.current) observer.observe(vmRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <>
      {/* ===== ABOUT SECTION WITH FLOATING SHAPES ===== */}
      <Section $bg="#ffffff">
        {/* Floating Shapes Added Here */}
        <BackgroundShape
          className="dots"
          src="/assets/images/shapes/dots.png"
          alt=""
          aria-hidden="true"
        />
        <BackgroundShape
          className="triangle"
          src="/assets/images/shapes/tringle-two.png"
          alt=""
          aria-hidden="true"
        />
        <BackgroundShape
          className="close"
          src="/assets/images/shapes/close.png"
          alt=""
          aria-hidden="true"
        />
        <BackgroundShape
          className="circle"
          src="/assets/images/shapes/circle-two.png"
          alt=""
          aria-hidden="true"
        />

        <Container>
          <AboutGrid>
            <AboutContent>
              <SectionTitle $mb="0" $centerMobile>
                <span className="sub-title">About Company</span>
                <h2>Transforming Ideas into Digital Excellence</h2>
              </SectionTitle>
              <p>
                Founded on innovation and guided by creativity, FOX LAB delivers
                design and IT solutions that redefine digital presence. From web
                and app development to branding, animation, and marketing, we
                bring your vision to life with dedication and expertise.
              </p>
              <ul>
                <li>Technical & Creative Expertise</li>
                <li>End-to-End Digital Solutions</li>
                <li>Scalable & Growth-Focused Approach</li>
              </ul>
            </AboutContent>

            <AboutImage>
              <Image
                src="/assets/images/about/about-1.svg"
                alt="About FOX LAB"
                width={500}
                height={400}
                priority
              />
            </AboutImage>
          </AboutGrid>
        </Container>
      </Section>

      <Section
        $bg="rgb(88, 53, 242)"
        style={{
          backgroundImage: "url('/assets/images/feedbacks/feedback-bg.png')",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
          backgroundSize: "cover",
        }}
      >
        <Container>
          <SectionTitle $center style={{ marginBottom: "50px" }}>
            <span
              className="sub-title"
              style={{ background: "rgba(255,255,255,0.15)", color: "#ffffff" }}
            >
              Why Choose Us
            </span>
            <h2 style={{ color: "#ffffff" }}>What Sets FOX LAB Apart</h2>
            <p className="core-text" style={{ color: "#ffffff" }}>
              Core principles that drive every project we deliver.
            </p>
          </SectionTitle>
          <SolutionsGrid
            className={solutionsInView ? "in-view" : ""}
            ref={solutionsRef}
          >
            <SolutionCard>
              <span className="number">01</span>
              <h4>Innovation Driven</h4>
              <p>
                We combine creativity with technology to deliver impactful
                solutions.
              </p>
            </SolutionCard>
            <SolutionCard>
              <span className="number">02</span>
              <h4>Scalable Solutions</h4>
              <p>
                Our systems grow with your business and future needs, ensuring
                seamless evolution.
              </p>
            </SolutionCard>
            <SolutionCard>
              <span className="number">03</span>
              <h4>Creative Excellence</h4>
              <p>Design, animation, and branding that stand out globally.</p>
            </SolutionCard>
            <SolutionCard>
              <span className="number">04</span>
              <h4>Client Focused</h4>
              <p>
                We build strong partnerships and deliver measurable results.
              </p>
            </SolutionCard>
          </SolutionsGrid>
        </Container>
      </Section>

      <Section $bg="#ffffff">
        <Container>
          <SectionTitle $center>
            <span className="sub-title">Our Core</span>
            <h2>About FOX LAB</h2>
            <p className="custom-lead-text" style={{ lineHeight: "33px" }}>
              FOX LAB is an integrated IT and Creative Tech Studio that delivers
              comprehensive digital solutions under one roof. We seamlessly
              blend technical expertise with creative innovation to transform
              ideas into impactful digital experiences.{" "}
            </p>
          </SectionTitle>

          <VMGrid className={vmInView ? "in-view" : ""} ref={vmRef}>
            <VMCard>
              <div className="icon-wrapper">
                <FiLayers />
              </div>
              <h4>Our Aim</h4>
              <p>
                From enterprise software and web/app development to animation,
                VFX, gaming, and marketing campaigns, we provide end-to-end
                solutions that drive business growth. Our philosophy centers on
                innovation, efficiency, and client success
              </p>
            </VMCard>
            <VMCard>
              <div className="icon-wrapper">
                <FiGlobe />
              </div>
              <h4>Our Vision</h4>
              <p>
                To build FOX LAB into a global hub where technology meets
                creativity, delivering cutting-edge IT solutions and
                world-class creative production that empower businesses,
                creators, and communities to thrive in the digital-first world.
              </p>
            </VMCard>
            <VMCard>
              <div className="icon-wrapper">
                <FiTarget />
              </div>
              <h4>Our Mission</h4>
              <p>
                Our mission is to merge technology and creativity, providing
                integrated services in IT, design, VFX, gaming, and digital
                media. We support corporates, startups, and creators with
                scalable, innovative solutions while fostering collaboration,
                talent development, and continuous innovation.
              </p>
            </VMCard>
          </VMGrid>
        </Container>
      </Section>

      {/* ===== CLIENTS SECTION ===== */}
      <Section $bg="#f9fafb" style={{ padding: "80px" }}>
        <Container>
          <SectionTitle $center $mb="100px">
            <h2>Trusted by Amazing Brands</h2>
          </SectionTitle>
          <div style={{ overflow: "hidden" }}>
            <MarqueeTrack>
              {[...logos, ...logos].map((logo, index) => (
                <LogoBox key={index}>
                  <img src={`/assets/images/clients/${logo}`} alt="Client" />
                </LogoBox>
              ))}
            </MarqueeTrack>
          </div>
        </Container>
      </Section>

      <Footer />
    </>
  );
}
