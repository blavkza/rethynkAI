import ReactMarkdown from "react-markdown";

function MarkdownRenderer({ content }) {
  return (
    <div className="markdown-body">
      <ReactMarkdown>{content}</ReactMarkdown>
    </div>
  );
}

export default MarkdownRenderer;
