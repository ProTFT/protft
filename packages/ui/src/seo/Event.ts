interface Event {
  name: string;
  startDateTime: string;
  endDateTime: string;
  streamLink: string;
  image: string;
  description: string;
  host: string;
}

// "performer": {
//   "@type": "Person",
//   "name": "LilTop",
//   "sameAs": "http://protft.com/players/466-liltop"
// },

export const getEventMetadata = ({
  name,
  startDateTime,
  endDateTime,
  streamLink,
  image,
  description,
  host,
}: Event) => {
  return `{
    "@context": "https://schema.org",
    "@type": "Event",
    "name": "${name}",
    "startDate": "${startDateTime}",
    "endDate": "${endDateTime}",
    "eventStatus": "https://schema.org/EventScheduled",
    "eventAttendanceMode": "https://schema.org/OnlineEventAttendanceMode",
    "location": {
      "@type": "VirtualLocation",
      "url": "${streamLink}"
    },
    "image": [
      "${image}"
    ],
    "description": "${description}",
    "organizer": {
      "@type": "Organization",
      "name": "${host}"
    }
  }`;
};
