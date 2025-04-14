import SocialLinks from "./socialLinks";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-4">
      <div className="flex flex-row px-4 md:px-20  justify-between gap-4">
        <p>&copy; 2025 Sundeep Reddy Nallamilli. All rights reserved.</p>
        <SocialLinks />
      </div>
    </footer>
  );
};

export default Footer;
