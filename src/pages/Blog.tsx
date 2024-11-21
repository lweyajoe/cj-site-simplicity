import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";

const categories = [
  "real estate",
  "tax",
  "insurance",
  "personal finance",
  "treasury bills and bonds",
  "start-ups",
  "unit trusts"
];

const Blog = () => {
  const [posts, setPosts] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [latestArticles, setLatestArticles] = useState([]);
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch("https://portal.omabracredit.co.ke/api.php?action=fetchPosts");
        const data = await response.json();
        setPosts(data);
        setFilteredPosts(data);
        setLatestArticles(data.slice(0, 5)); // Get latest 5 posts
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
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

  return (
    <div className="min-h-screen flex flex-col bg-accent">
      <Navbar />
      <main className="flex-grow py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Main content area */}
            <div className="lg:col-span-8">
              <h1 className="text-4xl font-bold mb-8 text-primary">Blog</h1>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredPosts.map((post) => (
                  <Link to={`/blog/${post.slug}`} key={post.id}>
                    <article className="glass-card hover:shadow-lg transition-shadow duration-300">
                      <img
                        src={post.image || "/placeholder.svg"}
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

            {/* Sidebar */}
            <aside className="lg:col-span-4 space-y-8">
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
                  {latestArticles.map((article) => (
                    <Link key={article.id} to={`/blog/${article.slug}`} className="block group">
                      <div className="space-y-1">
                        <span className="text-xs font-semibold text-secondary uppercase tracking-wider">
                          {article.category}
                        </span>
                        <h4 className="text-sm font-medium group-hover:text-secondary transition-colors">
                          {article.title}
                        </h4>
                        <span className="text-xs text-muted-foreground">{article.date}</span>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </aside>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Blog;
