import React from 'react';

export default function ModuleBox(props) {
  const moduleCode = props.moduleCode;

  return (
    <div>
      <p>{moduleCode}</p>
    </div>
  );
}
