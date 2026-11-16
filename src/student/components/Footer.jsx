
import React from 'react'
import {
  FaGraduationCap,
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaEnvelope
} from 'react-icons/fa'
import { Link } from 'react-router-dom'

function Footer() {
  return (
    <>
      <footer className="bg-deep text-white p-8 md:px-20 md:py-14">
        <div className="md:grid grid-cols-4 gap-10">

          {/* Website Information */}
          <div className="col-span-2">
            <div className="flex items-center">
              <FaGraduationCap className="text-4xl text-secondary" />
              <h2 className="text-2xl font-bold ms-2">
                LearnHub
              </h2>
            </div>

            <p className="mt-5 text-gray-300 leading-7 max-w-lg">
              LearnHub is your learning companion. Discover new skills,
              learn from experienced instructors, and build a brighter future
              through quality online education.
            </p>
          </div>

          {/* Quick Links */}
          <div className="mt-8 md:mt-0">
            <h3 className="font-bold text-lg mb-5">
              QUICK LINKS
            </h3>

            <div className="flex flex-col gap-3 text-gray-300">
              <Link to="/" className="hover:text-white">
                Home
              </Link>

              <Link to="/courses" className="hover:text-white">
                Explore Courses
              </Link>

              <Link to="/login" className="hover:text-white">
                Login
              </Link>

              <Link to="/register" className="hover:text-white">
                Register
              </Link>
            </div>
          </div>

          {/* Contact Information */}
          <div className="mt-8 md:mt-0">
            <h3 className="font-bold text-lg mb-5">
              CONTACT US
            </h3>

            <a
              href="mailto:support@learnhub.com"
              className="text-gray-300 hover:text-white flex items-center mb-3"
            >
              <FaEnvelope className="me-3" />
              support@learnhub.com
            </a>

            {/* Social Media Links */}
            <div className="flex gap-4 mt-5 text-xl">

              <a
                href="https://www.facebook.com/"
                target="_blank"
                rel="noreferrer"
                aria-label="Facebook"
                className="hover:text-secondary"
              >
                <FaFacebookF />
              </a>

              <a
                href="https://www.instagram.com/"
                target="_blank"
                rel="noreferrer"
                aria-label="Instagram"
                className="hover:text-secondary"
              >
                <FaInstagram />
              </a>

              <a
                href="https://www.linkedin.com/"
                target="_blank"
                rel="noreferrer"
                aria-label="LinkedIn"
                className="hover:text-secondary"
              >
                <FaLinkedinIn />
              </a>

            </div>
          </div>

        </div>
      </footer>

      {/* Copyright */}
      <div className="bg-[#09082F] text-gray-300 text-center p-4 text-sm">
        Copyright © 2026 LearnHub. All rights reserved.
      </div>
    </>
  )
}

export default Footer
