'use client';
import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import styled, { keyframes } from "styled-components";
import { FaArrowRight } from "react-icons/fa";

// --- Animations ---
const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
`;

const fadeInUp = keyframes`
  from { opacity: 0; transform: translateY(40px); }
  to { opacity: 1; transform: translateY(0); }
`;

// --- Styled Components ---
const SectionWrapper = styled.section`
  padding: 100px 0;
  background: #ffffff;
  position: relative;
  z-index: 3;

  
`;

const Container = styled.div`
  max-width: 1140px;
  margin: 0 auto;
  padding: 0 20px;

  .in-view & {
    animation: ${fadeInUp} 0.8s ease-out forwards;
  }
`;

const SectionTitle = styled.div`
  text-align: center;
  margin-bottom: 50px;
  max-width: 600px;
  margin-inline: auto;

  .sub-title {
    font-size: 13px;
    font-weight: 600;
    padding: 6px 14px;
    border-radius: 4px;
    margin-bottom: 15px;
    background: #f3f1fe;
    display: inline-block;
    text-transform: uppercase;
    letter-spacing: 0.5px;
    color: var(--primary-color, #5138ee);
  }

  h2 {
    font-size: 40px;
    line-height: 1.3;
    font-weight: 700;
    color: var(--heading-color, #111827);
    margin: 0;
    letter-spacing: -0.5px;
  }
`;

// --- Tab Controls ---
const TabNav = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 10px;
  margin-bottom: 50px;
`;

const TabButton = styled.button`
  background: ${(props) => (props.$active ? "var(--primary-color, #5138ee)" : "#f3f4f6")};
  color: ${(props) => (props.$active ? "#ffffff" : "var(--base-color, #4b5563)")};
  border: none;
  padding: 12px 24px;
  font-size: 15px;
  font-weight: 600;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: ${(props) => (props.$active ? "var(--primary-color, #5138ee)" : "#e5e7eb")};
    color: ${(props) => (props.$active ? "#ffffff" : "var(--heading-color, #111827)")};
  }
`;

// --- Tab Content Area ---
const TabContentArea = styled.div`
  display: grid;
  grid-template-columns: 1fr 1.2fr;
  gap: 60px;
  align-items: center;
  animation: ${fadeIn} 0.4s ease-out forwards;

  @media (max-width: 991px) {
    grid-template-columns: 1fr;
    text-align: center;
    gap: 40px;
  }
`;

const ContentText = styled.div`
  h3 {
    font-size: 26px;
    font-weight: 700;
    line-height: 1.3;
    color: var(--heading-color, #111827);
    margin: 0 0 15px;
    letter-spacing: -0.5px;
  }

  p {
    font-size: 17px;
    line-height: 1.7;
    color: var(--base-color, #4b5563);
    margin: 0 0 25px;
  }

  .read-more {
    font-size: 14px;
    font-weight: 600;
    color: var(--primary-color, #5138ee);
    display: inline-flex;
    align-items: center;
    gap: 8px;
    transition: color 0.2s ease;
    text-decoration: none;

    &:hover {
      color: #422ad1; /* Slightly darker purple on hover */
    }
  }

  @media (max-width: 991px) {
    .read-more { justify-content: center; }
  }
`;

const ContentImage = styled.div`
  img {
    width: 100%;
    border-radius: 12px;
    box-shadow: 0 15px 40px rgba(0, 0, 0, 0.08); /* Premium soft shadow */
    object-fit: cover;
  }
`;

// --- Data Structure for Tabs ---
// By keeping the data in an array, the JSX below stays incredibly clean and easy to edit.
const tabData = [
    {
        id: "design",
        title: "Design & Development",
        heading: "Focus on Digital Transformation & Client Solutions",
        description: "Fox Lab turns complex workflows into seamless digital experiences. We build responsive, high-quality interfaces that engage users and drive business growth.",
        image: "/assets/images/services/service-chart.png",
    },
    {
        id: "software",
        title: "Software & Equipments",
        heading: "Explore Our Intuitive Software Interface",
        description: "See how FOX LAB transforms complex technical workflows into seamless user experiences. Our development team crafts pixel-perfect, responsive interfaces designed to boost user engagement and drive results for your business.",
        image: "/assets/images/services/service-tab-2.png",
    },
    {
        id: "members",
        title: "Team Members & Tools",
        heading: "Elite Talent and Advanced Tools, Ready to Scale",
        description: "Building top-tier software requires the right mix of people and technology. Partner with us to integrate expert creative designers and professional developers directly into your workflow, fully equipped with industry-leading tools to guarantee project success.",
        image: "/assets/images/about/borwser-support.jpg",
    },
    {
        id: "analysis",
        title: "Market Analysis",
        heading: "Empowering Businesses Through Technology",
        description: "Foxlab builds powerful digital experiences that help businesses grow, adapt, and lead in a fast changing world through smart technology, scalable systems, and innovative software crafted for performance.",
        image: "/assets/images/services/service-dashboard.jpg",
    },
    {
        id: "activity",
        title: "Digital Marketing",
        heading: "Grow Faster with Smart Marketing",
        description: "Foxlab creates impactful digital marketing campaigns that help brands reach, engage, and convert audiences effectively using data insights, creative storytelling, and optimized strategies designed for consistent growth and strong online presence.",
        image: "/assets/images/dashboard-screenshots/dashboard-screenshot1.jpg",
    }
];

const ServicesSection = () => {
    // React State to keep track of which tab is currently open
    const [activeTab, setActiveTab] = useState(0);
    const sectionRef = useRef(null);
    const [inView, setInView] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting) {
                    setInView(true);
                    observer.disconnect();
                }
            },
            { threshold: 0.05, rootMargin: "0px" }
        );

        if (sectionRef.current) {
            observer.observe(sectionRef.current);
        }

        return () => observer.disconnect();
    }, []);

    return (
        <SectionWrapper className={inView ? "in-view" : ""} ref={sectionRef}>
            <Container>
                <SectionTitle>
                    <span className="sub-title">Services We Provide</span>
                    <h2>Custom Made Reports to Make Great Decisions</h2>
                </SectionTitle>

                {/* Dynamic Tab Navigation */}
                <TabNav>
                    {tabData.map((tab, index) => (
                        <TabButton
                            type="button"
                            key={tab.id}
                            $active={activeTab === index}
                            onClick={() => setActiveTab(index)}
                        >
                            {tab.title}
                        </TabButton>
                    ))}
                </TabNav>

                {/* Dynamic Tab Content (Uses the activeTab state to pull the right object) */}
                <TabContentArea key={activeTab}> {/* The key prop forces the fade-in animation to re-trigger on change */}
                    <ContentText>
                        <h3>{tabData[activeTab].heading}</h3>
                        <p>{tabData[activeTab].description}</p>
                        <Link href="/services" className="read-more">
                            Read More <FaArrowRight />
                        </Link>
                    </ContentText>

                    <ContentImage>
                        <img
                            src={tabData[activeTab].image}
                            alt={tabData[activeTab].title}
                        />
                    </ContentImage>
                </TabContentArea>

            </Container>
        </SectionWrapper>
    );
};

export default ServicesSection;