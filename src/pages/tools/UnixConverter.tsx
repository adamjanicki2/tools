import {
  Alert,
  Button,
  Input,
  Spinner,
  useSearchParams,
} from "@adamjanicki/ui";
import moment from "moment-timezone";
import { useEffect, useMemo, useState } from "react";
import CopyableCode from "src/components/CopyableCode";
import { randomElement } from "src/utils/helpers";

type Timestamp = {
  value: number;
  version: "s" | "ms";
};

type Event = {
  year: number;
  description: string;
};

export default function UnixConverter() {
  const [searchParams, setSearchParams] = useSearchParams();
  const timestamp = parseTimestamp(searchParams.timestamp as string);
  const [event, setEvent] = useState<Event>();
  const [loading, setLoading] = useState(false);

  const momentObj = useMemo(
    () =>
      moment(
        timestamp.version === "ms" ? timestamp.value : timestamp.value * 1000
      ),
    [timestamp.value, timestamp.version]
  );

  const local = momentObj.local();
  const day = local.date();
  const month = local.month();

  useEffect(() => {
    const setup = async () => {
      setLoading(true);
      const response = await fetch(
        `https://api.wikimedia.org/feed/v1/wikipedia/en/onthisday/events/${month + 1}/${day}`
      );
      const { events } = await response.json();
      const { year, text } = randomElement<any>(
        events,
        (e) => !["kill", "death", "die"].some((word) => e.text.includes(word))
      );
      setEvent({ year, description: text });
      setLoading(false);
    };

    setup();
  }, [month, day]);

  const [value, setValue] = useState(timestamp.value.toString());

  const localTimezone = moment.tz.guess();

  return (
    <div className="flex flex-column items-center w-100">
      <div className="flex flex-wrap justify-center w-100">
        <div className="flex flex-column prettifier-section">
          <Input
            value={value}
            onChange={(e) => setValue(e.target.value)}
            className="bg-white mb2"
            placeholder="Unix timestamp"
          />
          <Button
            className="w-fc"
            onClick={() => setSearchParams({ timestamp: value })}
          >
            Convert
          </Button>
        </div>
        <div className="flex flex-column prettifier-section ba b--moon-gray br3 bg-white pa3">
          <h3 className="mt0">Local Time</h3>
          <CopyableCode>
            {local.format("dddd, MMMM Do YYYY, h:mm:ss a") +
              " " +
              moment.tz(localTimezone).zoneAbbr()}
          </CopyableCode>
          <h3>UTC/GMT</h3>
          <CopyableCode>
            {momentObj.clone().utc().format("dddd, MMMM Do YYYY, h:mm:ss a") +
              " GMT"}
          </CopyableCode>
          <h3>This day in history</h3>
          {loading && <Spinner />}
          {event && !loading && (
            <p className="mv0">
              <span className="b">{event.year}</span>: {event?.description}
            </p>
          )}
          {!loading && !event && (
            <Alert type="error">Error fetching a cool event.</Alert>
          )}
        </div>
      </div>
    </div>
  );
}

function parseTimestamp(timestamp: string | null): Timestamp {
  const now: Timestamp = { value: Date.now(), version: "ms" };
  if (!timestamp) return now;
  const parsed = parseInt(timestamp);
  return isNaN(parsed)
    ? now
    : { value: parsed, version: timestamp.length > 10 ? "ms" : "s" };
}
