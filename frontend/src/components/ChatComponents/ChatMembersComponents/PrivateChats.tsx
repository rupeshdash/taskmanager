import MemberChat from "./MemberChat";

const PrivateChats = () => {
  return (
    <section className="border-b-2 p-4 min-h-[max-content] max-h-[40%] overflow-y-auto">
      <MemberChat />
      <MemberChat />
      <MemberChat />
      
    </section>
  );
}

export default PrivateChats