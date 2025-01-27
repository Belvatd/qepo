import Head from "next/head";
import Link from "next/link";
import { Button } from "~/components/ui/button";
import { Moon, Sun } from "lucide-react";

import { api } from "~/utils/api";
import { useTheme } from "next-themes";

export default function Home() {
  const hello = api.post.hello.useQuery({ text: "from tRPC" });
  const apiUtils = api.useUtils();

  const handleInvalidateQuery = async () => {
    await apiUtils.post.hello.invalidate();
  };

  const { setTheme } = useTheme();

  return (
    <>
      <main className="flex min-h-screen flex-col items-center justify-center gap-y-4 bg-background">
        <h1 className="text-3xl text-primary">Hello World</h1>
        <Button>Click me</Button>
        <Button onClick={() => setTheme("dark")} size="icon">
          <Moon />
        </Button>
        <Button onClick={() => setTheme("light")} size="icon">
          <Sun />
        </Button>
      </main>
    </>
  );
}
