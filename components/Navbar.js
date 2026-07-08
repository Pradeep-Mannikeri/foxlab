"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import styled, { keyframes, css } from "styled-components";
import { FaBars, FaTimes, FaRegClock } from "react-icons/fa";

// --- Animations ---

// The "Wiggle" for the logo on hover
const wiggle = keyframes`
  0% { transform: rotate(0deg); }
  15% { transform: rotate(5deg); }
  30% { transform: rotate(-5deg); }
  45% { transform: rotate(4deg); }
  60% { transform: rotate(-4deg); }
  75% { transform: rotate(2deg); }
  100% { transform: rotate(0deg); }
`;

// The "Smooth Slide" animation for scrolling
const dropIn = keyframes`
  0% {
    transform: translateY(-100%);
    opacity: 0;
  }
  100% {
    transform: translateY(0);
    opacity: 1;
  }
`;

// --- Styled Components ---

const HeaderWrapper = styled.header`
  width: 100%;
  background: #ffffff;
  position: sticky;
  top: 0;
  z-index: 1000;
  padding: 15px 0;

  /* Slower, organic transition for shape changes */
  transition: all 0.9s cubic-bezier(0.22, 1, 0.36, 1);

  /* Styles applied after scrolling 80px */
  ${({ $scrolled }) =>
    $scrolled &&
    css`
      padding: 10px 0;
      background: rgba(255, 254, 254, 0.9);
      backdrop-filter: blur(12px); /* Glassmorphism effect */
      box-shadow: 0 12px 40px rgba(0, 0, 0, 0.06);

      /* Smooth slide-in animation */
      animation: ${dropIn} 0.8s cubic-bezier(0.22, 1, 0.36, 1) forwards;
    `}
`;

const Container = styled.div`
  max-width: 1650px;
  margin: 0 auto;
  padding: 0 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  box-shadow: gray;
`;

const LogoWrapper = styled(Link)`
  display: flex;
  align-items: center;

  img {
    /* Logo shrinks slightly to fit the new navbar height */
    height: ${({ $scrolled }) => ($scrolled ? "50px" : "50px")};
    width: auto;
    transition: all 0.7s cubic-bezier(0.22, 1, 0.36, 1);
  }

  &:hover img {
    animation: ${wiggle} 0.6s ease;
  }
`;

const DesktopNav = styled.nav`
  display: flex;
  align-items: center;
  gap: 30px;

  a {
    text-decoration: none;
    color: #111827;
    font-weight: 500 !important;
    font-size: 15px !important;
    transition: color 0.3s ease;
    position: relative;
    padding: 5px 0;

    &::after {
      content: "";
      position: absolute;
      bottom: 0;
      left: 0;
      width: 0;
      height: 2px;
      background-color: #5835f2;
      transition: width 0.3s ease;
    }

    &:hover {
      color: #5138ee;
    }

    &.active {
      color: #5835f2 !important;
      font-weight: 900 !important;
    }

    &.active::after {
      width: 100%;
    }
  }

  @media only screen and (max-width: 991px) {
    display: none;
  }
`;

const RightSection = styled.div`
  display: none;
  align-items: center;

  @media only screen and (max-width: 991px) {
    display: flex;
  }
`;

const MenuIcon = styled.div`
  font-size: 24px;
  cursor: pointer;
  color: #3e578e;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: transform 0.2s ease;

  &:hover {
    color: #5138ee;
  }
`;

const MobileMenu = styled.div`
  display: flex;
  flex-direction: column;
  background: #f8f8f8;
  position: absolute;
  top: 100%;
  left: 0;
  width: 100%;
  box-shadow: 0 10px 15px rgba(0, 0, 0, 0.1);

  max-height: ${({ $isOpen }) => ($isOpen ? "450px" : "0")};
  overflow: hidden;
  transition: max-height 0.4s cubic-bezier(0.4, 0, 0.2, 1);

  a {
    padding: 15px 25px;
    text-decoration: none;
    color: #000000;
    font-weight: 500 !important;
    font-size: 15px !important;
    border-bottom: 1px solid rgba(255, 255, 255, 0.05);
    transition: all 0.3s ease;

    &:hover {
      color: #5138ee;
      padding-left: 30px;
      background: rgba(255, 255, 255, 0.02);
    }

    &.active {
      color: #5835f2 !important;
      font-weight: 900 !important;
      background: rgba(88, 53, 242, 0.05);
    }

    &:last-child {
      border-bottom: none;
    }
  }

  @media only screen and (min-width: 992px) {
    display: none;
  }
`;

const clockWiggle = keyframes`
  0% { transform: rotate(0deg); }
  15% { transform: rotate(15deg); }
  30% { transform: rotate(-15deg); }
  45% { transform: rotate(10deg); }
  60% { transform: rotate(-10deg); }
  75% { transform: rotate(5deg); }
  100% { transform: rotate(0deg); }
`;

const pulseGlow = keyframes`
  0% {
    transform: scale(0.9);
    box-shadow: 0 0 0 0 rgba(16, 185, 129, 0.7);
  }
  70% {
    transform: scale(1.1);
    box-shadow: 0 0 0 6px rgba(16, 185, 129, 0);
  }
  100% {
    transform: scale(0.9);
    box-shadow: 0 0 0 0 rgba(16, 185, 129, 0);
  }
`;

const DateTimeContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
  background: rgba(88, 53, 242, 0.05);
  border: 1px solid rgba(88, 53, 242, 0.15);
  padding: 4px 10px;
  border-radius: 20px;
  margin-left: 15px;
  transition: all 0.3s ease;
  user-select: none;

  &:hover {
    background: rgba(88, 53, 242, 0.1);
    transform: translateY(-1px);
    box-shadow: 0 4px 12px rgba(88, 53, 242, 0.08);
  }

  span {
    font-size: 12px !important;
    font-weight: 600 !important;
    color: #5835f2 !important;
  }

  svg.clock {
    font-size: 13px !important;
    color: #5835f2 !important;
    transition: transform 0.3s ease;
    margin-right: 4px;
    margin-left: 2px;
  }

  &:hover svg.clock {
    animation: ${clockWiggle} 0.6s ease;
  }
`;

const PulseDot = styled.span`
  width: 5px;
  height: 5px;
  background-color: #10b981;
  border-radius: 50%;
  display: inline-block;
  animation: ${pulseGlow} 2s infinite ease-in-out;
`;

const MobileDateTimeContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
  background: rgba(88, 53, 242, 0.05);
  border: 1px solid rgba(88, 53, 242, 0.12);
  padding: 6px 12px;
  border-radius: 8px;
  margin: 15px 25px;
  align-self: flex-start;
  user-select: none;

  span {
    font-size: 12px !important;
    font-weight: 600 !important;
    color: #5835f2 !important;
  }

  svg.clock {
    font-size: 13px !important;
    color: #5835f2 !important;
    margin-right: 4px;
    margin-left: 2px;
  }
`;

// --- Main Component ---

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [dateTime, setDateTime] = useState({ date: "", time: "" });
  const [mounted, setMounted] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setMounted(true);
    const updateDateTime = () => {
      const now = new Date();
      const dateStr = now.toLocaleDateString("en-US", {
        weekday: "short",
        month: "short",
        day: "numeric",
        year: "numeric",
      });
      const timeStr = now.toLocaleTimeString("en-US", {
        hour: "numeric",
        minute: "2-digit",
        hour12: true,
      });
      setDateTime({ date: dateStr, time: timeStr });
    };

    updateDateTime();
    const interval = setInterval(updateDateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 80) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <HeaderWrapper $scrolled={scrolled}>
      <Container>
        {/* LOGO */}
        <LogoWrapper href="/" $scrolled={scrolled}>
          <img
            src="/assets/images/logos/logo.svg"
            style={{ width: "150px", height: "auto" }}
          />
        </LogoWrapper>

        {/* NAV MENU (Desktop) */}
        <DesktopNav>
          <Link href="/" className={pathname === "/" ? "active" : ""}>
            Home
          </Link>
          <Link href="/about" className={pathname === "/about" ? "active" : ""}>
            About
          </Link>
          <Link
            href="/services"
            className={pathname === "/services" ? "active" : ""}
          >
            Services
          </Link>
          <Link href="/blog" className={pathname === "/blog" ? "active" : ""}>
            Blog
          </Link>
          <Link
            href="/career"
            className={pathname === "/career" ? "active" : ""}
          >
            Career
          </Link>
          <Link
            href="/contact"
            className={pathname === "/contact" ? "active" : ""}
          >
            Contact
          </Link>
          {mounted && (
            <DateTimeContainer>
              <PulseDot />
              <span>{dateTime.date}</span>
              <FaRegClock className="clock" />
              <span>{dateTime.time}</span>
            </DateTimeContainer>
          )}
        </DesktopNav>

        {/* RIGHT SIDE (Mobile Toggle) */}
        <RightSection>
          <MenuIcon onClick={() => setOpen(!open)}>
            {open ? <FaTimes /> : <FaBars />}
          </MenuIcon>
        </RightSection>
      </Container>

      {/* MOBILE MENU */}
      <MobileMenu $isOpen={open}>
        <Link
          href="/"
          onClick={() => setOpen(false)}
          className={pathname === "/" ? "active" : ""}
        >
          Home
        </Link>
        <Link
          href="/about"
          onClick={() => setOpen(false)}
          className={pathname === "/about" ? "active" : ""}
        >
          About
        </Link>
        <Link
          href="/services"
          onClick={() => setOpen(false)}
          className={pathname === "/services" ? "active" : ""}
        >
          Services
        </Link>
        <Link
          href="/blog"
          onClick={() => setOpen(false)}
          className={pathname === "/blog" ? "active" : ""}
        >
          Blog
        </Link>
        <Link
          href="/career"
          onClick={() => setOpen(false)}
          className={pathname === "/career" ? "active" : ""}
        >
          Career
        </Link>
        <Link
          href="/contact"
          onClick={() => setOpen(false)}
          className={pathname === "/contact" ? "active" : ""}
        >
          Contact
        </Link>
        {mounted && (
          <MobileDateTimeContainer>
            <PulseDot />
            <span>{dateTime.date}</span>
            <FaRegClock className="clock" />
            <span>{dateTime.time}</span>
          </MobileDateTimeContainer>
        )}
      </MobileMenu>
    </HeaderWrapper>
  );
};

export default Navbar;
