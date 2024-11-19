import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Pencil, Trash2 } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import Navbar from "@/components/layout/Navbar";

// Sample data structure - replace with actual data from backend
const samplePosts = [
  {
    id: 1,
    title: "Understanding Real Estate Investment",
    category: "real estate",
    created_at: "2024-03-18",
    status: "published"
  },
  {
    id: 2,
    title: "Tax Planning Strategies",
    category: "tax",
    created_at: "2024-03-17",
    status: "draft"
  },
];

const AdminDashboard = () => {
  const [posts] = useState(samplePosts);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleEdit = (postId: number) => {
    navigate(`/admin/edit/${postId}`);
  };

  const handleDelete = async (postId: number) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this post?");
    
    if (confirmDelete) {
      try {
        // Placeholder for API call
        // await deletePost(postId);
        toast({
          title: "Success",
          description: "Post deleted successfully",
        });
      } catch (error) {
        toast({
          title: "Error",
          description: "Failed to delete post",
          variant: "destructive",
        });
      }
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-background to-accent/30">
      <Navbar />
      <div className="container mx-auto py-8 px-4 flex-grow">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Blog Posts Management</h1>
          <Button onClick={() => navigate("/admin")}>Create New Post</Button>
        </div>

        <div className="glass-card p-6">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Title</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Created At</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {posts.map((post) => (
                <TableRow key={post.id}>
                  <TableCell className="font-medium">{post.title}</TableCell>
                  <TableCell className="capitalize">{post.category}</TableCell>
                  <TableCell>{post.created_at}</TableCell>
                  <TableCell>
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      post.status === "published" ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"
                    }`}>
                      {post.status}
                    </span>
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