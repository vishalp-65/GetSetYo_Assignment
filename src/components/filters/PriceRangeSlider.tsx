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
            min: Math.min(newMin, value.max - 1),
            max: value.max
        });
    };

    const handleMaxChange = (newMax: number) => {
        onChange({
            min: value.min,
            max: Math.max(newMax, value.min + 1)
        });
    };

    const minPercent = ((value.min - min) / (max - min)) * 100;
    const maxPercent = ((value.max - min) / (max - min)) * 100;

    return (
        <div className={`space-y-4 ${className}`}>
            <div className="flex justify-between items-center">
                <label className="text-sm font-medium text-gray-700">Price Range</label>
                <div className="flex items-center space-x-2">
                    <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                        ${value.min} - ${value.max}
                    </span>
                </div>
            </div>

            <div className="relative h-6">
                {/* Track */}
                <div className="absolute top-1/2 transform -translate-y-1/2 w-full h-2 bg-gray-200 rounded-full"></div>

                {/* Active range */}
                <div
                    className="absolute top-1/2 transform -translate-y-1/2 h-2 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full"
                    style={{
                        left: `${minPercent}%`,
                        width: `${maxPercent - minPercent}%`
                    }}
                ></div>

                {/* Min slider */}
                <input
                    type="range"
                    min={min}
                    max={max}
                    value={value.min}
                    onChange={(e) => handleMinChange(Number(e.target.value))}
                    className="absolute w-full h-2 bg-transparent appearance-none cursor-pointer range-slider"
                    style={{ zIndex: 1 }}
                />

                {/* Max slider */}
                <input
                    type="range"
                    min={min}
                    max={max}
                    value={value.max}
                    onChange={(e) => handleMaxChange(Number(e.target.value))}
                    className="absolute w-full h-2 bg-transparent appearance-none cursor-pointer range-slider"
                    style={{ zIndex: 2 }}
                />
            </div>

            <div className="flex justify-between text-xs text-gray-500">
                <span className="font-medium">${min}</span>
                <span className="font-medium">${max}</span>
            </div>
        </div>
    );
};