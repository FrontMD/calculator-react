import './Button.scss'

export default function Button({ children, type, classes, ...props }) {
    return (
      <button type={type} className={classes} {...props}>{children}</button> 
    )
}