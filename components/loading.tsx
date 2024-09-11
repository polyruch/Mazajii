import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";

const Loading = () => {
  return (
    <div className="flex flex-col flex-1 justify-center items-center">
      <FontAwesomeIcon
        icon={faSpinner}
        className="text-slate-800 text-4xl animate-spin"
      />
    </div>
  );
};

export default Loading;
