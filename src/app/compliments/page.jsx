'use client';
import Link from "next/link";
import { BreadCrumb } from 'primereact/breadcrumb';
import { Button } from 'primereact/button';
import { Skeleton } from 'primereact/skeleton';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import Header from "@/app/_components/Header";
import ComplimentCard from "@/app/_components/ComplimentCard";
import { useFetchComplimentList } from "@/app/_hook/useFetchComplimentList";
import { useRedirectNoAuth } from "@/app/_hook/useRedirectNoAuth";

export default function Compliments() {
  useRedirectNoAuth();
  const compliments = useFetchComplimentList();
  return (
    <>
      <Header />
      <BreadCrumb separatorIcon={''} home={{
        icon:<FontAwesomeIcon icon={faUser} className="h-[10px] text-slate-500 mr-1" />,
        label: 'みんなの投稿',
        url: '/compliments'
      }} className="flex text-sm bg-transparent border-none"
      pt={{
        separator: {
            className: 'hidden'
        }
      }} />
        <div className="text-center mx-5">
          {compliments.length > 0 ?
            compliments.map((compliment, index) =>
              <ComplimentCard key={index} complimentInfo={compliment} />
            )
            : new Array(3).map((_, index) => (
              <Skeleton key={index} className="w-full" height="540px" />
            ))
          }
        </div>
    </>
  );
}
