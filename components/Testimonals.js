"use client";
import React, { useRef, useState, useEffect } from "react";
import styled from "styled-components";

const Testimonials = () => {
    const sliderRef = useRef(null);
    const requestRef = useRef(null);

    const [isDragging, setIsDragging] = useState(false);
    const [startX, setStartX] = useState(0);
    const [scrollLeftPos, setScrollLeftPos] = useState(0);
    const [isHovered, setIsHovered] = useState(false);

    // Duplicate data to create a seamless infinite loop
    const infiniteData = [...data, ...data];

    // --- Smooth Continuous Auto-Play Logic ---
    useEffect(() => {
        const playSlider = () => {
            const slider = sliderRef.current;
            if (!slider || isHovered || isDragging) return;

            slider.scrollLeft += 1.5;

            if (slider.scrollLeft >= slider.scrollWidth / 2) {
                slider.scrollLeft = 0;
            }

            requestRef.current = requestAnimationFrame(playSlider);
        };

        if (!isHovered && !isDragging) {
            requestRef.current = requestAnimationFrame(playSlider);
        }

        return () => cancelAnimationFrame(requestRef.current);
    }, [isHovered, isDragging]);

    // --- Mouse & Touch Drag Logic ---
    const handleDragStart = (e) => {
        setIsDragging(true);
        const pageX = e.type.includes("mouse") ? e.pageX : e.touches[0].pageX;
        setStartX(pageX - sliderRef.current.offsetLeft);
        setScrollLeftPos(sliderRef.current.scrollLeft);
    };

    const handleDragEnd = () => {
        setIsDragging(false);
    };

    const handleDragMove = (e) => {
        if (!isDragging) return;
        e.preventDefault();
        const pageX = e.type.includes("mouse") ? e.pageX : e.touches[0].pageX;
        const x = pageX - sliderRef.current.offsetLeft;
        const walk = (x - startX) * 2;

        let newScrollLeft = scrollLeftPos - walk;

        if (newScrollLeft <= 0) {
            newScrollLeft = sliderRef.current.scrollWidth / 2;
        } else if (newScrollLeft >= sliderRef.current.scrollWidth / 2) {
            newScrollLeft = 0;
        }

        sliderRef.current.scrollLeft = newScrollLeft;
    };

    return (
        <Section>
            <Container>
                <Wrapper>
                    <Left>
                        <span className="sub">Clients Feedback</span>
                        <h2>What Our Clients Say About Us</h2>
                        <p className="custom-lead-text">
                            See what our clients have to say about their journey with FOX LAB.
                            Stories of trust, transformation, and triumph.
                        </p>
                    </Left>

                    <Right
                        ref={sliderRef}
                        $isDragging={isDragging}
                        onMouseDown={handleDragStart}
                        onMouseLeave={() => { setIsHovered(false); setIsDragging(false); }}
                        onMouseUp={handleDragEnd}
                        onMouseMove={handleDragMove}
                        onMouseEnter={() => setIsHovered(true)}
                        onTouchStart={handleDragStart}
                        onTouchEnd={handleDragEnd}
                        onTouchMove={handleDragMove}
                    >
                        {infiniteData.map((item, i) => (
                            <Card key={i}>
                                <Top>
                                    <img src={item.img} alt={item.name} />
                                    <span>{item.name}</span>
                                </Top>
                                <Text>{item.text}</Text>
                                {/* --- Added Star Rating --- */}
                                <Rating>
                                    {[...Array(5)].map((_, index) => (
                                        <svg key={index} viewBox="0 0 24 24" fill="currentColor">
                                            <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                                        </svg>
                                    ))}
                                </Rating>
                            </Card>
                        ))}
                    </Right>
                </Wrapper>
            </Container>
        </Section>
    );
};

export default Testimonials;

