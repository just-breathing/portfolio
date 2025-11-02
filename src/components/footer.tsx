import SocialLinks from "./socialLinks";

const Footer = () => {
  return (
    <footer
      className="py-4 border-t"
      style={{
        backgroundColor: "var(--card-bg)",
        color: "var(--foreground)",
        borderColor: "var(--card-border)",
      }}
    >
      <div className="flex flex-col md:flex-row px-4 md:px-20 justify-between items-center gap-4">
        <p
          className="text-xs md:text-sm text-center md:text-left"
          style={{ color: "var(--muted)" }}
        >
          &copy; 2025 Sundeep Reddy Nallamilli. All rights reserved.
        </p>
        <SocialLinks />
      </div>
    </footer>
  );
};

export default Footer;
