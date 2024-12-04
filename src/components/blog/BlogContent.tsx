import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Facebook, Twitter, Linkedin, Share2 } from "lucide-react";
import SidebarAd from "@/components/ads/SidebarAd";

interface BlogContentProps {
  post: {
    title: string;
    content: string;
    category: string;
    created_at: string;
  };
}

export const BlogContent = ({ post }: BlogContentProps) => {
  const shareUrl = window.location.href;
  const title = encodeURIComponent(post.title);

  const shareLinks = {
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${shareUrl}`,
    twitter: `https://twitter.com/intent/tweet?url=${shareUrl}&text=${title}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${shareUrl}`,
  };

  return (
    <article className="glass-card p-8">
      <h1 className="text-4xl font-bold mb-4">{post.title}</h1>
      <div className="flex items-center gap-4 mb-6">
        <span className="text-sm text-muted-foreground">
          {new Date(post.created_at).toLocaleDateString()}
        </span>
        <span className="text-sm bg-secondary/20 text-secondary px-3 py-1 rounded-full">
          {post.category}
        </span>
      </div>

      <div 
        className="blog-content prose max-w-none" 
        dangerouslySetInnerHTML={{ __html: post.content }}
      />
      
      <div className="mt-8 border-t pt-6">
        <h3 className="text-lg font-semibold mb-4">Share this article</h3>
        <div className="flex gap-4">
          <a
            href={shareLinks.facebook}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-[#1877F2] hover:bg-[#1877F2]/90 text-white p-2 rounded-full"
          >
            <Facebook className="h-5 w-5" />
          </a>
          <a
            href={shareLinks.twitter}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-[#1DA1F2] hover:bg-[#1DA1F2]/90 text-white p-2 rounded-full"
          >
            <Twitter className="h-5 w-5" />
          </a>
          <a
            href={shareLinks.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-[#0A66C2] hover:bg-[#0A66C2]/90 text-white p-2 rounded-full"
          >
            <Linkedin className="h-5 w-5" />
          </a>
        </div>
      </div>

      <SidebarAd />
    </article>
  );
};