import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styled, { keyframes } from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import image from "../../assets/homeimgae.png";
import noticeimag from "../../assets/Biirthday.png";
import { Events } from "../../components/Events/Events";
import { Organizer } from "../../components/Organizer/Organizer";
import { OrganiserHome } from "./OrganiserHome";
import Footer from "../../components/Footer/Footer"
import { faContactBook, faEnvelope } from "@fortawesome/free-solid-svg-icons";

export const HomePage = () => {
  // State variables
  const [events, setEvents] = useState(null);
  const [latestEvent, setLatestEvent] = useState(null);
  const [topOrg, setTopOrg] = useState(null);
  const [userType, setUserType] = useState("");
  const [organizers, setOrganizers] = useState({});
  const [isLogin, setIsLogin] = useState(false);

  // Fetching data from API
  useEffect(() => {
    // Fetching user type from local storage
    const userType = localStorage.getItem("userType");
    setUserType(userType);

    // Fetching events and organizers data
    async function fetchData() {
      try {
        const eventsResponse = await fetch("http://localhost:5001/events");
        if (!eventsResponse.ok) {
          throw new Error(`An error occurred: ${eventsResponse.statusText}`);
        }
        const eventsData = await eventsResponse.json();
        setEvents(eventsData);

        const orgDetails = {};
        for (const event of eventsData) {
          const organizerResponse = await fetch(
            `http://localhost:5001/organise/${event.organiseId}`
          );
          if (organizerResponse.ok) {
            const organizer = await organizerResponse.json();
            orgDetails[event.organiseId] = organizer;
          } else {
            console.error(
              `Failed to fetch organizer details for ID ${event.organiseId}`
            );
          }
        }
        setOrganizers(orgDetails);

        // Fetching latest events
        const latestEventsResponse = await fetch(
          "http://localhost:5001/events/latest/event"
        );
        if (!latestEventsResponse.ok) {
          throw new Error(
            `An error occurred: ${latestEventsResponse.statusText}`
          );
        }
        const latestEventData = await latestEventsResponse.json();
        setLatestEvent(latestEventData);

        // Fetching top organizers
        const topOrgResponse = await fetch(
          "http://localhost:5001/organise/rating"
        );
        if (!topOrgResponse.ok) {
          throw new Error(`An error occurred: ${topOrgResponse.statusText}`);
        }
        const topOrgData = await topOrgResponse.json();
        setTopOrg(topOrgData);

        // Checking if user is logged in
        const user = localStorage.getItem("User");
        if (user) {
          setIsLogin(true);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }

    fetchData();
  }, []);

  // Rendering OrganiserHome if user type is "Organiser"
  if (userType === "Organiser") {
    return (
      <div>
        <OrganiserHome />
      </div>
    );
  }

  return (
    <>
      <div>
        <Home className="home">
          <Left className="left">
            <Heading>All in One Event Management Software</Heading>
            <Title>Book Your Events Today</Title>
            <Para>'We provide you high quality products'</Para>
            {!isLogin ? (
              <LinkStyled to="/signup">Create Account</LinkStyled>
            ) : (
              <LinkStyled to="/events">Explore</LinkStyled>
            )}
          </Left>

          <Right className="right">
            <img alt="img" src={image} />
          </Right>
        </Home>

        <NoticeSection>
          <NoticeRight className="image-area">
            <img src={noticeimag} alt="" />
          </NoticeRight>
          <NoticeLeft className="text-area">
            <NoticeHeading>
              Event planning software that handles everything all in one place
            </NoticeHeading>
            <NoticePara>
              No matter what stage of the event process you’re in, we offer a
              complete set of tools that’s flexible enough to work with your
              event program. From small meetings, large conferences or internal
              meetings, we’ve got you covered.
            </NoticePara>
          </NoticeLeft>
        </NoticeSection>
      
        <div className="item-section">
          <div className="top-event">
            <SectionHeading>Top Events</SectionHeading>
            <TopEvents>
              {events &&
                events.map((event) => (
                  <Link to="" className="linkcard" key={event._id}>
                    <Events
                      event={event}
                      organizer={organizers[event.organiseId]}
                    />
                  </Link>
                ))}
            </TopEvents>
          </div>
         </div>
       
          <div className="latest-event">
            <SectionHeading>Latest Events</SectionHeading>
            <LatestEvent>
              {latestEvent &&
                latestEvent.map((event) => (
                  <Link to="" className="linkcard" key={event._id}>
                    <Events
                      event={event}
                      organizer={organizers[event.organiseId]}
                    />
                  </Link>
                ))}
            </LatestEvent>
          </div>
      

        <OurPartnar className="our-patner">
          <PartnerHeading>Our Patner</PartnerHeading>
          <CollabPara className="collab">
            We Collaborate With Several Organization
          </CollabPara>
          <div className="organisation-section">
            <OrgSec className="organisation-container">
              {topOrg &&
                topOrg.map((organise) => (
                  <LinkOrg to="" className="linkcardorganise">
                    <OrgView>
                      {" "}
                      <Organizer key={organise._id} organise={organise} />
                    </OrgView>
                  </LinkOrg>
                ))}
            </OrgSec>
          </div>
        </OurPartnar>

        <ContactSection>
          <ContactFlexBox>
            <ContactUsContainer>
              <ContactForm>
                <Label htmlFor="name">Name</Label>
                <Input type="text" placeholder="Your Name" id="name" required />
                <Label htmlFor="email">Email</Label>
                <Input
                  type="email"
                  placeholder="Your Email"
                  id="email"
                  required
                />
                <Label htmlFor="message">Message</Label>
                <Textarea rows="5" id="message" required />
                <SubmitButton type="submit">Send Message</SubmitButton>
              </ContactForm>
            </ContactUsContainer>
            <TextContact>
              <h1>Contact Us</h1>
              <ContactPara>Any Queries? You Can Freely Ask</ContactPara>
              <ContactPara>24/7</ContactPara>
              <ContactDetails>
                <ContactInfo> <FontAwesomeIcon icon={faContactBook} className="snav-icon" /> 8133820226/9101233239</ContactInfo>
                <ContactInfo><FontAwesomeIcon icon={faEnvelope} className="snav-icon" /> nitulsonowal8133@gmail.com</ContactInfo>
              </ContactDetails>
            </TextContact>
          </ContactFlexBox>
        </ContactSection>

        {/* <footer>
          <p>&copy; 2024 Event Organizer. All Rights Reserved.</p> 
            <Footer />
        </footer> */}
      </div>
    </>
  );
};

// Styled Components


const TopEvents = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  gap: 20px;
  padding: 30px;
  justify-content: center; 
  background: rgb(81,63,121);
  background: linear-gradient(352deg, rgba(81,63,121,0.8715861344537815) 16%, rgba(56,140,157,0.5830707282913166) 100%);
`;
const slideShowHorizontal = keyframes`
  /* 0% {
    transform: translateX(0);
  }
  100% {
    transform: translateX(-50%);
  } */
    from {
    transform: translateX(100%);
    /* opacity: 1; */
  }
  to {
    transform: translateX(-100%);
    /* opacity: 0; */
  }
`;

const LatestEvent = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  gap: 20px;
  justify-content: center; 
  padding: 30px;
  overflow: hidden;
  /* overflow-x: auto; */
  height: auto;
  /* animation: ${slideShowHorizontal} 10s linear infinite; */
  background: rgb(110,62,147);
  background: linear-gradient(176deg, rgba(110,62,147,0.8267682072829132) 16%, rgba(56,140,157,0.5830707282913166) 100%);
`;

const Home = styled.div`
  // display: flex;
  // height: 650px;
  // padding: 20px;
  
  // max-width: 100%;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
    padding: 20px;
`;

const Right = styled.div`
  // position: relative;
  // top: 100px;
  // right: -400px;
  // max-width: 500px;
  
    flex: 1 1 50%;
    padding: 20px;
    box-sizing: border-box;
`;

const Left = styled.div`
  // padding: 10px;
  // padding-top: 100px;
    flex: 1 1 50%;
    padding: 20px;
    box-sizing: border-box;
`;

const HomeWrapper = styled.div`
  /* padding: 20px; */
`;

const Heading = styled.p`
  font-size: 1.5rem;
  margin-bottom: 10px;
  width: 500px;
`;

const Title = styled.h1`
  font-size: 3rem;
  margin: 10px 0;
`;

const Para = styled.p`
  font-size: 1.2rem;
  margin-bottom: 20px;
`;

const LinkStyled = styled(Link)`
  display: inline-block;
  text-decoration: none;
  margin-top: 20px;
  padding: 10px 20px;
  border: 1px solid #994e59;
  // background-color: #ffb6c1;
  color: rgb(0, 0, 0);
  border-radius: 5px;
  transition: 1s;
  /* width: 400px; */
  /* width: 700px; */

  &:hover {
    border-color: rgb(0, 213, 255);
    text-decoration: none;
    transform:scale(1.1);
  }
`;

const NoticeSection = styled.div`
  z-index: -1;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  color: white;
  padding: 20px;
  background-color: #000000;
  height:100%;
  img {
    max-width: 100%;
    height: auto;
    left: 0;
    top: 20px;
    animation: infinite-rotate 10s linear infinite;
  }

  @keyframes infinite-rotate {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }
`;

const OrgView = styled.div`
  /* display: flex; */
  /* width: 400px; */
`;

const NoticeRight = styled.div`
  z-index: 1;
  flex: 1 1 50%;
  padding: 20px;
  box-sizing: border-box;
`;
const NoticeLeft = styled.div`
  flex: 1 1 50%;
  padding: 20px;
  box-sizing: border-box;
`;
const NoticeHeading = styled.h2`
  font-size: 2rem;
  margin-bottom: 20px;
`;

const NoticePara = styled.p`
  font-size: 1.1rem;
  /* color: #555; */
`;

const ItemSection = styled.div`
  /* width: 100%; */
  margin: 0;
  padding: 0;
  overflow: hidden;
`;

const SectionHeading = styled.h2`
  font-size: 3em;
  align-items: center;
  text-align: center;
  // border-bottom: 1px solid blue;
  padding-bottom: 30px;
  padding-top: 30px;
  // background:white;
`;

const RecentEvents = styled.div`
  margin-top: 30px;
  /* height: 400px; */
`;

const EventCardContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  position: relative;
  margin: 20px;
`;

const EventLink = styled(Link)`
  text-decoration: none;
  color: inherit;
`;

const OurPartnar = styled.div`
  background: #0d2d39;
  padding: 20px;
  text-align: center;

`;

const PartnerHeading = styled.h2`
  color: white;
  font-family: "Times New Roman", Times, serif;
  font-size: 30px;
`;

const CollabPara = styled.p`
  color: white;
  font-family: "Times New Roman", Times, serif;
  font-size: 30px;
  transition: 0.5s;
`;

const OrganiseContainer = styled.div`
  /* display: grid; */
  /* display: flex;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px; */
  /* width: 900px; */
`;

const OrgSec = styled.div`
  display: flex;
  flex-wrap:wrap;
  justify-content: center;
  gap: 20px;
`;

const LinkOrg = styled(Link)`
  text-decoration: none;
  color: inherit;
`;

const ContactSection = styled.div`
  padding: 50px;
  background-color: #f9f7e7;
  color: #000000;
`;

const ContactFlexBox = styled.div`
  // display: flex;
  // gap: 30px;
  // align-items: center;
  display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    width: 100%;
`;

const ContactUsContainer = styled.div`
  box-shadow: 3px solid black;
  flex: 1;
  margin-right: 20px;
  background-color: #315b84;
  color: white;
  border-radius:10px;

`;

const ContactForm = styled.form`
  display: block;
  padding: 25px;
`;

const Label = styled.label`
  display: block;
  font-size: 1rem;
  margin-bottom: 5px;
`;

const Input = styled.input`
  padding: 10px 5px;
  margin-bottom: 20px;
  border: none;
  border-radius: 5px;
  width: 100%;
  box-sizing: border-box;
`;

const Textarea = styled.textarea`
  padding: 10px 5px;
  margin-bottom: 20px;
  border: none;
  border-radius: 5px;
  width: 100%;
  box-sizing: border-box;
`;

const SubmitButton = styled.button`
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  background-color: #060303;
  color: #fff;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: #ff69b4;
  }
`;

const TextContact = styled.div`
  // flex: 1;
  // margin-left: 20px;
  // flex-wrap:wrap;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 600px;
`;

const ContactPara = styled.p`
  font-size: 1.2rem;
  margin-bottom: 10px;
`;

const ContactDetails = styled.div`
  margin-top: 20px;
  display:flex;
  gap:10px;
  flex-wrap:wrap;
`;

const ContactInfo = styled.p`
  font-size: 1rem;
  margin-bottom: 5px;
`;

// const Footer = styled.footer`
//   padding: 20px;
//   background-color: #333;
//   color: #fff;
//   text-align: center;
// `;

// export default HomePage;
