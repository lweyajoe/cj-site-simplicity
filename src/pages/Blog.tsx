import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Link } from "react-router-dom";

const blogPosts = [
  {
    id: 1,
    title: "Understanding Business Registration in Kenya",
    excerpt: "A comprehensive guide to registering your business in Kenya...",
    date: "2024-02-20",
    category: "Business",
    image: "https://images.unsplash.com/photo-1649972904349-6e44c42644a7",
  },
  {
    id: 2,
    title: "Tax Planning Strategies for SMEs",
    excerpt: "Essential tax planning tips for small businesses...",
    date: "2024-02-18",
    category: "Tax",
    image: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b",
  },
  {
    id: 3,
    title: "Investment Opportunities in East Africa",
    excerpt: "Exploring lucrative investment options in the region...",
    date: "2024-02-15",
    category: "Investment",
    image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158",
  },
  {
    id: 4,
    title: "Digital Transformation in Accounting",
    excerpt: "How technology is reshaping the accounting industry...",
    date: "2024-02-12",
    category: "Technology",
    image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e",
  },
  {
    id: 5,
    title: "Sustainable Business Practices",
    excerpt: "Implementing eco-friendly strategies in your business...",
    date: "2024-02-10",
    category: "Business",
    image: "https://images.unsplash.com/photo-1513836279014-a89f7a76ae86",
  },
  {
    id: 6,
    title: "Real Estate Investment in Kenya",
    excerpt: "A guide to property investment opportunities...",
    date: "2024-02-08",
    category: "Investment",
    image: "https://images.unsplash.com/photo-1551038247-3d9af20df552",
  },
];

const Blog = () => {
  return (
    <div className="min-h-screen flex flex-col bg-accent">
      <Navbar />
      <main className="flex-grow py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold mb-8 text-primary">Blog</h1>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {blogPosts.map((post) => (
              <Link to={`/blog/${post.id}`} key={post.id}>
                <article className="glass-card hover:shadow-lg transition-shadow duration-300">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-48 object-cover rounded-t-xl"
                  />
                  <div className="p-6">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm text-secondary font-medium">
                        {post.category}
                      </span>
                      <span className="text-sm text-gray-500">{post.date}</span>
                    </div>
                    <h2 className="text-xl font-semibold mb-2 text-primary">
                      {post.title}
                    </h2>
                    <p className="text-gray-600 mb-4">{post.excerpt}</p>
                    <span className="text-secondary hover:text-primary transition-colors">
                      Read more →
                    </span>
                  </div>
                </article>
              </Link>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Blog;