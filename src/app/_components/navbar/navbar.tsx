import { Link, Text } from "@/core-components";

export const Navbar = () => {
  return (
    <nav className="flex h-12 items-center justify-between bg-primary px-1 py-2">
      <Text color="dark"></Text>

      <div className="flex gap-1">
        <Link href="/register">Register</Link>
        <Link href="/login">Log in</Link>
      </div>
    </nav>
  );
};
