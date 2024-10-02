import { CheckCircle2, TriangleAlert } from "lucide-react";

interface FormErrorProps {
  message?: string;
}

const FormError = ({ message }: FormErrorProps) => {
  if (!message) return null;
  return (
    <div className="border border-transparent bg-danger/15 w-full text-danger rounded-md flex items-center justify-center gap-3 p-4">
      <TriangleAlert size={25} className="w-5 h-5 text-danger shrink-0" />

      <span className="text-sm">{message}</span>
    </div>
  );
};

const FormSuccess = ({ message }: FormErrorProps) => {
  if (!message) return null;
  return (
    <div className="border border-transparent backdrop-blur-sm bg-success/15 w-full rounded-md text-success flex items-center justify-center gap-3  p-4">
      <CheckCircle2 size={25} className="w-5 h-5 text-success shrink-0" />

      <span className="text-sm">{message}</span>
    </div>
  );
};

export { FormError, FormSuccess };
