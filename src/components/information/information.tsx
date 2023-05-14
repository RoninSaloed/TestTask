import { InformationProps } from "./information.props"
import './information.css';
import React, { useEffect, useState } from "react";
import { Link } from "react-scroll"

export const Information = ({ }: InformationProps): JSX.Element => {
    return (
        <div className="information">
            <div className="informationBody">
                <div className="informationTitle">Test assignment for front-end developer</div>
                <div className="informationSubtitle">What defines a good front-end developer is one that has skilled knowledge of HTML, CSS, JS with a vast understanding of User design thinking as they'll be building web interfaces with accessibility in mind. They should also be excited to learn, as the world of Front-End Development keeps evolving.</div>

                <Link to="form" spy={true} smooth={true} offset={50} duration={500} >
                    <button className="informationButton">Sign up</button>
                </Link>
            </div>
        </div>
    )
}
export default Information