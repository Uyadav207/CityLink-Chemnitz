import React from "react";
import { faArrowAltCircleRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Logout: React.FC = () => {
    return (
        <div className="bg-transparent text-bold text-black-500 p-2 mt-20 w-full border-t flex justify-between">
            <p className="text-lg">Logout</p> <span><FontAwesomeIcon icon={faArrowAltCircleRight} /></span>
        </div>
    );
}

export default Logout;