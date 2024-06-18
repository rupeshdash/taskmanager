const TeamComponent = () => {
  return (
    <div className="team">
      <div className="team-header">Team - 1</div>
      <div className="flex flex-col gap-4 h-full justify-evenly">
        <div className="team-description">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Libero error
          fuga asperiores cumque repellendus.
        </div>
        <div className="team-footer flex justify-between">
          <div className="admin-indicator">Admin</div>
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
