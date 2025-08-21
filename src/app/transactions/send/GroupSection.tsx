"use client";

import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPaperPlane,
  faEdit,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { getGroups } from "@/lib/dataUtils";
import { Modal } from "./Modal";

interface Group {
  id: number;
  name: string;
  users: Array<{ name: string; identifier: string; amount: number }>;
  totalAmount: number;
}

interface GroupFormProps {
  onClose: () => void;
  onSave: (group: Group) => void;
  editingGroup?: Group | null;
}

const GroupForm = ({ onClose, onSave, editingGroup }: GroupFormProps) => {
  const [groupName, setGroupName] = useState(editingGroup?.name || "");
  const [users, setUsers] = useState(editingGroup?.users || []);
  const [newUser, setNewUser] = useState({
    name: "",
    identifier: "",
    amount: 0,
  });

  const addUser = () => {
    if (newUser.name && newUser.identifier && newUser.amount > 0) {
      setUsers([...users, { ...newUser }]);
      setNewUser({ name: "", identifier: "", amount: 0 });
    } else {
      alert("Please fill all member fields with valid data.");
    }
  };

  const removeUser = (index: number) => {
    setUsers(users.filter((_, i) => i !== index));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!groupName || users.length === 0) {
      alert("Group name and at least one member are required.");
      return;
    }

    const totalAmount = users.reduce((sum, user) => sum + user.amount, 0);
    const group: Group = {
      id: editingGroup?.id || Date.now(),
      name: groupName,
      users,
      totalAmount,
    };

    onSave(group);
  };

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4 text-[#e0e0e0]">
        {editingGroup ? "Edit Group" : "Create New Group"}
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label
            htmlFor="groupName"
            className="block text-sm font-medium text-[#e0e0e0] mb-1"
          >
            Group Name
          </label>
          <input
            type="text"
            id="groupName"
            value={groupName}
            onChange={(e) => setGroupName(e.target.value)}
            className="w-full p-2 rounded-lg bg-[#4a007a] border border-[#4a007a] text-[#e0e0e0] focus:outline-none focus:ring-2 focus:ring-[#6a0dad]"
            required
          />
        </div>

        <div className="border-t border-b border-[#2a004a] py-4">
          <h3 className="font-semibold mb-2 text-[#e0e0e0]">Add Member</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
            <input
              type="text"
              placeholder="Name"
              value={newUser.name}
              onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
              className="p-2 rounded-lg bg-[#4a007a] border border-[#4a007a] text-[#e0e0e0] placeholder-[#a0a0a0] focus:outline-none focus:ring-2 focus:ring-[#6a0dad]"
            />
            <input
              type="text"
              placeholder="Email or Phone"
              value={newUser.identifier}
              onChange={(e) =>
                setNewUser({ ...newUser, identifier: e.target.value })
              }
              className="p-2 rounded-lg bg-[#4a007a] border border-[#4a007a] text-[#e0e0e0] placeholder-[#a0a0a0] focus:outline-none focus:ring-2 focus:ring-[#6a0dad]"
            />
            <input
              type="number"
              placeholder="Amount"
              value={newUser.amount || ""}
              onChange={(e) =>
                setNewUser({
                  ...newUser,
                  amount: parseFloat(e.target.value) || 0,
                })
              }
              className="p-2 rounded-lg bg-[#4a007a] border border-[#4a007a] text-[#e0e0e0] placeholder-[#a0a0a0] focus:outline-none focus:ring-2 focus:ring-[#6a0dad]"
            />
          </div>
          <button
            type="button"
            onClick={addUser}
            className="mt-2 px-4 py-1 rounded-lg bg-[#4a007a] text-[#e0e0e0] border border-[#4a007a] hover:bg-[#6a0dad] transition-colors duration-200"
          >
            Add
          </button>
        </div>

        <div className="space-y-2 max-h-40 overflow-y-auto">
          {users.map((user, index) => (
            <div
              key={index}
              className="flex justify-between items-center bg-[#2a004a] p-2 rounded"
            >
              <span className="text-[#e0e0e0]">
                {user.name} ({user.identifier}) - GHS {user.amount.toFixed(2)}
              </span>
              <button
                type="button"
                onClick={() => removeUser(index)}
                className="text-red-400 hover:text-red-500"
              >
                ×
              </button>
            </div>
          ))}
        </div>

        <div className="flex justify-end space-x-4 mt-6">
          <button
            type="button"
            onClick={onClose}
            className="px-6 py-2 rounded-lg bg-[#4a007a] text-[#e0e0e0] border border-[#4a007a] hover:bg-[#6a0dad] transition-colors duration-200"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-6 py-2 rounded-lg bg-[#d4af37] text-[#2a004a] hover:bg-[#e6c24d] transition-colors duration-200"
          >
            {editingGroup ? "Update Group" : "Save Group"}
          </button>
        </div>
      </form>
    </div>
  );
};

