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

const RecieverChat = ({ key, sender, message, timestamp }: Props) => {
  return (
    <div className="flex text-left items-center gap-8">
      <div>
        <CustomAvatar src={sender?.profileImage} alt={sender?.name} />
      </div>
      <div>
        <div className="bg-[#cdcdcd80] p-4 rounded-[10px]">{message}</div>
        <small className="text-[#768396] text-sm">{timestamp}</small>
      </div>
    </div>
  );
};

export default RecieverChat