import React, { useEffect, useRef, useState } from "react";
import styled, { keyframes } from "styled-components";
import { FaLayerGroup, FaStore, FaCode, FaChartPie } from "react-icons/fa";

// --- Animations ---
const fadeInLeft = keyframes`
  from { opacity: 0; transform: translateX(-30px); }
  to { opacity: 1; transform: translateX(0); }
`;

const fadeInRight = keyframes`
  from { opacity: 0; transform: translateX(30px); }
  to { opacity: 1; transform: translateX(0); }
`;

const slideUpDown = keyframes`
  0% { transform: translateY(0px); }
  50% { transform: translateY(-20px); }
  100% { transform: translateY(0px); }
`;

const slideLeftRight = keyframes`
  0% { transform: translateX(0px); }
  50% { transform: translateX(20px); }
  100% { transform: translateX(0px); }
`;

const slideUpRight = keyframes`
  0% { transform: translate(0px, 0px); }
  50% { transform: translate(-20px, 20px); }
  100% { transform: translate(0px, 0px); }
`;

const floatShape = keyframes`
  0% { transform: translate(0px, 0px) rotate(0deg); }
  33% { transform: translate(30px, -50px) rotate(90deg); }
  66% { transform: translate(-20px, 20px) rotate(180deg); }
  100% { transform: translate(0px, 0px) rotate(360deg); }
`;

// --- Styled Components ---
const SectionWrapper = styled.section`
  position: relative;
  z-index: 1;
  padding: 100px 0;
  background: var(--light-color, #f9fafb);
  overflow: hidden; /* Keeps background shapes inside */

  /* Background Decorative Shapes */
  .bg-shape {
    position: absolute;
    z-index: -1;
    opacity: 0.6;
    animation: ${floatShape} 20s infinite linear;

    &.dots { left: 5%; top: 20%; width: 50px; }
    &.triangle { left: 10%; bottom: 15%; width: 17px; }
    &.close { right: 10%; top: 15%; width: 10px; }
    &.circle { right: 5%; bottom: 20%; width: 15px; }
  }
`;

const Container = styled.div`
  max-width: 1250px;
  margin: 0 auto;
  padding: 0 20px;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 60px;
  align-items: center;

  @media (max-width: 991px) {
    grid-template-columns: 1fr;
  }
`;

// --- Left Side: Text & Features ---
const ContentArea = styled.div`
  .in-view & {
    animation: ${fadeInLeft} 0.8s ease-out forwards;
  }

  .section-title {
    margin-bottom: 40px;

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

    @media (max-width: 991px) {
      text-align: center;
    }
  }
`;


const FeatureList = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 35px 25px;

  @media (max-width: 600px) {
    grid-template-columns: 1fr;
  }
