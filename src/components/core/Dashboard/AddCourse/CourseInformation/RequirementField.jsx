import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

const RequirementField = ({ name, label, register, errors, setValue, getValues, watch }) => {
  const [requirement, setRequirement] = useState('');
  const watchedRequirements = watch(name) || []; // 👈 watch the field directly

  const handleAddRequirement = () => {
    if (requirement.trim() !== '' && !watchedRequirements.includes(requirement.trim())) {
      const updatedList = [...watchedRequirements, requirement.trim()];
      setValue(name, updatedList);
      setRequirement('');
    }
  };

  const handleRemoveRequirement = (index) => {
    const updatedList = watchedRequirements.filter((_, i) => i !== index);
    setValue(name, updatedList);
  };

  useEffect(() => {
    register(name, {
      required: true,
      validate: (value) => value.length > 0,
    });
  }, [register, name]);

  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={name} className="text-sm font-medium text-white">
        {label} <sup className="text-red-500">*</sup>
      </label>

      <div className="flex items-center gap-2">
        <input
          type="text"
          id={name}
          value={requirement}
          onChange={(e) => setRequirement(e.target.value)}
          className="w-full px-3 py-2 border border-gray-600 rounded-md text-white bg-transparent placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-yellow-400"
        />

        <button
          type="button"
          onClick={handleAddRequirement}
          className="px-3 py-1 text-sm font-semibold text-yellow-400 border border-yellow-400 rounded hover:bg-yellow-400 hover:text-black transition-all"
        >
          Add
        </button>
      </div>

      {watchedRequirements.length > 0 && (
        <ul className="flex flex-col gap-1 mt-2">
          {watchedRequirements.map((requirement, index) => (
            <li
              key={index}
              className="flex items-center gap-2 px-3 py-1 text-sm bg-yellow-200 text-black rounded-full w-fit"
            >
              <span>{requirement}</span>
              <button
                type="button"
                onClick={() => handleRemoveRequirement(index)}
                className="text-gray-600 hover:text-red-600"
              >
                clear
              </button>
            </li>
          ))}
        </ul>
      )}

      {errors[name] && (
        <span className="text-sm text-red-500">{label} is required</span>
      )}
    </div>
  );
};

export default RequirementField;
