import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import StarRating from "../StarRating";
import { ImageSlider } from "../ImageSlider/ImageSlider";
import { Review } from "../ReviewComponent/Review";
// import "./slider.css";

const EventContainer = styled.div`
  //  display: flex; 
  /* flex-wrap: wrap; */
  /* flex-direction: row; */
  /* justify-content: center; */
  max-width: 100%;
`;

const EventsCard = styled.div`
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  background-color: #EEDBFF ;
  // border: 1px solid #e0e0e0;
  border-radius: 35px;
  // box-shadow: 0 10px 15px rgba(14, 100, 10);
 // box-shadow: rgba(0, 0, 0, 0.4) 0px 2px 4px, rgba(0, 0, 0, 0.3) 0px 7px 13px -3px, rgba(0, 0, 0, 0.2) 0px -3px 0px inset;
  padding: 1.5rem;
  margin: 1rem;
  width: 400px;
  max-width: 100%;
  transition: 0.1s ease;

  &:hover {
    box-shadow: 0 10px 8px rgba(0, 10, 0, 0.2);
    transform:scale(1.01);
  }

  p {
    margin: 0.5rem 0;
    color: #333333;
    font-family: "Arial", sans-serif;
    font-size: 16px;
  }

  .edetails {
    margin-top: 1rem;
  }
`;
const Edetails =styled.div`
  display:flex;
  gap: 20px;

`
// const EventsCard = styled.div`
//   background-color: #f5f5f5;
//   border-radius: 5px;
//   box-shadow: 0 2px 5px rgba(0, 0, 0, 0.3);
//   display: flex;
//   flex-direction: column;
//   margin: 1rem;
//   padding: 1rem;
//   width: 400px;
//   height: auto;

//   p {
//     margin: 0.5rem 0;
//     color: black;
//     font-family: Serif;
//     font-size: 16px;
//   }
// `;

const OrganiserDetails = styled.div`
  /* display: flex; */
  p {
    /* background-color: #1ed3ca; */
    padding: 8px;
    border-radius: 4px;
  }

  /* justify-content: space-around; */
`;

const ViewDetailsBtn = styled.button`
  background-color: #000000;
  border: none;
  border-radius: 5px;
  color: white;
  cursor: pointer;
  font-size: 1rem;
  padding: 0.5rem;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #3e8e41;
  }
`;

const PopupOverlay = styled.div`
  background-color: rgba(0, 0, 0, 0.5);
  bottom: 0;
  left: 0;
  position: fixed;
  right: 0;
  top: 0;
  z-index: 999;
  display: ${({ show }) => (show ? "block" : "none")};
`;

const PopupCard = styled.div`
  background-color: #fff;
  border-radius: 5px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.3);
  left: 50%;
  max-height: 80vh;
  overflow-y: auto;
  overflow-x: hidden;
  padding: 0.5rem;
  position: fixed;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 70%;
  z-index: 1000;
  display: ${({ show }) => (show ? "block" : "none")};
  padding-left: 20px;
`;

const CloseBtn = styled.button`
  background-color: transparent;
  border-bottom: 1px solid blue;
  color: #333;
  cursor: pointer;
  font-size: 1.1rem;
  /* position: absolute; */
  right: 1rem;
  top: 1rem;
  transition: 1s;
  &:hover{
 color: red;
  }

`;

const EventInfoOne = styled.div`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
`;

const EventInfo = styled.div`
  display: flex;
  justify-content: space-evenly;
  flex-direction: column;
  /* padding-top: 50px; */
  /* margin-top: 40px; */

  p {
    color: #333;
  }
  padding-bottom: 20px;
`;

const DisplayInfo=styled.div`
    display:flex;
    gap:10px;
`;
const SecOne = styled.div`
  display: flex;
  flex-direction: column;
  // justify-content:center;
  padding-top: 60px;
  padding-bottom: 20px;
  p {
    margin: 0.5rem 0;
    color: #333333;
    font-family: "Arial", sans-serif;
    font-size: 16px;
    text-align:center;
  }
  
`;
const SecTwo = styled.div`
  justify-content: space-evenly;
  display: flex;
`;

const P1 = styled.div`
  background-color: #2389b1;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 7px;
  /* padding-left: 19px; */
  border-radius: 4px;
  width: 80px;
`;

const BookBtn = styled.button`
  display:flex;
  justify-content:center;
  margin:3% auto;
  background-color: #050705;
  border: none;
  border-radius: 5px;
  color: #fff;
  background-color:#4996FE;
  cursor: pointer;
  font-size: 1rem;
  padding: 0.5rem;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #3e8e41;
  }
`;

