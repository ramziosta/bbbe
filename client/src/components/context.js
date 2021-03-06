import React, {createContext} from "react";

export const UserContext = createContext(null);
export const dataContext = createContext({})

export default function Card(props) {
  function classes() {
    const bg = props.bgcolor ? " bg-" + props.bgcolor : " ";
    const txt = props.txtcolor ? " text-" + props.txtcolor : " text-white";
    return "card mx-auto border-0" + bg + txt;
  }

  return (
    <div className={classes()} style={props.style}>
      <div>
        {props.header && <h3 className="card-header fs-3">{props.header}</h3>}
      </div>
      <div className="card-body">
        {props.title && <h4 className="card-title">{props.title}</h4>}
        {props.text && <p className="card-text">{props.text}</p>}
        {props.body}
        {props.status && <div id="createStatus">{props.status}</div>}
      </div>
    </div>
  );
}
