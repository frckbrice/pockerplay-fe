import React from "react";
import CopyToClipboard from "react-copy-to-clipboard";

type Props = {
  gameUrl: string;
  handleCopy: () => void;
  image: string;
};

const Copy = ({ gameUrl, handleCopy, image }: Props) => {
  return (
    <div className={image ? "hidden" : "block"}>
      <CopyToClipboard text={gameUrl} onCopy={handleCopy}>
        <button
          // onClick={handleCopy}
          className="flex gap-1  items-center p-2  text-green-600"
        >
          <span className="text-green-600">
            {gameUrl ? gameUrl : "link to share"}
          </span>
        </button>
      </CopyToClipboard>
    </div>
  );
};

export default Copy;
