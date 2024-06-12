// import { useEffect, useState } from "react";
import ReactModal from "react-modal";
import { IoIosAddCircle } from "react-icons/io";
import Note from "../../components/Cards/Note";
import ModifyNotes from "./ModifyNotes";
import { useEffect, useState } from "react";
import NotesPagination from "./NotesPagination";
import Navbar from "../../components/Navbar/Navbar";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../utils/axiosInstance";
const noteData = [
  {
    title: "Note 1",
    content: "This is the content of Note 1",
    isPinned: true,
    isDone: false,
    tags: ["tag1", "tag2"],
    date: "2022-01-01",
    onDone: () => {},
    onPin: () => {},
    onEdit: () => {},
    onDelete: () => {},
  },
  {
    title: "Note 2",
    content: "This is the content of Note 2",
    isPinned: false,
    isDone: true,
    tags: ["tag3", "tag4"],
    date: "2022-01-02",
    onDone: () => {},
    onPin: () => {},
    onEdit: () => {},
    onDelete: () => {},
  },
  {
    title: "Note 3",
    content: "This is the content of Note 3",
    isPinned: false,
    isDone: false,
    tags: ["tag5", "tag6"],
    date: "2022-01-03",
    onDone: () => {},
    onPin: () => {},
    onEdit: () => {},
    onDelete: () => {},
  },
  {
    title: "Note 4",
    content: "",
    isPinned: true,
    isDone: true,
    tags: ["tag7", "tag8"],
    date: "2022-01-04",
    onDone: () => {},
    onPin: () => {},
    onEdit: () => {},
    onDelete: () => {},
  },
  // Add more objects as needed
  {
    title: "Note 5",
    content: "This is the content of Note 5",
    isPinned: true,
    isDone: false,
    tags: ["tag9", "tag10"],
    date: "2022-01-05",
    onDone: () => {},
    onPin: () => {},
    onEdit: () => {},
    onDelete: () => {},
  },
  {
    title: "Note 6",
    content: "This is the content of Note 6",
    isPinned: false,
    isDone: true,
    tags: ["tag11", "tag12"],
    date: "2022-01-06",
    onDone: () => {},
    onPin: () => {},
    onEdit: () => {},
    onDelete: () => {},
  },
  {
    title: "Note 7",
    content: "This is the content of Note 7",
    isPinned: false,
    isDone: false,
    tags: ["tag13", "tag14"],
    date: "2022-01-07",
    onDone: () => {},
    onPin: () => {},
    onEdit: () => {},
    onDelete: () => {},
  },
  {
    title: "Note 8",
    content: "",
    isPinned: true,
    isDone: true,
    tags: ["tag15", "tag16"],
    date: "2022-01-08",
    onDone: () => {},
    onPin: () => {},
    onEdit: () => {},
    onDelete: () => {},
  },
];
const Home = () => {
  const [error, setError] = useState("");
  // const [theme, setTheme] = useState("light");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [userInfo, setUserInfo] = useState({});
  const navigate = useNavigate();
  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };
  const getUserInfo = async () => {
    try {
      const resp = await axiosInstance.get("/get-user");
      if (resp.data && resp.data.user) {
        setUserInfo(resp.data.user);
      }
    } catch (error) {
      if (error.response.status === 404) {
        localStorage.clear();
        navigate("/login");
      }
    }
  }
  useEffect(() => {
    getUserInfo();
  }, []);
  return (
    <>
    <Navbar userInfo={userInfo}/>
      <aside className="flex justify-end pr-10 py-6 px-6">
        <a
          role="button"
          className="badge badge-secondary w-8 h-8 m-0 p-0"
          onClick={openModal}
        >
          <IoIosAddCircle size={32} />
        </a>
      </aside>
      <NotesPagination noteData={noteData} />
      <div className="flex items-center flex-wrap gap-5 max-w-screen-xl min-h-screen mx-auto px-6">
        <ReactModal
          isOpen={isModalOpen}
          ariaHideApp={false}
          onRequestClose={closeModal}
          contentLabel="Example Modal"
          style={{
            overlay: {
              zIndex: 1000,
              maxWidth: "100%",
              margin: "auto",
              border: "2px solid green",
            },
            content: {
              color: "#f000f2",
            },
          }}
        >
          <ModifyNotes
            style={{ border: "2px solid red" }}
            closeModal={closeModal}
          />
        </ReactModal>
      </div>
    </>
  );
};

export default Home;
