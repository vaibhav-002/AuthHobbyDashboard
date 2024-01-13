import React from "react";
import "./HobbyModal.css";

const HobbyModal = ({
  isOpen,
  onClose,
  title,
  setTitle,
  description,
  setDescription,
  reason,
  setReason,
  savedHobbies,
  setSavedHobbies,
}) => {
  const handleSave = () => {
    const newHobby = { title, description, reason };
    const updatedHobbies = [...savedHobbies, newHobby];
    setSavedHobbies(updatedHobbies);
    saveToLocalStorage(updatedHobbies);
    onClose();
  };

  const saveToLocalStorage = (hobbies) => {
    localStorage.setItem("hobbies", JSON.stringify(hobbies));
    setTitle("");
    setDescription("");
    setReason("");
  };

  return (
    <div style={{ display: isOpen ? "block" : "none" }} className="modal">
      <div className="modal-content">
        <span className="close" onClick={onClose}>
          &times;
        </span>
        <h2>Add Hobby</h2>
        <form>
          <div className="form-group">
            <label>Title:</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="form-control"
            />
          </div>
          <div className="form-group">
            <label>Description:</label>
            <input
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="form-control"
            />
          </div>
          <div className="form-group">
            <label>Reason:</label>
            <input
              type="text"
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              className="form-control"
            />
          </div>
        </form>
        <button className="save-button" onClick={handleSave}>
          Save
        </button>
      </div>
    </div>
  );
};

export default HobbyModal;
