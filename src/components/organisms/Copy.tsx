import React from "react";
import CopyToClipboard from "react-copy-to-clipboard";

type Props = {
  gameUrl: string;
  handleCopy: () => void;
};

const Copy = ({ gameUrl, handleCopy }: Props) => {
  return (
    <section
      ref={(node) => {
        if (node) {
          node.addEventListener("click", () => {
            node.style.display = "none";
          });
        }
      }}
    >
      <CopyToClipboard text={gameUrl} onCopy={handleCopy}>
        <button
          onClick={handleCopy}
          className="flex gap-1  items-center p-2  text-green-600"
        >
          <span className="text-green-600">
            {gameUrl ? gameUrl : "link to share"}
          </span>
        </button>
      </CopyToClipboard>
    </section>
  );
};

export default Copy;
