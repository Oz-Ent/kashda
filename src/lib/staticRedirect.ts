"use client";

import { useRouter } from "next/navigation";

export const useStaticRedirect = () => {
  const router = useRouter();

  const redirect = (path: string) => {
    router.push(path);
  };

  return { redirect };
};
