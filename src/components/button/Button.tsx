import { ComponentProps } from "react";
import s from "./button.module.scss";

type Props = ComponentProps<'button'>;

export const Button = (props: Props) => {
	const { children, onClick, className = '', ...rest } = props;
	return (
		<button className={`${s.button} ${className}`} onClick={onClick} {...rest}>
			{children}
		</button>
	);
};
