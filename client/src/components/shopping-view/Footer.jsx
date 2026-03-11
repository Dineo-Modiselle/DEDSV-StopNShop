
import { FaFacebook, FaXTwitter, FaInstagram, FaLinkedinIn } from 'react-icons/fa6';

function Footer() {
  return (
    <footer className="text-gray-900 py-6 px-4">
      <div className="container mx-auto text-center">
        
        {/* Navigation Links */}
        <div className="mb-6 flex flex-wrap justify-center gap-3">
          <a href="/home" className="hover:text-gray-600 text-sm">Home</a>
          <a href="/about" className="hover:text-gray-600 text-sm">About</a>
          <a href="/contact" className="hover:text-gray-600 text-sm">Contact</a>
          <a href="/privacy" className="hover:text-gray-600 text-sm">Privacy Policy</a>
          <a href="/ourstores" className="hover:text-gray-600 text-sm">Our Stores</a>
        </div>

        {/* Social Icons */}
        <div className="mb-4 flex justify-center gap-4">
          <a href="https://facebook.com" aria-label="Facebook" className="hover:text-gray-600 text-lg">
            <FaFacebook />
          </a>
          <a href="https://twitter.com" aria-label="Twitter" className="hover:text-gray-600 text-lg">
            <FaXTwitter />
          </a>
          <a href="https://instagram.com" aria-label="Instagram" className="hover:text-gray-600 text-lg">
            <FaInstagram />
          </a>
          <a href="https://linkedin.com" aria-label="LinkedIn" className="hover:text-gray-600 text-lg">
            <FaLinkedinIn />
          </a>
        </div>

        {/* Copyright */}
        <p className="text-[#181A1B] text-sm">
          © {new Date().getFullYear()} DEDSV. All rights reserved.
        </p>

      </div>
    </footer>
  );
}

export default Footer;