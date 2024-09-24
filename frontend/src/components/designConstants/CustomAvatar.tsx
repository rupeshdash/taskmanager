
interface AvatarProps {
  src: string; // URL of the avatar image
  alt: string; // Alternative text for the image
  size?: string; // Size of the avatar (default to 40px if not provided)
}

const CustomAvatar: React.FC<AvatarProps> = ({ src, alt, size = "40px" }) => {
  return (
    <div
      className={`avatar rounded-full overflow-hidden flex items-center justify-center bg-gray-200 shadow-md transition-transform duration-300 ease-in-out hover:scale-105 hover:shadow-lg cursor-pointer`}
      style={{
        width: size,
        height: size,
      }}
    >
      <img src={src} alt={alt} className="w-full h-full object-cover" />
    </div>
  );
};

export default CustomAvatar;
