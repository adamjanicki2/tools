import { Badge, Banner, Button, Icon, Select, TextArea } from "@adamjanicki/ui";
import { check, clipboard } from "@adamjanicki/ui/icons";
import { useState } from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import lint, { type Lang, lintOptions } from "src/utils/lint";

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
    <Badge vfx={{ axis: "x", align: "center", gap: "xs" }} type="success">
      <Icon icon={check} /> Copied
    </Badge>
  ) : (
    <Button
      vfx={{ axis: "x", align: "center", gap: "xs", paddingY: "xxs" }}
      onClick={copy}
      size="small"
      variant="secondary"
    >
      <Icon icon={clipboard} />
      Copy
    </Button>
  );
}
