import { classNames, Tooltip, ui } from "@adamjanicki/ui";
import { useState } from "react";

type Props = {
  children: string;
  className?: string;
};

export default function CopyableCode({ children, className }: Props) {
  const [copied, setCopied] = useState(false);
  const copy = () => {
    navigator.clipboard.writeText(children);
    setCopied(true);
    setTimeout(() => setCopied(false), 1000);
  };

  return (
    <Tooltip
      anchor={
        <ui.code
          role="button"
          onClick={copy}
          className={classNames(
            className,
            copied ? "aui-content-success" : undefined
          )}
          vfx={{
            radius: "subtle",
            padding: "xxs",
            backgroundColor: copied ? undefined : "muted",
          }}
          style={{
            cursor: "copy",
            transition: "all 0.25s ease-out",
          }}
        >
          {children}
        </ui.code>
      }
      vfx={{ axis: "x", width: "fit" }}
    >
      {copied ? "Copied!" : "Copy"}
    </Tooltip>
  );
}
