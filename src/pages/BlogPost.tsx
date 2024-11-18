import { useParams } from "react-router-dom";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

const BlogPost = () => {
  const { id } = useParams();

  // This would normally fetch from an API based on the ID
  const post = {
    title: "Understanding Business Registration in Kenya",
    date: "2024-02-20",
    author: "CPA Joe",
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

  return (
    <div className="min-h-screen flex flex-col bg-accent">
      <Navbar />
      <main className="flex-grow py-12">
        <div className="container mx-auto px-4">
          <article className="max-w-4xl mx-auto">
            <header className="mb-8">
              <h1 className="text-4xl font-bold text-primary mb-4">
                {post.title}
              </h1>
              <div className="flex items-center text-gray-600 mb-6">
                <span>{post.date}</span>
                <span className="mx-2">•</span>
                <span>{post.author}</span>
              </div>
            </header>

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
          </article>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default BlogPost;