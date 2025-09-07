"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { AnimatePresence } from "motion/react";
import LoadingPage from "@/components/Loading";

export default function HomePage() {
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(true);

  const handleLoadingComplete = () => {
    setIsLoading(false);
  };

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      router.push("/login");
    } else {
      router.push("/dashboard");
    }
  }, [router]);

  return(
    <AnimatePresence mode="wait">
      {isLoading ? (
            <LoadingPage key="loading" onComplete={handleLoadingComplete} />
          ): null}

    </AnimatePresence>
  )
}