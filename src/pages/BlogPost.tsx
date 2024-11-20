import { useEffect, useState } from "react";
import { Link, useParams, useLocation, useSearchParams } from "react-router-dom";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { DiscussionEmbed } from 'disqus-react'; // Import Disqus components
import { CommentCount } from 'disqus-react';

const BlogPost = () => {
  const { id: slug } = useParams();
  const location = useLocation();
  const [searchParams] = useSearchParams();
  const [post, setPost] = useState(null);
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [latestPosts, setLatestPosts] = useState([]);
  const [categories] = useState([
    "real estate",
    "tax",
    "insurance",
    "personal finance",
    "treasury bills and bonds",
    "start-ups",
    "unit trusts",
  ]);

  // Fetch the blog post based on slug
  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await axios.get(
          `https://cjblog.cpajoe.co.ke/backend/api.php?action=fetchPost&slug=${slug}`
        );
        setPost(response.data);
      } catch (error) {
        console.error("Error fetching post:", error);
      }
    };

    // Fetch latest posts for sidebar
    const fetchLatestPosts = async () => {
      try {
        const response = await axios.get(
          "https://cjblog.cpajoe.co.ke/backend/api.php?action=latestPosts"
        );
        setLatestPosts(response.data);
      } catch (error) {
        console.error("Error fetching latest posts:", error);
      }
    };

    fetchPost();
    fetchLatestPosts();
  }, [slug]);

  // Filter posts based on category from URL search params
  useEffect(() => {
    const category = searchParams.get("category");
    if (category) {
      // Fetch posts filtered by category
      const fetchFilteredPosts = async () => {
        try {
          const response = await axios.get(
            `https://cjblog.cpajoe.co.ke/backend/api.php?action=fetchPostsByCategory&category=${category}`
          );
          setFilteredPosts(response.data);
        } catch (error) {
          console.error("Error fetching filtered posts:", error);
        }
      };

      fetchFilteredPosts();
    } else {
      // If no category selected, reset the filtered posts
      setFilteredPosts([]);
    }
  }, [searchParams]);

  if (!post) return <p>Loading...</p>;

  // Disqus configuration
  const disqusConfig = {
    url: `http://cjblog.cpajoe.co.ke/blog/${slug}`,
    identifier: slug,
    title: post.title,
    language: 'en',
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-background to-accent/30">
      <Navbar />
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-8">
            <article className="glass-card p-8">
              <h1 className="text-4xl font-bold mb-4">{post.title}</h1>
              <div className="flex items-center gap-4 mb-6">
                <span className="text-sm text-muted-foreground">{post.created_at}</span>
                <span className="text-sm bg-secondary/20 text-secondary px-3 py-1 rounded-full">
                  {post.category}
                </span>
              </div>
              <div className="prose max-w-none" dangerouslySetInnerHTML={{ __html: post.content }}></div>

              {/* Disqus Comment Section */}
              <div className="mt-12">
                <h3 className="text-2xl font-bold mb-6">Comments</h3>
                {/* Disqus Comment Count */}
                <CommentCount
                  shortname="cpajoe" // Replace with your Disqus shortname
                  config={disqusConfig}
                >
                  {/* Fallback placeholder text */}
                  Comments
                </CommentCount>

                {/* Disqus Discussion Embed */}
                <DiscussionEmbed
                  shortname="cpajoe" // Replace with your Disqus shortname
                  config={disqusConfig}
                />
              </div>
            </article>
          </div>

{/* Sidebar */}
<aside className="lg:col-span-4 space-y-8 relative max-h-[calc(100vh-3rem)] overflow-y-auto">
  {/* Categories Sidebar */}
  <div className="glass-card p-6 sticky top-4">
    <h3 className="text-xl font-semibold mb-4">Read my articles on</h3>
    <nav>
      <ul className="space-y-2">
        {categories.map((category) => (
          <li key={category}>
            <Link
              to={`/blog?category=${category}`}
              className="block py-2 text-secondary hover:text-primary transition-colors"
            >
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  </div>

  {/* Latest Articles */}
  <div className="glass-card p-6">
    <h3 className="text-xl font-semibold mb-4">Latest Articles</h3>
    <div className="space-y-4">
      {latestPosts.map((post) => (
        <Link key={post.id} to={`/blog/${post.slug}`} className="block group">
          <div className="space-y-1">
            <span className="text-xs font-semibold text-secondary uppercase tracking-wider">
              {post.category}
            </span>
            <h4 className="text-sm font-medium group-hover:text-secondary transition-colors">
              {post.title}
            </h4>
            <span className="text-xs text-muted-foreground">{post.created_at}</span>
          </div>
        </Link>
      ))}
    </div>
  </div>
</aside>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default BlogPost;
