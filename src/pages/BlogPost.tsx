import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
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

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-background to-accent/30">
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