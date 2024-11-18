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
  "unit trusts"
];

const Admin = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("");
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically make an API call to save the blog post
    toast({
      title: "Success!",
      description: "Blog post published successfully.",
    });
    navigate("/blog");
  };

  return (
    <div className="page-container">
      <div className="content-container max-w-4xl">
        <h1 className="section-title">Create New Blog Post</h1>
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
            <Textarea
              id="content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Write your blog post content here..."
              className="min-h-[400px]"
              required
            />
          </div>

          <Button type="submit" className="w-full">
            Publish Post
          </Button>
        </form>
      </div>
    </div>
  );
};

export default Admin;