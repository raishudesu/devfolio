import MDEditor from "@uiw/react-md-editor";
import { GeistSans } from "geist/font/sans";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import remarkGfm from "remark-gfm";

const Prompt = ({ response }: { response: string | undefined }) => {
  const { theme } = useTheme();
  const [markdownTheme, setMarkdownTheme] = useState({
    background: "",
  });

  useEffect(() => {
    if (theme === "light") {
      setMarkdownTheme({ background: "#fafafa" });
    } else {
      setMarkdownTheme({ background: "#18181b" });
    }
  }, [theme]);

  return (
    <div data-color-mode={theme} className="w-full">
      <MDEditor.Markdown
        source={response}
        remarkPlugins={[remarkGfm]}
        className={`${GeistSans.className}`}
        style={{
          backgroundColor: markdownTheme.background,
          width: "100%",
        }}
      />
    </div>
  );
};

export default Prompt;
