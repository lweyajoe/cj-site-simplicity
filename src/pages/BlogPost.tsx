import { useEffect, useState } from "react";
import { Link, useParams, useLocation, useSearchParams } from "react-router-dom";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { DiscussionEmbed } from 'disqus-react'; // Import Disqus components
import { CommentCount } from 'disqus-react';
import { generateTableOfContents } from '../scripts/toc.js'; // Import the ToC generation function
import { supabase } from "@/supabaseClient"; // Ensure your Supabase client is set up

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

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const fetchPost = async () => {
          try {
            const { data, error } = await supabase
              .from("blog_posts")
              .select("*")
              .eq("slug", slug)
              .single();
        
            if (error) throw error;
            setPost(data);
          } catch (error) {
            console.error("Error fetching post:", error.message);
          }
        };
              } catch (error) {
        console.error("Error fetching post:", error);
      }
    };

    const fetchLatestPosts = async () => {
      try {
        const fetchLatestPosts = async () => {
          try {
            const { data, error } = await supabase
              .from("blog_posts")
              .select("id, title, slug, created_at, category")
              .order("created_at", { ascending: false })
              .limit(5);
        
            if (error) throw error;
            setLatestPosts(data);
          } catch (error) {
            console.error("Error fetching latest posts:", error.message);
          }
        };
              } catch (error) {
        console.error("Error fetching latest posts:", error);
      }
    };

    fetchPost();
    fetchLatestPosts();
  }, [slug]);

  useEffect(() => {
    const category = searchParams.get("category");
    if (category) {
      const fetchFilteredPosts = async () => {
        try {
          const fetchFilteredPosts = async () => {
            try {
              const { data, error } = await supabase
                .from("blog_posts")
                .select("id, title, slug, created_at, category")
                .eq("category", category)
                .order("created_at", { ascending: false });
          
              if (error) throw error;
              setFilteredPosts(data);
            } catch (error) {
              console.error("Error fetching filtered posts:", error.message);
            }
          };
                  } catch (error) {
          console.error("Error fetching filtered posts:", error);
        }
      };

      fetchFilteredPosts();
    } else {
      setFilteredPosts([]);
    }
  }, [searchParams]);

  // Generate ToC dynamically based on <h3> tags
  useEffect(() => {
    if (post) {
      const toc = document.querySelector("#toc");
      const headings = document.querySelectorAll("article h3");
      let tocContent = "<div class='pd-20 card-box mb-30'><h4 class='h4 text-blue mb-10'>On this page:</h4><ul>";

      headings.forEach((heading, index) => {
        const title = heading.textContent;
        const link = `#${heading.id || `heading-${index + 1}`}`;
        heading.id = heading.id || `heading-${index + 1}`;  // Assign id to headings

        tocContent += `
          <li>
            <a class='btn btn-success btn-lg mb-0 mb-md-3 w-100' href='${link}'>
              ${title}
            </a>
          </li>
        `;
      });

      tocContent += "</ul></div>";

      if (toc) {
        toc.innerHTML = tocContent;
      }
    }
  }, [post]);

  if (!post) return <p>Loading...</p>;

  // Disqus configuration

  const disqusConfig = {
    url: `https://cpajoe.netlify.app/blog/${slug}`,
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

              {/* Table of Contents */}
              <div id="toc"></div>

              {/* Post Content */}
              <div className="prose max-w-none" dangerouslySetInnerHTML={{ __html: post.content }}></div>

              {/* Disqus Comment Section */}
              <div className="mt-12">
                <h2 className="text-2xl font-bold mb-6">Comments</h2>
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
