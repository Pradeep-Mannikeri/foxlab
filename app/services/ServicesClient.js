"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import styled, { keyframes } from "styled-components";
import Footer from "../../components/Footer";

import { MdOutlineWbIncandescent } from "react-icons/md";

/* ================= DATA ================= */
const serviceList = [
  {
    icon: "/assets/icons/web_dev3.svg",
    title: "Web Development",
    description:
      "We develop responsive, secure, and SEO-optimized business websites utilizing modern web frameworks. Our custom web development solutions guarantee high-performance, fast page speeds, and flawless user experiences that elevate your brand and drive conversions online daily.",
  },
  {
    icon: "/assets/icons/mobileApp.svg",
    title: "App Development",
    description:
      "We design and develop custom iOS and Android mobile applications with sleek user interfaces. Our mobile app development solutions provide robust security, high performance, and seamless user experiences that engage customers and accelerate business growth worldwide.",
  },
  {
    icon: "/assets/icons/youtube.svg",
    title: "YouTube Solutions",
    description:
      "We deliver complete YouTube growth services including video production, high-conversion thumbnail designs, and channels SEO optimization. Our video marketing strategies help creators rank higher, gain active subscribers, and scale their audience visibility effectively every day.",
  },
  {
    icon: "/assets/icons/digital.svg",
    title: "Digital Marketing",
    description:
      "We provide ROI-driven digital marketing agency solutions, including Google SEO, social media management, and pay-per-click advertising. Our data-led online marketing campaigns help businesses rank on search engines, attract organic traffic, and maximize revenues globally.",
  },
  {
    icon: "/assets/icons/whatapp.svg",
    title: "Bulk Whatsapp",
    description:
      "We offer advanced WhatsApp marketing automation platforms to connect with customers instantly. Our bulk message dispatch services ensure high delivery rates, immediate engagement, and automated chat workflows that boost leads and improve customer retention rates.",
  },
  {
    icon: "/assets/icons/editing.svg",
    title: "Video Editing",
    description:
      "We offer cinematic video editing and post-production services for corporate campaigns, social media reels, and YouTube. Our visual editing solutions integrate custom sound design, motion graphics, and color grading to captivate target audiences and viewers.",
  },
  {
    icon: "/assets/icons/brandBuiling.svg",
    title: "Brand Building & Strategy",
    description:
      "We build premium corporate brand identities using strategic storytelling, custom logo designs, and cohesive color palettes. Our brand consulting services establish authority, build customer trust, and maintain a consistent digital presence across all marketing channels.",
  },
  // {
  //   icon: "/assets/icons/cyber.svg",
  //   title: "Cyber Security",
  //   description:
  //     "We provide advanced Cyber Security services to protect businesses from threats, data breaches, and cyberattacks. With audits, monitoring, and strong defenses, we ensure safety, trust, and compliance, giving organizations the confidence to operate securely in the digital era.",
  // },
  {
    icon: <MdOutlineWbIncandescent />,
    title: "More Innovations",
    description:
      "Our creative technology lab continuously researches next-generation software designs, artificial intelligence integration, and advanced digital frameworks. We develop upcoming custom tech services to solve emerging business challenges and shape the future of modern technology.",
  },
];

// ==========================================
// ANIMATIONS
// ==========================================
const fadeInUp = keyframes`
  from { opacity: 0; transform: translateY(30px); }
  to { opacity: 1; transform: translateY(0); }
`;
const floatIllustration = keyframes`
  0%, 100% { transform: translateY(0) rotate(0deg); }
  50% { transform: translateY(-15px) rotate(1deg); }
`;
const floatShape = keyframes`
  0% { transform: translate(0px, 0px) rotate(0deg); }
  33% { transform: translate(30px, -50px) rotate(90deg); }
  66% { transform: translate(-20px, 20px) rotate(180deg); }
  100% { transform: translate(0px, 0px) rotate(360deg); }
`;

// ==========================================
// STYLED COMPONENTS
// ==========================================
const Section = styled.section`
  padding: 50px 0 100px;
  background-color: #fdfeff;
  min-height: 100vh;
  font-family: "poppins", sans-serif;

  /* Background Decorative Shapes */
  .bg-shape {
    position: absolute;
    z-index: -1;
    opacity: 0.6;
    animation: ${floatShape} 20s infinite linear;

    &.dots {
      left: 5%;
      top: 20%;
      width: 35px;
    }
    &.triangle {
      left: 10%;
      bottom: 15%;
      width: 20px;
    }
    &.close {
      right: 10%;
      top: 15%;
      width: 15px;
    }
    &.circle {
      right: 5%;
      bottom: 20%;
      width: 15px;
    }
  }
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;

  .illustration {
    width: 420px;
    height: auto;
    margin: 0 auto 40px;
    display: block;
    @media (max-width: 1024px) {
      width: 350px;
    }

    @media (max-width: 768px) {
      width: 240px;
    }
  }
`;

