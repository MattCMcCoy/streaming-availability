import { RegisterBreadcrumb } from '../Breadcrumb';
import { RegisterForm } from './RegisterForm';

export default function Register() {
  return (
    <div className="mx-auto flex h-[80vh] w-fit flex-col items-center justify-center space-y-5 self-center align-middle">
      <div className="flex flex-col">
        <RegisterBreadcrumb />
        <RegisterForm />
      </div>
    </div>
  );
}
