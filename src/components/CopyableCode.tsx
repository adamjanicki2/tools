import { classNames } from "@adamjanicki/ui/functions";
import { useState } from "react";
import Tooltip from "src/components/Tooltip";

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
    <Tooltip className="flex w-fc" content={copied ? "Copied!" : "Copy"}>
      <code
        role="button"
        onClick={copy}
        className={classNames(
          "br2",
          className,
          copied ? "bg-light-green" : "bg-near-white"
        )}
        style={{ cursor: "copy", transition: "all 0.3s ease-out", padding: 1 }}
      >
        {children}
      </code>
    </Tooltip>
  );
}
