import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

const BlogPost = () => {
  const { id: slug } = useParams();
  const [post, setPost] = useState<any>(null);
  const [categories] = useState([
    "real estate",
    "tax",
    "insurance",
    "personal finance",
    "treasury bills and bonds",
    "start-ups",
    "unit trusts",
  ]);
  const [latestPosts, setLatestPosts] = useState<any[]>([]);

  useEffect(() => {
    // Fetch the current post
    const fetchPost = async () => {
      const response = await fetch(`http://localhost/backend/api.php?slug=${slug}`);
      if (response.ok) {
        const data = await response.json();
        setPost(data);
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
            {/* Categories Sidebar */}
            <div className="glass-card p-6 sticky top-4">
              <h3 className="text-xl font-semibold mb-4">Read my articles on</h3>
              <nav>
                <ul className="space-y-2">
                  {categories.map((category) => (
                    <li key={category}>
                      <a
                        href={`/blog/category/${category}`}
                        className="block py-2 text-secondary hover:text-primary transition-colors"
                      >
                        {category.charAt(0).toUpperCase() + category.slice(1)}
                      </a>
                    </li>
                  ))}
                </ul>
              </nav>
            </div>

            {/* Latest Posts */}
            <div className="glass-card p-6">
              <h3 className="text-xl font-semibold mb-4">Latest Posts</h3>
              <div className="space-y-4">
                {latestPosts.map((latestPost) => (
                  <a
                    key={latestPost.id}
                    href={`/blog/${latestPost.slug}`}
                    className="block group"
                  >
                    <div className="space-y-1">
                      <span className="text-xs font-semibold text-secondary uppercase tracking-wider">
                        {latestPost.category}
                      </span>
                      <h4 className="text-sm font-medium group-hover:text-secondary transition-colors">
                        {latestPost.title}
                      </h4>
                      <span className="text-xs text-muted-foreground">
                        {latestPost.created_at}
                      </span>
                    </div>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default BlogPost;
