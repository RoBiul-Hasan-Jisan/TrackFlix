import React, { useState, useEffect, useRef } from "react";

const LiveTVShowForm = ({ form, onChange, onSubmit, onCancel, isEditing, isSubmitting }) => {
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState(false);
  const [shouldFocusError, setShouldFocusError] = useState(false);
  const firstErrorRef = useRef(null);

  const validate = (values) => {
    const errs = {};
    if (!values.id || values.id <= 0) errs.id = "ID must be a positive number.";
    if (!values.title || values.title.trim().length < 2)
      errs.title = "Title must be at least 2 characters.";
    if (!values.rating || values.rating < 0 || values.rating > 10)
      errs.rating = "Rating must be between 0 and 10.";
    if (!values.trailer || !/^https?:\/\/.+/.test(values.trailer.trim()))
      errs.trailer = "Invalid trailer URL.";
    if (!values.image || !/^https?:\/\/.+/.test(values.image.trim()))
      errs.image = "Invalid image URL.";
    return errs;
  };

  useEffect(() => {
    const validationErrors = validate(form);
    setErrors(validationErrors);
  }, [form]);

  useEffect(() => {
    if (!shouldFocusError) return;
    firstErrorRef.current?.focus();
    setShouldFocusError(false);
  }, [shouldFocusError, errors]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate(form);
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length > 0) {
      setShouldFocusError(true);
      return;
    }
    setShouldFocusError(false);
    onSubmit(e);
    setSuccess(true);
    setTimeout(() => setSuccess(false), 4000);
  };

  const fields = [
    { name: "id", type: "number" },
    { name: "title", type: "text" },
    { name: "rating", type: "number" },
    { name: "genres", type: "text" },
    { name: "releaseDate", type: "date" },
    { name: "trailer", type: "text" },
    { name: "image", type: "text" },
  ];
  const firstErrorName = fields.find(({ name }) => errors[name])?.name;

  return (
    <div className="admin-form-shell">
      {success && (
        <p className="mb-6 text-green-400 font-bold text-center tracking-wide drop-shadow-md">
          ✔️ Success! The show was saved.
        </p>
      )}

      <form onSubmit={handleSubmit} noValidate autoComplete="off" className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <h2 className="col-span-full mb-3 text-center">
          {isEditing ? "Edit Live TV Show" : "Add Live TV Show"}
        </h2>

        {fields.map((field) => {
          const label = field.name.replace(/([A-Z])/g, " $1").replace(/^./, (s) => s.toUpperCase());
          const error = errors[field.name];

          const handleChange = field.name === "genres"
            ? (e) => {
                const genresArray = e.target.value.split(",").map((g) => g.trim());
                onChange({ target: { name: "genres", value: genresArray } });
              }
            : onChange;

          const value =
            field.name === "genres"
              ? (Array.isArray(form.genres) ? form.genres.join(", ") : form.genres || "")
              : form[field.name] || "";

          return (
            <div key={field.name} className="relative">
              <input
                id={field.name}
                type={field.type}
                name={field.name}
                value={value}
                aria-invalid={Boolean(error)}
                aria-describedby={error ? `${field.name}-error` : undefined}
                onChange={handleChange}
                placeholder=" "
                disabled={field.name === "id" && isEditing}
                ref={field.name === firstErrorName ? firstErrorRef : null}
                className="peer w-full rounded-xl border px-5 pt-6 pb-3 placeholder-transparent transition-all focus:outline-none"
              />
              <label
                htmlFor={field.name}
                className="absolute left-5 top-3 text-sm font-semibold tracking-wide pointer-events-none transition-all peer-placeholder-shown:top-6 peer-placeholder-shown:text-base peer-focus:top-3 peer-focus:text-sm"
              >
                {label}
              </label>
              {error && (
                <p id={`${field.name}-error`} className="mt-1 text-pink-400 font-semibold drop-shadow-md">{error}</p>
              )}
            </div>
          );
        })}

        <button
          type="submit"
          disabled={isSubmitting || Object.keys(errors).length > 0}
          className="col-span-full w-full mt-6 rounded-xl font-bold text-base py-4 transition-all duration-200 disabled:cursor-not-allowed"
        >
          {isSubmitting
            ? isEditing
              ? "Updating..."
              : "Saving..."
            : isEditing
            ? "Update Show"
            : "Add Show"}
        </button>

        {isEditing && (
          <button
            type="button"
            onClick={onCancel}
            disabled={isSubmitting}
            className="col-span-full w-full mt-3 rounded-full bg-gray-700 hover:bg-gray-600 text-white font-semibold py-3 shadow-md transition duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Cancel
          </button>
        )}
      </form>
    </div>
  );
};

export default LiveTVShowForm;
