import React from "react"

const IconBtn = ({text,onClick,children,disabled,outline,type ,className=""}) => {
    
  return (
     
    <button 
    outline={outline}
    disabled={disabled}
    onClick={onClick}
    type={type}
    className={`flex items-end gap-2 ${className}`}
    >
        {
            children? 
             <> 
             <span className="">
                {text}
             </span>
             {children}
             </>
            
              :<span>{text}</span>
        }
    </button>
    
  )
}

export default IconBtn