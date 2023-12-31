import { useRouter } from 'next/router';
import { useRef } from 'react';

import { getFilteredEvents } from '@/data/dummy-data';
import { TDateParams } from '@/types';

import EventList from '@/components/events/EventList';
import ResultsTitle from '@/components/events/ResultsTitle';
import ErrorAlert from '@/components/ui/ErrorAlert';

const FilteredEventsPage = () => {
  const numYear = useRef(0);
  const numMonth = useRef(0);
  const filterError = useRef(false);

  const {
    query: { slug: filteredData },
  } = useRouter();

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
      numMonth.current > 12
    ) {
      filterError.current = true;
    }
  }

  const filteredEvents = getFilteredEvents({
    year: numYear.current,
    month: numMonth.current,
  });

  const date = new Date(numYear.current, numMonth.current - 1);

  return (
    <>
      <ResultsTitle date={date} />
      <div>
        {filteredData ? (
          <>
            {filteredEvents.length ? (
              <EventList events={filteredEvents} />
            ) : (
              <p className="center">No results found</p>
            )}
            <pre>Event: {JSON.stringify(filteredData, null, 2)}</pre>
            {'---'}
            <pre>filteredEvents: {JSON.stringify(filteredEvents, null, 2)}</pre>
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

export default FilteredEventsPage;
