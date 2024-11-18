import React from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Share2, Facebook, Twitter, Linkedin } from "lucide-react";

const categories = [
  "real estate",
  "tax",
  "insurance",
  "personal finance",
  "treasury bills and bonds",
  "start-ups",
  "unit trusts",
];

const latestArticles = [
  {
    id: 1,
    title: "Understanding Business Registration in Kenya",
    category: "start-ups",
    date: "2024-02-20",
  },
  {
    id: 2,
    title: "Tax Planning Strategies for SMEs",
    category: "tax",
    date: "2024-02-18",
  },
  {
    id: 3,
    title: "Investment Opportunities in Treasury Bills",
    category: "treasury bills and bonds",
    date: "2024-02-15",
  },
  {
    id: 4,
    title: "Real Estate Investment Trusts Explained",
    category: "real estate",
    date: "2024-02-12",
  },
  {
    id: 5,
    title: "Insurance Products for Business Protection",
    category: "insurance",
    date: "2024-02-10",
  },
];

const BlogPost = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-background to-accent/30">
      <Navbar />
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Main content area */}
          <div className="lg:col-span-8">
            <article className="glass-card p-8">
              <h1 className="text-4xl font-bold mb-4">
                Understanding Business Registration in Kenya
              </h1>
              <div className="flex items-center gap-4 mb-6">
                <span className="text-sm text-muted-foreground">
                  February 20, 2024
                </span>
                <span className="text-sm bg-secondary/20 text-secondary px-3 py-1 rounded-full">
                  Business
                </span>
              </div>

              {/* Table of Contents */}
              <div className="bg-accent/50 rounded-lg p-6 mb-8">
                <h2 className="text-xl font-semibold mb-4">On this page</h2>
                <ul className="space-y-2">
                  <li>
                    <a href="#introduction" className="text-secondary hover:text-primary">
                      Introduction
                    </a>
                  </li>
                  <li>
                    <a href="#requirements" className="text-secondary hover:text-primary">
                      Requirements
                    </a>
                  </li>
                  <li>
                    <a href="#process" className="text-secondary hover:text-primary">
                      Registration Process
                    </a>
                  </li>
                  <li>
                    <a href="#conclusion" className="text-secondary hover:text-primary">
                      Conclusion
                    </a>
                  </li>
                </ul>
              </div>

              {/* Article content */}
              <div className="prose max-w-none">
                <p>Your article content goes here...</p>
              </div>

              {/* Social Share */}
              <div className="border-t border-border mt-8 pt-6">
                <div className="flex items-center gap-2">
                  <span className="text-sm text-muted-foreground">Share:</span>
                  <div className="flex gap-2">
                    <Button variant="ghost" size="icon">
                      <Facebook className="h-5 w-5" />
                    </Button>
                    <Button variant="ghost" size="icon">
                      <Twitter className="h-5 w-5" />
                    </Button>
                    <Button variant="ghost" size="icon">
                      <Linkedin className="h-5 w-5" />
                    </Button>
                    <Button variant="ghost" size="icon">
                      <Share2 className="h-5 w-5" />
                    </Button>
                  </div>
                </div>
              </div>

              {/* Comments Section */}
              <div className="border-t border-border mt-8 pt-6">
                <h3 className="text-2xl font-semibold mb-6">Comments</h3>
                <Textarea
                  placeholder="Leave a comment..."
                  className="mb-4"
                />
                <Button>Post Comment</Button>
              </div>
            </article>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-4 space-y-8">
            {/* Read My Articles On Section */}
            <div className="glass-card p-6">
              <h3 className="text-xl font-semibold mb-4">Read My Articles On</h3>
              <div className="space-y-2">
                {categories.map((category) => (
                  <Link
                    key={category}
                    to={`/blog?category=${category}`}
                    className="block text-secondary hover:text-primary transition-colors"
                  >
                    {category.charAt(0).toUpperCase() + category.slice(1)}
                  </Link>
                ))}
              </div>
            </div>

            {/* Latest Articles Section */}
            <div className="glass-card p-6">
              <h3 className="text-xl font-semibold mb-4">Latest Articles</h3>
              <div className="space-y-4">
                {latestArticles.map((article) => (
                  <Link
                    key={article.id}
                    to={`/blog/${article.id}`}
                    className="block group"
                  >
                    <div className="space-y-1">
                      <span className="text-xs font-semibold text-secondary uppercase tracking-wider">
                        {article.category}
                      </span>
                      <h4 className="text-sm font-medium group-hover:text-secondary transition-colors">
                        {article.title}
                      </h4>
                      <span className="text-xs text-muted-foreground">
                        {article.date}
                      </span>
                    </div>
                  </Link>
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
