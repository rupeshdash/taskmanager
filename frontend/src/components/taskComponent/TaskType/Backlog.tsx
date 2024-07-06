import Addtask from '../Addtask'
import { Task } from '../Task'

const Backlog = () => {
  return (
    <div className='w-full space-y-8'>
      <Addtask/>
      <div className=' space-y-5'>
        <Task/>
        <Task/>
        <Task/>
      </div>
    </div>
  )
}

export default Backlog