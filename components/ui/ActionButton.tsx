import { Button } from "./button";

type ActionButtonProps = {
  onClick: () => void;
  className?: string;
  variant?: 'default' | 'destructive';
  icon?: React.ReactNode;
  children: React.ReactNode;
};

const ActionButton = ({
  onClick,
  className,
  variant = 'default',
  icon,
  children,
}: ActionButtonProps) => (
  <Button onClick={onClick} className={className} variant={variant}>
    {icon}
    {children}
  </Button>
);

export default ActionButton;