import { useNavigate } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";
import Navbar from "@/components/layout/Navbar";
import { supabase } from "@/supabaseClient";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { CommentTable } from "@/components/admin/CommentTable";
import { ReplyTable } from "@/components/admin/ReplyTable";

const CommentsManagement = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: comments = [], isLoading: commentsLoading } = useQuery({
    queryKey: ["admin-comments"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("comments")
        .select(`
          *,
          blog_posts (
            title
          )
        `)
        .order("date", { ascending: false });

      if (error) {
        console.error("Error fetching comments:", error);
        throw error;
      }
      return data;
    },
  });

  const { data: replies = [], isLoading: repliesLoading } = useQuery({
    queryKey: ["admin-replies"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("replies")
        .select(`
          *,
          comments (
            blog_posts (
              title
            )
          )
        `)
        .order("date", { ascending: false });

      if (error) {
        console.error("Error fetching replies:", error);
        throw error;
      }
      return data;
    },
  });

  const handleApprove = async (type: 'comment' | 'reply', id: number) => {
    const table = type === 'comment' ? 'comments' : 'replies';
    const { error } = await supabase
      .from(table)
      .update({ approval: 1 })
      .eq('id', id);

    if (error) {
      toast({
        title: "Error",
        description: `Failed to approve ${type}`,
        variant: "destructive",
      });
    } else {
      toast({
        title: "Success",
        description: `${type.charAt(0).toUpperCase() + type.slice(1)} approved successfully`,
      });
      queryClient.invalidateQueries({ queryKey: [`admin-${type}s`] });
    }
  };

  const handleDelete = async (type: 'comment' | 'reply', id: number) => {
    const confirmDelete = window.confirm(`Are you sure you want to delete this ${type}?`);
    
    if (confirmDelete) {
      const table = type === 'comment' ? 'comments' : 'replies';
      const { error } = await supabase
        .from(table)
        .delete()
        .eq('id', id);

      if (error) {
        toast({
          title: "Error",
          description: `Failed to delete ${type}`,
          variant: "destructive",
        });
      } else {
        toast({
          title: "Success",
          description: `${type.charAt(0).toUpperCase() + type.slice(1)} deleted successfully`,
        });
        queryClient.invalidateQueries({ queryKey: [`admin-${type}s`] });
      }
    }
  };

  if (commentsLoading || repliesLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-background to-accent/30">
      <Navbar />
      <div className="container mx-auto py-8 px-4">
        <h1 className="text-3xl font-bold mb-6">Comments & Replies Management</h1>
        
        <div className="space-y-8">
          <div className="glass-card p-6">
            <h2 className="text-2xl font-semibold mb-4">Comments</h2>
            <CommentTable 
              data={comments}
              onApprove={(id) => handleApprove('comment', id)}
              onDelete={(id) => handleDelete('comment', id)}
            />
          </div>

          <div className="glass-card p-6">
            <h2 className="text-2xl font-semibold mb-4">Replies</h2>
            <ReplyTable 
              data={replies}
              onApprove={(id) => handleApprove('reply', id)}
              onDelete={(id) => handleDelete('reply', id)}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommentsManagement;
