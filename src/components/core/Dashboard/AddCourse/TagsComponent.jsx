import React, { useState, useEffect } from 'react';
import { RxCross2 } from "react-icons/rx";
import { useSelector } from 'react-redux';
 
const TagsComponent = ({ label, name, placeholder, register, errors, setValue, getValues,watch }) => {
  const [tag, setTag] = useState("");

  // Get current list directly from react-hook-form
  const taglist = watch(name) || [];

  const handleAddRequirement = () => {
    if (tag.trim() !== "" && !taglist.includes(tag.trim())) {
      const updatedList = [...taglist, tag.trim()];
      setValue(name, updatedList); // update form value
      setTag("");
    }
  };

  const handleRemoveRequirement = (index) => {
    const updatedList = [...taglist];
    updatedList.splice(index, 1);
    setValue(name, updatedList); // update form value
  };

  useEffect(() => {
    register(name, {
      required: true,
      validate: (value) => value.length > 0,
    });
  }, [register, name]);

  return (
    <div className="flex flex-col gap-2">
      {taglist.length > 0 && (
        <ul className="flex flex-wrap gap-2">
          {taglist.map((requirement, index) => (
            <li
              className="flex items-center gap-2 text-sm px-3 py-1 rounded-full bg-yellow-200 text-black"
              key={index}
            >
              <span>{requirement}</span>
              <button
                type="button"
                onClick={() => handleRemoveRequirement(index)}
                className="text-gray-700 hover:text-red-600"
              >
                <RxCross2 size={14} />
              </button>
            </li>
          ))}
        </ul>
      )}

      <label htmlFor={name} className="text-sm font-medium text-white">
        {label} <sup className="text-red-500">*</sup>
      </label>

      <input
        type="text"
        id={name}
        placeholder={placeholder}
        value={tag}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            e.preventDefault();
            handleAddRequirement();
          }
        }}
        onChange={(e) => setTag(e.target.value)}
        className="w-full px-3 py-2 border border-gray-600 rounded-md text-white bg-transparent placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-yellow-400"
      />

      {errors[name] && (
        <span className="text-sm text-red-500">{label} is required</span>
      )}
    </div>
  );
};

export default TagsComponent;
