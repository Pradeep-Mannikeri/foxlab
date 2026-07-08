import BlogClient from "./BlogClient";

// ✅ SEO METADATA (SERVER SIDE)
export const metadata = {
  title: "Blog | Insights, News & Digital Trends | FOX LAB",
  description:
    "Stay updated with FOX LAB’s recent work, creative breakthroughs, and the latest trends shaping the digital world. Learn, get inspired, and see what’s next in tech.",
  keywords: [
    "tech blog India",
    "digital marketing tips",
    "software development news",
    "creative design trends",
    "FOX LAB blog",
    "web development insights",
    "IT industry updates"
  ],
};

export default function Page() {
  return <BlogClient />;
}