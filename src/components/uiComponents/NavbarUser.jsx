import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { findUserById, signUserOut } from "@/lib/actions/users";
import Link from "next/link";
import { Badge } from "@/components/ui/badge"

async function NavbarUser() {
  const userRes = await findUserById();
  const user = userRes && JSON.parse(userRes);
  return (
    <section className="max-md:hidden">
      {user ? (
        <DropdownMenu>
          <DropdownMenuTrigger className="outline-none">
            <Avatar>
              <AvatarImage
                src={user?.photo || "https://github.com/shadcn.png"}
              />
              <AvatarFallback>B</AvatarFallback>
            </Avatar>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel className="flex gap-2">{user?.name}<Badge variant="secondary">{user?.role}</Badge></DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <Link href={"/user/profile"} className="h-full w-full">
                Profile
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Link href={"/user/tours"} className="h-full w-full">
                My tours
              </Link>
            </DropdownMenuItem>
            {user?.role.toLowerCase() != "user" && (
              <DropdownMenuItem>
                <Link href={"/admin/dashboard"} className="h-full w-full">
                  Dashboard
                </Link>
              </DropdownMenuItem>
            )}
            <DropdownMenuItem className="hover:bg-none font-semibold">
              <form action={signUserOut}>
                <button className="w-full my-2" type="submit">
                  Log out
                </button>
              </form>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ) : (
        <div className="mx-2 flex gap-3 items-center h-full">
          <Link
            className="font-semibold text-white hover:underline"
            href={"/auth/signin"}
          >
            Log in
          </Link>
        </div>
      )}
    </section>
  );
}

export default NavbarUser;
