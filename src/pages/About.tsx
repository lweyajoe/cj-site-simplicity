import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

const About = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold mb-8">About CJ's</h1>
          <div className="prose max-w-none">
            <p className="text-lg mb-6">
              Welcome to CJ's, where financial expertise meets personalized service. As a Certified Public Accountant (CPA),
              I, CPA Joe, have dedicated my career to helping individuals and businesses navigate the complex world of finance.
            </p>
            <p className="text-lg mb-6">
              With years of experience in accounting, tax planning, and financial consulting, I provide comprehensive solutions
              tailored to your specific needs. My practice focuses on delivering value through professional excellence and
              maintaining long-lasting relationships with clients.
            </p>
            <h2 className="text-2xl font-bold mt-8 mb-4">Our Mission</h2>
            <p className="text-lg mb-6">
              To provide exceptional financial services that empower our clients to achieve their financial goals through
              expert guidance, innovative solutions, and unwavering integrity.
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default About;