`;

const FeatureItem = styled.div`
  display: flex;
  gap: 15px;

  .icon-box {
    width: 48px;
    height: 48px;
    flex-shrink: 0;
    background: #ffffff;
    color: #5835f2;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 10px;
    font-size: 20px;
    box-shadow: 0 4px 15px rgba(88, 53, 242, 0.1);
    transition: all 0.3s ease;
    
    svg {
      color: inherit;
      transition: inherit;
    }
  }

  &:hover .icon-box {
    background: #5835f2;
    color: #ffffff;
    transform: translateY(-3px);
    box-shadow: 0 8px 25px rgba(88, 53, 242, 0.25);
  }

  .text-content {
    h3 {
      color: var(--heading-color, #111827);
      margin: 0 0 8px;
      font-size: 20px;
      font-weight: 600;
    }
    p {
      margin: 0;
      color: var(--base-color, #4b5563);
      font-size: 18.62px;
      line-height: 25px !important;
      letter-spacing: 0.5px;
    }
  }
`;

// --- Right Side: Floating Images Composition ---
const ImageCluster = styled.div`
  position: relative;
  max-width: 600px;
  margin-left: auto;
  z-index: 1;

  .in-view & {
    animation: ${fadeInRight} 0.8s ease-out forwards;
  }

  /* Target all images in the cluster */
  img {
    position: relative;
    border-radius: 12px; /* Smooth rounded corners */
    box-shadow: 0 15px 40px rgba(0, 0, 0, 0.08); /* Soft, premium shadow */
    will-change: transform; /* Performance optimization for floating elements */
  }

  .first {
    width: 48%;
    z-index: 1;
    animation: ${slideUpDown} 6s ease-in-out infinite;
  }

  .second {
    width: 55%;
    margin-left: -7%;
    margin-top: -8%;
    z-index: 2;
    animation: ${slideLeftRight} 7s ease-in-out infinite;
  }

  .third {
    width: 36%;
    margin-left: 22%;
    margin-top: -14%;
    z-index: 3;
    /* Added a slight delay so it doesn't move perfectly in sync with the others */
    animation: ${slideLeftRight} 7s ease-in-out infinite 1.5s; 
  }

  .fourth {
    width: 43%;
    margin-left: -3%;
    margin-top: -30%;
    z-index: 5;
    animation: ${slideUpDown} 5.5s ease-in-out infinite 0.5s;
  }

  .circle-line {
    position: absolute;
    width: 28%;
    right: -8%;
    top: 33%;
    z-index: 4;
    box-shadow: none; /* Remove shadow from the decorative circle line */
    animation: ${slideUpRight} 6.5s ease-in-out infinite;
  }
`;

// --- The React Component ---
const FeaturesSection = () => {
    const featureRef = useRef(null);
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

        if (featureRef.current) {
            observer.observe(featureRef.current);
        }

        return () => observer.disconnect();
    }, []);

    return (
        <SectionWrapper className={inView ? "in-view" : ""} ref={featureRef}>
            <Container>
                <Grid>
                    {/* Left Side: Content */}
                    <ContentArea>
                        <div className="section-title">
                            <span className="sub-title">Core Features</span>
                            <h2>Features Help You Build Better Software.</h2>
                        </div>

                        <FeatureList>
                            <FeatureItem>
                                <div className="icon-box"><FaLayerGroup /></div>
                                <div className="text-content">
                                    <h3>Advanced Tracking</h3>
                                    <p>Gain complete visibility into your projects lifecycle. Track progress, spot bottlenecks, and keep your team aligned in real time.</p>
                                </div>
                            </FeatureItem>

                            <FeatureItem>
                                <div className="icon-box"><FaStore /></div>
                                <div className="text-content">
                                    <h3>Marketing Analysis</h3>
                                    <p>Empower your growth strategy. Evaluate campaign performance, understand user behavior, and optimize your spend for maximum ROI.</p>
                                </div>
                            </FeatureItem>

                            <FeatureItem>
                                <div className="icon-box"><FaCode /></div>
                                <div className="text-content">
                                    <h3>In-depth Monitoring</h3>
                                    <p>Keep your software running flawlessly. Detect anomalies instantly, monitor system health, and prevent downtime before it happens.</p>
                                </div>
                            </FeatureItem>

                            <FeatureItem>
                                <div className="icon-box"><FaChartPie /></div>
                                <div className="text-content">
                                    <h3>Quality Reliability</h3>
                                    <p>Deliver exceptional user experiences. Built on robust infrastructure and rigorous testing to guarantee enterprise-grade stability.</p>
                                </div>
                            </FeatureItem>
                        </FeatureList>
                    </ContentArea>

                    {/* Right Side: Animated Image Cluster */}
                    <div>
                        <ImageCluster>
                            <img className="first" src="/assets/images/features/feature1.png" alt="Feature Interface 1" />
                            <img className="second" src="/assets/images/features/feature2.png" alt="Feature Interface 2" />
                            <img className="third" src="/assets/images/features/feature3.png" alt="Feature Interface 3" />
                            <img className="fourth" src="/assets/images/features/feature4.png" alt="Feature Interface 4" />
                            <img className="circle-line" src="/assets/images/features/feature-circle-line.png" alt="Decorative Shape" />
                        </ImageCluster>
                    </div>

                </Grid>
            </Container>

            {/* Floating Background Shapes */}
            <img className="bg-shape dots" src="/assets/images/shapes/dots.png" alt="" aria-hidden="true" />
            <img className="bg-shape triangle" src="/assets/images/shapes/tringle.png" alt="" aria-hidden="true" />
            <img className="bg-shape close" src="/assets/images/shapes/close.png" alt="" aria-hidden="true" />
            <img className="bg-shape circle" src="/assets/images/shapes/circle.png" alt="" aria-hidden="true" />
        </SectionWrapper>
    );
};

export default FeaturesSection;