import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/supabaseClient";
import { CommentForm } from "./CommentForm";
import { useToast } from "@/components/ui/use-toast";
import { Loader2 } from "lucide-react";

interface Comment {
  id: number;
  post_id: number;
  author_name: string;
  author_email: string;
  content: string;
  created_at: string;
  approval: number;
}

interface Reply {
  id: number;
  comment_id: number;
  author_name: string;
  author_email: string;
  content: string;
  created_at: string;
  approval: number;
}

export const Comments = ({ postId }: { postId: number }) => {
  const [replyingTo, setReplyingTo] = useState<number | null>(null);
  const { toast } = useToast();

  const { data: comments = [], isLoading: commentsLoading } = useQuery({
    queryKey: ["comments", postId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("comments")
        .select("*")
        .eq("post_id", postId)
        .eq("approval", 1)
        .order("created_at", { ascending: false });

      if (error) throw error;
      return data as Comment[];
    },
  });

  const { data: replies = [], isLoading: repliesLoading } = useQuery({
    queryKey: ["replies", postId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("replies")
        .select("*")
        .eq("approval", 1)
        .order("created_at", { ascending: true });

      if (error) throw error;
      return data as Reply[];
    },
  });

  if (commentsLoading || repliesLoading) {
    return (
      <div className="flex justify-center py-8">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <CommentForm postId={postId} type="comment" />
      
      <div className="space-y-6">
        {comments.map((comment) => (
          <div key={comment.id} className="glass-card p-6">
            <div className="flex items-start justify-between">
              <div>
                <h4 className="font-semibold">{comment.author_name}</h4>
                <p className="text-sm text-muted-foreground">
                  {new Date(comment.created_at).toLocaleDateString()}
                </p>
              </div>
            </div>
            <p className="mt-2">{comment.content}</p>
            
            <button
              onClick={() => setReplyingTo(replyingTo === comment.id ? null : comment.id)}
              className="mt-2 text-sm text-primary hover:text-primary/80"
            >
              Reply
            </button>

            {replyingTo === comment.id && (
              <div className="mt-4">
                <CommentForm
                  postId={postId}
                  type="reply"
                  commentId={comment.id}
                  onSuccess={() => setReplyingTo(null)}
                />
              </div>
            )}

            <div className="ml-8 mt-4 space-y-4">
              {replies
                .filter((reply) => reply.comment_id === comment.id)
                .map((reply) => (
                  <div key={reply.id} className="glass-card p-4">
                    <div>
                      <h4 className="font-semibold">{reply.author_name}</h4>
                      <p className="text-sm text-muted-foreground">
                        {new Date(reply.created_at).toLocaleDateString()}
                      </p>
                    </div>
                    <p className="mt-2">{reply.content}</p>
                  </div>
                ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};