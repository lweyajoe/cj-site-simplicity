import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/components/ui/use-toast";
import { ReactQuillEditor } from "@/components/ui/reactQuillEditor";
import Navbar from "@/components/layout/Navbar";

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

  useEffect(() => {
    const fetchPost = async () => {
      try {
        // Placeholder for API call
        // const response = await fetch(`/api/posts/${id}`);
        // const data = await response.json();
        // setTitle(data.title);
        // setContent(data.content);
        // setCategory(data.category);
        
        // Using sample data for now
        setTitle("Sample Post Title");
        setContent("Sample post content...");
        setCategory("real estate");
      } catch (error) {
        toast({
          title: "Error",
          description: "Failed to fetch post data",
          variant: "destructive",
        });
      }
    };

    fetchPost();
  }, [id, toast]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      // TODO: Implement actual update functionality
      // await updatePost(id, { title, content, category });
      
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
    }
  };

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