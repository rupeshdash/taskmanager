import CustomAvatar from "../designConstants/CustomAvatar";

type Props = {
  key: number;
  sender: {
    name: string;
    profileImage: string;
  };
  message: string;
  timestamp: string;
};

const SenderChat = ({key , sender, message, timestamp}: Props) => {
    console.log(key, sender, message, timestamp);
    
  return (
    <div className="flex items-center flex-row-reverse">
      {/* <div>
            <CustomAvatar src={sender?.profileImage} alt={sender?.name}/>
        </div> */}
      <div className="text-right">
        <div className="bg-primary-purple p-4 rounded-[10px] text-bg-white">
          {message}
        </div>
        <small className="text-[#768396] text-sm">{timestamp}</small>
      </div>
    </div>
  );
}

export default SenderChat