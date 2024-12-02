import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Facebook, Twitter, Linkedin, Share2 } from "lucide-react";

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
      <style>
        {`
          .blog-content h3 {
            color: #7E69AB;
            font-size: 1.5rem;
            margin: 1.5rem 0 1rem;
            font-weight: 600;
          }
          
          .blog-content a {
            color: #9b87f5;
            text-decoration: none;
          }
          
          .blog-content a:hover {
            text-decoration: underline;
          }
          
          .blog-content blockquote {
            border-left: 4px solid #9b87f5;
            padding-left: 1rem;
            margin: 1rem 0;
            color: #666;
          }
          
          .blog-content img {
            max-width: 100%;
            height: auto;
            margin: 1rem 0;
            border-radius: 0.5rem;
          }
          
          .blog-content table {
            width: 100%;
            border-collapse: collapse;
            margin: 1rem 0;
          }
          
          .blog-content td,
          .blog-content th {
            border: 1px solid #ddd;
            padding: 8px;
          }
          
          .blog-content th {
            background-color: #f5f5f5;
          }
        `}
      </style>
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
    </article>
  );
};