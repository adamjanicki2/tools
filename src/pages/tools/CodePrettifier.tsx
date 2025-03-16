import { Badge, Banner, Button, Select, TextArea } from "@adamjanicki/ui";
import {
  faCheckCircle,
  faClipboard,
} from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import lint, { lintOptions, type Lang } from "src/utils/lint";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";

export default function CodePrettifier() {
  const [lang, setLang] = useState<Lang>("svg");
  const [code, setCode] = useState("");
  const [formatted, setFormatted] = useState("");
  const [error, setError] = useState("");

  return (
    <div className="flex flex-wrap justify-center w-100">
      <div className="flex flex-column prettifier-section">
        <div className="flex items-center mb3">
          <Select
            aria-label="language"
            options={Object.keys(lintOptions)}
            getOptionLabel={(o) => lintOptions[o as Lang]}
            onChange={(e) => setLang(e.target.value as Lang)}
            value={lang}
            className="bg-white mr2"
          />
          <Button
            className="w-fc"
            onClick={() =>
              lint(code, lang).then(({ code, error }) => {
                if (error) {
                  setError(error);
                } else if (code) {
                  setError("");
                  setFormatted(code);
                }
              })
            }
          >
            Format
          </Button>
        </div>
        <TextArea
          value={code}
          onChange={(e) => setCode(e.target.value)}
          rows={16}
          className="bg-white"
        />
      </div>
      {formatted && (
        <div className="flex flex-column prettifier-section">
          <div className="flex items-center justify-between w-100 br3 br--top bg-light-gray ba b--moon-gray pa2">
            <Badge type="info">{lintOptions[lang]}</Badge>
            <CopyButton text={formatted} />
          </div>
          <div className="flex flex-column w-100 br3 br--bottom bg-white bl br bb b--moon-gray pa2">
            {error && (
              <Banner type="error" style={{ width: "100%" }}>
                {error}
              </Banner>
            )}
            <SyntaxHighlighter
              showLineNumbers
              children={formatted.trim()}
              language={lang}
              customStyle={{
                background: "none",
                backgroundColor: "transparent",
                padding: 0,
                margin: 0,
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
}

function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);
  const copy = () => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
  };
  return copied ? (
    <Badge type="success">
      <span>
        Copied <FontAwesomeIcon icon={faCheckCircle} />
      </span>
    </Badge>
  ) : (
    <Button
      size="small"
      className="f6"
      style={{ padding: "3px 6px" }}
      variant="secondary"
      onClick={copy}
    >
      <span>
        Copy <FontAwesomeIcon icon={faClipboard} />
      </span>
    </Button>
  );
}
