import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/components/ui/use-toast";
import { ReactQuillEditor } from "@/components/ui/reactQuillEditor";
import Navbar from "@/components/layout/Navbar";
import { supabase } from "@/supabaseClient";
import { useQuery } from "@tanstack/react-query";

const categories = [
  "real estate",
  "tax",
  "insurance",
  "personal finance",
  "treasury bills and bonds",
  "start-ups",
  "unit trusts",
];

const EditBlogPost = () => {
  const { id } = useParams();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("");
  const { toast } = useToast();
  const navigate = useNavigate();

  // Fetch post data using React Query
  const { data: post, isLoading } = useQuery({
    queryKey: ["blog-post", id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("blog_posts")
        .select("*")
        .eq("id", id)
        .single();

      if (error) throw error;
      return data;
    },
  });

  // Set form data when post is loaded
  useEffect(() => {
    if (post) {
      setTitle(post.title);
      setContent(post.content);
      setCategory(post.category);
    }
  }, [post]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const { error } = await supabase
        .from("blog_posts")
        .update({
          title,
          content,
          category,
          updated_at: new Date().toISOString(),
        })
        .eq("id", id);

      if (error) throw error;

      toast({
        title: "Success!",
        description: "Blog post updated successfully.",
      });
      navigate("/admin/dashboard");
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update blog post. Please try again.",
        variant: "destructive",
      });
      console.error("Error updating post:", error);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col bg-gradient-to-br from-background to-accent/30">
        <Navbar />
        <div className="container mx-auto px-4 py-8">
          <div className="animate-pulse space-y-4">
            <div className="h-8 bg-gray-200 rounded w-3/4"></div>
            <div className="h-4 bg-gray-200 rounded w-1/4"></div>
            <div className="space-y-2">
              <div className="h-4 bg-gray-200 rounded"></div>
              <div className="h-4 bg-gray-200 rounded"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-background to-accent/30">
      <Navbar />
      <div className="container mx-auto px-4 py-8 flex-grow">
        <div className="max-w-4xl mx-auto">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold">Edit Blog Post</h1>
            <Button variant="outline" onClick={() => navigate("/admin/dashboard")}>
              Back to Dashboard
            </Button>
          </div>

          <div className="glass-card p-6">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="title" className="block text-sm font-medium mb-2">
                  Title
                </label>
                <Input
                  id="title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Enter blog post title"
                  required
                />
              </div>

              <div>
                <label htmlFor="category" className="block text-sm font-medium mb-2">
                  Category
                </label>
                <Select value={category} onValueChange={setCategory} required>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((cat) => (
                      <SelectItem key={cat} value={cat}>
                        {cat}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label htmlFor="content" className="block text-sm font-medium mb-2">
                  Content
                </label>
                <ReactQuillEditor
                  value={content}
                  onChange={setContent}
                  placeholder="Write your blog post content here..."
                />
              </div>

              <div className="flex gap-4">
                <Button type="submit" className="flex-1">
                  Update Post
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => navigate("/admin/dashboard")}
                  className="flex-1"
                >
                  Cancel
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditBlogPost;