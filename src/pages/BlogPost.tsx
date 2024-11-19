import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Share2, Facebook, Twitter, Linkedin } from "lucide-react";

const BlogPost = () => {
  const { id: slug } = useParams();
  const [post, setPost] = useState<any>(null);
  const [comment, setComment] = useState("");
  const [replyText, setReplyText] = useState("");
  const [replyingTo, setReplyingTo] = useState<number | null>(null);
  const [categories] = useState([
    "real estate",
    "tax",
    "insurance",
    "personal finance",
    "treasury bills and bonds",
    "start-ups",
    "unit trusts",
  ]);
  const [latestPosts, setLatestPosts] = useState<any[]>([]);

  // Sample comments data (will be replaced with backend data)
  const [comments, setComments] = useState([
    {
      id: 1,
      author: "John Doe",
      content: "This is a great article! Very informative.",
      date: "2024-03-18",
      replies: [
        {
          id: 11,
          author: "Jane Smith",
          content: "I completely agree with your points!",
          date: "2024-03-18",
        }
      ]
    },
    {
      id: 2,
      author: "Alice Johnson",
      content: "Thanks for sharing these insights.",
      date: "2024-03-17",
      replies: []
    }
  ]);

  useEffect(() => {
    // Fetch the current post
    const fetchPost = async () => {
      const response = await fetch(`http://localhost/backend/api.php?slug=${slug}`);
      if (response.ok) {
        const data = await response.json();
        setPost(data);
      }
    };

    // Fetch latest posts for the sidebar
    const fetchLatestPosts = async () => {
      const response = await fetch("http://localhost/backend/api.php?latest=true");
      if (response.ok) {
        const data = await response.json();
        setLatestPosts(data);
      }
    };

    fetchPost();
    fetchLatestPosts();
  }, [slug]);

  const handleComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!comment.trim()) return;

    const newComment = {
      id: comments.length + 1,
      author: "Current User", // This would come from auth
      content: comment,
      date: new Date().toISOString().split('T')[0],
      replies: []
    };

    setComments([...comments, newComment]);
    setComment("");
  };

  const handleReply = (commentId: number, e: React.FormEvent) => {
    e.preventDefault();
    if (!replyText.trim()) return;

    const updatedComments = comments.map(comment => {
      if (comment.id === commentId) {
        return {
          ...comment,
          replies: [...comment.replies, {
            id: Date.now(),
            author: "Current User", // This would come from auth
            content: replyText,
            date: new Date().toISOString().split('T')[0],
          }]
        };
      }
      return comment;
    });

    setComments(updatedComments);
    setReplyText("");
    setReplyingTo(null);
  };

  if (!post) return <p>Loading...</p>;

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-background to-accent/30">
      <Navbar />
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Main content */}
          <div className="lg:col-span-8">
            <article className="glass-card p-8">
              <h1 className="text-4xl font-bold mb-4">{post.title}</h1>
              <div className="flex items-center gap-4 mb-6">
                <span className="text-sm text-muted-foreground">{post.created_at}</span>
                <span className="text-sm bg-secondary/20 text-secondary px-3 py-1 rounded-full">{post.category}</span>
              </div>
              <div className="prose max-w-none">{post.content}</div>

              {/* Comments Section */}
              <div className="mt-12">
                <h3 className="text-2xl font-bold mb-6">Comments ({comments.length})</h3>
                
                {/* Existing Comments */}
                <div className="space-y-6 mb-8">
                  {comments.map((comment) => (
                    <div key={comment.id} className="glass-card p-4">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h4 className="font-semibold">{comment.author}</h4>
                          <span className="text-sm text-muted-foreground">{comment.date}</span>
                        </div>
                      </div>
                      <p className="mb-4">{comment.content}</p>
                      
                      {/* Replies */}
                      <div className="ml-8 space-y-4">
                        {comment.replies.map((reply) => (
                          <div key={reply.id} className="glass-card p-3">
                            <div className="flex justify-between items-start mb-2">
                              <div>
                                <h5 className="font-semibold">{reply.author}</h5>
                                <span className="text-sm text-muted-foreground">{reply.date}</span>
                              </div>
                            </div>
                            <p>{reply.content}</p>
                          </div>
                        ))}
                      </div>

                      {/* Reply Form */}
                      {replyingTo === comment.id ? (
                        <form onSubmit={(e) => handleReply(comment.id, e)} className="mt-4">
                          <Textarea
                            value={replyText}
                            onChange={(e) => setReplyText(e.target.value)}
                            placeholder="Write a reply..."
                            className="mb-2"
                          />
                          <div className="flex gap-2">
                            <Button type="submit" size="sm">Post Reply</Button>
                            <Button 
                              type="button" 
                              variant="outline" 
                              size="sm"
                              onClick={() => setReplyingTo(null)}
                            >
                              Cancel
                            </Button>
                          </div>
                        </form>
                      ) : (
                        <Button 
                          type="button" 
                          variant="ghost" 
                          size="sm"
                          onClick={() => setReplyingTo(comment.id)}
                          className="mt-2"
                        >
                          Reply
                        </Button>
                      )}
                    </div>
                  ))}
                </div>

                {/* New Comment Form */}
                <form onSubmit={handleComment} className="mb-8">
                  <Textarea
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    placeholder="Leave a comment..."
                    className="mb-4"
                  />
                  <Button type="submit">Post Comment</Button>
                </form>
              </div>
            </article>
          </div>
          
          {/* Sidebar */}
          <div className="lg:col-span-4 space-y-8">
            <div className="glass-card p-6 sticky top-4">
              <h3 className="text-xl font-semibold mb-4">Read my articles on</h3>
              <nav>
                <ul className="space-y-2">
                  {categories.map((category) => (
                    <li key={category}>
                      <a
                        href={`/blog/category/${category}`}
                        className="block py-2 text-secondary hover:text-primary transition-colors"
                      >
                        {category.charAt(0).toUpperCase() + category.slice(1)}
                      </a>
                    </li>
                  ))}
                </ul>
              </nav>
            </div>

            <div className="glass-card p-6">
              <h3 className="text-xl font-semibold mb-4">Latest Posts</h3>
              <div className="space-y-4">
                {latestPosts.map((latestPost) => (
                  <a
                    key={latestPost.id}
                    href={`/blog/${latestPost.slug}`}
                    className="block group"
                  >
                    <div className="space-y-1">
                      <span className="text-xs font-semibold text-secondary uppercase tracking-wider">
                        {latestPost.category}
                      </span>
                      <h4 className="text-sm font-medium group-hover:text-secondary transition-colors">
                        {latestPost.title}
                      </h4>
                      <span className="text-xs text-muted-foreground">
                        {latestPost.created_at}
                      </span>
                    </div>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default BlogPost;
