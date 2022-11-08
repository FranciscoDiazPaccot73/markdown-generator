import dynamic from "next/dynamic";
import MarkdownHeader from "./MarkdownHeader";

const JsonHeader = dynamic(() => import("./JsonHeader"));

const DocumentHeader = ({ type = 'markdown', ...props }) => {
  if (type === 'json') return <JsonHeader {...props} />

  return <MarkdownHeader {...props} />
}

export default DocumentHeader;
