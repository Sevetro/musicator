import { Link, Text } from "@/core-components";

export const Navbar = () => {
  return (
    <nav className="flex h-12 items-center justify-between bg-primary px-1 py-2">
      <Text color="dark"></Text>

      <div className="flex gap-1">
        <Link disabled href="/register">
          Register
        </Link>
        <Link disabled href="/login">
          Log in
        </Link>

        <p className="absolute right-8 top-3 text-red-400">Coming soon!</p>
      </div>
    </nav>
  );
};
