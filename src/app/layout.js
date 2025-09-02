import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Link from "next/link";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faBuilding } from '@fortawesome/free-solid-svg-icons';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "School App",
  description: "Manage and view schools",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link
          href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css"
          rel="stylesheet"
        />
        <script
          src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js"
          defer
        ></script>
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark position-fixed top-0 w-100" style={{ zIndex: 1000 }}>
      <div className="container">
        {/* Brand Logo */}
        <Link className="navbar-brand d-flex align-items-center" href="/">
          <FontAwesomeIcon icon={faBuilding} className="me-2" />
          <span>School App</span>
        </Link>

        {/* Toggler */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Navigation Links */}
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto d-flex align-items-center">
            {/* Add School Button */}
            <li className="nav-item m-1">
              <Link
                className="btn btn-outline-light d-flex align-items-center px-3 py-2"
                href="/addschool"
              >
                <FontAwesomeIcon icon={faPlus} className="me-1" />
                <span>Add School</span>
              </Link>
            </li>

            {/* Show Schools Button */}
            <li className="nav-item m-1">
              <Link
                className="btn btn-outline-light d-flex align-items-center px-3 py-2"
                href="/showschools"
              >
                <FontAwesomeIcon icon={faBuilding} className="me-1" />
                <span>Show Schools</span>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
        <main className="container mt-4 p-4">{children}</main>
      </body>
    </html>
  );
}
