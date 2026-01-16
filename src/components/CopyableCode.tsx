import { classNames, Tooltip } from "@adamjanicki/ui";
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
        <code
          role="button"
          onClick={copy}
          className={classNames(
            "br2",
            className,
            copied ? "bg-light-green" : "bg-near-white"
          )}
          style={{
            cursor: "copy",
            transition: "all 0.25s ease-out",
            padding: 1,
          }}
        >
          {children}
        </code>
      }
      className="flex w-fc"
    >
      {copied ? "Copied!" : "Copy"}
    </Tooltip>
  );
}
