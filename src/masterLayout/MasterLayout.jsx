"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Icon } from "@iconify/react/dist/iconify.js";
import { usePathname } from "next/navigation";
import ThemeToggleButton from "../helper/ThemeToggleButton";
import Link from "next/link";

const MasterLayout = ({ children }) => {
  let pathname = usePathname();
  let router = useRouter();
  let [sidebarActive, seSidebarActive] = useState(false);
  let [mobileMenu, setMobileMenu] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/');
    }
  }, [router]);

  let sidebarControl = () => {
    seSidebarActive(!sidebarActive);
  };

  let mobileMenuControl = () => {
    setMobileMenu(!mobileMenu);
  };

  return (
    <section className={mobileMenu ? "overlay active" : "overlay "}>
      {/* sidebar */}
      <aside
        className={
          sidebarActive
            ? "sidebar active "
            : mobileMenu
            ? "sidebar sidebar-open"
            : "sidebar"
        }
      >
        <button
          onClick={mobileMenuControl}
          type='button'
          className='sidebar-close-btn'
        >
          <Icon icon='radix-icons:cross-2' />
        </button>
        <div>
          <Link href='/dashboard' className='sidebar-logo justify-content-center'>
            <img
              src='/assets/images/logo.png'
              alt='site logo'
              className='light-logo'
            />
            <img
              src='/assets/images/logo-light.png'
              alt='site logo'
              className='dark-logo'
            />
            <img
              src='/assets/images/logo-icon.png'
              alt='site logo'
              className='logo-icon'
            />
          </Link>
        </div>
        <div className='sidebar-menu-area'>
          <ul className='sidebar-menu' id='sidebar-menu'>
            <li>
              <Link href='/dashboard' className={pathname === "/dashboard" ? "active-page" : ""}>
                <Icon icon='material-symbols:dashboard-outline' className='menu-icon' />
                <span>Dashboard</span>
              </Link>
            </li>
            <li>
              <Link href='/members' className={pathname === "/members" || pathname === "/members/create" || pathname === "/members/edit" ? "active-page" : ""}>
                <Icon icon='lucide:users' className='menu-icon' />
                <span>Members</span>
              </Link>
            </li>
            <li>
              <Link href='/feed' className={pathname === "/feed" ? "active-page" : ""}>
                <Icon icon='solar:feed-outline' className='menu-icon' />
                <span>Feed</span>
              </Link>
            </li>
            <li>
              <Link href='/job-post' className={pathname === "/job-post" ? "active-page" : ""}>
                <Icon icon='hugeicons:job-search' className='menu-icon' />
                <span>Job Posts</span>
              </Link>
            </li>
            <li>
              <Link href='/events' className={pathname === "/events" ? "active-page" : ""}>
                <Icon icon='mdi:events' className='menu-icon' />
                <span>Events</span>
              </Link>
            </li>
            <li>
              <Link href='/news' className={pathname === "/news" || pathname === "/news/create" || pathname === "/news/edit" ? "active-page" : ""}>
                <Icon icon='iconamoon:news-light' className='menu-icon' />
                <span>News</span>
              </Link>
            </li>
            <li>
              <Link href='/magazine' className={pathname === "/magazine" || pathname === "/magazine/create" || pathname === "/magazine/edit" ? "active-page" : ""}>
                <Icon icon='prime:file-pdf' className='menu-icon' />
                <span>Magazine</span>
              </Link>
            </li>
          </ul>
        </div>
      </aside>

      <main
        className={sidebarActive ? "dashboard-main active" : "dashboard-main"}
      >
        <div className='navbar-header'>
          <div className='row align-items-center justify-content-between'>
            <div className='col-auto'>
              <div className='d-flex flex-wrap align-items-center gap-4'>
                <button
                  type='button'
                  className='sidebar-toggle'
                  onClick={sidebarControl}
                >
                  {sidebarActive ? (
                    <Icon
                      icon='iconoir:arrow-right'
                      className='icon text-2xl non-active'
                    />
                  ) : (
                    <Icon
                      icon='heroicons:bars-3-solid'
                      className='icon text-2xl non-active '
                    />
                  )}
                </button>
                <button
                  onClick={mobileMenuControl}
                  type='button'
                  className='sidebar-mobile-toggle'
                >
                  <Icon icon='heroicons:bars-3-solid' className='icon' />
                </button>
                <form className='navbar-search'>
                  <input type='text' name='search' placeholder='Search' />
                  <Icon icon='ion:search-outline' className='icon' />
                </form>
              </div>
            </div>
            <div className='col-auto'>
              <div className='d-flex flex-wrap align-items-center gap-3'>
                {/* ThemeToggleButton */}
                <ThemeToggleButton />
                <div className='dropdown'>
                  <button
                    className='d-flex justify-content-center align-items-center rounded-circle'
                    type='button'
                    data-bs-toggle='dropdown'
                  >
                    <img
                      src='/assets/images/avatar/avatar.png'
                      alt='image_user'
                      className='w-40-px h-40-px object-fit-cover rounded-circle'
                    />
                  </button>
                  <div className='dropdown-menu to-top dropdown-menu-sm'>
                    <div className='py-12 px-16 radius-8 bg-primary-50 mb-16 d-flex align-items-center justify-content-between gap-2'>
                      <div>
                        <h6 className='text-lg text-primary-light fw-semibold mb-2'>
                          Kanwal Masroor
                        </h6>
                        <span className='text-secondary-light fw-medium text-sm'>
                          Admin
                        </span>
                      </div>
                      <button type='button' className='hover-text-danger'>
                        <Icon
                          icon='radix-icons:cross-1'
                          className='icon text-xl'
                        />
                      </button>
                    </div>
                    <ul className='to-top-list'>
                      <li>
                        <Link
                          className='dropdown-item text-black px-0 py-8 hover-bg-transparent hover-text-primary d-flex align-items-center gap-3'
                          href='/view-profile'
                        >
                          <Icon
                            icon='solar:user-linear'
                            className='icon text-xl'
                          />{" "}
                          My Profile
                        </Link>
                      </li>
                      <li>
                        <Link
                          className='dropdown-item text-black px-0 py-8 hover-bg-transparent hover-text-danger d-flex align-items-center gap-3'
                          href='/'
                          onClick={() => {
                            localStorage.removeItem('token');
                          }}
                        >
                          <Icon icon='lucide:power' className='icon text-xl' />{" "}
                          Log Out
                        </Link>
                      </li>
                    </ul>
                  </div>
                </div>
                {/* Profile dropdown end */}
              </div>
            </div>
          </div>
        </div>

        {/* dashboard-main-body */}
        <div className='dashboard-main-body'>{children}</div>

        {/* Footer section */}
        <footer className='d-footer'>
          <div className='row align-items-center justify-content-between'>
            <div className='col-auto'>
              <p className='mb-0'>© 2025 CxO Global Forum All Rights Reserved.</p>
            </div>
            <div className='col-auto'>
              <p className='mb-0'>
                Powered by{" "}
                <a 
                  href="https://thesysnetic.com/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-primary-600 hover-text-primary-700 text-decoration-none fw-medium"
                >
                  Sysnetic
                </a>
              </p>
            </div>
          </div>
        </footer>
      </main>
    </section>
  );
};

export default MasterLayout;
