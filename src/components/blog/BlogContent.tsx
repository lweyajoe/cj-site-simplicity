import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

interface BlogContentProps {
  post: {
    title: string;
    content: string;
    category: string;
    created_at: string;
  };
}

export const BlogContent = ({ post }: BlogContentProps) => {
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
      <div className="prose max-w-none" dangerouslySetInnerHTML={{ __html: post.content }}></div>
    </article>
  );
};