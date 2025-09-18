import { Loader2Icon } from "lucide-react";
import { Button, buttonVariants } from "../ui/button";
import { ReactNode } from "react";
import { VariantProps } from "class-variance-authority";

type ButtonProps = React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
  };

interface LoadingButtonProps extends ButtonProps {
  loading: boolean;
  children: ReactNode;
}

export const LoadingButton = (props: LoadingButtonProps) => {
  const { loading, children } = props;
  return (
    <Button {...props} disabled={loading}>
      {loading && <Loader2Icon className="animate-spin" />}
      {children}
    </Button>
  );
};

export default LoadingButton;
