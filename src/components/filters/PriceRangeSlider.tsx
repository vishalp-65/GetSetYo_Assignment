import React from 'react';

interface PriceRangeSliderProps {
    min: number;
    max: number;
    value: { min: number; max: number };
    onChange: (value: { min: number; max: number }) => void;
    className?: string;
}

export const PriceRangeSlider: React.FC<PriceRangeSliderProps> = ({
    min,
    max,
    value,
    onChange,
    className = ''
}) => {
    const handleMinChange = (newMin: number) => {
        onChange({
            min: Math.min(newMin, value.max),
            max: value.max
        });
    };

    const handleMaxChange = (newMax: number) => {
        onChange({
            min: value.min,
            max: Math.max(newMax, value.min)
        });
    };

    return (
        <div className={`space-y-2 ${className}`}>
            <div className="flex justify-between text-sm text-gray-600">
                <span>Price Range</span>
                <span>${value.min} - ${value.max}</span>
            </div>

            <div className="relative">
                <input
                    type="range"
                    min={min}
                    max={max}
                    value={value.min}
                    onChange={(e) => handleMinChange(Number(e.target.value))}
                    className="absolute w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider-thumb"
                />
                <input
                    type="range"
                    min={min}
                    max={max}
                    value={value.max}
                    onChange={(e) => handleMaxChange(Number(e.target.value))}
                    className="absolute w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider-thumb"
                />
            </div>

            <div className="flex justify-between text-xs text-gray-500">
                <span>${min}</span>
                <span>${max}</span>
            </div>
        </div>
    );
};