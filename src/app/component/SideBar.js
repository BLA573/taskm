"use client";

import SidebarList from "./SidebarList";
import { useState, useEffect, useRef } from "react";
import { useUser } from "@/contexts/UserContext";
import { redirect } from "next/navigation";

export default function SideBar() {
  const [colaps, setColaps] = useState(false);
  const { user, clearUser } = useUser();
  const [isMobile, setIsMobile] = useState(false); // Track if the screen is mobile
  const sidebarRef = useRef(null); // Ref to track the sidebar element

  const handleColaps = () => {
    setColaps(!colaps);
  };

  // Check if the screen width is 500px or less
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.matchMedia("(max-width: 500px)").matches);
    };

    // Check on mount and when the window is resized
    checkMobile();
    window.addEventListener("resize", checkMobile);

    // Clean up the event listener
    return () => {
      window.removeEventListener("resize", checkMobile);
    };
  }, []);

  // Detect clicks outside the sidebar (only on mobile)
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        isMobile && // Only collapse on mobile
        sidebarRef.current &&
        !sidebarRef.current.contains(event.target)
      ) {
        setColaps(true); // Collapse the sidebar
      }
    };

    // Add event listener when the sidebar is expanded
    if (!colaps) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    // Clean up the event listener
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [colaps, isMobile]); // Re-run effect when `colaps` or `isMobile` changes

  const handleLogout = () => {
    clearUser();
    redirect("/login");
  };

  return (
    <>
      <div
        ref={sidebarRef} // Attach the ref to the sidebar
        className={`bg-[#1a1a1a] h-screen flex flex-col justify-between pb-2 pt-8 px-[10px] fixed inset-y-0 left-0 z-10 min-[500px]:relative ${
          colaps ? "w-[60px]" : "w-[200px]"
        }`}
      >
        <div className={`flex flex-col gap-4 ${colaps && "items-center"}`}>
          <h1 className="text-xl text-white flex items-center justify-between gap-2 h-10 mb-4">
            <div
              className={`flex items-center gap-2 ${colaps ? "pl-0" : "pl-2"}`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                onClick={handleColaps}
                fill="white"
              >
                <path d="M6 3h2v2H6zm2 16h3v2H8zm8-16h2v2h-2zm-3 16h3v2h-3zm7-8V9h-2V7h-2V5h-2v2h-4V5H8v2H6v2H4v2H2v8h2v-4h2v4h2v-3h8v3h2v-4h2v4h2v-8zm-10 1H8V9h2zm6 0h-2V9h2z"></path>
              </svg>
              <span className={`${colaps && "hidden"} text-xl`}>Task App</span>
            </div>
          </h1>

          <SidebarList colaps={colaps} />
        </div>
        {!colaps && (
          <div className="bg-[#2a2a2a] p-1 rounded-lg flex justify-center text-sm w-full border border-[#454546]">
            {/* <button
            className={`bg-[#1a1a1a] w-1/2 ${
              colaps && "w-10"
            } py-[6px] rounded-md text-white flex justify-center gap-[6px] items-center`}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 384 512"
              height={15}
              width={15}
              fill="white"
            >
              <path d="M223.5 32C100 32 0 132.3 0 256S100 480 223.5 480c60.6 0 115.5-24.2 155.8-63.4c5-4.9 6.3-12.5 3.1-18.7s-10.1-9.7-17-8.5c-9.8 1.7-19.8 2.6-30.1 2.6c-96.9 0-175.5-78.8-175.5-176c0-65.8 36-123.1 89.3-153.3c6.1-3.5 9.2-10.5 7.7-17.3s-7.3-11.9-14.3-12.5c-6.3-.5-12.6-.8-19-.8z" />
            </svg>
            <span className={`${colaps && "hidden"}`}>Dark</span>
          </button>
          <button
            className={`w-1/2 py-[6px] rounded-lg text-white flex justify-center gap-[6px] items-center ${
              colaps && "hidden"
            }`}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width={17}
              height={17}
              viewBox="0 0 24 24"
              fill="white"
            >
              <path d="M6.995 12c0 2.761 2.246 5.007 5.007 5.007s5.007-2.246 5.007-5.007-2.246-5.007-5.007-5.007S6.995 9.239 6.995 12zM11 19h2v3h-2zm0-17h2v3h-2zm-9 9h3v2H2zm17 0h3v2h-3zM5.637 19.778l-1.414-1.414 2.121-2.121 1.414 1.414zM16.242 6.344l2.122-2.122 1.414 1.414-2.122 2.122zM6.344 7.759 4.223 5.637l1.415-1.414 2.12 2.122zm13.434 10.605-1.414 1.414-2.122-2.122 1.414-1.414z"></path>
            </svg>
            <span className={`${colaps && "hidden"}`}>Light</span>
          </button> */}
            {user && !colaps && (
              <div className="flex gap-2 text-gray-400">
                <div className="  hover:text-white uppercase">{user.name}</div>{" "}
                |
                <button className=" hover:text-white" onClick={handleLogout}>
                  Logout
                </button>
              </div>
            )}
          </div>
        )}
      </div>
      {isMobile && !colaps && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-0"
          onClick={() => setColaps(true)}
        ></div>
      )}
    </>
  );
}
