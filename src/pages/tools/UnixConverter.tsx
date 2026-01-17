import {
  Alert,
  Box,
  Button,
  Input,
  Spinner,
  ui,
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
    <Box vfx={{ axis: "y", align: "center", width: "full" }}>
      <Box vfx={{ axis: "x", wrap: true, justify: "center", width: "full" }}>
        <Box vfx={{ axis: "y", gap: "s" }} className="prettifier-section">
          <Input
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder="Unix timestamp"
          />
          <Button
            vfx={{ width: "fit" }}
            onClick={() => setSearchParams({ timestamp: value })}
          >
            Convert
          </Button>
        </Box>
        <Box
          vfx={{
            axis: "y",
            border: true,
            radius: "rounded",
            backgroundColor: "default",
            padding: "m",
            shadow: "subtle",
          }}
          className="prettifier-section"
        >
          <ui.h3 vfx={{ marginTop: "none" }}>Local Time</ui.h3>
          <CopyableCode>
            {local.format("dddd, MMMM Do YYYY, h:mm:ss a") +
              " " +
              moment.tz(localTimezone).zoneAbbr()}
          </CopyableCode>
          <ui.h3>UTC/GMT</ui.h3>
          <CopyableCode>
            {momentObj.clone().utc().format("dddd, MMMM Do YYYY, h:mm:ss a") +
              " GMT"}
          </CopyableCode>
          <ui.h3>This day in history</ui.h3>
          {loading && <Spinner />}
          {event && !loading && (
            <ui.p vfx={{ marginY: "none" }}>
              <ui.span vfx={{ fontWeight: 7 }}>{event.year}</ui.span>:{" "}
              {event?.description}
            </ui.p>
          )}
          {!loading && !event && (
            <Alert type="error">Error fetching a cool event.</Alert>
          )}
        </Box>
      </Box>
    </Box>
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
