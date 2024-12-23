"use client"
import Link from "next/link";
import { useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";

export default function Menubar(){
    const [nav, setNav] = useState(false);

  const links = [
    {
      id: 1,
      link: "home",
    },
    {
      id: 2,
      link: "about",
    },
    {
      id: 3,
      link: "portfolio",
    },
    {
      id: 4,
      link: "experience",
    },
    {
      id: 5,
      link: "contact",
    },
  ];

    return(
        <nav className="flex justify-between items-center w-full h-12 px-4 text-white bg-black nav">
            <div>
                {/* <h1 className="text-5xl font-signature ml-2"><a className="link-underline hover:transition ease-in-out delay-150 hover:underline hover:decoration-solid" href="">Logo</a></h1> */}
                <h1 className="text-2xl font-signature ml-2">
                <a
                    className="link-underline link-underline-black"
                    href=""
                    target="_blank"
                    rel="noreferrer"
                >NEXT.js Dev Workspace
                </a>
                </h1>
            </div>

            <ul className="hidden md:flex md:flex-row">
                {links.map(({ id, link }) => (
                <li
                    key={id}
                    className="nav-links px-4 cursor-pointer capitalize font-medium text-gray-500 hover:scale-105 hover:text-white duration-200 link-underline"
                >
                    <Link href={link}>{link}</Link>
                </li>
                ))}
            </ul>

            <div className="cursor-pointer pr-4 z-10 text-gray-500 md:hidden" onClick={() => setNav(!nav)}>
                {nav ? <FaTimes size={30} /> : <FaBars size={30} />}
            </div>

            {nav && (
                <ul className="flex flex-col justify-center items-center absolute top-0 left-0 w-full h-screen bg-gradient-to-b from-black to-gray-800 text-gray-500">
                {links.map(({ id, link }) => (
                    <li
                    key={id}
                    className="px-4 cursor-pointer capitalize py-6 text-4xl"
                    >
                    <Link onClick={() => setNav(!nav)} href={link}>
                        {link}
                    </Link>
                    </li>
                ))}
                </ul>
            )}
        </nav>
    )
}