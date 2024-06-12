"use client";
import { Table, Thead, Tbody, Tr, Th, Td } from "react-super-responsive-table";
import "react-super-responsive-table/dist/SuperResponsiveTableStyle.css";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function AdminSmallToursTable({ users }) {
  return (
    <Table>
      <Thead>
        <Tr className="bg-primary h-12">
          <Th className="text-white text-start">Profile</Th>
          <Th className="text-white text-start">Name</Th>
          <Th className="text-white text-start">Email</Th>
          <Th className="text-white text-start">Role</Th>
        </Tr>
      </Thead>
      <Tbody>
        {users?.slice(0, 5).map((user, idx) => (
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
          </Tr>
        ))}
      </Tbody>
    </Table>
  );
}
