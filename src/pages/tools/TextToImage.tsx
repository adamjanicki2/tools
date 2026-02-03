import {
  Box,
  Button,
  Icon,
  IconInput,
  Input,
  Select,
  TextArea,
  ui,
} from "@adamjanicki/ui";
import { vista } from "@adamjanicki/ui/icons";
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
const backgroundFitOptions = [
  "cover",
  "contain",
  "fill",
  "scale-down",
] as const;
type BackgroundFit = (typeof backgroundFitOptions)[number];
const backgroundPositionOptions = [
  "center",
  "top",
  "bottom",
  "left",
  "right",
  "top left",
  "top center",
  "top right",
  "center left",
  "center right",
  "bottom left",
  "bottom center",
  "bottom right",
] as const;
type BackgroundPosition = (typeof backgroundPositionOptions)[number];

type BackgroundMode = "color" | "image";

export default function TextToImage() {
  const [font, setFont] = useState<Font>("System");
  const [fontSize, setFontSize] = useState(defaultFontSize);
  const [backgroundMode, setBackgroundMode] = useState<BackgroundMode>("color");
  const [backgroundColor, setBackgroundColor] = useState("ffffff");
  const [backgroundImage, setBackgroundImage] = useState("");
  const [backgroundFit, setBackgroundFit] = useState<BackgroundFit>("cover");
  const [backgroundPosition, setBackgroundPosition] =
    useState<BackgroundPosition>("center");
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

  let boxStyle: React.CSSProperties = {
    color: `#${textColor || "000"}`,
    fontFamily: font !== "System" ? font : undefined,
    whiteSpace: "pre-line",
    width: size,
    height: size,
    fontSize: renderableFontSize,
    backgroundRepeat: "no-repeat",
  };

  if (backgroundMode === "image" && backgroundImage) {
    boxStyle = {
      ...boxStyle,
      backgroundImage: `url(${backgroundImage})`,
      backgroundSize: backgroundFit,
      backgroundPosition,
    };
  } else {
    const color = getBackgroundColor(backgroundColor);
    boxStyle.backgroundColor = `#${color}`;
  }

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
      <Box vfx={{ axis: "y", gap: "s" }} className="image-section">
        <ui.h3 vfx={{ marginY: "s" }}>Text</ui.h3>
        <TextArea
          rows={3}
          value={text}
          onChange={(e) => setText(e.target.value)}
          vfx={{ width: "full" }}
        />
        <ui.h3 vfx={{ marginY: "s" }}>Font</ui.h3>
        <Box vfx={{ axis: "x", align: "center", gap: "s" }}>
          <Input
            style={{ width: "8ch" }}
            max={max}
            min={min}
            placeholder={`${defaultFontSize}`}
            type="number"
            value={fontSize}
            onChange={(e) => {
              const next = parseInt(e.target.value, 10);
              setFontSize(Number.isNaN(next) ? min : next);
            }}
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
        <ui.h3 vfx={{ marginY: "s" }}>Text Color</ui.h3>
        <ColorInput value={textColor} setValue={setTextColor} />
        <ui.h3 vfx={{ marginY: "s" }}>Background</ui.h3>
        <Select
          options={["color", "image"]}
          getOptionLabel={(option) => (option === "color" ? "Color" : "Image")}
          onChange={(e) => setBackgroundMode(e.target.value as BackgroundMode)}
          value={backgroundMode}
          vfx={{ width: "full" }}
        />
        {backgroundMode === "color" ? (
          <ColorInput value={backgroundColor} setValue={setBackgroundColor} />
        ) : (
          <Box vfx={{ axis: "y", gap: "s" }}>
            <UploadInput onUpload={(dataUrl) => setBackgroundImage(dataUrl)} />
            <BackgroundImageOptions
              fit={backgroundFit}
              setFit={setBackgroundFit}
              position={backgroundPosition}
              setPosition={setBackgroundPosition}
            />
          </Box>
        )}
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
            style={boxStyle}
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
  value: string;
  setValue: (value: string) => void;
};

type SelectProps<T extends string> = {
  value: T;
  setValue: (value: T) => void;
  options: readonly T[];
  label: string;
};

function LabeledSelect<T extends string>({
  value,
  setValue,
  options,
  label,
}: SelectProps<T>) {
  return (
    <Box vfx={{ axis: "x", align: "center", gap: "s", justify: "between" }}>
      <ui.span style={{ width: "8ch" }} vfx={{ fontSize: "s", fontWeight: 5 }}>
        {label}
      </ui.span>
      <Select
        aria-label={label}
        options={options as unknown as string[]}
        onChange={(e) => setValue(e.target.value as T)}
        value={value}
        vfx={{ stretch: "grow" }}
      />
    </Box>
  );
}

const hexColorRegex = /^([A-Fa-f0-9]{0,6})$/;
const fullHexColorRegex = /^([A-Fa-f0-9]{3}|[A-Fa-f0-9]{6})$/;

function ColorInput({ value: color, setValue: setColor }: Props) {
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

type BackgroundImageOptionsProps = {
  fit: BackgroundFit;
  setFit: (value: BackgroundFit) => void;
  position: BackgroundPosition;
  setPosition: (value: BackgroundPosition) => void;
};

function BackgroundImageOptions({
  fit,
  setFit,
  position,
  setPosition,
}: BackgroundImageOptionsProps) {
  return (
    <Box vfx={{ axis: "y", gap: "s" }}>
      <LabeledSelect
        label="Fit"
        value={fit}
        setValue={setFit}
        options={backgroundFitOptions}
      />
      <LabeledSelect
        label="Position"
        value={position}
        setValue={setPosition}
        options={backgroundPositionOptions}
      />
    </Box>
  );
}

function getBackgroundColor(value: string) {
  const trimmed = value.trim();
  if (fullHexColorRegex.test(trimmed)) return trimmed;
  return "fff";
}

type CheckboxProps = {
  checked: boolean;
  toggle: (checked: boolean) => void;
  label: string;
};
function Checkbox({ checked, toggle, label }: CheckboxProps) {
  return (
    <Box vfx={{ axis: "x", align: "center", gap: "s", marginY: "xs" }}>
      <ui.span style={{ width: "8ch" }} vfx={{ fontSize: "s", fontWeight: 5 }}>
        {label}
      </ui.span>
      <ui.input
        checked={checked}
        type="checkbox"
        onChange={(e) => toggle(e.target.checked)}
      />
    </Box>
  );
}

function UploadInput({ onUpload }: { onUpload: (dataUrl: string) => void }) {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      const result = reader.result;
      if (typeof result === "string") {
        onUpload(result);
      } else {
      }
    };
    reader.onerror = () => {};
    reader.readAsDataURL(file);
  };

  return (
    <>
      <Box vfx={{ axis: "x", gap: "s" }}>
        <Button
          vfx={{ axis: "x", align: "center", gap: "s" }}
          onClick={() => inputRef.current?.click()}
          variant="secondary"
        >
          <Icon icon={vista} /> Upload image
        </Button>
      </Box>
      <Input
        ref={inputRef}
        type="file"
        accept="image/*"
        onChange={handleChange}
        style={{ display: "none" }}
      />
    </>
  );
}
