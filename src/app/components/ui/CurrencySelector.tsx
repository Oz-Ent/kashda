import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';

interface CurrencySelectorProps {
    selectedCurrency: string;
    onCurrencyChange: (currency: string) => void;
    className?: string;
}

const CurrencySelector: React.FC<CurrencySelectorProps> = ({
    selectedCurrency,
    onCurrencyChange,
    className = ""
}) => {
    const currencies = [
        { code: 'USD', name: 'US Dollar', symbol: '$' },
        { code: 'GH₵', name: 'Ghanaian Cedi', symbol: 'GH₵' },
        { code: 'DZD', name: 'Algerian Dinar', symbol: 'د.ج' }
    ];

    return (
        <div className={`relative ${className}`}>
            <select
                value={selectedCurrency}
                onChange={(e) => onCurrencyChange(e.target.value)}
                className="appearance-none bg-[#4a007a] border border-[#4a007a] text-[#e0e0e0] px-3 py-2 pr-8 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6a0dad] focus:border-[#6a0dad] transition-all duration-200 cursor-pointer"
            >
                {currencies.map((currency) => (
                    <option key={currency.code} value={currency.code}>
                        {currency.symbol} {currency.name}
                    </option>
                ))}
            </select>
            <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                <FontAwesomeIcon icon={faChevronDown} className="text-[#a0a0a0] text-sm" />
            </div>
        </div>
    );
};

export default CurrencySelector;
