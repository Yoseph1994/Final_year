import NavbarLogo from "./NavbarLogo";
import Link from "next/link";

function Footer() {
  const date = new Date().getFullYear();
  return (
    <footer className="bg-gray-100 mt-5">
      <div className="relative mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8 lg:pt-24">
        <div className="lg:flex lg:items-end lg:justify-between">
          <div>
            <div className="flex justify-center text-teal-600 lg:justify-start">
              <NavbarLogo />
            </div>

            <p className="mx-auto mt-6 max-w-md text-center leading-relaxed text-gray-500 lg:text-left">
              Discover the world with our travel agency, where your security and
              privacy are our top priorities.
            </p>
          </div>

          <ul className="mt-12 flex flex-wrap justify-center gap-6 md:gap-8 lg:mt-0 lg:justify-end lg:gap-12">
            <li>
              <Link
                className="text-gray-700 transition hover:text-gray-700/75"
                href={"https://www.yamatoursethiopia.com/about-us.html"}
                target="_blank"
              >
                About
              </Link>
            </li>

            <li>
              <Link
                className="text-gray-700 transition hover:text-gray-700/75"
                href={"https://www.yamatoursethiopia.com/blog.html"}
                target="_blank"
              >
                Blog
              </Link>
            </li>
          </ul>
        </div>

        <p className="mt-12 text-center text-sm text-gray-500 lg:text-right">
          Copyright &copy; {date}. All rights reserved.
        </p>
      </div>
    </footer>
  );
}

export default Footer;
