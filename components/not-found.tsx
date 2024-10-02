"use client";
import Link from "next/link";
import Container from "@/components/ui/container";
import Image from "next/image";
const ErrorPage = () => {
  return (
    <section className="h-full m-auto">
      <Container>
        <div className="flex flex-col items-center justify-center gap-6">
          <Image
            src="/images/404-blue.png"
            alt="Error"
            width={288}
            height={288}
            className="select-none border-2 border-grey w-72 aspect-square object-cover rounded"
          />
          <h1 className="text-3xl sm:text-4xl font-bold leading-7 ">
            Page not found
          </h1>
          <p className="text-sm leading-7 font-semibold">
            The page your looking for does not exist. Go back to{" "}
            <Link href="/" className="text-primary underline">
              {" "}
              HomePage
            </Link>
          </p>
        </div>
      </Container>
    </section>
  );
};

export default ErrorPage;