const BtnSectionBook = styled.div`
  padding: 10px;
  display: flex;
  flex-direction: row;
  gap: 20px;
  /* justify-content: space-evenly; */

  .submit-btn {
    background-color: #000000;
    width: 20%;
    padding: 10px;
    color: white;
    border-radius: 5px;
  }

  button {
    cursor: pointer;
    border: none;
    background-color: black;
    font-size: 19px;
    width: 20%;
    color: white;
    border-radius: 5px;
  }
`;

const H2 = styled.h2`
  font-weight: bold;
  text-aline:center;
  display:flex;
  justify-content:center;
  font-size:30px;
`;
const P = styled.p`
  background: #f9f9f9;
`;

const ContainerCreateBooking = styled.div`
  p {
    color: blueviolet;
  }

  form {
    display: flex;
    flex-direction: column;

    label {
      margin-top: 10px;
    }

    input {
      margin-bottom: 10px;
      width: 100%;
    }
    input[type="number"] {
      margin-bottom: 10px;
      width: 100%;
      border: 1px solid black;
      padding: 7px;
      border-radius: 4px;
    }
  }
`;

export const Events = ({ event, organizer }) => {

  const [showPopup, setShowPopup] = useState(false);
  const [showbookingform, setshowbookingform] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(
      localStorage.getItem("profile")
    );
  const navigate = useNavigate();
  const userId = localStorage.getItem("User");

  const [name, setname] = useState("");
  const [bookingDate, setbookingDate] = useState("");
  const [noofday, setnoofday] = useState("");
  const [location, setlocation] = useState("");
  const [pin, setpin] = useState("");
  const [district, setdistrict] = useState("");
  const [contact, setcontact] = useState("");
  const [email, setemail] = useState("");
  const [panno, setpanno] = useState("");
  const[capacity, setCapacity]=useState("")

  const organiseId = event.organiseId;
  const eventId = event._id;
  const eventname = event.name;
  const eventtype = event.type;

  const togglePopup = () => {
    setShowPopup(!showPopup);
  };

  // const toggleClose = () => {
  //   setShowPopup(false);
  // };
  const togglebooking = () => {
    setshowbookingform(!showbookingform);
  };

  const toggleOff = () => {
    setshowbookingform(false);
  };

   const validateForm = () => {
    const phoneRegex = /^[0-9]{10}$/;
    // const panRegex = /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/;

    if (!phoneRegex.test(contact)) {
      window.alert('Please enter a valid 10-digit phone number.');
      return false;
    }

    // if (!panRegex.test(panno)) {
    //   window.alert('Please enter a valid PAN number (e.g., ABCDE1234F).');
    //   return false;
    // }

    return true;
  };

  const Createbooking = async (e) => {
    e.preventDefault();
      if (!validateForm()) {
      return;
    }
    const data = {
      name,
      userId,
      organiseId,
      eventId,
      bookingDate,
      noofday,
      location,
      pin,
      district,
      contact,
      email,
      panno,
      capacity,
      eventname,
      eventtype,
    };
    try {
      
        const response = await fetch(`http://localhost:5001/booking/addbooking`, {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) {
        throw new Error("Data not submitted");
      }
      const mybooking = await response.json();
      console.log(mybooking);
      window.alert(`Booking Created`);
      navigate(`/mybooking/${userId}`);
    } catch (error) {
      console.error(error);
    }
  };
  
  // if(!organizer) return<>Organiser details unavaible</>

  return (
    <EventContainer>
      <div>
        <EventsCard>
          <p>
            Event Name: <strong>{event.name.toUpperCase()}</strong>
          </p>
          {organizer ? (
            <OrganiserDetails>
              <P>
                <strong>Organizer Name:</strong>
                {organizer.name}
              </P>
              <P>
                <strong>Email:</strong>
                {organizer.email}
              </P>
            </OrganiserDetails>
          ) : (
            <>
            <p>Loading...</p>
            </>
          )}

          <div className="edetails">
            <Edetails>  
              <p>
                Event Created: {new Date(event.createdAt).toLocaleDateString()}
              </p>
              <p>Event type: {event.type}</p>
              </Edetails>
          
            <p>Status: {event.status ? 'Active' : 'Inactive'}</p>
            <StarRating rating={event.averageRating} />
          </div>

          {/* Popup Card */}
          <PopupOverlay show={showPopup} onClick={togglePopup}></PopupOverlay>
          <ViewDetailsBtn onClick={togglePopup}>
            {showPopup ? "Close Details" : "View Details"}
          </ViewDetailsBtn>
        </EventsCard>
      </div>
      <PopupCard show={showPopup}>
        <CloseBtn onClick={() => togglePopup()}>Close</CloseBtn>

        <ImageSlider eventId={event._id} />
        {/* <H2>{event.name.toUpperCase()}</H2> */}

        <EventInfo>
          <SecOne>
            <H2>{event.name.toUpperCase()}</H2>
            <p>{event.eventdesc}</p>
          </SecOne>
          <SecTwo>
            <p>
              <strong>Created date:</strong>{" "}
              {new Date(event.createdAt).toLocaleDateString()}
            </p>
            <p>
              <strong>Total Booking:</strong> {event.totalbooking}
            </p>
          </SecTwo>
        </EventInfo>
        <EventInfoOne>
          <EventInfo>
            <p className="list">
              <strong> Different Capacities:</strong>
              <DisplayInfo>
                  {event.capacity &&
                    event.capacity.map((capacity, index) => (
                      <div key={index}>
                        <P1 className="itemlist">{capacity}</P1>
                      </div>
                    ))}
                </DisplayInfo>
            </p>
            <p className="list">
              <strong> Different Prices:</strong>
              <DisplayInfo>
              {event.price &&
                event.price.map((price, index) => (
                  <div key={index}>
                    <P1 className="itemlist">{price}</P1>
                  </div>
                ))}
                </DisplayInfo>
            </p>
          </EventInfo>
          <EventInfo>
            <p>Event Type: {event.type}</p>
            <StarRating rating={event.averageRating} />
          </EventInfo>
        </EventInfoOne>

       {isAuthenticated?(<BookBtn onClick={() => togglebooking()}>Book Now</BookBtn>):<>
        <p style={{color:"red"}}>For Booking Please Create a Account Or loggin First</p>
       </> } 

        {showbookingform && (
          <ContainerCreateBooking>
            <p>
              Notes: Payment Status/Booking Status will be updated by Event
              manager later. Sometimes prices will increase depending on the
              number of days...
            </p>
            <form onSubmit={Createbooking}>
              <div>
                <label htmlFor="name">Your Name</label>
                <input
                  type="text"
                  placeholder="Enter your name"
                  required
                  onChange={(e) => setname(e.target.value)}
                  value={name}
                />
                <label htmlFor="date">Pick a date</label>
                <input type="date" style={{border:"1px solid #EAEAEA", width:"50%",padding:"7px", borderRadius:"4px",cursor:"pointer" }} required  onChange={(e) => setbookingDate(e.target.value)}  value={bookingDate} /> <br />
                <label htmlFor="duration">Number of Days</label>
                <input
                  type="number"
                  placeholder="No of days"
                  required
                  onChange={(e) => setnoofday(e.target.value)}
                  value={noofday}
                />
                <label htmlFor="location">Location</label>
                <input
                  type="text"
                  placeholder="Event location"
                  required
                  onChange={(e) => setlocation(e.target.value)}
                  value={location}
                />
                
                 <label htmlFor="duration">Capacity(Add maximun number to be attend the function)</label>
          <input
            type="number"
            placeholder="Capacity"
            required
            onChange={(e) => setCapacity(e.target.value)}
            value={capacity}
          />
                <label htmlFor="pin">Pin Number</label>
                <input
                  type="number"
                  placeholder="Pin number"
                  required
                  onChange={(e) => setpin(e.target.value)}
                  value={pin}
                />
                <label htmlFor="district">District</label>
                <input
                  type="text"
                  placeholder="District"
                  required
                  onChange={(e) => setdistrict(e.target.value)}
                  value={district}
                />
                <label htmlFor="contact">Contact-No</label>
                <input
                  type="tel"
                  placeholder="Your Contact Number"
                  required
                  onChange={(e) => setcontact(e.target.value)}
                  value={contact}
                />
                <label htmlFor="email">Email Id</label>
                <input
                  type="email"
                  placeholder="Email Id"
                  required
                  onChange={(e) => setemail(e.target.value)}
                  value={email}
                />
                <label htmlFor="panno">Pan Number</label>
                <input
                  type="text"
                  required
                  placeholder="Pan card no"
                  onChange={(e) => setpanno(e.target.value)}
                  value={panno}
                />
              </div>
              <BtnSectionBook>
                <button type="submit">Submit</button>
                <button onClick={() => toggleOff()}>Close</button>
              </BtnSectionBook>
            </form>
          </ContainerCreateBooking>
        )}

        {!showbookingform && (
          <div>
            <Review eventId={event._id} />
          </div>
        )}
      </PopupCard>
    </EventContainer>
  );
};

const BookBotton = styled.button`
  /* background-color: green; */
`;
