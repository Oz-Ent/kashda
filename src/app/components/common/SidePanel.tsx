"use client";

import {
  faChartLine,
  faCog,
  faExchangeAlt,
  faFileInvoiceDollar,
  faPiggyBank,
  faShieldAlt,
  faSignOutAlt,
  faTachometerAlt,
  faUmbrella,
  faWallet,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import { usePathname } from "next/navigation";

const SidePanel = () => {
  const pathname = usePathname();

  const isActive = (path: string) => {
    return pathname === path || pathname.startsWith(path + "/");
  };

  const getLinkClass = (path: string) => {
    const baseClass =
      "flex items-center p-3 rounded-lg transition-colors duration-200";
    if (isActive(path)) {
      return `${baseClass} bg-[#6a0dad] text-[#d4af37] font-semibold`;
    }
    return `${baseClass} text-[#e0e0e0] hover:text-[#6a0dad] hover:bg-[#3a005f]`;
  };

  return (
    <aside className="bg-[#1a003a] w-64 p-6 flex flex-col shadow-lg min-h-screen">
      <div className="mb-10 text-center">
        {/* KASHDA Logo */}
        <h1 className="text-3xl font-bold">
          <span className="text-[#d4af37]">KA</span>
          <span className="text-[#6a0dad]">$</span>
          <span className="text-[#d4af37]">HDA</span>
        </h1>
      </div>

      <nav className="flex-grow">
        <ul className="space-y-2">
          <li>
            <Link href="/dashboard" className={getLinkClass("/dashboard")}>
              <FontAwesomeIcon
                icon={faTachometerAlt}
                className="mr-3 text-lg"
              />
              <span>Dashboard</span>
            </Link>
          </li>
          <li>
            <Link href="/wallets" className={getLinkClass("/wallets")}>
              <FontAwesomeIcon icon={faWallet} className="mr-3 text-lg" />
              <span>Wallets</span>
            </Link>
          </li>
          <li>
            <Link
              href="/transactions"
              className={getLinkClass("/transactions")}
            >
              <FontAwesomeIcon icon={faExchangeAlt} className="mr-3 text-lg" />
              <span>Transactions</span>
            </Link>
          </li>
          <li>
            <Link href="/savings" className={getLinkClass("/savings")}>
              <FontAwesomeIcon icon={faPiggyBank} className="mr-3 text-lg" />
              <span>Savings</span>
            </Link>
          </li>
          <li>
            <Link href="/investment" className={getLinkClass("/investment")}>
              <FontAwesomeIcon icon={faChartLine} className="mr-3 text-lg" />
              <span>Investments</span>
            </Link>
          </li>
          <li>
            <Link href="/insurance" className={getLinkClass("/insurance")}>
              <FontAwesomeIcon icon={faShieldAlt} className="mr-3 text-lg" />
              <span>Insurance</span>
            </Link>
          </li>
          <li>
            <Link href="/pension" className={getLinkClass("/pension")}>
              <FontAwesomeIcon icon={faUmbrella} className="mr-3 text-lg" />
              <span>Pension</span>
            </Link>
          </li>
          <li>
            <Link href="/revenue" className={getLinkClass("/revenue")}>
              <FontAwesomeIcon
                icon={faFileInvoiceDollar}
                className="mr-3 text-lg"
              />
              <span>Revenue</span>
            </Link>
          </li>
          <li>
            <Link href="/settings" className={getLinkClass("/settings")}>
              <FontAwesomeIcon icon={faCog} className="mr-3 text-lg" />
              <span>Settings</span>
            </Link>
          </li>
        </ul>
      </nav>

      <div className="mt-auto space-y-2">
        <Link
          href="/"
          className="flex items-center p-3 rounded-lg text-red-400 hover:text-red-500 hover:bg-[#3a005f] transition-colors duration-200"
        >
          <FontAwesomeIcon icon={faSignOutAlt} className="mr-3 text-lg" />
          <span>Logout</span>
        </Link>
      </div>
    </aside>
  );
};

export default SidePanel;
