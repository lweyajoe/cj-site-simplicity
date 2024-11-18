import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Link } from "react-router-dom";

const featuredPosts = [
  {
    id: 1,
    title: "Understanding Business Registration in Kenya",
    excerpt: "A comprehensive guide to registering your business...",
    date: "2024-02-20",
  },
  {
    id: 2,
    title: "Tax Planning Strategies for SMEs",
    excerpt: "Essential tax planning tips for small businesses...",
    date: "2024-02-18",
  },
  {
    id: 3,
    title: "Investment Opportunities in East Africa",
    excerpt: "Exploring lucrative investment options in the region...",
    date: "2024-02-15",
  },
];

const BlogCarousel = () => {
  return (
    <Carousel
      opts={{
        align: "start",
        loop: true,
      }}
      className="w-full max-w-5xl mx-auto"
    >
      <CarouselContent>
        {featuredPosts.map((post) => (
          <CarouselItem key={post.id} className="md:basis-1/2 lg:basis-1/3">
            <Link to={`/blog/${post.id}`}>
              <div className="blog-card">
                <h3 className="text-xl font-semibold mb-2">{post.title}</h3>
                <p className="text-gray-600 mb-2">{post.excerpt}</p>
                <span className="text-sm text-gray-500">{post.date}</span>
              </div>
            </Link>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
};

export default BlogCarousel;