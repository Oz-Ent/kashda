"use client";

import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { useStaticRedirect } from "@/lib/staticRedirect";
import AppLayout from "@/app/components/common/AppLayout";
import { Tabs } from "./Tabs";
import { IndividualForm } from "./IndividualForm";
import { GroupSection } from "./GroupSection";
import { Modal } from "./Modal";

export default function SendMoney() {
  const [activeTab, setActiveTab] = useState("individual");
  const [showModal, setShowModal] = useState(false);
  const [modalContent, setModalContent] = useState<React.ReactNode>(null);
  const { redirect } = useStaticRedirect();

  const handleIndividualSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const recipientIdentifier = data
      .get("recipientIdentifier")
      ?.toString()
      .trim();
    const amount = parseFloat(data.get("amount") as string);

    if (!recipientIdentifier || !amount || amount <= 0) {
      alert("Please fill in all required fields and ensure amount is valid.");
      return;
    }

    if (recipientIdentifier.includes("error")) {
      setModalContent(
        <Modal.WrongDetails onClose={() => setShowModal(false)} />
      );
    } else {
      setModalContent(
        <Modal.Confirm
          amount={amount}
          onConfirm={() => {
            alert("Transfer Confirmed!");
            setShowModal(false);
          }}
          onCancel={() => setShowModal(false)}
        />
      );
    }
    setShowModal(true);
  };

  const handleBackToTransactions = () => {
    redirect("/transactions");
  };

  return (
    <AppLayout>
      <div className="max-w-3xl mx-auto bg-[#3a005f] border border-[#4a007a] p-8 rounded-xl shadow-lg">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-4">
            <button
              onClick={handleBackToTransactions}
              className="text-[#d4af37] hover:text-[#e6c24d] transition-colors duration-200"
            >
              <FontAwesomeIcon icon={faArrowLeft} className="text-xl" />
            </button>
            <h1 className="text-2xl font-bold text-[#e0e0e0]">Send Money</h1>
          </div>
        </div>

        <Tabs activeTab={activeTab} setActiveTab={setActiveTab} />

        {activeTab === "individual" && (
          <IndividualForm onSubmit={handleIndividualSubmit} />
        )}

        {activeTab === "group" && <GroupSection />}
      </div>

      {showModal && (
        <Modal.Container onClose={() => setShowModal(false)}>
          {modalContent}
        </Modal.Container>
      )}
    </AppLayout>
  );
}
