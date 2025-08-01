import React from "react"

const IconBtn = ({text,onClick,children,disabled,outline,type ,className=""}) => {
    
  return (
     
    <button 
  outline={outline}
  disabled={disabled}
  onClick={onClick}
  type={type}
  className={`  ${className}`}
>
  {
    children ? (
      <> 
        <span className="text-center xs:text-left">
          {text}
        </span>
        {children}
      </>
    ) : (
      <span className="text-center xs:text-left">{text}</span>
    )
  }
</button>

    
  )
}

export default IconBtn