export const GroupSection = () => {
  const [groups, setGroups] = useState<Group[]>(getGroups());
  const [showModal, setShowModal] = useState(false);
  const [modalContent, setModalContent] = useState<React.ReactNode>(null);
  const [editingGroup, setEditingGroup] = useState<Group | null>(null);

  const handleCreateGroup = () => {
    setEditingGroup(null);
    setModalContent(
      <GroupForm
        onClose={() => setShowModal(false)}
        onSave={(group) => {
          setGroups([...groups, group]);
          setShowModal(false);
        }}
      />
    );
    setShowModal(true);
  };

  const handleEditGroup = (group: Group) => {
    setEditingGroup(group);
    setModalContent(
      <GroupForm
        editingGroup={group}
        onClose={() => setShowModal(false)}
        onSave={(updatedGroup) => {
          setGroups(
            groups.map((g) => (g.id === updatedGroup.id ? updatedGroup : g))
          );
          setShowModal(false);
        }}
      />
    );
    setShowModal(true);
  };

  const handleDeleteGroup = (group: Group) => {
    setModalContent(
      <Modal.DeleteConfirm
        groupName={group.name}
        onConfirm={() => {
          setGroups(groups.filter((g) => g.id !== group.id));
          setShowModal(false);
        }}
        onCancel={() => setShowModal(false)}
      />
    );
    setShowModal(true);
  };

  const handleSendToGroup = (group: Group) => {
    setModalContent(
      <Modal.GroupConfirm
        groupName={group.name}
        memberCount={group.users.length}
        totalAmount={group.totalAmount}
        onConfirm={() => {
          alert("Group transfer initiated!");
          setShowModal(false);
        }}
        onCancel={() => setShowModal(false)}
      />
    );
    setShowModal(true);
  };

  return (
    <>
      <div className="flex justify-end mb-4">
        <button
          onClick={handleCreateGroup}
          className="px-4 py-2 rounded-lg font-semibold bg-[#d4af37] text-[#2a004a] hover:bg-[#e6c24d] transition-colors duration-200"
        >
          Create New Group
        </button>
      </div>

      <div className="space-y-4">
        {groups.length === 0 ? (
          <p className="text-center text-[#a0a0a0]">
            No groups created yet. Click 'Create New Group' to start.
          </p>
        ) : (
          groups.map((group) => (
            <div
              key={group.id}
              className="bg-[#3a005f] border border-[#4a007a] p-4 rounded-lg flex justify-between items-center"
            >
              <div>
                <h3 className="font-bold text-lg text-[#d4af37]">
                  {group.name}
                </h3>
                <p className="text-sm text-[#a0a0a0]">
                  {group.users.length} members - Total: GHS{" "}
                  {group.totalAmount.toFixed(2)}
                </p>
              </div>
              <div className="space-x-2">
                <button
                  onClick={() => handleSendToGroup(group)}
                  className="px-3 py-1 rounded bg-[#4a007a] text-[#e0e0e0] border border-[#4a007a] hover:bg-[#6a0dad] transition-colors duration-200"
                >
                  <FontAwesomeIcon icon={faPaperPlane} className="mr-1" />
                  Send
                </button>
                <button
                  onClick={() => handleEditGroup(group)}
                  className="px-3 py-1 rounded bg-[#4a007a] text-[#e0e0e0] border border-[#4a007a] hover:bg-[#6a0dad] transition-colors duration-200"
                >
                  <FontAwesomeIcon icon={faEdit} />
                </button>
                <button
                  onClick={() => handleDeleteGroup(group)}
                  className="px-3 py-1 rounded bg-[#4a007a] text-red-400 border border-[#4a007a] hover:bg-[#6a0dad] hover:text-red-500 transition-colors duration-200"
                >
                  <FontAwesomeIcon icon={faTrash} />
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {showModal && (
        <Modal.Container onClose={() => setShowModal(false)}>
          {modalContent}
        </Modal.Container>
      )}
    </>
  );
};
