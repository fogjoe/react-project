import React from "react";

export function AppMenuControls(props: React.PropsWithChildren) {
  return <span className="ui-menu-controls ml-auto hidden items-center whitespace-normal">
    {props.children}
  </span>
}