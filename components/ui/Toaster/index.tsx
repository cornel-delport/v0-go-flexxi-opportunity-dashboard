import { Toaster as RadixToaster } from "@radix-ui/react-toast";
import { useToaster } from "@/hooks/useToaster";

const Toaster = () => {
  const { toasts } = useToaster();

  return (
    <RadixToaster>
      {toasts.map(function ({ id, title, description, action, ...props }) {
        return (
          <Toast key={id} {...props}>
            <div className="grid gap-1">
              {title && <ToastTitle>{title}</ToastTitle>}
              {description && <ToastDescription>{description}</ToastDescription>}
            </div>
            {action}
            <ToastClose />
          </Toast>
        );
      })}
      <ToastViewport />
    </RadixToaster>
  );
};

export { Toaster };
