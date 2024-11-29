import { Link } from "react-router-dom";

interface SidebarProps {
  categories: string[];
  latestPosts: Array<{
    id: number;
    title: string;
    slug: string;
    created_at: string;
    category: string;
  }>;
}

export const Sidebar = ({ categories, latestPosts }: SidebarProps) => {
  return (
    <aside className="lg:col-span-4 space-y-8">
      <div className="glass-card p-6 sticky top-4">
        <h3 className="text-xl font-semibold mb-4">Read my articles on</h3>
        <nav>
          <ul className="space-y-2">
            {categories.map((category) => (
              <li key={category}>
                <Link
                  to={`/blog?category=${category}`}
                  className="block py-2 text-secondary hover:text-primary transition-colors"
                >
                  {category.charAt(0).toUpperCase() + category.slice(1)}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      <div className="glass-card p-6">
        <h3 className="text-xl font-semibold mb-4">Latest Articles</h3>
        <div className="space-y-4">
          {latestPosts.map((post) => (
            <Link key={post.id} to={`/blog/${post.slug}`} className="block group">
              <div className="space-y-1">
                <span className="text-xs font-semibold text-secondary uppercase tracking-wider">
                  {post.category}
                </span>
                <h4 className="text-sm font-medium group-hover:text-secondary transition-colors">
                  {post.title}
                </h4>
                <span className="text-xs text-muted-foreground">
                  {new Date(post.created_at).toLocaleDateString()}
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </aside>
  );
};