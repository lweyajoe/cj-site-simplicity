import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { Helmet } from "react-helmet-async";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { BlogContent } from "@/components/blog/BlogContent";
import { Sidebar } from "@/components/blog/Sidebar";
import { supabase } from "@/supabaseClient";

const BlogPost = () => {
  const { id: slug } = useParams();
  const categories = [
    "real estate",
    "tax",
    "insurance",
    "personal finance",
    "treasury bills and bonds",
    "start-ups",
    "unit trusts",
  ];

  const { data: post, isLoading: postLoading } = useQuery({
    queryKey: ["blog-post", slug],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("blog_posts")
        .select("*")
        .eq("slug", slug)
        .single();

      if (error) throw error;
      return data;
    },
  });

  const { data: latestPosts = [] } = useQuery({
    queryKey: ["latest-posts"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("blog_posts")
        .select("id, title, slug, created_at, category")
        .order("created_at", { ascending: false })
        .limit(5);

      if (error) throw error;
      return data;
    },
  });

  // Extract first image URL from content if exists
  const getFirstImageUrl = (content: string) => {
    const match = content?.match(/<img[^>]+src="([^">]+)"/);
    return match ? match[1] : '/placeholder.jpg';
  };

  // Generate keywords from category and title
  const generateKeywords = (post: any) => {
    if (!post) return '';
    const baseKeywords = ['CPAJoe', 'financial advisory', 'Kenya'];
    const titleWords = post.title.toLowerCase().split(' ').filter((w: string) => w.length > 3);
    const categoryWords = post.category.split(',').map((c: string) => c.trim());
    return [...baseKeywords, ...titleWords, ...categoryWords].join(', ');
  };

  if (postLoading) {
    return (
      <div className="min-h-screen flex flex-col bg-gradient-to-br from-background to-accent/30">
        <Navbar />
        <main className="flex-grow container mx-auto px-4 py-8">
          <div className="animate-pulse space-y-4">
            <div className="h-8 bg-gray-200 rounded w-3/4"></div>
            <div className="h-4 bg-gray-200 rounded w-1/4"></div>
            <div className="space-y-2">
              <div className="h-4 bg-gray-200 rounded"></div>
              <div className="h-4 bg-gray-200 rounded"></div>
              <div className="h-4 bg-gray-200 rounded w-5/6"></div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen flex flex-col bg-gradient-to-br from-background to-accent/30">
        <Navbar />
        <main className="flex-grow container mx-auto px-4 py-8">
          <h1 className="text-2xl font-bold">Post not found</h1>
        </main>
        <Footer />
      </div>
    );
  }

  const imageUrl = getFirstImageUrl(post.content);
  const keywords = generateKeywords(post);
  const baseUrl = window.location.origin;
  const postUrl = `${baseUrl}/blog/${post.slug}`;

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-background to-accent/30">
      <Helmet>
        {/* Basic Meta Tags */}
        <title>{`${post.title} - CPAJoe Financial Advisory`}</title>
        <meta name="description" content={`${post.title}. Read more about ${post.category} on CPAJoe Financial Advisory.`} />
        
        {/* SEO Meta Tags */}
        <meta name="robots" content="index, follow" />
        <meta name="keywords" content={keywords} />
        
        {/* Open Graph / Facebook */}
        <meta property="og:type" content="article" />
        <meta property="og:title" content={`${post.title} - CPAJoe`} />
        <meta property="og:description" content={`Read about ${post.title} and learn more about ${post.category} on CPAJoe Financial Advisory.`} />
        <meta property="og:url" content={postUrl} />
        <meta property="og:site_name" content="CPAJoe - Financial Advisory" />
        <meta property="og:image" content={imageUrl} />
        
        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={`${post.title} - CPAJoe`} />
        <meta name="twitter:description" content={`Read about ${post.title} and learn more about ${post.category} on CPAJoe Financial Advisory.`} />
        <meta name="twitter:image" content={imageUrl} />
        <meta name="twitter:site" content="@CPAJoeKenya" />
      </Helmet>

      <Navbar />
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-8">
            <BlogContent post={post} />
          </div>
          <Sidebar categories={categories} latestPosts={latestPosts} />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default BlogPost;