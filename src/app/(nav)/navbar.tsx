import { AuthShowcase } from '../(auth)/showcase';
import { Logo } from './logo';

export async function Nav() {
  return (
    <div>
      <div className="mt-5 flex flex-row">
        <div className="ml-5">
          <Logo />
        </div>
        <div className="ml-auto mr-5">
          <AuthShowcase />
        </div>
      </div>
    </div>
  );
}
