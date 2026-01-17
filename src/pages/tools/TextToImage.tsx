import {
  Box,
  Button,
  IconInput,
  Input,
  Select,
  TextArea,
  ui,
} from "@adamjanicki/ui";
import html2canvas from "html2canvas";
import { useRef, useState } from "react";

// default browser fonts
const fonts = [
  "Arial",
  "Brush Script MT",
  "Comic Sans MS",
  "Courier New",
  "Garamond",
  "Georgia",
  "Helvetica",
  "Impact",
  "System",
  "Tahoma",
  "Times New Roman",
  "Trebuchet MS",
  "Verdana",
] as const;
type Font = (typeof fonts)[number];

const [min, max] = [8, 200] as const;
const defaultFontSize = 128;

export default function TextToImage() {
  const [font, setFont] = useState<Font>("System");
  const [fontSize, setFontSize] = useState(defaultFontSize);
  const [bgColor, setBgColor] = useState("ffffff");
  const [textColor, setTextColor] = useState("000000");
  const [text, setText] = useState("hello");
  const textContainerRef = useRef<HTMLDivElement>(null);
  const [bold, setBold] = useState(false);
  const [italics, setItalics] = useState(false);

  const size = Math.min(420, Math.floor(window.innerWidth * 0.9));

  const download = async (imgSize: number) => {
    if (textContainerRef.current) {
      const canvas = await html2canvas(textContainerRef.current, {
        scale: imgSize / size,
      });
      const link = document.createElement("a");
      link.download = "image.png";
      link.href = canvas.toDataURL("image/png");
      link.click();
    }
  };

  const renderableFontSize = Math.max(Math.min(max, fontSize), min);

  return (
    <Box
      vfx={{
        axis: "x",
        wrap: true,
        justify: "center",
        align: "center",
        width: "full",
      }}
    >
      <Box vfx={{ axis: "y" }} className="image-section">
        <ui.h3>Text</ui.h3>
        <TextArea
          rows={3}
          value={text}
          onChange={(e) => setText(e.target.value)}
          vfx={{ width: "full" }}
        />
        <ui.h3>Font</ui.h3>
        <Box vfx={{ axis: "x", align: "center", gap: "s" }}>
          <Input
            style={{ width: "8ch" }}
            max={max}
            min={min}
            placeholder={`${defaultFontSize}`}
            type="number"
            value={fontSize}
            onChange={(e) => setFontSize(parseInt(e.target.value))}
          />
          <Select
            aria-label="font"
            options={fonts as any}
            onChange={(e) => setFont(e.target.value as Font)}
            value={font}
          />
        </Box>
        <Checkbox label="Bold" checked={bold} toggle={setBold} />
        <Checkbox label="Italics" checked={italics} toggle={setItalics} />
        <ui.h3>Background Color</ui.h3>
        <ColorInput color={bgColor} setColor={setBgColor} />
        <ui.h3>Text Color</ui.h3>
        <ColorInput color={textColor} setColor={setTextColor} />
      </Box>
      <Box vfx={{ axis: "y" }} className="image-section">
        <Box vfx={{ border: true, overflow: "hidden" }}>
          <Box
            ref={textContainerRef}
            vfx={{
              axis: "x",
              align: "center",
              justify: "center",
              padding: "l",
              textAlign: "center",
              fontWeight: bold ? 7 : undefined,
              italics: italics ? true : undefined,
            }}
            style={{
              backgroundColor: `#${bgColor || "fff"}`,
              color: `#${textColor || "000"}`,
              fontFamily: font !== "System" ? font : undefined,
              whiteSpace: "pre-line",
              width: size,
              height: size,
              fontSize: renderableFontSize,
            }}
          >
            {text}
          </Box>
        </Box>
        <Button
          vfx={{ width: "fit", marginTop: "s" }}
          onClick={() => download(1024)}
        >
          Download
        </Button>
      </Box>
    </Box>
  );
}

type Props = {
  color: string;
  setColor: (color: string) => void;
};

const hexColorRegex = /^([A-Fa-f0-9]{0,6})$/;

function ColorInput({ color, setColor }: Props) {
  return (
    <IconInput
      startIcon={
        <ui.span vfx={{ fontWeight: 7 }} style={{ color: "#777" }}>
          #
        </ui.span>
      }
      vfx={{ width: "full", gap: "xs", paddingLeft: "s" }}
      inputProps={{
        value: color,
        onChange: (e) => {
          const color = e.target.value;
          if (!color || hexColorRegex.test(color)) setColor(e.target.value);
        },
        maxLength: 6,
      }}
    />
  );
}

type CheckboxProps = {
  checked: boolean;
  toggle: (checked: boolean) => void;
  label: string;
};
function Checkbox({ checked, toggle, label }: CheckboxProps) {
  return (
    <Box vfx={{ axis: "x", align: "center", gap: "s", marginY: "xs" }}>
      <ui.span vfx={{ fontSize: "s", fontWeight: 5 }}>{label}</ui.span>
      <ui.input
        checked={checked}
        type="checkbox"
        onChange={(e) => toggle(e.target.checked)}
      />
    </Box>
  );
}
