import { BsType, BsCheck, BsInputCursor, BsX } from "react-icons/bs";

export const GameInfo = ({ length, tryCount, correct, wrong }) => (
  <div className="flex flex-row space-x-2 justify-center">
    <div className="justify-center">
      <BsType
        style={{ color: "black", fontSize: "45px" }}
        title="Word length"
      />
      <p className="text-center">{length}</p>
    </div>
    <div className="justify-center">
      <BsInputCursor
        style={{ color: "black", fontSize: "45px" }}
        title="Number of try"
      />
      <p className="text-center">{tryCount}</p>
    </div>
    <div className="justify-center">
      <BsCheck
        style={{ color: "blue", fontSize: "45px" }}
        title="Number of correct characters"
      />
      <p className="text-center">{correct}</p>
    </div>

    <div className="justify-center">
      <BsX
        style={{ color: "red", fontSize: "45px" }}
        title="Number of wrong characters"
      />
      <p className="text-center">{wrong}</p>
    </div>
  </div>
);
