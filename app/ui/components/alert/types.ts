export type AlertType = 'info' | 'warning' | 'error' | 'success';

export type AlertProps = {
  type?: AlertType;
  children: React.ReactNode;
  className?: string;
};

