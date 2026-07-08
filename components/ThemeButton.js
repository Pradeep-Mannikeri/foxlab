import styled, { css } from "styled-components";
import Link from "next/link";

const ThemeButtonStyles = css`
  cursor: pointer;
  font-weight: 600 !important;
  font-family: inherit;
  font-size: 15px !important;
  letter-spacing: 0.05em;
  border-radius: 8px;
  border: 1px solid #5835f2;
  background: #5835f2; /* Hover revealed background */
  color: white;
  padding: 0 !important;
  margin: 0 !important;
  overflow: hidden;
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  transition: all 0.4s;
  box-shadow: 0 4px 15px rgba(88, 53, 242, 0.1);
  text-decoration: none;

  & > span {
    position: relative;
    z-index: 10;
    display: inline-flex;
    align-items: center;
    padding: 12px 24px !important;
    transition: color 0.4s;
    width: 100%;
    height: 100%;
    justify-content: center;
    color: #5835f2; /* Initial text color */
    font-size: 15px !important;
    font-weight: 600 !important;
  }

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: -10%;
    width: 130%;
    height: 100%;
    background: #ffffff; /* Initial background */
    z-index: 1;
    transform: skew(-15deg);
    transition: transform 0.5s cubic-bezier(0.3, 1, 0.8, 1);
  }

  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 10px 25px rgba(88, 53, 242, 0.2);
    
    &::before {
      transform: translate3d(110%, 0, 0) skew(-15deg);
    }

    & > span {
      color: #ffffff !important; /* Hover text color */
    }
  }

  &:active {
    transform: scale(0.95) translateY(-1px);
  }
  
  svg {
    position: relative;
    z-index: 11;
    margin-left: 10px;
    font-size: 19px; 
    color: #5835f2 !important;
    fill: #5835f2 !important;
    transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  }

  &:hover svg {
    transform: translateX(5px) rotate(10deg);
    color: #ffffff !important;
    fill: #ffffff !important;
  }

  &.get-started {
    background: #ffffff; /* Hover background */
    border: 1px solid #5835f2;

    &::before {
      background: #5835f2; /* Initial background */
    }

    & > span {
      color: #ffffff !important; /* Initial text */
    }

    svg {
      color: #ffffff !important;
      fill: #ffffff !important;
    }

    &:hover {
      & > span {
        color: #5835f2 !important; /* Hover text */
      }

      svg {
        color: #5835f2 !important;
        fill: #5835f2 !important;
      }
    }
  }

  @media (max-width: 480px) {
    width: 100% !important;
    max-width: 280px !important;
    
    & > span {
      padding: 10px 20px !important;
      font-size: 14px !important;
    }
  }
`;

export const StyledButton = styled.button`
  ${ThemeButtonStyles}
`;

export const StyledLink = styled(Link)`
  ${ThemeButtonStyles}
`;

const ThemeButton = ({ children, href, as, className, ...props }) => {
  const content = <span>{children}</span>;

  if (href && !props.disabled) {
    return (
      <StyledLink href={href} className={className} {...props}>
        {content}
      </StyledLink>
    );
  }

  return (
    <StyledButton className={className} {...props}>
      {content}
    </StyledButton>
  );
};

export default ThemeButton;