/* ================= DATA ================= */
const data = [
    {
        name: "Samantha Lee",
        img: "/assets/images/Done/samantha_lee.jpg",
        text: "Their web development expertise brought our vision to life. Fast, responsive, and visually stunning. Highly recommended!",
    },
    {
        name: "Arjun Mehta",
        img: "/assets/images/Done/arjun_mehta.jpg",
        text: "Exceptional graphic design and branding support. They truly understand how to make a brand stand out.",
    },
    {
        name: "Isabella Rodriguez",
        img: "/assets/images/Done/isabella_rodriguez.jpg",
        text: "From logo creation to full website development, everything was delivered on time and beyond expectations.",
    },
    {
        name: "Mr. Rakesh Kandgal",
        img: "/assets/images/Done/rakesh_kandgal.jpg",
        text: "The team turned our vision into a sleek, responsive, and intuitive website. Creative and professional.",
    },
    {
        name: "Daniel Parker",
        img: "/assets/images/Done/daniel_parker.jpg",
        text: "Professional, efficient, and incredibly talented. The video they produced for our campaign went viral within days!",
    },
    {
        name: "Priya Sharma",
        img: "/assets/images/Done/priya_sharma.jpg",
        text: "Our app design looks modern and intuitive thanks to their UI/UX expertise. Great communication throughout the process.",
    },
    {
        name: "James Wilson",
        img: "/assets/images/Done/james_wilson.jpg",
        text: "The best digital marketing support we have ever had. Our engagement and conversions increased significantly.",
    },
    {
        name: "Emily Carter",
        img: "/assets/images/Done/emily_carter.jpg",
        text: "Highly skilled in motion graphics and 3D animation. They delivered visually stunning results that impressed our clients.",
    },
    {
        name: "Rahul Desai",
        img: "/assets/images/Done/rahul_desai.jpg",
        text: "They provided an excellent branding package that elevated our business presence. Professional and creative from start to finish.",
    },
];

/* ================= STYLES ================= */

const Section = styled.section`
  padding: 100px 0;
  margin: 80px 0 100px;
  background-color: rgb(88, 53, 242); 
  background-image: url('/assets/images/feedbacks/feedback-bg.png');
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  position: relative;
  z-index: 1;
  overflow: hidden; 
`;

const Container = styled.div`
  max-width: 1650px;
  margin-left: auto;
  padding: 0 20px;
`;

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: 35% 65%;
  gap: 50px;
  align-items: center;

  @media (max-width: 992px) {
    grid-template-columns: 1fr;
    gap: 40px;
  }
`;

const Left = styled.div`
  color: #ffffff;

  .sub {
    font-size: 13px;
    font-weight: 700;
    padding: 6px 14px;
    border-radius: 4px;
    margin-bottom: 15px;
    background: #ffffff;
    color: rgb(88, 53, 242); 
    display: inline-block;
    text-transform: uppercase;
    letter-spacing: 0.5px;
  }

  h2 {
    font-size: 40px;
    font-weight: 600;
    line-height: 1.25;
    margin: 0 0 15px;
    letter-spacing: -0.5px;
  }

  p {
    font-size: 18px;
    color: #ffffff !important;
    opacity: 0.9;
    line-height: 1.7;
    margin: 0;
  }

  @media (max-width: 992px) {
    text-align: center;
    h2 { font-size: 38px; }
    p { max-width: 600px; margin: 0 auto; }
  }
`;

const Right = styled.div`
  display: flex;
  gap: 20px;
  overflow-x: auto;
  padding-bottom: 20px; 
  &::-webkit-scrollbar { display: none; }
  -ms-overflow-style: none;
  scrollbar-width: none;
  cursor: ${(props) => (props.$isDragging ? "grabbing" : "grab")};
  -webkit-overflow-scrolling: touch;
`;

const Card = styled.div`
  background: #ffffff;
  border-radius: 12px;
  padding: 35px 30px;
  min-width: 320px;
  max-width: 320px;
  min-height: 220px;
  flex-shrink: 0;
  display: flex;
  flex-direction: column;
  gap: 15px;
  user-select: none; 
  transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.08);
  border: 1px solid rgba(255, 255, 255, 0.8);

  &:hover {
    transform: translateY(-6px);
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.18);
  }

  @media (max-width: 576px) {
    min-width: 280px;
    max-width: 280px;
    padding: 25px;
  }
`;

const Top = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;

  img {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    object-fit: cover;
    pointer-events: none; 
    border: 2px solid rgb(88, 53, 242);
  }

  span {
    font-weight: 700 !important;
    font-size: 15px !important;
    color: #1e293b !important;
  }
`;

const Text = styled.p`
  font-size: 14px !important;
  line-height: 1.6 !important;
  color: #4b5563 !important;
  margin: 0;
  flex-grow: 1; /* Pushes the rating to the bottom */
`;

/* --- New Rating Styled Component --- */
const Rating = styled.div`
  display: flex;
  gap: 4px;
  margin-top: auto; /* Ensures it stays at the very bottom */

  svg {
    width: 18px;
    height: 18px;
    color: rgb(88, 53, 242); /* The same blue as your section background */
  }
`;