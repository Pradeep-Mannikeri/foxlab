import { Suspense } from "react";
import CareerClient from "./CareerClient";

// ✅ SEO METADATA (SERVER SIDE)
export const metadata = {
  title: "Careers | Join the FOX LAB Team",
  description:
    "Work with the most creative and technical minds. Join FOX LAB and build the future of digital solutions. Explore open positions in software engineering, design, and marketing.",
  keywords: [
    "jobs at FOX LAB",
    "software engineer careers India",
    "hiring UI UX designers",
    "join digital agency",
    "tech jobs Hubballi",
    "career opportunities in IT",
    "work with FOX LAB"
  ],
};

export default function Page() {
  return (
    <Suspense fallback={<div>Loading careers...</div>}>
      <CareerClient />
    </Suspense>
  );
}