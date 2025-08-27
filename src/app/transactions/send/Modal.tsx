"use client";

import React from "react";
import { formatCurrency } from "@/lib/formatUtils";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimesCircle } from "@fortawesome/free-solid-svg-icons";

interface ModalContainerProps {
  children: React.ReactNode;
  onClose: () => void;
}

const ModalContainer = ({ children, onClose }: ModalContainerProps) => {
  return (
    <div
      className="fixed inset-0 bg-[#2a004ab6] bg-opacity-70 flex justify-center items-center z-50 opacity-100 visible transition-opacity duration-300"
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          onClose();
        }
      }}
    >
      <div className="bg-[#3a005f] border border-[#4a007a] p-10 rounded-xl shadow-lg w-[90%] max-w-md transform translate-y-0 opacity-100 transition-all duration-300">
        {children}
      </div>
    </div>
  );
};

interface ConfirmProps {
  amount: number;
  onConfirm: () => void;
  onCancel: () => void;
}

const Confirm = ({ amount, onConfirm, onCancel }: ConfirmProps) => {
  const recipientName = "John Doe"; // This would come from form data in real implementation

  return (
    <div className="text-center">
      <h2 className="text-2xl font-semibold text-[#e0e0e0] mb-4">
        Confirm Transfer
      </h2>
      <div className="space-y-4 text-left mb-8">
        <div>
          <p className="text-sm text-[#e0e0e0]">Recipient:</p>
          <p className="text-lg font-bold text-[#d4af37]">{recipientName}</p>
        </div>
        <div>
          <p className="text-sm text-[#e0e0e0]">Amount:</p>
          <p className="text-2xl font-bold text-[#6a0dad]">
            {formatCurrency(amount)}
          </p>
        </div>
      </div>
      <button
        onClick={onConfirm}
        className="w-full p-3 rounded-lg text-lg font-semibold mb-4 bg-[#d4af37] text-[#2a004a] hover:bg-[#e6c24d] transition-colors duration-200"
      >
        Confirm
      </button>
      <button
        onClick={onCancel}
        className="w-full p-3 rounded-lg text-lg font-semibold bg-[#4a007a] text-[#e0e0e0] border border-[#4a007a] hover:bg-[#6a0dad] transition-colors duration-200"
      >
        Cancel
      </button>
    </div>
  );
};

interface WrongDetailsProps {
  onClose: () => void;
}

const WrongDetails = ({ onClose }: WrongDetailsProps) => {
  return (
    <div className="text-center flex flex-col items-center">
      <FontAwesomeIcon
        icon={faTimesCircle}
        className="text-6xl text-red-500 mb-6"
      />
      <h2 className="text-2xl font-semibold text-[#e0e0e0] mb-4">
        Wrong Details!
      </h2>
      <p className="text-md text-[#a0a0a0] mb-8">
        No such recipient details exist.
      </p>
      <button
        onClick={onClose}
        className="w-full py-3 rounded-lg text-lg font-semibold bg-[#4a007a] text-[#e0e0e0] border border-[#4a007a] hover:bg-[#6a0dad] transition-colors duration-200"
      >
        Go Back
      </button>
    </div>
  );
};

interface GroupConfirmProps {
  groupName: string;
  memberCount: number;
  totalAmount: number;
  onConfirm: () => void;
  onCancel: () => void;
}

const GroupConfirm = ({
  groupName,
  memberCount,
  totalAmount,
  onConfirm,
  onCancel,
}: GroupConfirmProps) => {
  return (
    <div className="text-center">
      <h2 className="text-2xl font-semibold text-[#e0e0e0] mb-4">
        Confirm Group Transfer
      </h2>
      <div className="space-y-4 text-left mb-8">
        <div>
          <p className="text-sm text-[#e0e0e0]">Group Name:</p>
          <p className="text-lg font-bold text-[#d4af37]">{groupName}</p>
        </div>
        <div>
          <p className="text-sm text-[#e0e0e0]">Total Members:</p>
          <p className="text-lg text-[#e0e0e0]">{memberCount}</p>
        </div>
        <div>
          <p className="text-sm text-[#e0e0e0]">Total Amount:</p>
          <p className="text-2xl font-bold text-[#6a0dad]">
            {formatCurrency(totalAmount)}
          </p>
        </div>
      </div>
      <button
        onClick={onConfirm}
        className="w-full p-3 rounded-lg text-lg font-semibold mb-4 bg-[#d4af37] text-[#2a004a] hover:bg-[#e6c24d] transition-colors duration-200"
      >
        Confirm & Send
      </button>
      <button
        onClick={onCancel}
        className="w-full p-3 rounded-lg text-lg font-semibold bg-[#4a007a] text-[#e0e0e0] border border-[#4a007a] hover:bg-[#6a0dad] transition-colors duration-200"
      >
        Cancel
      </button>
    </div>
  );
};

interface DeleteConfirmProps {
  groupName: string;
  onConfirm: () => void;
  onCancel: () => void;
}

const DeleteConfirm = ({
  groupName,
  onConfirm,
  onCancel,
}: DeleteConfirmProps) => {
  return (
    <div className="text-center">
      <h2 className="text-xl font-semibold mb-4 text-[#e0e0e0]">
        Are you sure?
      </h2>
      <p className="text-[#a0a0a0] mb-6">
        Do you really want to delete the group &quot;{groupName}&quot;?
      </p>
      <div className="flex justify-center space-x-4">
        <button
          onClick={onCancel}
          className="px-6 py-2 rounded-lg bg-[#4a007a] text-[#e0e0e0] border border-[#4a007a] hover:bg-[#6a0dad] transition-colors duration-200"
        >
          Cancel
        </button>
        <button
          onClick={onConfirm}
          className="px-6 py-2 rounded-lg bg-red-600 hover:bg-red-700 text-white transition-colors duration-200"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export const Modal = {
  Container: ModalContainer,
  Confirm,
  WrongDetails,
  GroupConfirm,
  DeleteConfirm,
};
