import Link from "next/link";
import Image from "next/image";

export default function AdminNavbar() {
  return (
    <header className="px-4 py-3 flex items-center justify-between bg-[#172A4F] text-white shadow">
      <div className="flex items-center gap-4">
        <div className="flex items-center">
          <Image
            src="/logos/noBack.png"
            alt="DLift Crane Rentals logo"
            width={190}
            height={70}
            className="h-20 w-auto object-contain"
            priority
          />
          <h1 className="font-semibold tracking-wide ml-2">Dlift Admin Dashboard</h1>
        </div>
        <nav className="hidden sm:flex gap-4 text-sm">
          <Link className="hover:text-[#D7953F] transition-colors" href="/">Home</Link>
          <Link className="hover:text-[#D7953F] transition-colors" href="/admin/quotes">Quotes</Link>
        </nav>
      </div>
      <form action="/api/admin/logout" method="post">
        <button className="px-3 py-1.5 rounded-md bg-[#D7953F] hover:opacity-90 transition text-white text-sm" type="submit">Logout</button>
      </form>
    </header>
  );
}
