// Calendar/Calendar.jsx
import React, { useState, useEffect } from "react";
import "./Calendar.css";

// Utility function to generate color variants
const generateColorVariants = (baseColor) => {
  // Convert hex to RGB
  const hexToRgb = (hex) => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16)
    } : null;
  };

  // Convert RGB to HSL
  const rgbToHsl = (r, g, b) => {
    r /= 255;
    g /= 255;
    b /= 255;
    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    let h, s, l = (max + min) / 2;

    if (max === min) {
      h = s = 0;
    } else {
      const d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
      switch (max) {
        case r: h = ((g - b) / d + (g < b ? 6 : 0)) / 6; break;
        case g: h = ((b - r) / d + 2) / 6; break;
        case b: h = ((r - g) / d + 4) / 6; break;
      }
    }
    return { h: h * 360, s: s * 100, l: l * 100 };
  };

  // Convert HSL to hex
  const hslToHex = (h, s, l) => {
    h /= 360;
    s /= 100;
    l /= 100;
    let r, g, b;

    if (s === 0) {
      r = g = b = l;
    } else {
      const hue2rgb = (p, q, t) => {
        if (t < 0) t += 1;
        if (t > 1) t -= 1;
        if (t < 1/6) return p + (q - p) * 6 * t;
        if (t < 1/2) return q;
        if (t < 2/3) return p + (q - p) * (2/3 - t) * 6;
        return p;
      };
      const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
      const p = 2 * l - q;
      r = hue2rgb(p, q, h + 1/3);
      g = hue2rgb(p, q, h);
      b = hue2rgb(p, q, h - 1/3);
    }

    const toHex = x => {
      const hex = Math.round(x * 255).toString(16);
      return hex.length === 1 ? '0' + hex : hex;
    };
    return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
  };

  const rgb = hexToRgb(baseColor);
  if (!rgb) return null;

  const hsl = rgbToHsl(rgb.r, rgb.g, rgb.b);

  return {
    primary: baseColor,
    primaryDark: hslToHex(hsl.h, hsl.s, Math.max(hsl.l - 15, 0)),
    primaryLight: hslToHex(hsl.h, hsl.s, Math.min(hsl.l + 15, 95)),
    primaryLighter: hslToHex(hsl.h, Math.max(hsl.s - 20, 20), Math.min(hsl.l + 25, 95)),
    success: hslToHex(hsl.h, Math.max(hsl.s - 10, 40), Math.min(hsl.l + 10, 85)),
    hover: hslToHex(hsl.h, Math.max(hsl.s - 30, 10), Math.min(hsl.l + 35, 95))
  };
};

