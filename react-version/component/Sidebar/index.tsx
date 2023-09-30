import React from "react";
import Image from "next/image";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/css/bootstrap.css";
import "../../public/style.css";
import "../../public/aos.css";
import Person from "../../public/images/person.jpg";
import favicon from "../../public/images/fav-icon.png";

function Sidebar() {
  return (
    <nav className='navbar navbar-expand-lg navbar-dark fixed-top'>
      <div className='container flex-lg-column'>
        <a className='navbar-brand mx-lg-auto mb-lg-4' href='#'>
          <span className='h2 d-flex fw-bold d-lg-none'>
            <Image
              style={{ width: "25px" }}
              alt='myIcon'
              className='d-flex d-lg-none'
              src={favicon}
            />
            hmed Abdulrahman
          </span>
          <Image
            src={Person}
            className='d-none d-lg-block rounded-circle'
            alt="I'm"
          />
        </a>
        <button
          className='navbar-toggler'
          type='button'
          data-bs-toggle='collapse'
          data-bs-target='#navbarNav'
          aria-controls='navbarNav'
          aria-expanded='false'
          aria-label='Toggle navigation'
        >
          <span className='navbar-toggler-icon'></span>
        </button>
        <div className='collapse navbar-collapse' id='navbarNav'>
          <ul className='navbar-nav ms-auto flex-lg-column text-lg-center'>
            <li className='nav-item'>
              <a className='nav-link' href='#home'>
                Home
              </a>
            </li>
            <li className='nav-item'>
              <a className='nav-link' href='#services'>
                Services
              </a>
            </li>
            <li className='nav-item'>
              <a className='nav-link' href='#work'>
                Work
              </a>
            </li>
            <li className='nav-item'>
              <a className='nav-link' href='#about'>
                About
              </a>
            </li>
            <li className='nav-item'>
              <a className='nav-link' href='#reviews'>
                Reviews
              </a>
            </li>
            <li className='nav-item'>
              <a className='nav-link' href='#blog'>
                Certifications
              </a>
            </li>
            <li className='nav-item'>
              <a className='nav-link' href='#contact'>
                Contact
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Sidebar;
