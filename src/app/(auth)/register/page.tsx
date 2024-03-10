import { RegisterBreadcrumb } from '../breadcrumb';
import { RegisterForm } from './register-form';

export default function Page() {
  return (
    <div className="mx-auto flex h-[80vh] w-fit flex-col items-center justify-center space-y-5 self-center align-middle">
      <div className="flex flex-col">
        <RegisterBreadcrumb />
        <RegisterForm />
      </div>
    </div>
  );
}
