import Link from "next/link";

function NavbarLogo() {
  return (
    <Link
      href={"/"}
      className="text-xl md:text-2xl lg:text-3xl max-ssm:hidden font-bold"
    >
      <span className="text-primary_orange">Adventure</span>
      <b className="font-bold md:text-4xl bg-primary text-white">Hub</b>
    </Link>
  );
}

export default NavbarLogo;
