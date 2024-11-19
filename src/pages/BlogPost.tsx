import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

const BlogPost = () => {
  const { id: slug } = useParams();
  const [post, setPost] = useState(null);
  const [categories, setCategories] = useState([]);
  const [latestPosts, setLatestPosts] = useState([]);

  useEffect(() => {
    // Fetch the current post
    const fetchPost = async () => {
      const response = await fetch(`http://localhost/backend/api.php?slug=${slug}`);
      if (response.ok) {
        const data = await response.json();
        setPost(data);
      }
    };

    // Fetch categories for the sidebar
    const fetchCategories = async () => {
      const response = await fetch("http://localhost/backend/api.php?categories=true");
      if (response.ok) {
        const data = await response.json();
        setCategories(data);
      }
    };

    // Fetch latest posts for the sidebar
    const fetchLatestPosts = async () => {
      const response = await fetch("http://localhost/backend/api.php?latest=true");
      if (response.ok) {
        const data = await response.json();
        setLatestPosts(data);
      }
    };

    fetchPost();
    fetchCategories();
    fetchLatestPosts();
  }, [slug]);

  if (!post) return <p>Loading...</p>;

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-background to-accent/30">
      <Navbar />
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Main content */}
          <div className="lg:col-span-8">
            <article className="glass-card p-8">
              <h1 className="text-4xl font-bold mb-4">{post.title}</h1>
              <div className="flex items-center gap-4 mb-6">
                <span className="text-sm text-muted-foreground">{post.created_at}</span>
                <span className="text-sm bg-secondary/20 text-secondary px-3 py-1 rounded-full">{post.category}</span>
              </div>
              <div className="prose max-w-none">{post.content}</div>
            </article>
          </div>
          {/* Sidebar */}
          <div className="lg:col-span-4 space-y-8">
            <div>
              <h2 className="text-xl font-semibold">Categories</h2>
              <ul>
                {categories.map((cat) => (
                  <li key={cat.category} className="mb-2">
                    <a href={`/blog/category/${cat.category}`} className="text-blue-600 hover:underline">
                      {cat.category}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h2 className="text-xl font-semibold">Latest Posts</h2>
              <ul>
                {latestPosts.map((post) => (
                  <li key={post.id} className="mb-2">
                    <a href={`/blog/${post.slug}`} className="text-blue-600 hover:underline">
                      {post.title}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default BlogPost;
