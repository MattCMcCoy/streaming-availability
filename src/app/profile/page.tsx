import { Nav } from '../(nav)/navbar';
import { EditProfile } from './edit-profile';
import { LeftNav } from './left-nav';

export default function Page() {
  return (
    <div>
      <Nav />
      <div className="mt-5 flex flex-row">
        <LeftNav />
        <div className="">
          <div className="mx-auto flex w-[60vw] flex-col border-b border-streaminggold text-3xl font-bold text-white">
            <h1>Profile</h1>
          </div>
          <EditProfile />
        </div>
      </div>
    </div>
  );
}
