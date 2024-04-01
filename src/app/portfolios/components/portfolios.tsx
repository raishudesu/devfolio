"use client";

import { getPortfoliosUtil } from "@/utils/portfolio-utils";
import type { Portfolio } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import { useEffect, useState } from "react";

const Portfolios = () => {
  const { isFetching, isSuccess, data, error } = useQuery({
    queryKey: ["portfolios"],
    queryFn: getPortfoliosUtil,
    refetchOnWindowFocus: false,
  });

  return (
    <div>
      {data?.portfolios?.map(({ id, userId, coverImageLink, description }) => (
        <div key={id}>
          {userId}
          <Image
            width={150}
            height={150}
            src={coverImageLink}
            alt={coverImageLink}
          />
          <p>{description}</p>
        </div>
      ))}
    </div>
  );
};

export default Portfolios;
