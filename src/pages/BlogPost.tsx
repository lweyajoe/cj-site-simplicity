import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Share2, Facebook, Twitter, LinkedIn } from "lucide-react";

const categories = [
  "real estate",
  "tax",
  "insurance",
  "personal finance",
  "treasury bills and bonds",
  "start-ups",
  "unit trusts"
];

const BlogPost = () => {
  const { id } = useParams();
  const [comment, setComment] = useState("");

  // This would normally fetch from an API based on the ID
  const post = {
    title: "Understanding Business Registration in Kenya",
    date: "2024-02-20",
    author: "CPA Joe",
    category: "start-ups",
    sections: [
      { id: "introduction", title: "Introduction" },
      { id: "types", title: "Types of Business Entities" },
      { id: "requirements", title: "Registration Requirements" },
      { id: "process", title: "Registration Process" },
      { id: "costs", title: "Associated Costs" },
      { id: "conclusion", title: "Conclusion" },
    ],
    content: {
      introduction: "Starting a business in Kenya requires careful planning...",
      types: "Kenya recognizes several types of business entities...",
      requirements: "To register a business in Kenya, you need...",
      process: "The registration process involves several steps...",
      costs: "The costs of business registration vary depending on...",
      conclusion: "Business registration is a crucial first step...",
    },
  };

  const handleComment = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically save the comment
    setComment("");
  };

  return (
    <div className="min-h-screen flex flex-col bg-accent">
      <Navbar />
      <main className="flex-grow py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Main Content */}
            <article className="lg:w-2/3">
              <header className="mb-8">
                <div className="mb-4">
                  <span className="text-secondary font-medium">{post.category}</span>
                </div>
                <h1 className="text-4xl font-bold text-primary mb-4">
                  {post.title}
                </h1>
                <div className="flex items-center text-gray-600 mb-6">
                  <span>{post.date}</span>
                  <span className="mx-2">•</span>
                  <span>{post.author}</span>
                </div>
              </header>

              {/* Table of Contents */}
              <div className="glass-card p-6 mb-8">
                <h2 className="text-xl font-semibold mb-4">On this page</h2>
                <nav>
                  <ul className="space-y-2">
                    {post.sections.map((section) => (
                      <li key={section.id}>
                        <a
                          href={`#${section.id}`}
                          className="text-secondary hover:text-primary transition-colors"
                        >
                          {section.title}
                        </a>
                      </li>
                    ))}
                  </ul>
                </nav>
              </div>

              {/* Content */}
              <div className="prose max-w-none">
                {post.sections.map((section) => (
                  <section key={section.id} id={section.id} className="mb-8">
                    <h2 className="text-2xl font-bold text-primary mb-4">
                      {section.title}
                    </h2>
                    <p className="text-gray-700 leading-relaxed">
                      {post.content[section.id as keyof typeof post.content]}
                    </p>
                  </section>
                ))}
              </div>

              {/* Share Buttons */}
              <div className="flex items-center gap-4 my-8">
                <span className="font-medium">Share:</span>
                <Button variant="ghost" size="icon">
                  <Facebook className="h-5 w-5" />
                </Button>
                <Button variant="ghost" size="icon">
                  <Twitter className="h-5 w-5" />
                </Button>
                <Button variant="ghost" size="icon">
                  <LinkedIn className="h-5 w-5" />
                </Button>
                <Button variant="ghost" size="icon">
                  <Share2 className="h-5 w-5" />
                </Button>
              </div>

              {/* Comments Section */}
              <div className="mt-12">
                <h3 className="text-2xl font-bold mb-6">Comments</h3>
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

            {/* Sidebar */}
            <aside className="lg:w-1/3">
              <div className="glass-card p-6 sticky top-4">
                <h3 className="text-xl font-semibold mb-4">Read my articles on</h3>
                <nav>
                  <ul className="space-y-2">
                    {categories.map((category) => (
                      <li key={category}>
                        <Link
                          to={`/blog?category=${category}`}
                          className="text-secondary hover:text-primary transition-colors block py-2"
                        >
                          {category.charAt(0).toUpperCase() + category.slice(1)}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </nav>
              </div>
            </aside>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default BlogPost;