import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Check, Edit, Trash2 } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import Navbar from "@/components/layout/Navbar";
import { supabase } from "@/supabaseClient";
import { useQuery, useQueryClient } from "@tanstack/react-query";

interface Comment {
  id: number;
  post_id: number;
  author_name: string;
  author_email: string;
  content: string;
  created_at: string;
  approval: number;
  blog_posts?: {
    title: string;
  };
}

interface Reply {
  id: number;
  comment_id: number;
  author_name: string;
  author_email: string;
  content: string;
  created_at: string;
  approval: number;
  comments?: {
    post_id: number;
    blog_posts?: {
      title: string;
    };
  };
}

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
        .order("created_at", { ascending: false });

      if (error) throw error;
      return data as Comment[];
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
            post_id,
            blog_posts (
              title
            )
          )
        `)
        .order("created_at", { ascending: false });

      if (error) throw error;
      return data as Reply[];
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
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Author</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Content</TableHead>
                  <TableHead>Blog Post</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {comments.map((comment) => (
                  <TableRow key={comment.id}>
                    <TableCell>{comment.author_name}</TableCell>
                    <TableCell>{comment.author_email}</TableCell>
                    <TableCell className="max-w-md truncate">{comment.content}</TableCell>
                    <TableCell>{comment.blog_posts?.title}</TableCell>
                    <TableCell>{new Date(comment.created_at).toLocaleDateString()}</TableCell>
                    <TableCell>
                      {comment.approval === 1 ? (
                        <span className="text-green-600">Approved</span>
                      ) : (
                        <span className="text-yellow-600">Pending</span>
                      )}
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        {comment.approval === 0 && (
                          <Button
                            variant="outline"
                            size="icon"
                            onClick={() => handleApprove('comment', comment.id)}
                            className="h-8 w-8 text-green-600 hover:text-green-700"
                          >
                            <Check className="h-4 w-4" />
                          </Button>
                        )}
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() => navigate(`/admin/edit-comment/${comment.id}`)}
                          className="h-8 w-8"
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() => handleDelete('comment', comment.id)}
                          className="h-8 w-8 text-destructive hover:text-destructive"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          <div className="glass-card p-6">
            <h2 className="text-2xl font-semibold mb-4">Replies</h2>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Author</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Content</TableHead>
                  <TableHead>Blog Post</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {replies.map((reply) => (
                  <TableRow key={reply.id}>
                    <TableCell>{reply.author_name}</TableCell>
                    <TableCell>{reply.author_email}</TableCell>
                    <TableCell className="max-w-md truncate">{reply.content}</TableCell>
                    <TableCell>{reply.comments?.blog_posts?.title}</TableCell>
                    <TableCell>{new Date(reply.created_at).toLocaleDateString()}</TableCell>
                    <TableCell>
                      {reply.approval === 1 ? (
                        <span className="text-green-600">Approved</span>
                      ) : (
                        <span className="text-yellow-600">Pending</span>
                      )}
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        {reply.approval === 0 && (
                          <Button
                            variant="outline"
                            size="icon"
                            onClick={() => handleApprove('reply', reply.id)}
                            className="h-8 w-8 text-green-600 hover:text-green-700"
                          >
                            <Check className="h-4 w-4" />
                          </Button>
                        )}
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() => navigate(`/admin/edit-reply/${reply.id}`)}
                          className="h-8 w-8"
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() => handleDelete('reply', reply.id)}
                          className="h-8 w-8 text-destructive hover:text-destructive"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommentsManagement;