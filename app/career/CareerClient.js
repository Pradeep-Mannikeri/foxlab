"use client";
import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import styled, { keyframes, css } from "styled-components";
import { VscGitStashApply } from "react-icons/vsc";
import { FaArrowLeft, FaTimes } from "react-icons/fa";
import ThemeButton from "@/components/ThemeButton";
import Footer from "../../components/Footer";
import { jobs, filters, filterJobs } from "../../utils/jobs";
import { useSearchParams } from "next/navigation";

// --- Animations ---
const fadeInUp = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
`;

const fadeIn = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`;

const slideInLeft = keyframes`
  from { opacity: 0; transform: translateX(-40px); }
  to { opacity: 1; transform: translateX(0); }
`;

const slideInRight = keyframes`
  from { opacity: 0; transform: translateX(40px); }
  to { opacity: 1; transform: translateX(0); }
`;

// --- New Styled Components for Modal ---
const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(17, 24, 39, 0.7);
  backdrop-filter: blur(4px);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  padding : 50px;
  animation: ${fadeIn} 0.2s ease-out;
  font-family : 'poppins', sans-serif;

   @media (max-width: 768px) {
    padding: 10px;
    align-items: flex-start;
  }
`;

const ModalContent = styled.div`
  background: #ffffff;
  border-radius: 20px;
  width: 90%;
  max-width: 550px;
  padding: 50px;
  position: relative;
  box-shadow: 0 25px 60px rgba(0, 0, 0, 0.4);
  animation: ${fadeInUp} 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  max-height: 92vh;
  overflow-y: auto;

  /* Custom scrollbar */
  &::-webkit-scrollbar { width: 6px; }
  &::-webkit-scrollbar-thumb { background: #e5e7eb; border-radius: 10px; }

  @media (max-width: 1024px) { padding: 40px; }

  @media (max-width: 768px) {
    padding: 40px 30px;
    width: 92%;
    border-radius: 16px;
  }

  @media (max-width: 480px) {
    padding: 80px 20px 40px;
    width: 100% !important;
    height: 100vh !important;
    max-height: 100vh !important;
    border-radius: 0;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 2200;
  }

  @media (max-width: 320px) {
    padding: 70px 15px 30px;
  }

  h3 {
    margin-top: 0;
    margin-bottom: 25px;
    font-size: 26px;
    font-weight: 800;
    color: #111827;
    line-height: 1.2;

    @media (max-width: 768px) { font-size: 22px; }
    @media (max-width: 480px) { font-size: 24px; text-align: center; }
  }

  .close-btn {
    position: absolute;
    top: 20px;
    right: 20px;
    background: #f3f4f6;
    border: none;
    width: 40px;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    font-size: 18px;
    color: #4b5563;
    cursor: pointer;
    transition: all 0.3s ease;
    z-index: 30;

    &:hover {
      background: #e5e7eb;
      color: #111827;
      transform: rotate(90deg);
    }

    @media (max-width: 480px) {
      top: 20px;
      right: 20px;
      width: 45px;
      height: 45px;
      background: #ffffff;
      box-shadow: 0 4px 15px rgba(0,0,0,0.1);
    }
  }
`;

const FormGroup = styled.div`
  margin-bottom: 20px;
  text-align: left;
  
  @media (max-width: 425px) {
    margin-bottom: 15px;
  }
  label {
    display: block;
    margin-bottom: 8px;
    font-size: 14px;
    font-weight: 600;
    color: #4b5563;
  }

  input[type="text"],
  input[type="email"],
  input[type="tel"],
  input[type="file"] {
    width: 100%; /* Changed from 94% back to 100% for better filling */
    padding: 12px;
    border: 1px solid #d1d5db;
    border-radius: 8px;
    font-size: 15px;
    font-family: inherit;
    transition: all 0.2s ease;
    box-sizing: border-box; /* Crucial for width: 100% */

    @media (max-width: 375px) {
      padding: 10px;
      font-size: 14px;
    }

    &:focus {
      outline: none;
      border-color: rgb(88, 53, 242);
      box-shadow: 0 0 0 3px rgba(88, 53, 242, 0.1);
    }
  }
`;



const Section = styled.section` padding: 30px 0; background-color: #f9fafb; min-height: 100vh; font-family: 'poppins', sans-serif; `;
const Container = styled.div` max-width: 1200px; margin: 0 auto; padding: 0 20px; .illustration {  width: 470px;
  max-width: 100%;
  height: auto;
  margin: 0 auto 40px;
  display: block;

  @media (max-width: 1024px) {
    width: 380px;
  }

  @media (max-width: 768px) {
    width: 260px;
  } }`;
const HeaderArea = styled.div` 
    text-align: center; 
    max-width: 700px;
    margin: 0 auto 50px; 

    .sub-title { 
    font-size: 13px; 
    font-weight: 700; 
    padding: 6px 14px; 
    border-radius: 4px; 
    margin-bottom: 15px;
    background: #f3f1fe; 
    color: rgb(88, 53, 242); 
    display: inline-block;
    text-transform: uppercase; 
    } 

   h1 {
  font-size: 40px;

  @media (max-width: 768px) {
    font-size: 26px;
  }
}

p {
  font-size: 16px;
  line-height: 1.7;
  color: #4b5563;

  @media (max-width: 768px) {
    font-size: 14px;
  }
}
       `;

const FilterGroup = styled.div` 
display: flex; 
justify-content: center;
 flex-wrap: wrap; 
 gap: 12px; 
 margin-bottom: 50px;
  @media (max-width: 768px) {
    gap: 8px;
  }
  `;

const FilterBtn = styled(Link)`
 background: ${(props) => (props.$active ? "rgb(88, 53, 242)" : "#ffffff")};
  color: ${(props) => (props.$active ? "#ffffff" : "#4b5563")}; 
  border: 1px solid ${(props) => (props.$active ? "rgb(88, 53, 242)" : "#e5e7eb")}; 
  padding: 10px 24px; 
  border-radius: 5px; 
  font-size: 14px;
   font-weight: 600;
    text-decoration: none; 
      @media (max-width: 768px) {
    padding: 8px 14px;
    font-size: 12px;
  }
    `;

const LayoutGrid = styled.div`  display: grid;
  grid-template-columns: 1fr 1.5fr;
  gap: 40px;
  align-items: start;

  @media (max-width: 1024px) {
    grid-template-columns: 1fr;
    gap: 30px;
  } `;
const ListColumn = styled.div`
  display: ${(props) => (props.$hideOnMobile ? "none" : "flex")};
  flex-direction: column;
  gap: 16px;
  opacity: 0;
  transform: translateX(-40px);
  animation: ${(props) =>
    props.$animate
      ? css`${slideInLeft} 0.8s ease-out forwards`
      : "none"};

  @media (min-width: 992px) {
    display: flex;
  }
`;
const DetailsColumn = styled.div`
  position: sticky;
  top: 100px;
  display: ${(props) => (props.$hideOnMobile ? "none" : "block")};
  opacity: 0;
  transform: translateX(40px);
  animation: ${(props) =>
    props.$animate
      ? css`${slideInRight} 0.8s ease-out forwards`
      : "none"};
  animation-delay: 0.1s;

  @media (min-width: 992px) {
    display: block;
  }

  @media (max-width: 1024px) {
    position: static;
  }
`;
const JobCard = styled(Link)`
 display: block; 
 background: #ffffff;
  border: 1px solid ${(props) => (props.$selected ? "rgb(88, 53, 242)" : "#e5e7eb")};
   border-radius: 12px;
    padding: 24px;
     text-decoration: none;
     @media (max-width: 768px) {
    padding: 18px;
  }

      h3 {
        font-size: 18px;

    @media (max-width: 768px) {
      font-size: 16px;
    }
  }

       p {
        font-size: 14px; 
        color: #6b7280; 
        margin: 0 0 16px; 
        } 
        .tags { 
        display: flex;
         gap: 8px; 
         span { 
         background: #f3f1fe;
          color: rgb(88, 53, 242);
           padding: 4px 12px; 
           border-radius: 5px;
            font-size: 12px; 
            } 
            }`;
const EmptyState = styled.p` text-align: center; color: #6b7280; padding: 40px 0; font-size: 15px; `;
const DetailsPane = styled.div`
 background: #ffffff;
  border: 1px solid #e5e7eb;
  border-radius: 16px;
   padding: 40px; 
    @media (max-width: 1024px) {
    padding: 28px;
  }
   @media (max-width: 768px) {
    padding: 20px;
  }
   .pane-header { 
   display: flex;
    justify-content: space-between; 
    align-items: center;
     border-bottom: 1px solid #e5e7eb;
      padding-bottom: 25px;
       margin-bottom: 25px;

       @media (max-width: 600px) {
      flex-direction: column;
      align-items: flex-start;
      gap: 12px;
    }
        h2 { 
        margin: 0; 
        } 
        } 
        h3 { 
        margin: 30px 0 15px; 
        }
         p, li {
          font-size: 15px; color: #4b5563; } ul { padding-left: 20px; }`;


const MetaGrid = styled.div` background: #f9fafb; border: 1px solid #e5e7eb; border-radius: 12px; padding: 25px; margin-top: 40px; display: flex; flex-direction: column; gap: 15px; .meta-row { display: flex; justify-content: space-between; align-items: center; padding-bottom: 15px; border-bottom: 1px solid #e5e7eb; &:last-child { border-bottom: none; padding-bottom: 0; } }`;

// ============================================================================
// MAIN COMPONENT
// ============================================================================
const CareerPage = () => {
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState(""); // success / error
  const [leftVisible, setLeftVisible] = useState(false);
  const [rightVisible, setRightVisible] = useState(false);
  const leftRef = useRef(null);
  const rightRef = useRef(null);
  const searchParams = useSearchParams();
  const activeFilter = searchParams.get("filter") || "View All";
  const selectedJobId = searchParams.get("jobId") || null;

  const filteredJobs = filterJobs(jobs, activeFilter);
  const selectedJob = selectedJobId
    ? jobs.find((j) => j.id.toString() === selectedJobId)
    : filteredJobs[0];

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.target === leftRef.current && entry.isIntersecting) {
            setLeftVisible(true);
          }
          if (entry.target === rightRef.current && entry.isIntersecting) {
            setRightVisible(true);
          }
        });
      },
      { threshold: 0.2 }
    );

    if (leftRef.current) observer.observe(leftRef.current);
    if (rightRef.current) observer.observe(rightRef.current);

    return () => {
      observer.disconnect();
    };
  }, []);

  // Modal & Form State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    file: null,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];

    if (!file) return;

    // ✅ File size limit (5MB)
    if (file.size > 5 * 1024 * 1024) {
      alert("File too large (max 5MB)");
      return;
    }

    setFormData((prev) => ({
      ...prev,
      file,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.file) {
      alert("Please upload your resume");
      return;
    }

    setIsSubmitting(true);

    try {
      const form = new FormData();

      form.append("name", formData.name);
      form.append("email", formData.email);
      form.append("phone", formData.phone);
      form.append("jobTitle", selectedJob.title);
      form.append("file", formData.file); // 👈 real file

      const response = await fetch("/api/apply", {
        method: "POST",
        body: form,
      });

      let data;

      try {
        data = await response.json();
      } catch (err) {
        // 👇 THIS handles HTML error response
        setMessage("Server error. Please try again.");
        setMessageType("error");
        setIsSubmitting(false);
        return;
      }

      if (data.success) {
        setMessage("Application submitted successfully!");
        setMessageType("success");

        setIsModalOpen(false);
        setFormData({
          name: "",
          phone: "",
          email: "",
          file: null,
        });

        setTimeout(() => setMessage(""), 3000);
      } else {
        setMessage(data.error || "Failed to send application.");
        setMessageType("error");
      }
      if (response.ok) {
        setMessage("Application submitted successfully!");
        setMessageType("success");

        setIsModalOpen(false);

        setFormData({
          name: "",
          phone: "",
          email: "",
          file: null,
        });

        // auto hide after 3 sec
        setTimeout(() => setMessage(""), 3000);
      } else {
        setMessage("Failed to send application.");
        setMessageType("error");
      }
    } catch (error) {
      console.error(error);
      alert("Error occurred.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Section>
        <Container>
          <img
            src="/assets/images/career.svg"
            alt="Contact FOX LAB"
            className="illustration"
            style={{ height: "auto" }}
          />
          <HeaderArea>
            <span className="sub-title">We are Hiring!</span>
            <h1>Your Future Begins Here</h1>
            <p className="custom-lead-text">
              FOX LAB is powered by innovators, creators, and thinkers. We value
              flat hierarchies, clear communication, and full responsibility. If
              you’re ready to craft the extraordinary, we’re ready for you.
            </p>
          </HeaderArea>

          <FilterGroup>
            {filters.map((filter) => (
              <FilterBtn key={filter} href={`?filter=${filter}`} scroll={false} $active={activeFilter === filter}>
                {filter}
              </FilterBtn>
            ))}
          </FilterGroup>

          <LayoutGrid>
            <ListColumn ref={leftRef} $hideOnMobile={!!selectedJobId} $animate={leftVisible}>
              {filteredJobs.map((job) => {
                const isSelected = selectedJob?.id === job.id;
                return (
                  <JobCard key={job.id} href={`?filter=${activeFilter}&jobId=${job.id}`} scroll={false} $selected={isSelected}>
                    <h3>{job.title}</h3>
                    <p>{job.description}</p>
                    <div className="tags">
                      <span>{job.type}</span>
                      <span>{job.duration}</span>
                    </div>
                  </JobCard>
                );
              })}
              {filteredJobs.length === 0 && <EmptyState>No jobs found for this category.</EmptyState>}
            </ListColumn>

            <DetailsColumn ref={rightRef} $hideOnMobile={!selectedJobId} $animate={rightVisible}>
              <DetailsPane key={selectedJob?.id}>
                {selectedJob ? (
                  <>
                    <div className="pane-header">
                      <h2>{selectedJob.title}</h2>
                      {/* Changed from Link to Button to trigger Modal */}
                      <ThemeButton onClick={() => setIsModalOpen(true)}>
                        Apply Now <VscGitStashApply />
                      </ThemeButton>
                    </div>

                    <h3>Full Job Description</h3>
                    <p>{selectedJob.fullDescription}</p>

                    <h3>Responsibilities</h3>
                    <ul>
                      {selectedJob.responsibilities?.map((resp, index) => (
                        <li key={index}>{resp}</li>
                      ))}
                    </ul>

                    <h3>Key Skills & Technologies</h3>
                    <ul>
                      {selectedJob.skills?.map((skill, index) => (
                        <li key={index}>{skill}</li>
                      ))}
                    </ul>

                    <MetaGrid>
                      <div className="meta-row">
                        <strong>Working hours:</strong>
                        <span>{selectedJob.workingHours}</span>
                      </div>
                      <div className="meta-row">
                        <strong>Location:</strong>
                        <span>{selectedJob.location}</span>
                      </div>
                      <div className="meta-row">
                        <strong>Job Type:</strong>
                        <span>{selectedJob.jobType}</span>
                      </div>
                    </MetaGrid>
                  </>
                ) : (
                  <div style={{ display: 'flex', height: '100%', alignItems: 'center', justifyContent: 'center' }}>
                    <EmptyState>Select a job to view details.</EmptyState>
                  </div>
                )}
              </DetailsPane>
            </DetailsColumn>
          </LayoutGrid>
        </Container>
      </Section>

      {/* --- Apply Modal --- */}
      {isModalOpen && (
        <ModalOverlay onClick={() => setIsModalOpen(false)}>
          <ModalContent onClick={(e) => e.stopPropagation()}>
            <button className="close-btn" onClick={() => setIsModalOpen(false)}>
              <FaTimes />
            </button>
            <h3>Apply for {selectedJob?.title}</h3>

            <form onSubmit={handleSubmit}>
              <FormGroup>
                <label>Name</label>
                <input type="text" name="name" required value={formData.name} onChange={handleInputChange} placeholder="John Doe" />
              </FormGroup>

              <FormGroup>
                <label>Email Address</label>
                <input type="email" name="email" required value={formData.email} onChange={handleInputChange} placeholder="john@example.com" />
              </FormGroup>

              <FormGroup>
                <label>Phone Number</label>
                <input type="tel" name="phone" required value={formData.phone} onChange={handleInputChange} placeholder="+91 0000000000" />
              </FormGroup>

              <FormGroup>
                <label>Resume/CV (PDF or Word)</label>
                <input type="file" accept=".pdf,.doc,.docx" required onChange={handleFileChange} />
              </FormGroup>

              <ThemeButton type="submit" disabled={isSubmitting}>
                {isSubmitting ? "Sending..." : "Submit Application"}
              </ThemeButton>
            </form>
          </ModalContent>
        </ModalOverlay>
      )}
      {message && (
        <div
          style={{
            position: "fixed",
            bottom: "20px",
            right: "20px",
            padding: "14px 20px",
            borderRadius: "8px",
            color: "#fff",
            fontWeight: "600",
            background:
              messageType === "success" ? "#16a34a" : "#dc2626",
            boxShadow: "0 10px 25px rgba(0,0,0,0.2)",
            zIndex: 2000,
          }}
        >
          {message}
        </div>
      )}
      <Footer />
    </>
  );
};

export default CareerPage;