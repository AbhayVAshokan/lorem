import clsx from "clsx";

interface ButtonProps {
  style?: "primary" | "secondary";
  children: React.ReactNode;
}

const Button = ({
  children,
  style = "primary",
  ...otherProps
}: ButtonProps & React.ButtonHTMLAttributes<HTMLButtonElement>) => {
  return (
    <button
      className={clsx("rounded-lg py-2 px-4 text-sm", {
        "bg-primary hover:bg-primary/90": style == "primary",
        "bg-secondary hover:bg-secondary/90": style === "secondary",
      })}
      {...otherProps}
    >
      {children}
    </button>
  );
};

export default Button;
