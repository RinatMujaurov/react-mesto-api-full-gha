import React, { useState, useEffect } from "react";

function Footer() {
  const [currentYear, setCurrentYear] = useState("");

  useEffect(() => {
    const year = new Date().getFullYear();
    setCurrentYear(year.toString());
  }, []);

  return (
    <footer className="footer">
      <p className="footer__copyright">© {currentYear} Rinat Muzhaurov</p>
    </footer>
  );
}

export default Footer;
