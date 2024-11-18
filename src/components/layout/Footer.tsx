import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-primary text-white py-4 mt-auto">
      <div className="container mx-auto px-4 text-center">
        <p>
          CPAJoe - Website Built By{" "}
          <a
            href="https://squarehaul.online/services"
            target="_blank"
            rel="noopener noreferrer"
            className="text-secondary hover:underline"
          >
            Squarehaul
          </a>
        </p>
      </div>
    </footer>
  );
};

export default Footer;