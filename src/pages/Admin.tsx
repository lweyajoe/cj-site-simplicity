import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/components/ui/use-toast";

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

  // Improved handleSubmit to make an API call and handle responses
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
    <div className="page-container">
      <div className="content-container max-w-4xl">
        <h1 className="section-title">Create New Blog Post</h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Title Input */}
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

          {/* Category Select */}
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

          {/* Content Textarea */}
          <div>
            <label htmlFor="content" className="block text-sm font-medium mb-2">
              Content
            </label>
            <Textarea
              id="content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Write your blog post content here..."
              className="min-h-[400px]"
              required
            />
          </div>

          {/* Submit Button */}
          <Button type="submit" className="w-full">
            Publish Post
          </Button>
        </form>
      </div>
    </div>
  );
};

export default Admin;
