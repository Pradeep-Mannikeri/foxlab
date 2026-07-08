"use client";

import { use } from "react"; // 1. Import 'use' from React
import Footer from "../../../components/Footer";
import Link from "next/link";
import { CiCalendar, CiCloudSun } from "react-icons/ci";
import styled, { keyframes } from "styled-components";
import blogList from "../../../utils/blogNews";

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

// --- Styled Components ---
const SlantedSection = styled.section`
  position: relative;
  padding: 30px 0;
  z-index: 1;
  overflow: hidden;
  font-family: 'poppins', sans-serif;

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
  animation: ${fadeInUp} 0.6s ease-out forwards;
`;

const SidebarColumn = styled.div`
  flex: 1;
  opacity: 0;
  animation: ${fadeInUp} 0.6s ease-out 0.3s forwards;
`;

const BlogCard = styled.div`
  background: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(10px);
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.08);
`;

const HeroImage = styled.div`
  height: 400px;
  background-size: cover;
  background-position: center;

  @media (max-width: 768px) {
    height: 250px;
  }
`;

const ContentWrapper = styled.div`
  padding: 40px;

  @media (max-width: 768px) {
    padding: 20px;
  }

  h2 {
    font-size: 2.09rem !important;
    color: #1a1a1a !important;
    margin-bottom: 25px;
    line-height: 1.3 !important;
  }

  p {
    color: #555;
    line-height: 1.8;
    margin-bottom: 20px;
    font-size: 1.05rem;
  }
`;

const MetaTags = styled.div`
  display: flex;
  gap: 20px;
  margin-bottom: 20px;
  color: #777;
  font-weight: 500;
  justify-content: flex-start;

  span {
    display: flex;
    align-items: center;
    gap: 8px;
    font-size: 13px !important;
    color: #666666 !important;
    
    svg {
      font-size: 15px !important;
      color: #5835f2 !important;
      margin-right: 2px;
    }
  }
`;

const BlogNavigation = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 50px;
  padding-top: 30px;
  border-top: 1px solid #eaeaea;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 20px;
  }
`;

const NavItem = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
  align-items: ${(props) => (props.$isNext ? "flex-end" : "flex-start")};
  text-align: ${(props) => (props.$isNext ? "right" : "left")};
  transition: transform 0.2s ease;

  span {
    font-size: 11px !important;
    font-weight: 700 !important;
    letter-spacing: 1px;
    color: #999 !important;
    text-transform: uppercase;
  }

  p {
    margin: 0;
    font-weight: 600;
    color: #1a1a1a;
    font-size: 13px !important;
    line-height: 1.4 !important;
    transition: color 0.2s ease;
  }

  &:hover {
    transform: ${(props) => (props.$isNext ? "translateX(5px)" : "translateX(-5px)")};
    p {
      color: #5835f2;
    }
  }
`;

const StyledLink = styled(Link)`
  text-decoration: none;
`;

// --- Sidebar Styles ---
const SidebarCard = styled.div`
  background: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(10px);
  padding: 35px;
  border-radius: 12px;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.08);
  margin-bottom: 30px;

  h3 {
    font-size: 1.3rem;
    margin-bottom: 25px;
    color: #222;
    border-left: 3px solid #ff4d4d;
    padding-left: 15px;
  }
`;

const ServicesList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;

  li {
    padding: 12px 0;
    border-bottom: 1px solid #f0f0f0;
    color: #555;
    font-weight: 500;
    transition: all 0.2s ease;
    cursor: default;

    &:last-child {
      border-bottom: none;
    }

    &:hover {
      color: #723ef5;
      padding-left: 5px;
    }
  }
`;

const RecentPostItem = styled.div`
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

const RecentPostImage = styled.div`
  width: 80px;
  height: 75px;
  border-radius: 6px;
  background-size: cover;
  background-position: center;
  margin-right: 15px;
  flex-shrink: 0;
  border: 1px solid #e2e8f0;
`;

const RecentPostLink = styled(Link)`
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
`;

const ReadMoreText = styled.span`
  font-size: 12px !important;
  color: rgb(88, 53, 242) !important;
  font-weight: 700 !important;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  transition: color 0.2s ease;

  span.arrow {
    transition: transform 0.3s ease;
    display: inline-block;
  }

  &:hover,
  a:hover & {
    color: #3e1ec9 !important;
    span.arrow {
      transform: translateX(4px);
    }
  }
`;

