import React from "react";
import parse from "html-react-parser";

interface RadioBoxProps extends React.InputHTMLAttributes<HTMLInputElement> {
	labelKey: string | React.ReactElement;
	description : string;
	wrapperClassName: string;
}
export const RadioBox = React.forwardRef<HTMLInputElement, RadioBoxProps>(
	({ labelKey, description, wrapperClassName, ...rest }, ref) => {
		return (
			<label className={`group text-heading text-sm cursor-pointer ${wrapperClassName}`}>
				<input
					type="radio"
					className="form-radio w-5 h-5 border border-gray-300 text-heading rounded-full cursor-pointer transition duration-500 ease-in-out focus:ring-offset-0 hover:border-heading focus:outline-none focus:ring-0 focus-visible:outline-none checked:bg-heading"
					ref={ref}
					{...rest}
				/>
				<span className="ms-2 inline-block text-lg text-heading relative">
					{labelKey}
				</span>
				{description && <div className="lg:ms-7 mt-1 text-sm text-heading relative">{parse(description)}</div>}
			</label>
		);
	}
);

RadioBox.displayName = 'RadioBox'