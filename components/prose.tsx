import parse from "html-react-parser";
import type { FunctionComponent } from "react";

interface TextProps {
  html: string;
  className?: string;
}

const Prose: FunctionComponent<TextProps> = ({ html, className }) => {

  return (
    <div className={className}>
      {parse(html)}
    </div>
  );
};

export default Prose;
