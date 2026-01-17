import {
  Box,
  Button,
  Icon,
  IconInput,
  Input,
  Select,
  TextArea,
  Tooltip,
  ui,
} from "@adamjanicki/ui";
import { infoSquare, vista } from "@adamjanicki/ui/icons";
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
  "none",
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

export default function TextToImage() {
  const [font, setFont] = useState<Font>("System");
  const [fontSize, setFontSize] = useState(defaultFontSize);
  const [background, setBackground] = useState("ffffff");
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

  let icon: React.ReactNode = "#";

  const { src, color } = getBackgroundInfo(background);
  if (src) {
    boxStyle = {
      ...boxStyle,
      backgroundImage: `url(${src})`,
      backgroundSize: backgroundFit,
      backgroundPosition,
    };
    icon = <Icon icon={vista} />;
  } else {
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
        <ui.h3 vfx={{ marginY: "s" }}>Text Color</ui.h3>
        <ColorInput value={textColor} setValue={setTextColor} />
        <ui.h3 vfx={{ axis: "x", align: "center", gap: "s", marginY: "s" }}>
          Background
          <Tooltip
            anchor={<Icon icon={infoSquare} vfx={{ color: "muted" }} />}
            vfx={{ fontSize: "default", fontWeight: 5 }}
          >
            Can be either an image URL, or hex color
          </Tooltip>
        </ui.h3>
        <IconInput
          startIcon={
            <Box vfx={{ axis: "x", align: "center", color: "muted" }}>
              {icon}
            </Box>
          }
          vfx={{ width: "full", gap: "xs", paddingLeft: "s" }}
          inputProps={{
            value: background,
            onChange: (e) => setBackground(e.target.value),
          }}
        />
        <BackgroundImageOptions
          hasImage={Boolean(src)}
          fit={backgroundFit}
          setFit={setBackgroundFit}
          position={backgroundPosition}
          setPosition={setBackgroundPosition}
        />
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
  hasImage: boolean;
  fit: BackgroundFit;
  setFit: (value: BackgroundFit) => void;
  position: BackgroundPosition;
  setPosition: (value: BackgroundPosition) => void;
};

function BackgroundImageOptions({
  hasImage,
  fit,
  setFit,
  position,
  setPosition,
}: BackgroundImageOptionsProps) {
  if (!hasImage) return null;

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

const urlRegex =
  /^(https?:\/\/)?([a-zA-Z\d-]+\.)+[a-zA-Z]{2,}(\/[\w\d\-._~:/?#[\]@!$&'()*+,;=%]*)?$/i;

function getBackgroundInfo(background: string) {
  if (urlRegex.test(background)) return { src: background };
  if (hexColorRegex.test(background)) return { color: background };
  return { color: "fff" };
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
