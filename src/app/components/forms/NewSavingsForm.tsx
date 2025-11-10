import React, { useState, useMemo, useEffect } from 'react'
import PlanSummary from './PlanSummary'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes } from '@fortawesome/free-solid-svg-icons'

interface NewSavingsFormProps {
    onClose?: () => void
}

const NewSavingsForm: React.FC<NewSavingsFormProps> = ({ onClose }) => {
    const [selectedFrequency, setSelectedFrequency] = useState('')
    const [planName, setPlanName] = useState('')
    const [initialDeposit, setInitialDeposit] = useState<string>('')
    const [topUpAmount, setTopUpAmount] = useState<string>('')
    const [targetAmount, setTargetAmount] = useState<string>('')
    const [endDate, setEndDate] = useState<string>('')
    const [endDateManuallyEdited, setEndDateManuallyEdited] = useState(false)
    const [targetManuallyEdited, setTargetManuallyEdited] = useState(false)
    const [summary, setSummary] = useState(false);

    const handleFrequencyChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedFrequency(e.target.value)
    }

    const handleBackToForm = () => {
        setSummary(false)
    }

    const handleCreatePlan = () => {
        // TODO: Implement plan creation logic
        console.log('Creating plan with data:', {
            planName,
            initialDeposit,
            selectedFrequency,
            topUpAmount,
            targetAmount,
            endDate
        })
        // For now, just go back to form
        setSummary(false)
    }

    const handleClose = () => {
        if (onClose) {
            onClose()
        }
    }

    // Show Top Up Amount for all frequencies except Manual
    const shouldShowTopUp = selectedFrequency && selectedFrequency !== 'Manual'

    const toNumber = (val: string): number => {
        const n = parseFloat(val)
        return isNaN(n) ? 0 : n
    }

    const formatDateInput = (date: Date): string => {
        const y = date.getFullYear()
        const m = String(date.getMonth() + 1).padStart(2, '0')
        const d = String(date.getDate()).padStart(2, '0')
        return `${y}-${m}-${d}`
    }

    const addPeriods = (start: Date, periods: number, frequency: string): Date => {
        const d = new Date(start)
        if (periods <= 0) return d
        switch (frequency) {
            case 'Daily':
                d.setDate(d.getDate() + periods)
                return d
            case 'Weekly':
                d.setDate(d.getDate() + periods * 7)
                return d
            case 'Bi-Weekly':
                d.setDate(d.getDate() + periods * 14)
                return d
            case 'Monthly':
                d.setMonth(d.getMonth() + periods)
                return d
            case 'Quarterly':
                d.setMonth(d.getMonth() + periods * 3)
                return d
            default:
                return d
        }
    }

    const periodsBetween = (start: Date, end: Date, frequency: string): number => {
        const msPerDay = 24 * 60 * 60 * 1000
        const startMid = new Date(start.getFullYear(), start.getMonth(), start.getDate())
        const endMid = new Date(end.getFullYear(), end.getMonth(), end.getDate())
        const diffDays = Math.max(0, Math.ceil((endMid.getTime() - startMid.getTime()) / msPerDay))
        switch (frequency) {
            case 'Daily':
                return diffDays
            case 'Weekly':
                return Math.ceil(diffDays / 7)
            case 'Bi-Weekly':
                return Math.ceil(diffDays / 14)
            case 'Monthly': {
                let months = (endMid.getFullYear() - startMid.getFullYear()) * 12 + (endMid.getMonth() - startMid.getMonth())
                if (endMid.getDate() > startMid.getDate()) months += 1
                return Math.max(0, months)
            }
            case 'Quarterly': {
                let months = (endMid.getFullYear() - startMid.getFullYear()) * 12 + (endMid.getMonth() - startMid.getMonth())
                if (endMid.getDate() > startMid.getDate()) months += 1
                return Math.max(0, Math.ceil(months / 3))
            }
            default:
                return 0
        }
    }

    const canAutoFromTarget = useMemo(() => {
        return (
            !endDateManuallyEdited &&
            !!selectedFrequency && selectedFrequency !== 'Manual' &&
            toNumber(topUpAmount) > 0 &&
            toNumber(initialDeposit) >= 0 &&
            toNumber(targetAmount) > 0
        )
    }, [endDateManuallyEdited, selectedFrequency, topUpAmount, initialDeposit, targetAmount])

    const canAutoFromEndDate = useMemo(() => {
        return (
            !targetManuallyEdited &&
            !!selectedFrequency && selectedFrequency !== 'Manual' &&
            toNumber(topUpAmount) > 0 &&
            toNumber(initialDeposit) >= 0 &&
            !!endDate
        )
    }, [targetManuallyEdited, selectedFrequency, topUpAmount, initialDeposit, endDate])

    // Auto-calc end date when target amount is provided
    useEffect(() => {
        if (!canAutoFromTarget) return
        const initial = toNumber(initialDeposit)
        const periodic = toNumber(topUpAmount)
        const target = toNumber(targetAmount)
        const remaining = Math.max(0, target - initial)
        const periodsNeeded = periodic > 0 ? Math.ceil(remaining / periodic) : 0
        const today = new Date()
        const computed = addPeriods(today, periodsNeeded, selectedFrequency)
        setEndDate(formatDateInput(computed))
    }, [canAutoFromTarget, initialDeposit, topUpAmount, targetAmount, selectedFrequency])

    // Auto-calc target amount when end date is selected
    useEffect(() => {
        if (!canAutoFromEndDate) return
        const initial = toNumber(initialDeposit)
        const periodic = toNumber(topUpAmount)
        const today = new Date()
        const end = new Date(endDate)
        const nPeriods = periodsBetween(today, end, selectedFrequency)
        setTargetAmount(String(Math.max(0, initial + periodic * nPeriods)))
    }, [canAutoFromEndDate, initialDeposit, topUpAmount, endDate, selectedFrequency])

    return (
        <>
            <div className="px-2">
                {summary ? (
                    <PlanSummary
                        planName={planName}
                        initialDeposit={initialDeposit}
                        selectedFrequency={selectedFrequency}
                        topUpAmount={topUpAmount}
                        targetAmount={targetAmount}
                        endDate={endDate}
                        onBack={handleBackToForm}
                        onCreatePlan={handleCreatePlan}
                        onClose={handleClose}
                    />
                ) : (
                    <>
                        <div className="flex justify-between items-center mb-4">
                            <div className="flex items-center justify-center">
                                <h2 className="text-xl font-semibold text-[#e0e0e0] text-center">
                                    Create New Savings Plan
                                </h2>
                            </div>
                            <button
                                onClick={handleClose}
                                className="text-[#a0a0a0] hover:text-[#e0e0e0] transition-colors duration-200 cursor-pointer"
                            >
                                <FontAwesomeIcon icon={faTimes} />
                            </button>
                        </div>
                        <form className='h-[27rem] w-full flex flex-col gap-3 px-1 overflow-y-auto' onSubmit={(e) => e.preventDefault()}>
                            <div className='flex flex-col gap-1 mr-3'>
                                <label className="text-[#e0e0e0] text-sm font-medium">Plan Name</label>
                                <input required={true} type='text' placeholder='e.g., New Car, Vacation Fund'
                                    value={planName} onChange={(e) => setPlanName(e.target.value)}
                                    className='rounded-lg w-full h-[3rem] bg-[#4a007a] px-3 py-2
						        border border-[#4a007a] text-[#e0e0e0] placeholder-[#a0a0a0] focus:outline-none focus:ring-2 focus:ring-[#6a0dad] 
                                focus:border-[#6a0dad] transition-all duration-200' />
                            </div>
                            <div className='flex flex-col gap-2 mr-3'>
                                <label className="text-[#e0e0e0] text-sm font-medium">Initial Deposit (USD)</label>
                                <input required type='number' inputMode='decimal' min='0' step='0.01' placeholder='e.g., 500.00' value={initialDeposit} onChange={(e) => setInitialDeposit(e.target.value)} className='rounded-lg w-full h-[3rem] bg-[#4a007a] px-3 py-2
						            border border-[#4a007a] text-[#e0e0e0] placeholder-[#a0a0a0] focus:outline-none focus:ring-2 focus:ring-[#6a0dad] focus:border-[#6a0dad] transition-all duration-200' />
                            </div>
                            <div className='flex flex-col gap-2 mr-3'>
                                <label className="text-[#e0e0e0] text-sm font-medium">Deduction Frequency</label>
                                <select
                                    required
                                    value={selectedFrequency}
                                    onChange={handleFrequencyChange}
                                    className='rounded-lg w-full h-[3rem] bg-[#4a007a] px-3 py-2
							            border border-[#4a007a] text-[#e0e0e0] placeholder-[#a0a0a0] focus:outline-none focus:ring-2 focus:ring-[#6a0dad] focus:border-[#6a0dad] transition-all duration-200'
                                >
                                    <option value=''>Select Frequency</option>
                                    <option value='Daily'>Daily</option>
                                    <option value='Weekly'>Weekly</option>
                                    <option value='Bi-Weekly'>Bi-Weekly</option>
                                    <option value='Monthly'>Monthly</option>
                                    <option value='Quarterly'>Quarterly</option>
                                    <option value='Manual'>Manual</option>
                                </select>
                            </div>
                            {shouldShowTopUp && (
                                <div className='flex flex-col gap-2 mr-3'>
                                    <label className="text-[#e0e0e0] text-sm font-medium">Top Up Amount (USD)</label>
                                    <input required type='number' inputMode='decimal' min='0' step='0.01' placeholder='e.g., 100.00' value={topUpAmount} onChange={(e) => setTopUpAmount(e.target.value)} className='rounded-lg w-full h-[3rem] bg-[#4a007a] px-3 py-2
							            border border-[#4a007a] text-[#e0e0e0] placeholder-[#a0a0a0] focus:outline-none focus:ring-2 focus:ring-[#6a0dad] focus:border-[#6a0dad] transition-all duration-200' />
                                </div>
                            )}
                            <div className='flex flex-col gap-2 mr-3'>
                                <label className="text-[#e0e0e0] text-sm font-medium">Target Amount (USD)</label>
                                <input
                                    required
                                    type='number'
                                    inputMode='decimal'
                                    min='0'
                                    step='0.01'
                                    placeholder='Enter target or end date'
                                    value={targetAmount}
                                    onChange={(e) => {
                                        setTargetManuallyEdited(true)
                                        setEndDateManuallyEdited(false)
                                        setTargetAmount(e.target.value)
                                    }}
                                    disabled={endDateManuallyEdited && selectedFrequency !== 'Manual'}
                                    className='rounded-lg w-full h-[3rem] bg-[#4a007a] px-3 py-2
							            border border-[#4a007a] text-[#e0e0e0] placeholder-[#a0a0a0] focus:outline-none focus:ring-2 
                                        focus:ring-[#6a0dad] focus:border-[#6a0dad] transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed'
                                />
                                {endDateManuallyEdited && selectedFrequency !== 'Manual' && (
                                    <span className='text-xs text-[#a0a0a0]'>Target amount is auto-calculated from end date.</span>
                                )}
                            </div>
                            <div className='flex flex-col gap-2 mr-3'>
                                <label className="text-[#e0e0e0] text-sm font-medium">End Date</label>
                                <input
                                    required
                                    type='date'
                                    value={endDate}
                                    onChange={(e) => {
                                        setEndDateManuallyEdited(true)
                                        setTargetManuallyEdited(false)
                                        setEndDate(e.target.value)
                                    }}
                                    disabled={targetManuallyEdited && selectedFrequency !== 'Manual'}
                                    className='rounded-lg w-full h-[3rem] bg-[#4a007a] px-3 py-2
							border border-[#4a007a] text-[#e0e0e0] placeholder-[#a0a0a0] focus:outline-none focus:ring-2 focus:ring-[#6a0dad] 
                            focus:border-[#6a0dad] transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed'
                                />
                                {targetManuallyEdited && selectedFrequency !== 'Manual' && (
                                    <span className='text-xs text-[#a0a0a0]'>End date is auto-calculated from target amount.</span>
                                )}
                            </div>
                            <p className="text-[#ffa500] text-md">Funds are deducted from usable funds</p>
                            <p className="text-[#c72626] text-md">Disclaimer: Exiting a plan early reduces earned interest by 45%.</p>
                            <div className='flex items-center justify-center'>
                                <button onClick={() => setSummary(true)} type='submit' className="w-[80%] h-[3rem] bg-[#c19813] hover:bg-[#e6c24d] text-white px-4 py-2 mb-3 rounded-lg flex items-center justify-center space-x-2 transition-colors duration-200 cursor-pointer">
                                    Proceed to Summary
                                </button>
                            </div>
                        </form>
                    </>
                )}
            </div>
        </>
    )
}

export default NewSavingsForm