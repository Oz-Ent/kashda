import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes } from '@fortawesome/free-solid-svg-icons'

interface PlanSummaryProps {
    planName: string
    initialDeposit: string
    selectedFrequency: string
    topUpAmount: string
    targetAmount: string
    endDate: string
    onBack: () => void
    onCreatePlan: () => void
    onClose?: () => void
}

const PlanSummary: React.FC<PlanSummaryProps> = ({
    planName,
    initialDeposit,
    selectedFrequency,
    topUpAmount,
    targetAmount,
    endDate,
    onBack,
    onCreatePlan,
    onClose
}) => {
    const formatCurrency = (amount: string): string => {
        const num = parseFloat(amount)
        return isNaN(num) ? '0.00' : num.toLocaleString('en-US', {
            style: 'currency',
            currency: 'USD',
            minimumFractionDigits: 2
        })
    }

    const formatDate = (dateString: string): string => {
        if (!dateString) return 'Not set'
        const date = new Date(dateString)
        return date.toLocaleDateString('en-US', {
            weekday: 'short',
            month: 'short',
            day: 'numeric',
            year: 'numeric'
        })
    }

    const getFrequencyText = (frequency: string): string => {
        switch (frequency) {
            case 'Daily': return 'daily'
            case 'Weekly': return 'weekly'
            case 'Bi-Weekly': return 'bi-weekly'
            case 'Monthly': return 'monthly'
            case 'Quarterly': return 'quarterly'
            default: return 'manual'
        }
    }

    return (
        <div className="h-[18rem] w-full flex flex-col px-1">
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-[#e0e0e0]">Plan Summary</h3>

            </div>

            {/* Summary Content */}
            <div className="flex-1 flex flex-col justify-center space-y-4 text-[#e0e0e0]">
                <p className="text-center leading-relaxed">
                    Initial deposit of <strong>{formatCurrency(initialDeposit)}</strong> and {getFrequencyText(selectedFrequency)} deduction of <strong>{formatCurrency(topUpAmount)}</strong>.
                </p>

                <p className="text-center leading-relaxed">
                    Your plan will reach a target of <strong>{formatCurrency(targetAmount)}</strong> by <strong>{formatDate(endDate)}</strong>.
                </p>

                <p className="text-center leading-relaxed">
                    This is based on a 9% annual interest rate.
                </p>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4 mt-8">
                <button
                    onClick={onCreatePlan}
                    className="flex-1 h-[3rem] bg-[#c19813] hover:bg-[#e6c24d] text-white px-4 py-2 rounded-lg transition-colors duration-200 cursor-pointer"
                >
                    Start Plan
                </button>

                <button
                    onClick={onBack}
                    className="flex-1 h-[3rem] bg-[#4a007a] hover:bg-[#6a0dad] text-[#e0e0e0] px-4 py-2 rounded-lg border border-[#6a0dad] transition-colors duration-200 cursor-pointer"
                >
                    Edit Plan
                </button>
            </div>
        </div>
    )
}

export default PlanSummary