// Basic Calendar Component
export const Calendar = ({
  selectedDate = new Date(),
  onDateSelect = () => {},
  showToday = true,
  minDate = null,
  maxDate = null,
  disabledDates = [],
  theme = "calendar-light",
  color = null, // New color prop
}) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selected, setSelected] = useState(selectedDate);

  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const today = new Date();

  // Generate custom styles if color is provided
  const customStyles = color ? (() => {
    const variants = generateColorVariants(color);
    return {
      '--color-primary-custom': variants.primary,
      '--color-primary-dark-custom': variants.primaryDark,
      '--color-primary-light-custom': variants.primaryLight,
      '--color-success-custom': variants.success,
      '--color-success-light-custom': variants.primaryLighter,
      '--color-background-hover-custom': variants.hover,
    };
  })() : {};

  const generateCalendar = () => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const startDate = new Date(firstDay);
    startDate.setDate(firstDay.getDate() - firstDay.getDay());

    const calendar = [];
    let currentWeekDate = new Date(startDate);

    for (let week = 0; week < 6; week++) {
      const weekDates = [];
      for (let day = 0; day < 7; day++) {
        weekDates.push(new Date(currentWeekDate));
        currentWeekDate.setDate(currentWeekDate.getDate() + 1);
      }
      calendar.push(weekDates);
    }
    return calendar;
  };

  const isSameDate = (date1, date2) => {
    return (
      date1.getDate() === date2.getDate() &&
      date1.getMonth() === date2.getMonth() &&
      date1.getFullYear() === date2.getFullYear()
    );
  };

  const isDateDisabled = (date) => {
    if (minDate && date < minDate) return true;
    if (maxDate && date > maxDate) return true;
    return disabledDates.some((disabledDate) => isSameDate(date, disabledDate));
  };

  const handleDateClick = (date) => {
    if (isDateDisabled(date)) return;
    setSelected(date);
    onDateSelect(date);
  };

  const navigateMonth = (direction) => {
    const newDate = new Date(currentDate);
    newDate.setMonth(currentDate.getMonth() + direction);
    setCurrentDate(newDate);
  };

  const calendar = generateCalendar();

  return (
    <div 
      className={`ui-calendar ${theme} ${color ? 'custom-color' : ''}`}
      style={customStyles}
    >
      <div className="calendar-header">
        <button
          className="nav-button"
          onClick={() => navigateMonth(-1)}
          type="button"
        >
          ‹
        </button>
        <h3 className="month-year">
          {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
        </h3>
        <button
          className="nav-button"
          onClick={() => navigateMonth(1)}
          type="button"
        >
          ›
        </button>
      </div>

      <div className="calendar-grid">
        <div className="day-headers">
          {["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map((day) => (
            <div key={day} className="day-header">
              {day}
            </div>
          ))}
        </div>

        <div className="dates-grid">
          {calendar.map((week, weekIndex) => (
            <div key={weekIndex} className="week-row">
              {week.map((date, dayIndex) => {
                const isCurrentMonth =
                  date.getMonth() === currentDate.getMonth();
                const isToday = showToday && isSameDate(date, today);
                const isSelected = isSameDate(date, selected);
                const isDisabled = isDateDisabled(date);

                return (
                  <button
                    key={dayIndex}
                    className={`date-cell ${
                      isCurrentMonth ? "current-month" : "other-month"
                    } ${isToday ? "today" : ""} ${
                      isSelected ? "selected" : ""
                    } ${isDisabled ? "disabled" : ""}`}
                    onClick={() => handleDateClick(date)}
                    disabled={isDisabled}
                    type="button"
                  >
                    {date.getDate()}
                  </button>
                );
              })}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// Date Picker Component
export const DatePicker = ({
  placeholder = "Select date...",
  selectedDate = null,
  onDateSelect = () => {},
  format = "MMM DD, YYYY",
  disabled = false,
  theme = "calendar-light",
  color = null, // New color prop
  ...calendarProps
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState(selectedDate);

  const formatDate = (date) => {
    if (!date) return "";
    const monthNames = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];

    switch (format) {
      case "MM/DD/YYYY":
        return `${(date.getMonth() + 1).toString().padStart(2, "0")}/${date
          .getDate()
          .toString()
          .padStart(2, "0")}/${date.getFullYear()}`;
      case "DD/MM/YYYY":
        return `${date.getDate().toString().padStart(2, "0")}/${(
          date.getMonth() + 1
        )
          .toString()
          .padStart(2, "0")}/${date.getFullYear()}`;
      case "YYYY-MM-DD":
        return `${date.getFullYear()}-${(date.getMonth() + 1)
          .toString()
          .padStart(2, "0")}-${date.getDate().toString().padStart(2, "0")}`;
      default:
        return `${
          monthNames[date.getMonth()]
        } ${date.getDate()}, ${date.getFullYear()}`;
    }
  };

  const handleDateSelect = (date) => {
    setSelected(date);
    onDateSelect(date);
    setIsOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest(".date-picker-container")) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className={`date-picker-container ${theme}`}>
      <div
        className={`date-picker-input ${disabled ? "disabled" : ""}`}
        onClick={() => !disabled && setIsOpen(!isOpen)}
      >
        <input
          type="text"
          value={selected ? formatDate(selected) : ""}
          placeholder={placeholder}
          readOnly
          disabled={disabled}
        />
        <span className="calendar-icon">
          <svg style={{color: 'gray'}} class="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
            <path fill-rule="evenodd" d="M5 5a1 1 0 0 0 1-1 1 1 0 1 1 2 0 1 1 0 0 0 1 1h1a1 1 0 0 0 1-1 1 1 0 1 1 2 0 1 1 0 0 0 1 1h1a1 1 0 0 0 1-1 1 1 0 1 1 2 0 1 1 0 0 0 1 1 2 2 0 0 1 2 2v1a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V7a2 2 0 0 1 2-2ZM3 19v-7a1 1 0 0 1 1-1h16a1 1 0 0 1 1 1v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2Zm6.01-6a1 1 0 1 0-2 0 1 1 0 0 0 2 0Zm2 0a1 1 0 1 1 2 0 1 1 0 0 1-2 0Zm6 0a1 1 0 1 0-2 0 1 1 0 0 0 2 0Zm-10 4a1 1 0 1 1 2 0 1 1 0 0 1-2 0Zm6 0a1 1 0 1 0-2 0 1 1 0 0 0 2 0Zm2 0a1 1 0 1 1 2 0 1 1 0 0 1-2 0Z" clip-rule="evenodd"/>
          </svg>
        </span>
      </div>

      {isOpen && !disabled && (
        <div className="date-picker-dropdown">
          <Calendar
            selectedDate={selected || new Date()}
            onDateSelect={handleDateSelect}
            theme={theme}
            color={color}
            {...calendarProps}
          />
        </div>
      )}
    </div>
  );
};

// Date Time Picker Component
export const DateTimePicker = ({
  selectedDate = null,
  onDateTimeSelect = () => {},
  format = "MMM DD, YYYY HH:mm",
  placeholder = "Select date and time...",
  disabled = false,
  showSeconds = false,
  theme = "calendar-light",
  color = null, // New color prop
  ...calendarProps
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState(selectedDate);
  const [time, setTime] = useState({
    hours: selectedDate ? selectedDate.getHours() : 12,
    minutes: selectedDate ? selectedDate.getMinutes() : 0,
    seconds: selectedDate ? selectedDate.getSeconds() : 0,
  });

  const formatDateTime = (date, timeObj) => {
    if (!date) return "";
    const newDate = new Date(date);
    newDate.setHours(timeObj.hours, timeObj.minutes, timeObj.seconds);

    const monthNames = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];

    const formatTime = () => {
      const hours = timeObj.hours.toString().padStart(2, "0");
      const minutes = timeObj.minutes.toString().padStart(2, "0");
      const seconds = timeObj.seconds.toString().padStart(2, "0");
      return showSeconds
        ? `${hours}:${minutes}:${seconds}`
        : `${hours}:${minutes}`;
    };

    return `${
      monthNames[date.getMonth()]
    } ${date.getDate()}, ${date.getFullYear()} ${formatTime()}`;
  };

  const handleDateSelect = (date) => {
    setSelected(date);
    const newDateTime = new Date(date);
    newDateTime.setHours(time.hours, time.minutes, time.seconds);
    onDateTimeSelect(newDateTime);
  };

  const handleTimeChange = (field, value) => {
    const newTime = { ...time, [field]: parseInt(value) };
    setTime(newTime);

    if (selected) {
      const newDateTime = new Date(selected);
      newDateTime.setHours(newTime.hours, newTime.minutes, newTime.seconds);
      onDateTimeSelect(newDateTime);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest(".date-time-picker-container")) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className={`date-time-picker-container ${theme}`}>
      <div
        className={`date-picker-input ${disabled ? "disabled" : ""}`}
        onClick={() => !disabled && setIsOpen(!isOpen)}
      >
        <input
          type="text"
          value={selected ? formatDateTime(selected, time) : ""}
          placeholder={placeholder}
          readOnly
          disabled={disabled}
        />
        <span className="calendar-icon">
          <svg style={{color: 'gray'}} class="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
            <path fill-rule="evenodd" d="M5 5a1 1 0 0 0 1-1 1 1 0 1 1 2 0 1 1 0 0 0 1 1h1a1 1 0 0 0 1-1 1 1 0 1 1 2 0 1 1 0 0 0 1 1h1a1 1 0 0 0 1-1 1 1 0 1 1 2 0 1 1 0 0 0 1 1 2 2 0 0 1 2 2v1a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V7a2 2 0 0 1 2-2ZM3 19v-7a1 1 0 0 1 1-1h16a1 1 0 0 1 1 1v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2Zm6.01-6a1 1 0 1 0-2 0 1 1 0 0 0 2 0Zm2 0a1 1 0 1 1 2 0 1 1 0 0 1-2 0Zm6 0a1 1 0 1 0-2 0 1 1 0 0 0 2 0Zm-10 4a1 1 0 1 1 2 0 1 1 0 0 1-2 0Zm6 0a1 1 0 1 0-2 0 1 1 0 0 0 2 0Zm2 0a1 1 0 1 1 2 0 1 1 0 0 1-2 0Z" clip-rule="evenodd"/>
          </svg>
        </span>
      </div>

      {isOpen && !disabled && (
        <div className="date-time-picker-dropdown">
          <Calendar
            selectedDate={selected || new Date()}
            onDateSelect={handleDateSelect}
            theme={theme}
            color={color}
            {...calendarProps}
          />

          <div className="time-picker">
            <h4>Select Time</h4>
            <div className="time-inputs">
              <div className="time-field">
                <label>Hours</label>
                <select
                  value={time.hours}
                  onChange={(e) => handleTimeChange("hours", e.target.value)}
                >
                  {Array.from({ length: 24 }, (_, i) => (
                    <option key={i} value={i}>
                      {i.toString().padStart(2, "0")}
                    </option>
                  ))}
                </select>
              </div>

              <div className="time-field">
                <label>Minutes</label>
                <select
                  value={time.minutes}
                  onChange={(e) => handleTimeChange("minutes", e.target.value)}
                >
                  {Array.from({ length: 60 }, (_, i) => (
                    <option key={i} value={i}>
                      {i.toString().padStart(2, "0")}
                    </option>
                  ))}
                </select>
              </div>

              {showSeconds && (
                <div className="time-field">
                  <label>Seconds</label>
                  <select
                    value={time.seconds}
                    onChange={(e) =>
                      handleTimeChange("seconds", e.target.value)
                    }
                  >
                    {Array.from({ length: 60 }, (_, i) => (
                      <option key={i} value={i}>
                        {i.toString().padStart(2, "0")}
                      </option>
                    ))}
                  </select>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// Date Picker with Submit Button
export const DatePickerWithSubmit = ({
  selectedDate = null,
  onSubmit = () => {},
  onCancel = () => {},
  submitText = "Confirm",
  cancelText = "Cancel",
  placeholder = "Select date...",
  disabled = false,
  theme = "calendar-light",
  color = null, // New color prop
  ...calendarProps
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState(selectedDate);
  const [tempSelected, setTempSelected] = useState(selectedDate);

  const formatDate = (date) => {
    if (!date) return "";
    const monthNames = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    return `${
      monthNames[date.getMonth()]
    } ${date.getDate()}, ${date.getFullYear()}`;
  };

  const customStyles = color ? (() => {
    const variants = generateColorVariants(color);
    return {
      '--color-primary-custom': variants.primary,
      '--color-primary-dark-custom': variants.primaryDark,
      '--color-primary-light-custom': variants.primaryLight,
    };
  })() : {};

  const handleSubmit = () => {
    setSelected(tempSelected);
    onSubmit(tempSelected);
    setIsOpen(false);
  };

  const handleCancel = () => {
    setTempSelected(selected);
    onCancel();
    setIsOpen(false);
  };

  const handleDateSelect = (date) => {
    setTempSelected(date);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest(".date-picker-submit-container")) {
        handleCancel();
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      return () =>
        document.removeEventListener("mousedown", handleClickOutside);
    }
  }, [isOpen]);

  return (
    <div 
      className={`date-picker-submit-container ${theme} ${color ? 'custom-color' : ''}`}
      style={customStyles}
    >
      <div
        className={`date-picker-input ${disabled ? "disabled" : ""}`}
        onClick={() => !disabled && setIsOpen(!isOpen)}
      >
        <input
          type="text"
          value={selected ? formatDate(selected) : ""}
          placeholder={placeholder}
          readOnly
          disabled={disabled}
        />
        <span className="calendar-icon">
          <svg style={{color: 'gray'}} class="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
            <path fill-rule="evenodd" d="M5 5a1 1 0 0 0 1-1 1 1 0 1 1 2 0 1 1 0 0 0 1 1h1a1 1 0 0 0 1-1 1 1 0 1 1 2 0 1 1 0 0 0 1 1h1a1 1 0 0 0 1-1 1 1 0 1 1 2 0 1 1 0 0 0 1 1 2 2 0 0 1 2 2v1a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V7a2 2 0 0 1 2-2ZM3 19v-7a1 1 0 0 1 1-1h16a1 1 0 0 1 1 1v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2Zm6.01-6a1 1 0 1 0-2 0 1 1 0 0 0 2 0Zm2 0a1 1 0 1 1 2 0 1 1 0 0 1-2 0Zm6 0a1 1 0 1 0-2 0 1 1 0 0 0 2 0Zm-10 4a1 1 0 1 1 2 0 1 1 0 0 1-2 0Zm6 0a1 1 0 1 0-2 0 1 1 0 0 0 2 0Zm2 0a1 1 0 1 1 2 0 1 1 0 0 1-2 0Z" clip-rule="evenodd"/>
          </svg>
        </span>
      </div>

      {isOpen && !disabled && (
        <div className="date-picker-submit-dropdown">
          <Calendar
            selectedDate={tempSelected || new Date()}
            onDateSelect={handleDateSelect}
            theme={theme}
            color={color}
            {...calendarProps}
          />

          <div className="picker-actions">
            <button className="btn-cancel" onClick={handleCancel} type="button">
              {cancelText}
            </button>
            <button
              className="btn-submit"
              onClick={handleSubmit}
              disabled={!tempSelected}
              type="button"
            >
              {submitText}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};