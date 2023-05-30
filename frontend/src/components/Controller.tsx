import { useState } from "react";
import { Title } from "./Title";

export const Controllers = () => {
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState<any[]>([]);

//   const createUrl = (data: any) => {};

//   const handleStop = async () => {};

  return (
    <div className="h-screen overflow-y-hidden">
      <Title setMessages={setMessages} />
      <div className="flex flex-col justify-between h-full overflow-y">
        PlaceHolder
      </div>
    </div>
  );
};
