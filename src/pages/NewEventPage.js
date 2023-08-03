import React from "react";
import EventForm from "../components/EventForm";

export default function NewEventPage() {
  const submitHandler = (event) => {
    event.preventDefault();
  };
  return <EventForm method="post" />;
}
