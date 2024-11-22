import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Pencil, Trash2 } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import Navbar from "@/components/layout/Navbar";
import { supabase } from "@/supabaseClient"; // Supabase client import

const AdminDashboard = () => {
  const [posts, setPosts] = useState([]);
  const navigate = useNavigate();
  const { toast } = useToast();

  // Fetch blog posts
  useEffect(() => {
    const fetchPosts = async () => {
      const { data, error } = await supabase
        .from("blog_posts")
        .select("id, slug, title, category, created_at, updated_at")
        .order("created_at", { ascending: false });

      if (error) {
        toast({
          title: "Error",
          description: "Failed to fetch blog posts",
          variant: "destructive",
        });
        console.error("Error fetching blog posts:", error.message);
      } else {
        setPosts(data || []);
      }
    };

    fetchPosts();
  }, []);

  // Handle edit action
  const handleEdit = (postId: number) => {
    navigate(`/admin/edit/${postId}`);
  };

  // Handle delete action
  const handleDelete = async (postId: number) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this post?");

    if (confirmDelete) {
      const { error } = await supabase
        .from("blog_posts")
        .delete()
        .eq("id", postId);

      if (error) {
        toast({
          title: "Error",
          description: "Failed to delete post",
          variant: "destructive",
        });
        console.error("Error deleting post:", error.message);
      } else {
        toast({
          title: "Success",
          description: "Post deleted successfully",
        });
        setPosts((prevPosts) => prevPosts.filter((post) => post.id !== postId));
      }
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-background to-accent/30">
      <Navbar />
      <div className="container mx-auto py-8 px-4 flex-grow">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Blog Posts Management</h1>
          <Button onClick={() => navigate("/admin/create")}>Create New Post</Button>
        </div>

        <div className="glass-card p-6">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Title</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Created At</TableHead>
                <TableHead>Updated At</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {posts.map((post) => (
                <TableRow key={post.id}>
                  <TableCell className="font-medium">{post.title}</TableCell>
                  <TableCell className="capitalize">{post.category}</TableCell>
                  <TableCell>
                    {new Date(post.created_at).toLocaleDateString()} {/* Format created date */}
                  </TableCell>
                  <TableCell>
                    {new Date(post.updated_at).toLocaleDateString()} {/* Format updated date */}
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => handleEdit(post.id)}
                        className="h-8 w-8"
                      >
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => handleDelete(post.id)}
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
  );
};

export default AdminDashboard;
