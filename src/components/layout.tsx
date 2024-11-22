import { History } from './history';

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex w-full">
      <div className="min-w-[250px] max-w-[300px] flex-[1]">
        <History />
      </div>
      <div className="flex-[4]">{children}</div>
      {/* <div className='flex-[1] min-w-[250px] max-w-[300px]'>
            <Chapters/>
        </div> */}
    </div>
  );
}
