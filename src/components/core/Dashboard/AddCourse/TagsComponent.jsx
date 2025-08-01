import React, { useState, useEffect } from 'react';
import { RxCross2 } from "react-icons/rx";

const TagsComponent = ({ label, name, placeholder, register, errors, setValue, getValues }) => {
  const [tag, setTag] = useState("");
  const [taglist, setTagList] = useState([]);

  const handleAddRequirement = () => {
    if (tag.trim() !== "" && !taglist.includes(tag.trim())) {
      const updatedList = [...taglist, tag.trim()];
      setTagList(updatedList);
      setValue(name, updatedList);
      setTag("");
    }
  };

  const handleRemoveRequirement = (index) => {
    const updatedTagList = [...taglist];
    updatedTagList.splice(index, 1);
    setTagList(updatedTagList);
    setValue(name, updatedTagList);
  };

  useEffect(() => {
    register(name, {
      required: true,
      validate: (value) => value.length > 0,
    });
  }, [register, name]);

  useEffect(()=>
  {
    const tags=getValues(name);
    if(tags)
    {
      setTagList(tags);
    }
  },[]);
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
