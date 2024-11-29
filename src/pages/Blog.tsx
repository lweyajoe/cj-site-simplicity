import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { supabase } from "@/supabaseClient";
import { Sidebar } from "@/components/blog/Sidebar";

const categories = [
  "real estate",
  "tax",
  "insurance",
  "personal finance",
  "treasury bills and bonds",
  "start-ups",
  "unit trusts",
];

const capitalize = (text) => text.charAt(0).toUpperCase() + text.slice(1);

const Blog = () => {
  const [posts, setPosts] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [latestArticles, setLatestArticles] = useState([]);
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const { data, error } = await supabase
          .from("blog_posts")
          .select("*")
          .order("created_at", { ascending: false });

        if (error) {
          console.error("Error fetching posts from Supabase:", error.message);
          return;
        }

        setPosts(data || []);
        setFilteredPosts(data || []);
        setLatestArticles(data.slice(0, 5));
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };

    fetchPosts();
  }, []);

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

  return (
    <div className="min-h-screen flex flex-col bg-accent">
      <Navbar />
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="py-12 bg-primary text-white">
          <div className="container mx-auto px-4">
            <h1 className="text-4xl font-bold mb-4 animate-fade-in">CJ's Blog</h1>
            <p className="text-xl mb-8 animate-fade-in">
              Explore our collection of insightful articles and expert advice on finance,
              business, and wealth management. Stay informed with the latest trends and
              strategies.
            </p>
          </div>
        </section>

        <div className="container mx-auto px-4 py-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div className="lg:col-span-8">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredPosts.map((post) => (
                  <Link to={`/blog/${post.slug}`} key={post.id}>
                    <article className="glass-card hover:shadow-lg transition-shadow duration-300">
                      <img
                        src={post.image || "/placeholder.jpg"}
                        alt={post.title}
                        className="w-full h-48 object-cover rounded-t-xl"
                      />
                      <div className="p-6">
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-sm text-secondary font-medium">
                            {post.category}
                          </span>
                          <span className="text-sm text-gray-500">
                            {new Date(post.created_at).toLocaleDateString()}
                          </span>
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

            <Sidebar categories={categories} latestArticles={latestArticles} />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Blog;