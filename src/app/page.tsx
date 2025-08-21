"use client";

// import { useStaticRedirect } from "@/lib/staticRedirect";
import {
  faFacebookF,
  faInstagram,
  faLinkedinIn,
  faTwitter,
} from "@fortawesome/free-brands-svg-icons";
import {
  faBars,
  faChartPie,
  faHandHoldingUsd,
  faMobileAlt,
  faShieldAlt,
  faUmbrellaBeach,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import Login from "./components/forms/Login";
import Modal from "./components/ui/Modal";
import SignUp from "./components/forms/SignUp";
export default function HomePage() {
  // const { redirect } = useStaticRedirect();
  const [showLogin, setShowLogin] = useState(false);
  const [showSignup, setShowSignup] = useState(false);

  const handleLoginClick = () => {
    // redirect("/login");
    setShowLogin(true);
  };

  const handleSignupClick = () => {
    // redirect("/signup");
    setShowSignup(true);
  };

  const handleGetStartedClick = () => {
    // redirect("/signup");
    setShowSignup(true);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#2a004a] text-[#e0e0e0] font-inter">
      {/* Header */}
      <header className="bg-[#3a005f] p-4 shadow-md sticky top-0 z-20 border border-[#4a007a]">
        <nav className="container mx-auto flex items-center justify-between">
          {/* KASHDA Logo */}
          <a href="#" className="flex items-center space-x-2">
            <h1 className="text-3xl font-bold">
              <span className="text-[#d4af37]">KA</span>
              <span className="text-[#6a0dad]">$</span>
              <span className="text-[#d4af37]">HDA</span>
            </h1>
          </a>

          {/* Navigation Links */}
          <div className="hidden md:flex flex-grow justify-center space-x-8">
            <a
              href="#"
              className="text-[#e0e0e0] hover:text-[#d4af37] font-medium transition-colors duration-200"
            >
              Home
            </a>
            <a
              href="#services"
              className="text-[#e0e0e0] hover:text-[#d4af37] font-medium transition-colors duration-200"
            >
              Services
            </a>
            <a
              href="#about"
              className="text-[#e0e0e0] hover:text-[#d4af37] font-medium transition-colors duration-200"
            >
              About Us
            </a>
            <a
              href="#"
              className="text-[#e0e0e0] hover:text-[#d4af37] font-medium transition-colors duration-200"
            >
              Contact
            </a>
          </div>

          {/* Login/Signup Buttons */}
          <div className="flex items-center space-x-4">
            <button
              onClick={handleLoginClick}
              className="bg-[#4a007a] text-[#e0e0e0] border border-[#4a007a] px-5 py-2 rounded-lg font-semibold shadow-md hover:bg-[#6a0dad] transition-colors duration-200 focus:outline-none hidden md:block"
            >
              Login
            </button>
            <button
              onClick={handleSignupClick}
              className="bg-[#d4af37] text-[#2a004a] px-5 py-2 rounded-lg font-semibold shadow-md hover:bg-[#e6c24d] transition-colors duration-200 focus:outline-none"
            >
              Sign Up
            </button>
            {/* Mobile Menu Button */}
            <button className="md:hidden text-[#e0e0e0] text-2xl focus:outline-none">
              <FontAwesomeIcon icon={faBars} />
            </button>
          </div>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-[#3a005f] to-[#2a004a] text-center py-20 md:py-32 flex items-center justify-center">
        <div className="absolute inset-0 bg-black bg-opacity-60"></div>
        <div className="relative z-10 text-white px-4 max-w-4xl mx-auto">
          <h2 className="text-4xl md:text-6xl font-extrabold leading-tight mb-6 text-[#d4af37]">
            Empowering Your Financial Journey
          </h2>
          <p className="text-lg md:text-xl mb-8">
            KASHDA is your trusted partner for seamless digital banking, smart
            investments, and comprehensive financial solutions.
          </p>
          <button
            onClick={handleGetStartedClick}
            className="bg-[#d4af37] text-[#2a004a] px-8 py-3 rounded-lg text-lg font-semibold shadow-xl hover:scale-105 hover:bg-[#e6c24d] transition-all duration-300 focus:outline-none"
          >
            Get Started Today
          </button>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-16 bg-[#2a004a]">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-[#d4af37]">
            Our Services
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Service 1: Digital Banking & E-payment */}
            <div className="bg-[#3a005f] border border-[#4a007a] p-6 rounded-xl shadow-lg text-center transform hover:scale-105 transition-transform duration-300">
              <FontAwesomeIcon
                icon={faMobileAlt}
                className="text-5xl text-[#6a0dad] mb-4"
              />
              <h3 className="text-xl font-semibold text-[#e0e0e0] mb-2">
                Digital Banking & E-Payments
              </h3>
              <p className="text-[#a0a0a0]">
                Manage your money, pay bills, and send funds instantly with our
                secure and intuitive digital platform.
              </p>
            </div>

            {/* Service 2: Saving, Investment and Portfolio Management */}
            <div className="bg-[#3a005f] border border-[#4a007a] p-6 rounded-xl shadow-lg text-center transform hover:scale-105 transition-transform duration-300">
              <FontAwesomeIcon
                icon={faChartPie}
                className="text-5xl text-[#d4af37] mb-4"
              />
              <h3 className="text-xl font-semibold text-[#e0e0e0] mb-2">
                Savings & Investment Management
              </h3>
              <p className="text-[#a0a0a0]">
                Grow your wealth with personalized savings plans and expert
                portfolio management tools.
              </p>
            </div>

            {/* Service 3: Pension Scheme */}
            <div className="bg-[#3a005f] border border-[#4a007a] p-6 rounded-xl shadow-lg text-center transform hover:scale-105 transition-transform duration-300">
              <FontAwesomeIcon
                icon={faUmbrellaBeach}
                className="text-5xl text-[#6a0dad] mb-4"
              />
              <h3 className="text-xl font-semibold text-[#e0e0e0] mb-2">
                Pension Scheme
              </h3>
              <p className="text-[#a0a0a0]">
                Secure your future with flexible pension plans designed to
                provide peace of mind in retirement.
              </p>
            </div>

            {/* Service 4: Insurance Products */}
            <div className="bg-[#3a005f] border border-[#4a007a] p-6 rounded-xl shadow-lg text-center transform hover:scale-105 transition-transform duration-300">
              <FontAwesomeIcon
                icon={faShieldAlt}
                className="text-5xl text-[#d4af37] mb-4"
              />
              <h3 className="text-xl font-semibold text-[#e0e0e0] mb-2">
                Insurance Products
              </h3>
              <p className="text-[#a0a0a0]">
                Protect what matters most with a range of insurance options,
                from health to property.
              </p>
            </div>

            {/* Service 5: Revenue Collection */}
            <div className="bg-[#3a005f] border border-[#4a007a] p-6 rounded-xl shadow-lg text-center transform hover:scale-105 transition-transform duration-300">
              <FontAwesomeIcon
                icon={faHandHoldingUsd}
                className="text-5xl text-[#6a0dad] mb-4"
              />
              <h3 className="text-xl font-semibold text-[#e0e0e0] mb-2">
                Revenue Collection
              </h3>
              <p className="text-[#a0a0a0]">
                Simplify your payments for taxes, levies, and other government
                revenues with ease.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-16 bg-[#3a005f]">
        <div className="container mx-auto px-4 text-center max-w-3xl">
          <h2 className="text-3xl md:text-4xl font-bold mb-8 text-[#d4af37]">
            About KASHDA
          </h2>
          <p className="text-lg text-[#e0e0e0] leading-relaxed mb-6">
            At KASHDA, we are committed to driving financial inclusion by
            providing accessible, secure, and innovative digital financial
            services to everyone. Our platform empowers individuals and
            businesses to manage their finances effectively, save for their
            future, and participate fully in the digital economy.
          </p>
          <button className="bg-[#4a007a] text-[#e0e0e0] border border-[#4a007a] px-6 py-3 rounded-lg text-lg font-semibold shadow-md hover:scale-105 hover:bg-[#6a0dad] transition-all duration-300 focus:outline-none">
            Learn More
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#3a005f] border-t border-[#4a007a] py-8 mt-auto">
        <div className="container mx-auto px-4 text-center text-[#a0a0a0]">
          <div className="flex justify-center space-x-6 mb-6">
            <a
              href="#"
              className="text-2xl hover:text-[#d4af37] transition-colors duration-200"
            >
              <FontAwesomeIcon icon={faFacebookF} />
            </a>
            <a
              href="#"
              className="text-2xl hover:text-[#d4af37] transition-colors duration-200"
            >
              <FontAwesomeIcon icon={faTwitter} />
            </a>
            <a
              href="#"
              className="text-2xl hover:text-[#d4af37] transition-colors duration-200"
            >
              <FontAwesomeIcon icon={faLinkedinIn} />
            </a>
            <a
              href="#"
              className="text-2xl hover:text-[#d4af37] transition-colors duration-200"
            >
              <FontAwesomeIcon icon={faInstagram} />
            </a>
          </div>
          <ul className="flex flex-wrap justify-center space-x-4 md:space-x-8 mb-4 text-[#e0e0e0]">
            <li>
              <a
                href="#"
                className="hover:text-[#d4af37] transition-colors duration-200"
              >
                Privacy Policy
              </a>
            </li>
            <li>
              <a
                href="#"
                className="hover:text-[#d4af37] transition-colors duration-200"
              >
                Terms of Service
              </a>
            </li>
            <li>
              <a
                href="#"
                className="hover:text-[#d4af37] transition-colors duration-200"
              >
                Support
              </a>
            </li>
          </ul>
          <p>&copy; 2025 KASHDA. All rights reserved.</p>
        </div>
      </footer>
      {/* Login Modal */}
      <Modal isOpen={showLogin} onClose={() => setShowLogin(false)}>
        <Login
          onSwitchToSignup={() => {
            setShowLogin(false);
            setShowSignup(true);
          }}
        />
      </Modal>

      {/* Signup Modal */}
      <Modal isOpen={showSignup} onClose={() => setShowSignup(false)}>
        <SignUp
          onSwitchToLogin={() => {
            setShowSignup(false);
            setShowLogin(true);
          }}
          onSuccess={() => {
            setShowSignup(false);
          }}
        />
      </Modal>
    </div>
  );
}
