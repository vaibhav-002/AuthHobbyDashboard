import React, { useState, useEffect } from "react";
import HobbyModal from "./HobbyModal";
import "./Dashboard.css";

const Dashboard = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [fetchedData, setFetchedData] = useState(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [reason, setReason] = useState("");
  const [savedHobbies, setSavedHobbies] = useState([]);

  const handleModalOpen = () => {
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "http://api.weatherstack.com/current?access_key=da41d8559697465725160755142c0269&query=Meerut"
        );
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const data = await response.json();
        setFetchedData(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const storedHobbies = JSON.parse(localStorage.getItem("hobbies")) || [];
    setSavedHobbies(storedHobbies);
  }, []);

  return (
    <div className="dashboard-container">
      <h1>Dashboard</h1>
      <button onClick={handleModalOpen}>Add Hobby</button>
      <HobbyModal
        isOpen={isModalOpen}
        onClose={handleModalClose}
        title={title}
        setTitle={setTitle}
        description={description}
        setDescription={setDescription}
        reason={reason}
        setReason={setReason}
        savedHobbies={savedHobbies}
        setSavedHobbies={setSavedHobbies}
      />
      <h2>Saved Hobbies</h2>
      <div className="hobby-cards">
        {savedHobbies.length ? (
          savedHobbies.map((hobby, index) => (
            <div className="hobby-card" key={index}>
              <h3>{hobby.title}</h3>
              <p>
                <strong>Description:</strong> {hobby.description}
              </p>
              <p>
                <strong>Reason:</strong> {hobby.reason}
              </p>
            </div>
          ))
        ) : (
          <h3>No Saved Hobbies</h3>
        )}
      </div>
      <h2>Fetched Data</h2>
      {fetchedData && (
        <div className="weather-card">
          <h3>
            Weather in {fetchedData.location.name},{" "}
            {fetchedData.location.country}
          </h3>
          <p>Observation Time: {fetchedData.current.observation_time}</p>
          <p>Temperature: {fetchedData.current.temperature}°C</p>
          <p>Weather: {fetchedData.current.weather_descriptions[0]}</p>
          <img src={fetchedData.current.weather_icons[0]} alt="Weather Icon" />
        </div>
      )}
    </div>
  );
};

export default Dashboard;
