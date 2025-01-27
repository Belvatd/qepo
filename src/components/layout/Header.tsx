import Link from "next/link";

export const Header = () => {
  return (
    <header className="flex h-16 items-center justify-between border-b-2 border-border bg-background px-4 md:h-20 md:px-8">
      <Link
        href={"/"}
        className="text-2xl font-bold text-primary hover:cursor-pointer md:text-3xl"
      >
        Qepo
      </Link>
    </header>
  );
};
