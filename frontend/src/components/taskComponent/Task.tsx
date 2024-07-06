
export const Task = () => {
  return (
    <div className="mx-auto bg-white rounded-lg overflow-hidden p-4 space-y-5">
      <div className="">
        <div className="flex justify-between items-center mb-3">
          <p className="bg-red-500 text-white font-semibold rounded-md border border-opacity-75 px-5 py-2 text-xs">
            High
          </p>
        </div>
        <div className=' space-y-1'>
        <h2 className="text-base text-primary-blue font-medium mb">
          Listing deliverables checklist
        </h2>
        <p className="text-[#768396] text-sm">
          Create content for Peceland App
        </p>
        </div>
      </div>
      <div className=" flex justify-between items-center text-sm">
        <p className="text-primary-blue font-medium rounded-md border border-opacity-75 p-2">
          Sep 20, 2021
        </p>
        <div className="flex gap-2 items-center text-[#5A5A5A]">
          {/* <p className="font-medium">Assigned To</p> */}
        </div>
      </div>
    </div>
  );
};
