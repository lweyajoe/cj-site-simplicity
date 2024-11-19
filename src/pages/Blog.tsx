import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

const Blog = () => {
  const [posts, setPosts] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [latestPosts, setLatestPosts] = useState([]);
  const [searchParams] = useSearchParams();

  // Fetch all blog posts
  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch("http://localhost/backend/api.php");
      const data = await response.json();
      setPosts(data);
    };

    fetchPosts();
  }, []);

  // Filter posts based on selected category
  useEffect(() => {
    const category = searchParams.get("category");
    if (category) {
      const filtered = posts.filter(
        (post) => post.category.toLowerCase() === category.toLowerCase()
      );
      setFilteredPosts(filtered);
    } else {
      setFilteredPosts(posts);
    }
  }, [searchParams, posts]);

  // Fetch categories for the sidebar
  useEffect(() => {
    const fetchCategories = async () => {
      const response = await fetch("http://localhost/backend/api.php?categories=true");
      if (response.ok) {
        const data = await response.json();
        setCategories(data);
      }
    };

    fetchCategories();
  }, []);

  // Fetch latest posts for the sidebar
  useEffect(() => {
    const fetchLatestPosts = async () => {
      const response = await fetch("http://localhost/backend/api.php?latest=true");
      if (response.ok) {
        const data = await response.json();
        setLatestPosts(data);
      }
    };

    fetchLatestPosts();
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-accent">
      <Navbar />
      <main className="flex-grow py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold mb-8 text-primary">Blog</h1>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Blog Posts */}
            {filteredPosts.map((post) => (
              <Link to={`/blog/${post.slug}`} key={post.id}>
                <article className="glass-card hover:shadow-lg transition-shadow duration-300">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-48 object-cover rounded-t-xl"
                  />
                  <div className="p-6">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm text-secondary font-medium">
                        {post.category}
                      </span>
                      <span className="text-sm text-gray-500">{post.date}</span>
                    </div>
                    <h2 className="text-xl font-semibold mb-2 text-primary">
                      {post.title}
                    </h2>
                    <p className="text-gray-600 mb-4">{post.excerpt}</p>
                    <span className="text-secondary hover:text-primary transition-colors">
                      Read more →
                    </span>
                  </div>
                </article>
              </Link>
            ))}
          </div>
        </div>
      </main>

      {/* Sidebar with Categories and Latest Posts */}
      <aside className="lg:col-span-4 px-6 py-8">
        <div className="space-y-8">
          {/* Categories */}
          <div>
            <h2 className="text-xl font-semibold mb-4">Categories</h2>
            <ul className="space-y-2">
              {categories.map((cat) => (
                <li key={cat.category}>
                  <Link
                    to={`/blog?category=${cat.category}`}
                    className="text-blue-600 hover:underline"
                  >
                    {cat.category}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Latest Posts */}
          <div>
            <h2 className="text-xl font-semibold mb-4">Latest Posts</h2>
            <ul className="space-y-2">
              {latestPosts.map((post) => (
                <li key={post.id}>
                  <Link
                    to={`/blog/${post.slug}`}
                    className="text-blue-600 hover:underline"
                  >
                    {post.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </aside>

      <Footer />
    </div>
  );
};

export default Blog;

