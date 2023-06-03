import { ReactMediaRecorder } from "react-media-recorder";
import RecordIcon from "./RecordIcon";

type Props = {
  handleStop: ((blobUrl: string, blob: Blob) => void);
};

const RecordMessage = ({ handleStop }: Props) => {
  return (
    <div>
      <ReactMediaRecorder
        audio
        onStop={handleStop}
        render={({ status, startRecording, stopRecording }) => (
          <div className="mt-2">
            <button
              onMouseDown={startRecording}
              onMouseUp={stopRecording}
              className="bg-white rounded-full p-4"
            >
              <RecordIcon
                classText={
                  status === "recording"
                    ? "animate-pulse text-red-500"
                    : "text-sky-500"
                }
              />
            </button>
            <p className="mt-2 text-white font-light">{status}</p>
          </div>
        )}
      />
    </div>
  );
};
export default RecordMessage;
