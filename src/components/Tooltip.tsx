import { Tooltip as UiTooltip } from "@adamjanicki/ui-extended";

type Props = {
  content: JSX.Element | string;
  children: JSX.Element;
  className?: string;
};

export default function Tooltip({ content, children, className }: Props) {
  return (
    <UiTooltip
      placement="bottom"
      tooltipContent={
        <div
          className="pa2 f5 fw5 br3 bg-white ba bade"
          style={{ borderColor: "#ddd" }}
        >
          {content}
        </div>
      }
    >
      <div className={className}>{children}</div>
    </UiTooltip>
  );
}
