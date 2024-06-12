"use client"
import Autoplay from "embla-carousel-autoplay";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import homeCarousel from "@/lib/homeCarousel";
import { Separator } from "../ui/separator";
import { Calendar, LocateFixed, Star } from "lucide-react";
import Image from "next/image";

function HomeCarousel() {
  return (
    <div className="relative">
      <div className="absolute h-28 w-full shadow-lg bg-slate-50 z-40 max-w-[1000px] left-0 right-0 mx-auto -bottom-12 grid grid-cols-2 lg:grid-cols-4 ">
        <div className="flex flex-col justify-center pl-3">
          <div className="flex gap-3">
            <b className="">Location</b>
            <LocateFixed className="text-slate-700 max-sm:hidden" />
          </div>
          <p className="text-slate-700 max-sm:text-sm line-clamp-1">Anywhere you want</p>
        </div>
        <div className="flex gap-3 items-center">
          <Separator orientation="vertical" className="max-h-24" />
          <div className="flex flex-col">
            <div className="flex gap-3">
              <b className="">Check in</b>
              <Calendar className=" max-sm:hidden"/>
            </div>
            <p className="text-slate-700 max-sm:text-sm line-clamp-1">Your selection</p>
          </div>
        </div>
        <div className="flex gap-3 items-center">
          <Separator orientation="vertical" className="max-h-24" />
          <div className="flex flex-col">
            <div className="flex gap-3">
              <b className="max-sm:text-sm line-clamp-1">Check out</b>
              <Calendar className=" max-sm:hidden"/>
            </div>
            <p className="text-slate-700 line-clamp-1">Your selection</p>
          </div>
        </div>

        <div className="flex gap-3 items-center">
          <Separator orientation="vertical" className="max-h-24" />
          <div className="flex flex-col">
            <div className="flex gap-3">
              <b className="max-sm:text-sm">Experience</b>
              <Star className=" max-sm:hidden"/>
            </div>
            <p className="text-slate-700">Life time</p>
          </div>
        </div>
      </div>
      <Carousel
        plugins={[
          Autoplay({
            delay: 7000,
          }),
        ]}
        className="w-full max-w-[1300px] mx-auto shadow-md z-0"
      >
        <CarouselContent>
          {homeCarousel.map((item, index) => (
            <CarouselItem key={index}>
              <div className="grid grid-cols-1 md:grid-cols-2 relative">
                <div className="absolute md:relative text-white md:text-black inset-0 z-10 flex flex-col items-center md:justify-center gap-3">
                  <b className="whitespace-pre-line text-4xl md:text-6xl font-sans w-full flex items-center justify-start md:pl-10 pl-2">
                    {item.label}
                  </b>
                  <p className="whitespace-pre-line hidden sm:flex max-w-[500px] text-sm font-sans items-start justify-start mr-auto md:pl-10 pl-2">
                    {item.description}
                  </p>
                </div>
                <Image
                  width={1000}
                  height={500}
                  alt="alt"
                  className="h-[460px] brightness-50 md:brightness-100 w-full ml-auto object-cover z-0"
                  src={item.link}
                />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </div>
  );
}

export default HomeCarousel;
