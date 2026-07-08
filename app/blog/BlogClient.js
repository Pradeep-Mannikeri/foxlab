"use client"; // Required for styled-components in Next.js App Router

import React, { useEffect, useRef, useState } from "react";
import Footer from "../../components/Footer";
import Link from "next/link";
import styled, { keyframes } from "styled-components";
import blogList from "../../utils/blogNews";

// --- Animations ---
const fadeInUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(40px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
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

// --- Styled Components ---

const SlantedSection = styled.section`
  position: relative;
  padding: 20px 0;
  z-index: 1;
  overflow: hidden;

  &::before {
    content: "";
    position: absolute;
    top: 50px;
    left: 0;
    right: 0;
    z-index: -1;
    box-shadow: 0 -10px 40px rgba(0, 0, 0, 0.03);
  }
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;

  .illustration {
    width: 500px;
    height: auto;
    margin: 0 auto 40px;
    display: block;
    
    @media (max-width: 1024px) {
      width: 400px;
    }
  
    @media (max-width: 768px) {
      width: 290px;
    }
  }
  `;

const HeaderText = styled.div`
  text-align: center;
  max-width: 800px;
  margin: 0 auto 60px auto;
  animation: ${fadeInUp} 0.6s ease-out forwards;

  
  .sub-title {
    line-height: 1;
    font-size: 13px; 
    font-weight: 600;
    padding: 6px 14px;
    border-radius: 4px;
    background: #f3f1fe;
    display: inline-block;
    text-transform: uppercase; 
    letter-spacing: 0.5px;
    color: #5139ed;
  }

  h1{
   font-size: 40px; 
    line-height: 1.3;
    font-weight: 700;
    color: var(--heading-color);
    font-family: var(--heading-font);
    margin: 0;
    letter-spacing: -0.5px; 
  }
  h4 {
    font-size: 1.8rem;
    line-height: 1.5;
    color: #1a1a1a;
  }
`;

const LayoutWrapper = styled.div`
  display: flex;
  gap: 40px;

  @media (max-width: 992px) {
    flex-direction: column;
  }
`;

const MainColumn = styled.div`
  flex: 2;
`;

const SidebarColumn = styled.div`
  flex: 1;
`;

const BlogGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 30px;
`;

const Card = styled.div`
  background: #fff;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  opacity: 0;
  display: flex;
  flex-direction: column;

  &.in-view {
    animation: ${fadeInUp} 0.8s ease-out forwards;
  }

  &:hover {
    transform: translateY(-10px);
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
  }
`;

const CardImage = styled.div`
  height: 220px;
  background-size: cover;
  background-position: center;
  transition: transform 0.5s ease;

  ${Card}:hover & {
    transform: scale(1.05);
  }
`;

const CardContent = styled.div`
  padding: 25px;
  position: relative;
  background: #fff;
  z-index: 2;
  display: flex;
  flex-direction: column;
  flex-grow: 1;

  h3 {
    font-family: 'Inter', sans-serif !important;
    font-size: 1.18rem !important;
    margin-bottom: 15px;
    color: #222 !important;
  }
`;

const MetaTags = styled.div`
  display: flex;
  gap: 15px;
  margin-bottom: 20px;

  span {
    display: flex;
    align-items: center;
    gap: 5px;
    font-size: 11px !important;
    font-weight: 700 !important;
    color: #888888 !important;
    text-transform: uppercase !important;
    letter-spacing: 0.8px;
  }
`;

const StyledLink = styled(Link)`
  display: inline-flex;
  align-items: center;
  gap: 5px;
  font-size: 13px !important;
  font-weight: 700 !important;
  color: #5835f2 !important;
  text-decoration: none;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin-top: auto;
  transition: all 0.3s ease;

  span.arrow {
    transition: transform 0.3s ease;
    display: inline-block;
  }

  &:hover {
    color: #3e1ec9 !important;
    
    span.arrow {
      transform: translateX(4px);
    }
  }
`;

const SidebarContainer = styled.div`
  background: #fff;
  padding: 30px;
  border-radius: 12px;
  box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;
  animation: ${fadeInUp} 0.6s ease-out 0.4s forwards;
  opacity: 0;

  h3 {
    font-size: 1.4rem;
    margin-bottom: 25px;
    color: #222;
    border-bottom: 2px solid #f0f0f0;
    padding-bottom: 10px;
  }
`;

const LastPostItem = styled.div`
  display: flex;
  align-items: flex-start;
  padding-bottom: 15px;
  margin-bottom: 15px;
  border-bottom: 1px solid #f1f5f9;
  transition: all 0.3s ease;

  &:last-child {
    border-bottom: none;
    margin-bottom: 0;
    padding-bottom: 0;
  }

  &:hover {
    transform: translateX(4px);
  }
`;

const LastPostImage = styled.div`
  width: 80px;
  height: 75px;
  border-radius: 6px;
  background-size: cover;
  background-position: center;
  margin-right: 15px;
  flex-shrink: 0;
  border: 1px solid #e2e8f0;
`;

const LastPostContent = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;

  .post-title {
    font-size: 13px !important;
    font-weight: 700 !important;
    line-height: 1.4 !important;
    color: #1e293b !important;
    text-decoration: none;
    margin-bottom: 4px;
    transition: color 0.2s ease;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;

    &:hover {
      color: rgb(88, 53, 242) !important;
    }
  }

  .sidebar-meta {
    display: flex;
    align-items: center;
    gap: 6px;
    margin-bottom: 6px;
    margin-top: 2px;
    letter-spacing: 0.5px;

    span {
      font-size: 10px !important;
      color: #64748b !important;
      font-weight: 700 !important;
      text-transform: uppercase;
    }
  }
`;

const BackgroundShape = styled.img`
  position: absolute;
  z-index: -1;
  opacity: 0.6;
  animation: ${floatShape} 20s infinite linear;
  pointer-events: none;

  &.dots { left: 5%; top: 10%; width: 50px; }
  &.triangle { left: 8%; bottom: 15%; width: 20px; }
  &.close { right: 10%; top: 15%; width: 10px; }
  &.circle { right: 5%; bottom: 20%; width: 15px; }
`;

// --- Main Component ---

const ScrollBlogCard = ({ post }) => {
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
      <CardImage style={{ backgroundImage: `url("${post.img}")` }} />
      <CardContent>
        <h3>{post.title}</h3>
        <MetaTags>
          <span>{post.date}</span>
          <span>• {post.category}</span>
        </MetaTags>
        <StyledLink href={`/blog-detail/${post.title}`}>
          Read More <span className="arrow">→</span>
        </StyledLink>
      </CardContent>
    </Card>
  );
};

