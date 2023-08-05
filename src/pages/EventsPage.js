import { Suspense } from "react";
import { useLoaderData, json, defer, Await } from "react-router-dom";
import EventsList from "../components/EventsList";

function EventsPage() {
  const { events } = useLoaderData();

  return (
    <Suspense fallback={<p style={{ textAlign: "center" }}>Loading...</p>}>
      {/* 2. resolves the deferred Promise */}
      <Await resolve={events}>
        {(loadedEvents) => <EventsList events={loadedEvents} />}
      </Await>
    </Suspense>
  );
}

export default EventsPage;

const loadEvents = async () => {
  const response = await fetch("http://localhost:8080/events");

  if (!response.ok) {
    // • Way #1...
    // return { isError: true, message: "Could not fetch events" };
    // • Way #2 - useRouteError
    //   throw new Response(
    //     JSON.stringify({ message: "Could not fetch events" }),
    //     { status: 500 }
    //   );
    throw json({ message: "Could not fetch events" }, { status: 500 });
  } else {
    const resData = await response.json();
    return resData.events;
  }
};

export function loader() {
  // 1. returns and stores a Promise
  return defer({ events: loadEvents() });
}
