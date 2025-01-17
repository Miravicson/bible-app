import { History } from './History';

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex w-full">
      {/* LEFT */}
      <div className="min-w-[250px] max-w-[300px] flex-[1]">
        <History />
      </div>

      {/* MIDDLE */}
      <div className="flex-[4]">{children}</div>

      {/* RIGHT */}
      {/* <div className='flex-[1] min-w-[250px] max-w-[300px]'>
            <Chapters/>
        </div> */}
    </div>
  );
}
