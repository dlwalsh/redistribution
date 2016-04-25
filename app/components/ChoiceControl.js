import React from 'react';
import Select from 'react-select';

export default function ChoiceControl({
  options = [],
  value = 1,
  onSelect,
}) {
  return (
    <div className="choice">
      <Select
        options={options}
        value={value}
        onChange={onSelect}
        placeholder="Select electorate"
        matchPos="start"
        matchProp="label"
      />
    </div>
  );
}
