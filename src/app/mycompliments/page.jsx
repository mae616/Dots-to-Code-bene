'use client';
import { useState } from "react";
import Link from "next/link";
import { BreadCrumb } from 'primereact/breadcrumb';
import { Button } from 'primereact/button';
import { Skeleton } from 'primereact/skeleton';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import Header from "@/app/_components/Header";
import MyComplimentCard from "@/app/_components/MyComplimentCard";
import { useFetchMyComplimentList } from "@/app/_hook/useFetchMyComplimentList";
import { useRedirectNoAuth } from "@/app/_hook/useRedirectNoAuth";

export default function MyCompliments() {
  useRedirectNoAuth();
  const { myCompliments } = useFetchMyComplimentList();

  return (
    <>
      <Header />
      <BreadCrumb separatorIcon={''} home={{
        icon:<FontAwesomeIcon icon={faUser} className="h-[10px] text-slate-500 mr-1" />,
        label: '自分の投稿',
        url: '/mycompliments'
      }} className="flex text-sm bg-transparent border-none"
      pt={{
        separator: {
            className: 'hidden'
        }
      }} />
        <div className="text-center mx-5">
          <div className="flex justify-end items-center ">
            <Link href="/mycompliments/new">
              <Button icon="pi pi-plus" aria-label="新規投稿" rounded className="w-[2.3em] h-[2.3em]" />
            </Link>
          </div>
          {myCompliments.length > 0 ?
            myCompliments.map((myCompliment, index) =>
              <MyComplimentCard key={index} myComplimentInfo={myCompliment} />
            )
            : new Array(3).map((_, index) => (
              <Skeleton key={index} className="w-full" height="540px" />
            ))
          }
        </div>
    </>
  );
}
