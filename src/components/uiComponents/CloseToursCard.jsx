import Link from "next/link";
import React from "react";
import { Card, CardContent, CardHeader } from "../ui/card";
import Image from "next/image";


function CloseToursCard({ data }) {
  return (
    <Link href={`/tour/${data?._id}`} className="group">
      <Card>
        <CardHeader>
          <small className="font-semibold">{data?.difficulty}</small>
          <Image
            width={500}
            height={500}
            alt={data?.name}
            src={data?.imageCover}
            className="rounded-lg max-h-[160px] w-full object-cover group-hover:scale-105 duration-300"
          />
        </CardHeader>
        <CardContent>
          <b className="line-clamp-1">{data?.name}</b>
          <b>${data?.price}</b>
        </CardContent>
      </Card>
    </Link>
  );
}

export default CloseToursCard;
