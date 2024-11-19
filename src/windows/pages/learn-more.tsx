import { useNavigate } from "react-router-dom"

const LearnMore = () => {
    const router = useNavigate()
  
    const goBack = () => {
        router(-1)
    }
  
  return (
    <div>
        <button onClick={goBack} className='round-btn bg-whiteTrans3 hover-active'>Go Back</button>
        <p className='text-white'>This is the page where we learn more about how to use this Software</p>
    </div>
  )
  }
  

  export default LearnMore;