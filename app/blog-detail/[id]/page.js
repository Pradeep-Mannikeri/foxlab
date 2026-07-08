import BlogDetailClient from "./BlogDetailClient";
import blogList from "../../../utils/blogNews";

// ✅ DYNAMIC SEO METADATA (SERVER SIDE)
export async function generateMetadata({ params }) {
  const resolvedParams = await params;
  const decodedId = decodeURIComponent(resolvedParams.id);
  const blogs = blogList();
  const blog = blogs.find((b) => b.title === decodedId) || blogs[0];

  return {
    title: `${blog.title} | Blog | FOX LAB`,
    description: blog.description_1?.substring(0, 160) || "Read the latest insights from FOX LAB.",
    keywords: [
      blog.title,
      blog.category || "Technology",
      "FOX LAB blog",
      "digital insights",
      "tech news India",
      "creative solutions blog"
    ],
  };
}

export default function Page({ params }) {
  return <BlogDetailClient params={params} />;
}