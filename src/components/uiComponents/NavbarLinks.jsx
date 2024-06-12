import navItems from "@/lib/navItems";
import Link from "next/link";

function NavbarLinks() {
  return (
    <div className="flex items-center mx-3 gap-5">
      {navItems.map((data, idx) => (
        <p
          key={idx}
          className="font-semibold text-sm tracking-wide capitalize hover:text-primary_orange"
        >
          <Link href={data.link}>{data.label}</Link>
        </p>
      ))}
    </div>
  );
}

export default NavbarLinks;
