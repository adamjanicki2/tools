import {
  Alert,
  Badge,
  Box,
  Button,
  Icon,
  Select,
  TextArea,
} from "@adamjanicki/ui";
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
    <Box vfx={{ axis: "x", wrap: true, justify: "center", width: "full" }}>
      <Box vfx={{ axis: "y", gap: "m" }} className="prettifier-section">
        <Box vfx={{ axis: "x", align: "center", gap: "s" }}>
          <Select
            options={Object.keys(lintOptions)}
            getOptionLabel={(option) => lintOptions[option as Lang]}
            onChange={(e) => setLang(e.target.value as Lang)}
            value={lang}
          />
          <Button
            vfx={{ width: "fit" }}
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
        </Box>
        <TextArea
          value={code}
          onChange={(e) => setCode(e.target.value)}
          rows={16}
          vfx={{ width: "full" }}
        />
      </Box>
      {formatted && (
        <Box
          vfx={{
            axis: "y",
            radius: "rounded",
            border: true,
            overflow: "hidden",
            backgroundColor: "default",
            shadow: "subtle",
          }}
          className="prettifier-section"
        >
          <Box
            vfx={{
              axis: "x",
              align: "center",
              justify: "between",
              width: "full",
              backgroundColor: "muted",
              padding: "s",
              borderBottom: true,
            }}
          >
            <Badge type="info">{lintOptions[lang]}</Badge>
            <CopyButton text={formatted} />
          </Box>
          <Box vfx={{ axis: "y", width: "full", padding: "s" }}>
            {error && (
              <Alert type="error" vfx={{ width: "full" }}>
                {error}
              </Alert>
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
          </Box>
        </Box>
      )}
    </Box>
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
