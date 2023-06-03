import { useState } from "react";
import { Title } from "./Title";
import RecordMessage from "./RecordMessage";
import axios from "axios";
import HelloAnimation from "./HelloAnimation";

export const Controllers = () => {
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState<any[]>([]);
  const [blob, setBlob] = useState("");

  const createUrl = (data: any) => {
    const blob = new Blob([data], { type: "audio/mpeg" });
    const url = window.URL.createObjectURL(blob);
    return url;
  };

  console.log("messages", messages);
  const handleStop = async (blobUrl: string) => {
    console.log("AAAAAAAAAAAAAAA");
    setLoading(true);

    const myMessage = { sender: "Me", blobUrl };
    const messageArr = [...messages, myMessage];

    fetch(blobUrl)
      .then((res) => res.blob())
      .then(async (blob) => {
        const formData = new FormData();
        formData.append("file", blob, "myFile.wav");

        await axios
          .post("http://localhost:8000/post-audio", formData, {
            headers: { "Content-Type": "audio/mpeg" },
          })
          .then(async (res) => {
            const rachelMessage = {
              sender: "Rachel",
              blobUrl: res.data.response,
            };
            messageArr.push(rachelMessage);
            setMessages(messageArr);
            setLoading(false);
          })

          .catch((err) => {
            console.log(err.message);
            setLoading(false);
          });
      });
  };

  return (
    <div className="h-screen overflow-y-hidden">
      <Title setMessages={setMessages} />
      <div className="flex flex-col justify-between h-full overflow-y-scroll">
        <div className="my-2 px-3">
          {messages.map((msg, index) => {
            return (
              <div
                key={index + msg.sender}
                className={
                  "flex flex-col " +
                  (msg.sender === "Rachel" && "flex items-end")
                }
              >
                <div className="mt-1">
                  <p
                    className={
                      "font-bold text-base " +
                      (msg.sender === "Rachel"
                        ? "text-right mr-1 italic text-green-600"
                        : "ml-1 italic text-blue-600")
                    }
                  >
                    {msg.sender}
                  </p>
                  {msg.sender === "Rachel" ? (
                    <p className="bg-gray-200 p-2 rounded-lg text-base">
                      {msg.blobUrl}
                    </p>
                  ) : (
                    <audio
                      src={msg.blobUrl}
                      className="appearance-none"
                      controls
                    />
                  )}
                </div>
              </div>
            );
          })}
          {messages.length == 0 && !loading && <HelloAnimation />}
        </div>
      </div>
      <div className="fixed bottom-0 w-full py-4 border-t text-center bg-gradient-to-r from-sky-500 to-green-400">
        <div className="flex justify-center items-center w-full">
          <RecordMessage handleStop={handleStop} />
        </div>
      </div>
    </div>
  );
};
