"use client";

import React, { useState, useEffect } from "react";
import { Check } from "lucide-react";

export const Checkbox = ({
  checked = false,
  onChange,
  disabled = false,
}: {
  checked?: boolean;
  onChange?: (checked: boolean) => void;
  disabled?: boolean;
}) => {
  const [isChecked, setIsChecked] = useState(checked);

  useEffect(() => {
    setIsChecked(checked);
  }, [checked]);

  const handleChange = () => {
    if (disabled) return;
    const newValue = !isChecked;
    setIsChecked(newValue);
    onChange?.(newValue);
  };

  return (
    <div
      className={`relative ${
        disabled ? "cursor-not-allowed opacity-60" : "cursor-pointer"
      }`}
      onClick={handleChange}
      role="checkbox"
      aria-checked={isChecked}
      aria-disabled={disabled}
      tabIndex={disabled ? -1 : 0}
      onKeyDown={(e) => {
        if (!disabled && (e.key === "Enter" || e.key === " ")) {
          e.preventDefault();
          handleChange();
        }
      }}
    >
      <input
        type="checkbox"
        checked={isChecked}
        onChange={() => {
          if (disabled) return;
          handleChange();
        }}
        className="sr-only"
        disabled={disabled}
        tabIndex={-1}
        aria-disabled={disabled}
      />
      <div
        className={`w-10 h-10 rounded-xl border-4 transition duration-200 ${
          isChecked ? "border-white bg-white" : "border-white"
        }`}
      >
        {isChecked && (
          <Check
            strokeWidth={3}
            className={`w-8 h-8 absolute top-1 left-1 transition duration-200 ${
              isChecked ? "text-black" : "text-white"
            }`}
          />
        )}
      </div>
    </div>
  );
};
