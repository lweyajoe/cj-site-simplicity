import { useState } from "react";
import { useNavigate } from "react-router-dom";
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

const Admin = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("");
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Make an API call to save the blog post
    const response = await fetch("http://localhost/backend/api.php", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, content, category }),
    });

    if (response.ok) {
      const { slug } = await response.json();
      toast({
        title: "Success!",
        description: `Blog post published successfully. View it at /blog/${slug}`,
      });
      navigate("/blog");
    } else {
      toast({
        title: "Error",
        description: "Failed to create blog post. Please try again.",
      });
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-background to-accent/30">
      <Navbar />
      <div className="container mx-auto px-4 py-8 flex-grow">
        <div className="max-w-4xl mx-auto">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold">Create New Blog Post</h1>
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
                <Select onValueChange={setCategory} required>
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

              <Button type="submit" className="w-full">
                Publish Post
              </Button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Admin;