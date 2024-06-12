"use client";
import { Table, Thead, Tbody, Tr, Th, Td } from "react-super-responsive-table";
import "react-super-responsive-table/dist/SuperResponsiveTableStyle.css";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";
import { formatDistance } from "date-fns";

export default function AdminAllBooking({ books }) {
  const [booksData, setBooksData] = useState(books);
  const searchParams = useSearchParams();

  useEffect(() => {
    let bookQuery = searchParams.get("book");
    if (bookQuery) {
      const filteredTours = booksData.filter((item) =>
        item?.user?.name.toLowerCase().includes(bookQuery.toLowerCase())
      );
      setBooksData(filteredTours);
    } else {
      setBooksData(books);
    }
  }, [searchParams]);
  return (
    <Table>
      <Thead>
        <Tr className="bg-primary h-12">
          <Th className="text-white text-start">Image</Th>
          <Th className="text-white text-start border-l border-1 border-slate-100 px-2">Tour Name</Th>
          <Th className="text-white text-start border-l border-1 border-slate-100 px-2">User Name</Th>
          <Th className="text-white text-start border-l border-1 border-slate-100 px-2">Email</Th>
          <Th className="text-white text-start border-l border-1 border-slate-100 px-2">Status</Th>
          <Th className="text-white text-start border-l border-1 border-slate-100 px-2">Date</Th>
          <Th className="text-white text-start border-l border-1 border-slate-100 px-2">PdfLink</Th>
        </Tr>
      </Thead>
      <Tbody>
        {booksData?.map((book, idx) => (
          <Tr key={idx} className={`${idx % 2 === 0 && "bg-slate-100"}`}>
            <Td className="text-sm font-semibold py-3">
              <Avatar className="size-6 border">
                <AvatarImage
                  src={book?.tour?.imageCover || "/assets/defaultTourImage.png"}
                />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
            </Td>
            <Td className="text-sm font-semibold py-1">{book?.tour?.name}</Td>
            <Td className="text-sm font-semibold py-1">{book?.user?.name}</Td>
            <Td className="text-sm font-semibold py-1">{book?.user?.email}</Td>
            <Td
              className={`text-sm font-semibold py-1 ${
                book?.status?.toLowerCase() == "paid"
                  ? "text-green-400"
                  : "text-yellow-600"
              }`}
            >
              {book?.status}
            </Td>
            <Td className="text-sm font-semibold py-1">
              {formatDistance(new Date(), book?.createdAt, {
                addSuffix: true,
              })}
            </Td>

            <Td className="text-sm font-semibold py-1">
              {book?.pdfLink && (
                <Link
                  href={`${book?.pdfLink}`}
                  target="_blank"
                  className="text-primary hover:underline"
                >
                  open
                </Link>
              )}
            </Td>
          </Tr>
        ))}
      </Tbody>
    </Table>
  );
}
