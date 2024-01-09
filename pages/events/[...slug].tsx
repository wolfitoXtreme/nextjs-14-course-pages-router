import { useRouter } from 'next/router';
// import { GetServerSideProps } from 'next/types';
import { useEffect, useRef, useState } from 'react';

import useSWR from 'swr';

// import { ParsedUrlQuery } from 'querystring';

import { TDateParams, TEvent } from '@/types';
// import { getFilteredEvents } from '@/utils/api';

import EventList from '@/components/events/EventList';
import ResultsTitle from '@/components/events/ResultsTitle';
import ErrorAlert from '@/components/ui/ErrorAlert';

const FilteredEventsPage = () => {
  const [loadedEvents, setLoadedEvents] = useState<TEvent[]>();
  const numYear = useRef(0);
  const numMonth = useRef(0);
  const filterError = useRef(false);

  const {
    query: { slug: filteredData },
  } = useRouter();

  const { data, error } = useSWR(
    'https://nextjs-course-events-76ab8-default-rtdb.firebaseio.com/events.json',
    url => fetch(url).then(res => res.json()),
  );

  useEffect(() => {
    if (data) {
      const events =
        Object.keys(data).map(id => ({
          id,
          ...data[id],
        })) || [];
      setLoadedEvents(events);
    }
  }, [data]);

  const [filteredYear, filteredMonth] = (filteredData as TDateParams) || [];

  if (filteredYear && filteredMonth) {
    numYear.current = +filteredYear;
    numMonth.current = +filteredMonth;

    if (
      isNaN(numYear.current) ||
      isNaN(numMonth.current) ||
      numYear.current > 2030 ||
      numYear.current < 2021 ||
      numMonth.current < 1 ||
      numMonth.current > 12 ||
      error
    ) {
      filterError.current = true;
    }
  }

  const filteredEvents =
    loadedEvents?.filter(event => {
      const eventDate = new Date(event.date);

      return (
        eventDate.getFullYear() === numYear.current &&
        eventDate.getMonth() === numMonth.current - 1
      );
    }) || [];

  const date = new Date(numYear.current, numMonth.current - 1);

  return (
    <>
      <ResultsTitle date={date} />
      <div>
        {loadedEvents ? (
          <>
            {filteredEvents.length ? (
              <EventList events={filteredEvents} />
            ) : (
              <p className="center">No results found</p>
            )}
            <pre>LoadedEvents: {JSON.stringify(filteredEvents, null, 2)}</pre>
            {'---'}
            <pre>filteredEvents: {JSON.stringify(loadedEvents, null, 2)}</pre>
          </>
        ) : (
          // useRouter load twice, once without the data...
          <p className="center">Loading...</p>
        )}
        {filterError.current && (
          <ErrorAlert>
            <p>Invalid filter please adjust your values.</p>
          </ErrorAlert>
        )}
      </div>
    </>
  );
};

// Commented in favour of client side data fetching
// --
// const FilteredEventsPage = ({
//   date: { numYear, numMonth },
//   events,
//   hasError,
// }: {
//   date: { numYear: number; numMonth: number };
//   events: TEvent[];
//   hasError: boolean;
// }) => {

//   const date = new Date(numYear, numMonth - 1);

//   return (
//     <>
//       <ResultsTitle date={date} />
//       <div>
//         {events ? (
//           <>
//             {events.length ? (
//               <EventList events={events} />
//             ) : (
//               <p className="center">No results found</p>
//             )}
//             <pre>Event: {JSON.stringify(events, null, 2)}</pre>
//             {'---'}
//             <pre>filteredEvents: {JSON.stringify(events, null, 2)}</pre>
//           </>
//         ) : (
//           // useRouter load twice, once without the data...
//           <p className="center">Loading...</p>
//         )}
//         {hasError && (
//           <ErrorAlert>
//             <p>Invalid filter please adjust your values.</p>
//           </ErrorAlert>
//         )}
//       </div>
//     </>
//   );
// };

// export const getServerSideProps: GetServerSideProps = async context => {
//   const { params } = context;
//   const { slug: filteredData } = params as ParsedUrlQuery;

//   const [filteredYear = 0, filteredMonth = 0] =
//     (filteredData as TDateParams) || [];

//   const numYear = +filteredYear;
//   const numMonth = +filteredMonth;

//   if (filteredYear && filteredMonth) {
//     if (
//       isNaN(numYear) ||
//       isNaN(numMonth) ||
//       numYear > 2030 ||
//       numYear < 2021 ||
//       numMonth < 1 ||
//       numMonth > 12
//     ) {
//       return {
//         props: { hasError: true }, // custom prop
//         // notFound: true, // shows 404 on error
//         // redirect: { // custom error page
//         //   destination: '/custom-error-page',
//         // },
//       };
//     }
//   }

//   const filteredEvents = await getFilteredEvents({
//     year: numYear,
//     month: numMonth,
//   });

//   return {
//     props: {
//       date: {
//         numYear,
//         numMonth,
//       },
//       events: filteredEvents,
//     },
//   };
// };

export default FilteredEventsPage;
