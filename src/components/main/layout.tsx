import History from "./history";

const Layout = ({children}: {children: React.ReactNode}) => {
    return (
      <div className='flex w-full'>
          {/* LEFT */}
          <div className='flex-[1] min-w-[250px] max-w-[300px]'>
              <History />
          </div>
  
  
          {/* MIDDLE */}
          <div className='flex-[4]'>
              { children }
          </div>
  
          {/* RIGHT */}
          {/* <div className='flex-[1] min-w-[250px] max-w-[300px]'>
              <Chapters/>
          </div> */}
      </div>
    )
  }


  export default Layout;