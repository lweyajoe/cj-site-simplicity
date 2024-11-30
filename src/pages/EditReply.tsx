import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import Navbar from "@/components/layout/Navbar";
import { supabase } from "@/supabaseClient";

const EditReply = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [loading, setLoading] = useState(true);
  const [reply, setReply] = useState({
    author_name: "",
    author_email: "",
    content: "",
  });

  useEffect(() => {
    const fetchReply = async () => {
      const { data, error } = await supabase
        .from("replies")
        .select("*")
        .eq("id", id)
        .single();

      if (error) {
        toast({
          title: "Error",
          description: "Failed to fetch reply",
          variant: "destructive",
        });
        navigate("/admin/dashboard");
      } else if (data) {
        setReply({
          author_name: data.author_name,
          author_email: data.author_email,
          content: data.content,
        });
      }
      setLoading(false);
    };

    fetchReply();
  }, [id, navigate, toast]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const { error } = await supabase
      .from("replies")
      .update(reply)
      .eq("id", id);

    if (error) {
      toast({
        title: "Error",
        description: "Failed to update reply",
        variant: "destructive",
      });
    } else {
      toast({
        title: "Success",
        description: "Reply updated successfully",
      });
      navigate("/admin/dashboard");
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-background to-accent/30">
      <Navbar />
      <div className="container mx-auto py-8 px-4">
        <div className="max-w-2xl mx-auto">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold">Edit Reply</h1>
            <Button variant="outline" onClick={() => navigate("/admin/dashboard")}>
              Back to Dashboard
            </Button>
          </div>

          <div className="glass-card p-6">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="author_name" className="block text-sm font-medium mb-2">
                  Author Name
                </label>
                <Input
                  id="author_name"
                  value={reply.author_name}
                  onChange={(e) => setReply({ ...reply, author_name: e.target.value })}
                  required
                />
              </div>

              <div>
                <label htmlFor="author_email" className="block text-sm font-medium mb-2">
                  Author Email
                </label>
                <Input
                  id="author_email"
                  type="email"
                  value={reply.author_email}
                  onChange={(e) => setReply({ ...reply, author_email: e.target.value })}
                  required
                />
              </div>

              <div>
                <label htmlFor="content" className="block text-sm font-medium mb-2">
                  Content
                </label>
                <Textarea
                  id="content"
                  value={reply.content}
                  onChange={(e) => setReply({ ...reply, content: e.target.value })}
                  className="min-h-[100px]"
                  required
                />
              </div>

              <Button type="submit" className="w-full">
                Update Reply
              </Button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditReply;