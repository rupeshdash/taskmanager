import { Tasksheet } from './Tasksheet'

const Addtask = () => {
  return (
      <div className='mx-auto flex justify-between items-center p-5 rounded-md bg-white '>
        <div className='font-medium text-[#232360] md:text-lg'>Backlog</div>
      <Tasksheet/>
      </div>
  )
}

export default Addtask