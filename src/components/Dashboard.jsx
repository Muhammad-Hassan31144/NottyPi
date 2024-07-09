import React, { useState } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import AddNote from '../pages/Nav/AddNote';
import EditNote from '../pages/Nav/EditNote';
import DeleteNote from '../pages/Nav/DeleteNote';
import GetAllNotes from '../pages/Nav/GetAllNotes';
import Navbar from '../components/Navbar/Navbar';
import { useDispatch } from 'react-redux';
import { logout } from '../slices/userSlice';
import { IoIosAddCircle, IoIosCreate, IoIosTrash, IoIosList, IoIosPin } from 'react-icons/io';

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState('get-all-notes');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  const handleNavigation = (path) => {
    setActiveTab(path);
    navigate(path);
  };

  return (
    <>
      <Navbar />
      <div className="flex h-screen">
        <aside className="w-64 bg-base-200 p-6">
          <ul className="menu menu-compact">
            <li className={`my-2 ${activeTab === 'get-all-notes' ? 'active' : ''}`}>
              <a onClick={() => handleNavigation('get-all-notes')}><IoIosList size={20} /> All Notes</a>
            </li>
            <li className={`my-2 ${activeTab === 'add-note' ? 'active' : ''}`}>
              <a onClick={() => handleNavigation('add-note')}><IoIosAddCircle size={20} /> Add Note</a>
            </li>
            <li className={`my-2 ${activeTab === 'edit-note' ? 'active' : ''}`}>
              <a onClick={() => handleNavigation('edit-note')}><IoIosCreate size={20} /> Edit Note</a>
            </li>
            <li className={`my-2 ${activeTab === 'delete-note' ? 'active' : ''}`}>
              <a onClick={() => handleNavigation('delete-note')}><IoIosTrash size={20} /> Delete Note</a>
            </li>
            {/* <li className={`my-2 ${activeTab === 'update-pinned' ? 'active' : ''}`}>
              <a onClick={() => handleNavigation('update-pinned')}><IoIosPin size={20} /> Update Pinned</a>
            </li> */}
            <li className="my-2">
              <a onClick={handleLogout}>Logout</a>
            </li>
          </ul>
        </aside>
        <main className="flex-1 p-6">
          <Routes>
            <Route path="add-note" element={<AddNote />} />
            <Route path="edit-note" element={<EditNote />} />
            <Route path="delete-note" element={<DeleteNote />} />
            <Route path="get-all-notes" element={<GetAllNotes />} />
            <Route path="*" element={<GetAllNotes />} />
          </Routes>
        </main>
      </div>
    </>
  );
};

export default Dashboard;
