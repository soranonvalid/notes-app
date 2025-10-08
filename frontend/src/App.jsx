import { useEffect } from "react";
import { useState } from "react";

function App() {
  const [notes, setNotes] = useState([]);

  const basedUrl = "https://notes-app-api-xi.vercel.app";

  const fetchNote = async () => {
    try {
      const response = await fetch(`${basedUrl}/notes`);
      const data = await response.json();
      setNotes(data.data);
      console.log(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchNote();
  }, []);

  const addNote = async (newTitle, newContent) => {
    try {
      const res = await fetch(`${basedUrl}/notes`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title: newTitle, content: newContent }),
      });

      const result = await res.json();
      console.log(result.data);

      fetchNote();
    } catch (error) {
      console.warning(error);
    }
    setNotes([]);
  };

  const HandleupdateNote = async (id, newTitle, newContent) => {
    try {
      const res = await fetch(`${basedUrl}/notes/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title: newTitle, content: newContent }),
      });

      const result = await res.json();
      console.log(result.data);

      fetchNote();
    } catch (error) {
      console.warning(error);
    }
    setNotes([]);
  };

  const handleDelete = async (id) => {
    try {
      await fetch(`${basedUrl}/notes/${id}`, {
        method: "DELETE",
      });
      console.log("data berhasil di delete");

      fetchNote();
    } catch (error) {
      console.log(error);
    }
  };

  const getNoteById = (id) => {
    console.log(id);
  };

  return (
    <>
      <Navbar />
      <main className="min-h-screen flex flex-col mt-24 items-center">
        <NoteForm onAddNote={addNote} />
        <NoteList
          notes={notes}
          onDelete={handleDelete}
          onUpdate={HandleupdateNote}
          onGetById={getNoteById}
        />
      </main>
    </>
  );
}

export default App;

// ================== Komponen ==================

const Navbar = () => {
  return (
    <nav className="w-full fixed top-0 flex justify-center bg-white shadow">
      <div className="flex justify-between px-5 py-5 container">
        <img src="/logo.svg" alt="Logo" />
      </div>
    </nav>
  );
};

const NoteForm = ({ onAddNote }) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [error, setError] = useState();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (title.trim() === "" || content.trim() === "") {
      setError("A field is missing!");
    } else {
      onAddNote(title, content);
      setTitle("");
      setContent("");
      setError();
    }
  };

  return (
    <section className="container max-w-xl px-5 mb-8">
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="text"
          placeholder="Title"
          className={`rounded-sm outline p-3 ${
            !error ? "outline-gray-400" : "outline-red-500"
          }`}
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
          placeholder="Content"
          className={`resize-y min-h-14 rounded-sm outline  p-3 ${
            !error ? "outline-gray-400" : "outline-red-500"
          }`}
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
        <p className="text-[0.91em] italic text-red-500">
          {setError === "" ? "" : error}
        </p>
        <button
          type="submit"
          className="bg-blue-500 text-white font-semibold rounded-lg py-3"
        >
          Add note
        </button>
      </form>
    </section>
  );
};

const NoteItem = ({ note, onDelete, onUpdate }) => {
  const [isEdit, setIsEdit] = useState(false);
  const [titleEdit, setTitleEdit] = useState(note.title);
  const [contentEdit, setContentEdit] = useState(note.content);

  const handleCancel = () => {
    setIsEdit(false);
    setTitleEdit(note.title);
    setContentEdit(note.content);
  };

  return (
    <div className="rounded-lg shadow-md bg-white w-full p-5">
      <div>
        {isEdit ? (
          <>
            <input
              type="text"
              className="rounded-sm outline outline-gray-400 p-3"
              value={titleEdit}
              onChange={(e) => setTitleEdit(e.target.value)}
            />
            <textarea
              className="rounded-sm outline outline-gray-400 p-3"
              value={contentEdit}
              onChange={(e) => setContentEdit(e.target.value)}
            />
            <div className="mt-4 flex gap-2">
              <button
                onClick={handleCancel}
                className="bg-red-500 text-white px-3 py-1 rounded"
              >
                Cancel
              </button>
              <button
                className="bg-green-500 text-white px-3 py-1 rounded"
                onClick={() => {
                  onUpdate(note.id, titleEdit, contentEdit);
                  setIsEdit(false);
                }}
              >
                Save
              </button>
            </div>
          </>
        ) : null}
      </div>
      <div className={isEdit ? "hidden" : "block"}>
        <p className="font-medium text-xl">{note.title}</p>
        <p className="text-sm text-gray-500">
          ~{showFormattedDate(note.created_at)}
        </p>
        <p className="mt-2">{note.content}</p>
        <div className="mt-4 flex gap-2">
          <button
            onClick={() => setIsEdit(!isEdit)}
            className="bg-yellow-500 text-white px-3 py-1 rounded"
          >
            Edit
          </button>
          <button
            className="bg-red-500 text-white px-3 py-1 rounded"
            onClick={() => {
              onDelete(note.id);
            }}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

const NoteList = ({ notes, onDelete, onUpdate, onGetById }) => {
  return (
    <section className="container px-2 md:px-0 py-8">
      <h2 className="inline-flex items-center gap-2 text-2xl font-medium mb-6">
        <img src="/note.svg" alt="note icon" className="w-8 h-8" />
        Notes
      </h2>
      <div
        className={
          notes.length > 0
            ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
            : "w-full"
        }
      >
        {notes.length > 0 ? (
          notes.map((note) => (
            <NoteItem
              key={note.id}
              note={note}
              onDelete={onDelete}
              onUpdate={onUpdate}
              onGetById={onGetById}
            />
          ))
        ) : (
          <div className="w-full h-full flex items-center justify-center flex-col gap-5">
            <img
              src="https://media2.giphy.com/media/v1.Y2lkPTZjMDliOTUybmV2N3A2eHJqdTFpdmVrNHQ2NmZhbjJiNHJlc3ZvbDl6bWo1ODZuMyZlcD12MV9zdGlja2Vyc19zZWFyY2gmY3Q9cw/L05HgB2h6qICDs5Sms/200w.gif"
              alt=""
              width="30"
              height="30"
            />
            Loading...
          </div>
        )}
      </div>
    </section>
  );
};

// helper
const showFormattedDate = (date) => {
  const options = {
    year: "numeric",
    month: "long",
    weekday: "long",
    day: "numeric",
  };
  return new Date(date).toLocaleDateString("id-ID", options);
};
