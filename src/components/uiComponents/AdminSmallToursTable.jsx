"use client";
import { Table, Thead, Tbody, Tr, Th, Td } from "react-super-responsive-table";
import "react-super-responsive-table/dist/SuperResponsiveTableStyle.css";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function AdminSmallUsersTable({ tours }) {
  return (
    <Table>
      <Thead>
        <Tr className="bg-primary h-12">
          <Th className="text-white text-start">Image</Th>
          <Th className="text-white text-start">Name</Th>
          <Th className="text-white text-start">Price</Th>
          <Th className="text-white text-start">Difficulty</Th>
          <Th className="text-white text-start">Duration</Th>
        </Tr>
      </Thead>
      <Tbody>
        {tours?.slice(0, 5).map((tour, idx) => (
          <Tr key={idx} className={`${idx % 2 === 0 && "bg-slate-100"}`}>
            <Td className="text-sm font-semibold py-3">
              <Avatar className="size-6 border">
                <AvatarImage
                  src={tour?.imageCover || "/assets/defaultTourImage.png"}
                />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
            </Td>
            <Td className="text-sm font-semibold py-1">{tour.name}</Td>
            <Td className="text-sm font-semibold py-1">{tour.price}</Td>
            <Td className="text-sm font-semibold py-1">{tour.difficulty}</Td>
            <Td className="text-sm font-semibold py-1">{tour.duration} Days</Td>
          </Tr>
        ))}
      </Tbody>
    </Table>
  );
}
