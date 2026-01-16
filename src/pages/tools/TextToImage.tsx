import { Button, IconInput, Input, Select, TextArea } from "@adamjanicki/ui";
import { classNames } from "@adamjanicki/ui/functions";
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
    <div className="flex flex-wrap justify-center items-center w-100">
      <div className="flex flex-column image-section">
        <h3>Text</h3>
        <TextArea
          rows={3}
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="bg-white"
        />
        <h3>Font</h3>
        <div className="flex items-center">
          <Input
            className="bg-white mr2"
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
            className="bg-white mr2"
          />
        </div>
        <Checkbox label="Bold" checked={bold} toggle={setBold} />
        <Checkbox label="Italics" checked={italics} toggle={setItalics} />
        <h3>Background Color</h3>
        <ColorInput color={bgColor} setColor={setBgColor} />
        <h3>Text Color</h3>
        <ColorInput color={textColor} setColor={setTextColor} />
      </div>
      <div className="flex flex-column image-section">
        <div className="ba b--moon-gray" style={{ overflow: "hidden" }}>
          <div
            ref={textContainerRef}
            style={{
              backgroundColor: `#${bgColor || "fff"}`,
              color: `#${textColor || "000"}`,
              fontFamily: `${font !== "System" ? font + ", " : ""}-apple-system, BlinkMacSystemFont, "Helvetica Neue", sans-serif`,
              whiteSpace: "pre-line",
              width: size,
              height: size,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              fontSize: renderableFontSize,
            }}
            className={classNames(
              "pa4 tc",
              bold ? "b" : "",
              italics ? "i" : ""
            )}
          >
            {text}
          </div>
        </div>
        <Button className="w-fc mt2" onClick={() => download(1024)}>
          Download
        </Button>
      </div>
    </div>
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
        <span style={{ color: "#777" }} className="b ml2">
          #
        </span>
      }
      className="bg-white"
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
    <div className="flex items-center mv1">
      <span className="f5 fw5 mr2">{label}</span>
      <input
        checked={checked}
        type="checkbox"
        onChange={(e) => toggle(e.target.checked)}
      />
    </div>
  );
}