const HeaderWrap = styled.div`
  text-align: center;
  max-width: 650px;
  margin: 0 auto 70px;
  animation: ${fadeInUp} 0.6s ease-out forwards;

  .sub-title {
    font-size: 13px !important;
    font-weight: 600 !important;
    padding: 6px 14px;
    border-radius: 4px;
    margin-bottom: 20px;
    background: #f3f1fe;
    color: rgb(88, 53, 242) !important;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    text-transform: uppercase;
    letter-spacing: 0.5px;
  }

  h2 {
    font-size: 40px;
    font-weight: 800;
    color: #0f172a;
    margin: 0 0 20px;
    letter-spacing: -1.5px;
    line-height: 1.15;

    @media (max-width: 768px) {
      font-size: 34px;
    }
  }

  p {
    font-size: 17px;
    line-height: 1.7;
    color: #9399a0ff;
    margin: 0;

    @media (max-width: 768px) {
      font-size: 16px;
    }
  }
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 32px;

  @media (max-width: 1024px) {
    grid-template-columns: repeat(2, 1fr);
    gap: 24px;
  }

  @media (max-width: 650px) {
    grid-template-columns: 1fr;
  }
`;

const Card = styled.div`
  background: #ffffff;
  border-radius: 24px; 
  padding: 50px 35px;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  position: relative;
  z-index: 1;
  transition: all 0.5s cubic-bezier(0.23, 1, 0.32, 1);
  box-shadow: rgba(17, 17, 26, 0.03) 0px 1px 0px, rgba(17, 17, 26, 0.05) 0px 0px 12px;
  border: 1px solid rgba(88, 53, 242, 0.06);
  opacity: 0;

  &.in-view {
    animation-name: ${fadeInUp};
    animation-duration: 1.2s;
    animation-timing-function: ease-out;
    animation-fill-mode: forwards;
  }
  overflow: hidden;

  /* Top Border Gradient Accent */
  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 4px;
    background: linear-gradient(90deg, #5835f2, #8b5cf6);
    transform: scaleX(0);
    transform-origin: left;
    transition: transform 0.5s cubic-bezier(0.23, 1, 0.32, 1);
    z-index: 2;
  }

  /* Hover gradient background */
  &::after {
    content: "";
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 0%;
    background: linear-gradient(to top, rgba(88, 53, 242, 0.02), transparent);
    transition: all 0.5s ease;
    z-index: -1;
  }

  &:hover {
    transform: translateY(-10px);
    border-color: rgba(88, 53, 242, 0.15);
    box-shadow: 0 30px 60px -15px rgba(88, 53, 242, 0.12);

    &::before {
      transform: scaleX(1);
    }
    
    &::after {
      height: 100%;
    }
  }

  h4 {
    font-size: 26px !important; 
    font-weight: 700;
    color: #0f172a;
    margin: 0 0 16px;
    letter-spacing: -0.5px;
    transition: color 0.3s ease;
  }

  &:hover h4 {
    color: #5835f2;
  }

  p {
    color: #64748b !important;
    font-size: 15px !important; 
    line-height: 1.75 !important;
    margin: 0;
  }
`;

const IconBox = styled.div`
  width: 90px;
  height: 90px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 30px;
  background: rgba(88, 53, 242, 0.04);
  border: 1px solid rgba(88, 53, 242, 0.08);
  border-radius: 24px;
  transition: all 0.5s cubic-bezier(0.34, 1.56, 0.64, 1);
  flex-shrink: 0;

  img {
    width: 50px;
    height: 50px;
    object-fit: contain;
    transition: all 0.5s ease;
    filter: grayscale(100%) opacity(0.85);
  }

  svg {
    color: #5835f2;
    width: 50px !important;
    height: 50px !important;
    transition: all 0.5s ease;
    filter: grayscale(100%) opacity(0.85);
  }

  ${Card}:hover & {
    transform: scale(1.1) translateY(-5px) rotate(5deg);
    background: rgba(88, 53, 242, 0.08);
    border-color: rgba(88, 53, 242, 0.2);
    box-shadow: 0 10px 25px rgba(88, 53, 242, 0.1);

    img, svg {
      filter: grayscale(0%) opacity(1);
    }
  }
`;

const ScrollCard = ({ service }) => {
  const cardRef = useRef(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1, rootMargin: "0px 0px -50px 0px" }
    );
    if (cardRef.current) observer.observe(cardRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <Card className={inView ? "in-view" : ""} ref={cardRef}>
      <IconBox>
        {typeof service.icon === "string" ? (
          <Image src={service.icon} alt={service.title} width={70} height={70} />
        ) : (
          service.icon
        )}
      </IconBox>
      <h4>{service.title}</h4>
      <p>{service.description}</p>
    </Card>
  );
};

export default function ServicesClient() {
  return (
    <>
      <Section>
        <Container>
          <img
            src="/assets/images/services/service.svg"
            alt="SERVICE FOX LAB"
            className="illustration"
          />
          <HeaderWrap>
            <span className="sub-title">Our Capabilities</span>
            <h2>What We Offer at FOX LAB</h2>
            <p className="custom-lead-text">
              Explore our wide range of premium digital services designed to
              scale your business, elevate your brand, and craft extraordinary
              experiences.
            </p>
          </HeaderWrap>

          <Grid>
            {serviceList.map((service, index) => (
              <ScrollCard key={index} service={service} />
            ))}
          </Grid>
        </Container>

        {/* Floating Background Shapes */}
        <img
          className="bg-shape dots"
          src="/assets/images/shapes/dots.png"
          alt=""
          aria-hidden="true"
        />
        <img
          className="bg-shape triangle"
          src="/assets/images/shapes/tringle.png"
          alt=""
          aria-hidden="true"
        />
        <img
          className="bg-shape close"
          src="/assets/images/shapes/close.png"
          alt=""
          aria-hidden="true"
        />
        <img
          className="bg-shape circle"
          src="/assets/images/shapes/circle.png"
          alt=""
          aria-hidden="true"
        />
      </Section>
      <Footer />
    </>
  );
}





