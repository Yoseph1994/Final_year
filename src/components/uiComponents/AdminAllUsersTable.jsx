"use client";
import { Table, Thead, Tbody, Tr, Th, Td } from "react-super-responsive-table";
import "react-super-responsive-table/dist/SuperResponsiveTableStyle.css";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "../ui/button";
import { adminDeleteAccount } from "@/lib/actions/users";
import { useFormState, useFormStatus } from "react-dom";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Spinner from "./Spinner";

export default function AdminAllUsersTable({ users, me }) {
  const [state, formAction] = useFormState(adminDeleteAccount, null);

  const [usersData, setUsersData] = useState(users);
  const searchParams = useSearchParams();

  useEffect(() => {
    if (state?.success) {
      window.location.reload();
    }
  }, [state]);
  useEffect(() => {
    let user = searchParams.get("user");
    let userRole = searchParams.get("userRole");
    let userRoleQuery = userRole ? userRole.split(",") : [];
    if (userRole) {
      const filteredUsers = users.filter((item) => {
        if (userRoleQuery.includes(item.role)) {
          return item;
        }
      });
      setUsersData(filteredUsers);
    } else if (user) {
      const filteredUsers = usersData.filter((item) =>
        item.name.toLowerCase().includes(user.toLowerCase())
      );
      setUsersData(filteredUsers);
    } else {
      setUsersData(users);
    }
  }, [searchParams]);

  const Submit = () => {
    const { pending } = useFormStatus();
    return (
      <Button
        variant="ghost"
        disabled={pending}
        className="bg-transparent hover:bg-transparent px-0 text-red-500 hover:underline hover:text-red-600 w-full"
      >
        {pending ? <Spinner height={10} /> : "Delete"}
      </Button>
    );
  };

  return (
    <Table>
      <Thead>
        <Tr className="bg-primary h-12">
          <Th className="text-white text-start">Profile</Th>
          <Th className="text-white text-start">Name</Th>
          <Th className="text-white text-start">Email</Th>
          <Th className="text-white text-start">Role</Th>
          <Th className="text-white text-start">is Active</Th>
          <Th className="text-white text-center">Action</Th>
        </Tr>
      </Thead>
      <Tbody>
        {usersData?.map((user, idx) => (
          <Tr key={idx} className={`${idx % 2 === 0 && "bg-slate-100"}`}>
            <Td className="text-sm font-semibold py-3">
              <Avatar className="size-6 border">
                <AvatarImage src={user?.photo} />
                <AvatarFallback></AvatarFallback>
              </Avatar>
            </Td>
            <Td className="text-sm font-semibold py-1">{user.name}</Td>
            <Td className="text-sm font-semibold py-1">{user.email}</Td>
            <Td className="text-sm font-semibold py-1">{user.role}</Td>
            <Td
              className={`text-sm font-semibold py-1 ${
                user.isActive ? "text-green-400" : "text-black"
              }`}
            >
              {user.isActive ? "Active" : "Inactive"}
            </Td>
            <Td className="text-sm font-semibold py-1">
              <form action={formAction}>
                <input type="hidden" name="id" value={user._id} />
                {me?.role == "admin" && <Submit />}
              </form>
            </Td>
          </Tr>
        ))}
      </Tbody>
    </Table>
  );
}
