
import { useEffect } from "react";
import reactDom from "react-dom";

const MyModel=({closeModel,children})=>{
    
    useEffect(() => {
        document.body.style.overflowY = "hidden"
            return(()=>{
        document.body.style.overflowY = "auto"
            })
           }, []);

    return reactDom.createPortal (
        <div>
            
            {/* model */}
            <div className="fixed top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] z-20 bg-white p-2 rounded-lg">

            {children}
           
            </div>
            
            {/* background blur */}
            <div className="backdrop-blur-sm bg-black/40  fixed top-0 right-0 left-0 bottom-0 z-10" onClick={closeModel}></div>
        </div>,document.querySelector(".domModel")
    )
}

export default MyModel;