import React, { useState } from "react";
import axios from "axios"; // Import Axios

export default function CreateBen() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    district: "",
    dsDivision: "",
    gnDivision: "",
    gender: "",
  });

  const districts = [
    {
      name: "Mullaitivu",
      dsDivisions: [
        {
          name: "Maritimepattu",
          gnDivisions: ["Maritimepattu North", "Maritimepattu South"],
        },
        {
          name: "Oddusuddan",
          gnDivisions: ["Oddusuddan North", "Oddusuddan South"],
        },
        {
          name: "Puthukkudiyiruppu",
          gnDivisions: ["Puthukkudiyiruppu North", "Puthukkudiyiruppu South"],
        },
        {
          name: "Thunukkai",
          gnDivisions: ["Thunukkai North", "Thunukkai South"],
        },
      ],
    },
  ];


  //Function to submit formdata to API endpoint
  const sendFormDataToAPI = async () => {
    console.log("sending")
    try {
      
      const apiUrl = "http://localhost:3000/beneficiaries"; // MongoDB endpoint URL
  
      const requestData = {
        uniqID: 1234567893,
        firstName: formData.firstName,
        lastName: formData.lastName,
        balance: 10000,
        district: formData.district,
        dsDivision: formData.dsDivision,
        gnDivision: formData.gnDivision,
        gender: formData.gender,

      };
  
      const response = await axios.post(apiUrl, requestData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      console.log("API Response:", response.data);
      console.log("Data submitted");
  
      setFormData({
        firstName: "",
        lastName: "",
        district: "",
        dsDivision: "",
        gnDivision: "",
        gender: "",
      });
      console.log("Form data rest.");
    } catch (error) {
      console.error("API Error:", error);
    }
  };
  
  //Click event for Create button
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Create button clicked"); 
    await sendFormDataToAPI(); // API function call
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
    if (name === "district") {
      setFormData((prevFormData) => ({
        ...prevFormData,
        dsDivision: "",
        gnDivision: "",
      }));
    }
    if (name === "dsDivision") {
      setFormData((prevFormData) => ({
        ...prevFormData,
        gnDivision: "",
      }));
    }
  };

  const filteredDsDivisions =
    districts.find((d) => d.name === formData.district)?.dsDivisions || [];

  const filteredGnDivisions =
    filteredDsDivisions.find((ds) => ds.name === formData.dsDivision)
      ?.gnDivisions || [];

  return (
    <div className="bg-white p-4">
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div className="flex flex-row gap-4">
          <div className="flex flex-col gap-2.5 w-1/4">
            <label className="text-gray-500 text-xs font-semibold leading-none">
              First Name
            </label>
            <input
              type="text"
              className="AtomInputInner w-full h-14 bg-white rounded shadow border border-gray-400 px-2"
              name="firstName"
              value={formData.firstName}
              onChange={handleInputChange}
            />
          </div>
          <div className="flex flex-col gap-2.5 w-1/4">
            <label className="text-gray-500 text-xs font-semibold leading-none">
              Last Name
            </label>
            <input
              type="text"
              className="AtomInputInner w-full h-14 bg-white rounded shadow border border-gray-400 px-2"
              name="lastName"
              value={formData.lastName}
              onChange={handleInputChange}
            />
          </div>
        </div>
        <div className="flex flex-row gap-4">
          <div className="flex flex-col gap-2.5 w-1/5">
            <label className="text-gray-500 text-xs font-semibold leading-none">
              District
            </label>
            <select
              className="AtomInputInner w-full h-14 bg-white rounded shadow border border-gray-400"
              name="district"
              value={formData.district}
              onChange={handleInputChange}
            >
              <option value="">Select District</option>
              {districts.map((district) => (
                <option key={district.name} value={district.name}>
                  {district.name}
                </option>
              ))}
            </select>
          </div>
          <div className="flex flex-col gap-2.5 w-1/5">
            <label className="text-gray-500 text-xs font-semibold leading-none">
              DS Division
            </label>
            <select
              className="AtomInputInner w-full h-14 bg-white rounded shadow border border-gray-400"
              name="dsDivision"
              value={formData.dsDivision}
              onChange={handleInputChange}
            >
              <option value="">Select DS Division</option>
              {filteredDsDivisions.map((dsDivision) => (
                <option key={dsDivision.name} value={dsDivision.name}>
                  {dsDivision.name}
                </option>
              ))}
            </select>
          </div>
          <div className="flex flex-col gap-2.5 w-1/5">
            <label className="text-gray-500 text-xs font-semibold leading-none">
              GN Division
            </label>
            <select
              className="AtomInputInner w-full h-14 bg-white rounded shadow border border-gray-400"
              name="gnDivision"
              value={formData.gnDivision}
              onChange={handleInputChange}
            >
              <option value="">Select GN Division</option>
              {filteredGnDivisions.map((gnDivision) => (
                <option key={gnDivision} value={gnDivision}>
                  {gnDivision}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="flex flex-col gap-2.5">
          <label className="text-gray-500 text-xs font-semibold leading-none">
            Gender
          </label>
          <select
            className="AtomInputInner w-[290px] h-14 bg-white rounded shadow border border-gray-400"
            name="gender"
            value={formData.gender}
            onChange={handleInputChange}
          >
            <option value="">Select Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
        </div>
        <button
          type="submit"
          className="bg-blue-500 w-[120px] hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Create
          </button>
        </form>
      </div>
    );
  }
  