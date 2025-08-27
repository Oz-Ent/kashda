"use client";

import React, { useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import BalanceCard from "./BalanceCard";

interface Wallet {
  id: string;
  type: string;
  balance: number;
  currency: string;
  color: string;
}

interface BalanceCarouselProps {
  wallets: Wallet[];
  title?: string;
}

const BalanceCarousel: React.FC<BalanceCarouselProps> = ({
  wallets,
  title = "My Balances",
}) => {
  const carouselRef = useRef<HTMLDivElement>(null);

  const scrollLeft = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({ left: -300, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({ left: 300, behavior: "smooth" });
    }
  };

  return (
    <section className="lg:col-span-3 mb-6 relative">
      <h2 className="text-xl font-medium mb-3 text-[#e0e0e0]">{title}</h2>
      <div className="relative">
        <div
          ref={carouselRef}
          className="flex overflow-x-hidden pb-2 space-x-4 scroll-smooth"
        >
          {wallets.map((wallet) => (
            <BalanceCard
              key={wallet.id}
              type={wallet.type}
              balance={wallet.balance}
              currency={wallet.currency}
              color={wallet.color}
            />
          ))}
        </div>

        {/* Navigation Buttons */}
        {wallets.length > 2 && (
          <>
            <button
              onClick={scrollLeft}
              className="absolute top-1/2 transform -translate-y-1/2 left-0 bg-gray-800/50 hover:bg-gray-700/70 text-white p-2 rounded-full shadow-lg z-10 focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200 hidden md:block"
            >
              <FontAwesomeIcon icon={faChevronLeft} />
            </button>
            <button
              onClick={scrollRight}
              className="absolute top-1/2 transform -translate-y-1/2 right-0 bg-gray-800/50 hover:bg-gray-700/70 text-white p-2 rounded-full shadow-lg z-10 focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200 hidden md:block"
            >
              <FontAwesomeIcon icon={faChevronRight} />
            </button>
          </>
        )}

        {wallets.length > 1 && (
          <>
            <button
              onClick={scrollLeft}
              className="absolute top-1/2 transform -translate-y-1/2 left-0 bg-gray-800/50 hover:bg-gray-700/70 text-white p-2 rounded-full shadow-lg z-10 focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200 md:hidden"
            >
              <FontAwesomeIcon icon={faChevronLeft} />
            </button>
            <button
              onClick={scrollRight}
              className="absolute top-1/2 transform -translate-y-1/2 right-0 bg-gray-800/50 hover:bg-gray-700/70 text-white p-2 rounded-full shadow-lg z-10 focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200 md:hidden"
            >
              <FontAwesomeIcon icon={faChevronRight} />
            </button>
          </>
        )}
      </div>
    </section>
  );
};

export default BalanceCarousel;
