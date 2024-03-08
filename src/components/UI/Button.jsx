
const Button = ({ children, textOnly, className, ...props }) => {
    let cssClasses = textOnly ? `text-button ${className}` : 'button';
    return (
        <button className={cssClasses} {...props}>
            {children}
        </button>
    );
};

export default Button;