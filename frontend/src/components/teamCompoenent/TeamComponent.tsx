
interface TeamProps {
 team : {
  title : String,
  description : String,
  admin : {
    email : String,
  },

 }
}
const TeamComponent: React.FC<TeamProps> = ({ team }) => {
  return (
    <div className="team">
      <div className="team-header">{team?.title}</div>
      <div className="flex flex-col gap-4 h-full justify-evenly">
        <div className="team-description">{team?.description}</div>
        <div className="team-footer flex justify-between">
          {team?.admin?.email === localStorage.getItem("userEmail") && (
            <div className="admin-indicator">Admin</div>
          )}
          <div className="team-members-indicator team-footer flex justify-between gap-1 align-middle">
            <div>Invite</div>
            <div>images</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeamComponent;