export default function BlogPage() {
  const blogs = blogList();
  const blogPosts = blogs.slice(0, 6);
  const lastPosts = blogs.slice(6, 11);

  return (
    <>

      <SlantedSection>
        {/* Floating Shapes Added Here */}
        <BackgroundShape className="dots" src="/assets/images/shapes/dots.png" alt="" aria-hidden="true" />
        <BackgroundShape className="triangle" src="/assets/images/shapes/tringle-two.png" alt="" aria-hidden="true" />
        <BackgroundShape className="close" src="/assets/images/shapes/close.png" alt="" aria-hidden="true" />
        <BackgroundShape className="circle" src="/assets/images/shapes/circle-two.png" alt="" aria-hidden="true" />

        <Container>

          <img
            src="/assets/images/blog/blog.png"
            alt="Contact FOX LAB"
            className="illustration"
          />
          <HeaderText>

            <span className="sub-title">Blog</span>
            <h1>From Our Lab</h1>
            <p className="custom-lead-text">
              Stay updated with FOX LAB’s recent work, creative breakthroughs, and the latest trends shaping the digital world. Learn, get inspired, and see what’s next in tech.
            </p>
          </HeaderText>

          <LayoutWrapper>

            {/* Main Blog Grid */}
            <MainColumn>
              <BlogGrid>
                {blogPosts.map((post) => (
                  <ScrollBlogCard key={post.id} post={post} />
                ))}
              </BlogGrid>
            </MainColumn>

            {/* Sidebar */}
            <SidebarColumn>
              <SidebarContainer>
                <h3>Last Posts</h3>
                {lastPosts.map((post) => (
                  <LastPostItem key={post.id}>
                    <LastPostImage style={{ backgroundImage: `url(${post.img})` }} />
                    <LastPostContent>
                      <Link href={`/blog-detail/${post.title}`} className="post-title">
                        {post.title}
                      </Link>
                      <div className="sidebar-meta">
                        <span>{post.date}</span>
                        <span>•</span>
                        <span>{post.category}</span>
                      </div>
                      <StyledLink href={`/blog-detail/${post.title}`}>
                        Read More <span className="arrow">→</span>
                      </StyledLink>
                    </LastPostContent>
                  </LastPostItem>
                ))}
              </SidebarContainer>
            </SidebarColumn>

          </LayoutWrapper>

        </Container>
      </SlantedSection>

      <Footer />
    </>
  );
}