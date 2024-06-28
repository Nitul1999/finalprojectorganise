import React from "react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {Events} from"../../components/Events/Events"
import './Eventorganise.css'
export const EventsOrganise = () => {
  const { id: organiseId } = useParams();
  const [events, setevents] = useState("");

  useEffect(() => {
    async function getevents() {
      try {
        const response = await fetch(
          `http://localhost:5001/events/organise/events/${organiseId}`
        );
        if (!response.ok) {
          console.log("data not found");
        }
        const orgevents = await response.json();
        console.log(orgevents);
        setevents(orgevents);
      } catch (error) {
        console.log("somthings error");
      }
    }

    getevents();
    return;
  }, [organiseId]);
  if(!events) return (<div> Loading...... </div>)
      if (events.length === 0) {
          return (<div> There is nothing to show any events to user</div>);
        }
  return (
    <>
    <div className="event-card-container-organise">
                    <div className="cards-items-organise">
                        {events && events.map((event)=>
                          <Events key={event._id} event={event} />
                        )}
                    </div> 
              </div>
    </>
  );
};