const renderClickableText = (text) => {
  if (!text) return null;
  // Replace em-dash (—) with a space-spaced hyphen ( - )
  const cleanedText = text.replace(/—/g, " - ");
  const urlRegex = /(https?:\/\/[^\s,]+)/g;
  const parts = cleanedText.split(urlRegex);
  return parts.map((part, index) => {
    if (urlRegex.test(part)) {
      return (
        <a
          key={index}
          href={part}
          target="_blank"
          rel="noopener noreferrer"
          style={{ color: '#5835f2', textDecoration: 'underline', fontWeight: '600' }}
        >
          {part}
        </a>
      );
    }
    return part;
  });
};

// --- Main Component ---
export default function BlogDetailClient({ params }) {
  // 2. Unwrap the params Promise
  const resolvedParams = use(params);
  const decodedId = decodeURIComponent(resolvedParams.id);

  const blogs = blogList();
  const currentBlog = blogs.find((blog) => blog.title === decodedId) || blogs[0];
  const recentPosts = blogs.slice(0, 5);

  const currentIndex = blogs.findIndex((blog) => blog.title === decodedId);
  const prevBlog = currentIndex > 0 ? blogs[currentIndex - 1] : null;
  const nextBlog = currentIndex < blogs.length - 1 ? blogs[currentIndex + 1] : null;

  const services = [
    "Video Editing",
    "Graphics Designing",
    "Digital Marketing",
    "App Development",
    "Website Development",
    "Cyber Security",
  ];

  return (
    <>
      <SlantedSection>
        <Container>
          <LayoutWrapper>

            {/* LEFT CONTENT */}
            <MainColumn>
              <BlogCard>
                <HeroImage style={{ backgroundImage: `url("${currentBlog.img}")` }} />

                <ContentWrapper>
                  <MetaTags>
                    <span><CiCalendar /> {currentBlog.date}</span>
                    <span><CiCloudSun /> By {currentBlog.createdBy || "FOX LAB Team"}</span>
                  </MetaTags>

                  <h2>{currentBlog.title}</h2>

                  {/* Rendering descriptions gracefully if they exist */}
                  {currentBlog.description_1 && <p>{renderClickableText(currentBlog.description_1)}</p>}
                  {currentBlog.description_2 && <p>{renderClickableText(currentBlog.description_2)}</p>}
                  {currentBlog.description_3 && <p>{renderClickableText(currentBlog.description_3)}</p>}

                  {/* Navigation */}
                  <BlogNavigation>
                    {prevBlog ? (
                      <StyledLink href={`/blog-detail/${encodeURIComponent(prevBlog.title)}`}>
                        <NavItem>
                          <span>← Previous</span>
                          <p>{prevBlog.title}</p>
                        </NavItem>
                      </StyledLink>
                    ) : (
                      <div /> /* Empty div to keep Next button pushed right if Prev doesn't exist */
                    )}

                    {nextBlog && (
                      <StyledLink href={`/blog-detail/${encodeURIComponent(nextBlog.title)}`}>
                        <NavItem $isNext>
                          <span>Next →</span>
                          <p>{nextBlog.title}</p>
                        </NavItem>
                      </StyledLink>
                    )}
                  </BlogNavigation>

                </ContentWrapper>
              </BlogCard>
            </MainColumn>

            {/* SIDEBAR */}
            <SidebarColumn>

              <SidebarCard>
                <h3>Services</h3>
                <ServicesList>
                  {services.map((s, i) => (
                    <li key={i}>{s}</li>
                  ))}
                </ServicesList>
              </SidebarCard>

              <SidebarCard>
                <h3>Recent Posts</h3>
                {recentPosts.map((post) => (
                  <RecentPostItem key={post.id || post.title}>
                    <RecentPostImage style={{ backgroundImage: `url("${post.img}")` }} />
                    <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                      <RecentPostLink href={`/blog-detail/${encodeURIComponent(post.title)}`}>
                        {post.title}
                      </RecentPostLink>
                      <div className="sidebar-meta">
                        <span>{post.date}</span>
                        <span>•</span>
                        <span>{post.category}</span>
                      </div>
                      <StyledLink href={`/blog-detail/${encodeURIComponent(post.title)}`}>
                        <ReadMoreText>Read More <span className="arrow">→</span></ReadMoreText>
                      </StyledLink>
                    </div>
                  </RecentPostItem>
                ))}
              </SidebarCard>
            </SidebarColumn>
          </LayoutWrapper>
        </Container>
      </SlantedSection>

      <Footer />
    </>
  );
}
