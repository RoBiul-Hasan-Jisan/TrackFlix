import React, { useState, useEffect, useRef } from "react";

const FullMovieDetailForm = ({
  form,
  onChange,
  onSubmit,
  onCancel,
  isEditing,
  isSubmitting,
}) => {
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState(false);
  const [showImagePreview, setShowImagePreview] = useState(false);
  const [imageValid, setImageValid] = useState(false);
  const [shouldFocusError, setShouldFocusError] = useState(false);
  const firstErrorRef = useRef(null);

  const validate = (values) => {
    const errs = {};
    if (!values.id || values.id <= 0) errs.id = "ID must be a positive number.";
    if (!values.title || values.title.trim().length < 2)
      errs.title = "Title must be at least 2 characters.";

    const img = values.image || "";
    const trimmedImg = img.trim();
    const isValidUrl =
      /^https?:\/\/.+/i.test(trimmedImg) || /^data:image\/.+;base64,/.test(trimmedImg);
    if (!trimmedImg) {
      errs.image = "Image URL is required.";
    } else if (!isValidUrl) {
      errs.image = "Please enter a valid image URL or base64 image data.";
    }

    if (values.rating != null && (values.rating < 0 || values.rating > 10))
      errs.rating = "Rating must be between 0 and 10.";

    const commaSeparatedFields = [
      "genres",
      "productionCompanies",
      "director",
      "writers",
      "cast",
      "similarMovies",
    ];
    commaSeparatedFields.forEach((field) => {
      const val = values[field];
      let str = "";
      if (Array.isArray(val)) str = val.join(", ");
      else if (typeof val === "string") str = val;
      if (!str.trim()) errs[field] = `Please enter at least one ${field}.`;
    });

    if (values.trailer) {
      const trailer = values.trailer.trim();
      if (trailer && !/^https?:\/\/.+/i.test(trailer))
        errs.trailer = "Please enter a valid trailer URL.";
    }

    return errs;
  };

  useEffect(() => {
    const validationErrors = validate(form);
    setErrors(validationErrors);

    if (
      form.image &&
      (/^https?:\/\/.+/i.test(form.image.trim()) ||
        /^data:image\/.+;base64,/.test(form.image.trim()))
    ) {
      setImageValid(true);
      setShowImagePreview(true);
    } else {
      setImageValid(false);
      setShowImagePreview(false);
    }
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

  const firstErrorName = fields.find(({ name }) => errors[name])?.name;
  const isSubmitDisabled = isSubmitting || Object.keys(errors).length > 0;

  const handleCommaSeparatedChange = (e, fieldName) => {
    onChange({
      target: {
        name: fieldName,
        value: e.target.value.split(",").map((v) => v.trim()),
      },
    });
  };

  const fields = [
    { name: "id", type: "number", label: "ID", disabled: isEditing, required: true },
    { name: "title", type: "text", label: "Title", required: true },
    { name: "overview", type: "text", label: "Overview", required: false },
    { name: "releaseDate", type: "date", label: "Release Date", required: false },
    { name: "rating", type: "number", label: "Rating (0-10)", step: "0.1", required: false },
    {
      name: "genres",
      type: "text",
      label: "Genres (comma-separated)",
      required: true,
      isCommaSeparated: true,
    },
    { name: "runtime", type: "number", label: "Runtime (min)", required: false },
    { name: "language", type: "text", label: "Language", required: false },
    { name: "country", type: "text", label: "Country", required: false },
    { name: "budget", type: "number", label: "Budget", required: false },
    { name: "boxOffice", type: "number", label: "Box Office", required: false },
    {
      name: "productionCompanies",
      type: "text",
      label: "Production Companies (comma-separated)",
      required: true,
      isCommaSeparated: true,
    },
    { name: "ageRating", type: "text", label: "Age Rating", required: false },
    {
      name: "director",
      type: "text",
      label: "Director(s) (comma-separated)",
      required: true,
      isCommaSeparated: true,
    },
    {
      name: "writers",
      type: "text",
      label: "Writers (comma-separated)",
      required: true,
      isCommaSeparated: true,
    },
    {
      name: "cast",
      type: "text",
      label: "Cast (comma-separated)",
      required: true,
      isCommaSeparated: true,
    },
    { name: "trailer", type: "url", label: "Trailer URL", required: false },
    {
      name: "image",
      type: "url",
      label: "Image URL",
      required: true,
    },
    {
      name: "similarMovies",
      type: "text",
      label: "Similar Movie IDs (comma-separated)",
      required: true,
      isCommaSeparated: true,
    },
  ];

  return (
    <div className="admin-form-shell admin-form-shell--movie">
      <h2 className="admin-form-title">
        {isEditing ? "Edit" : "Add"} Full Movie Detail
      </h2>

      <form onSubmit={handleSubmit} noValidate>
        <div className="admin-movie-detail-grid">
          {fields.map(({ name, type, label, disabled, required, isCommaSeparated, step }) => {
            const fieldValue = form[name];
            const displayValue = isCommaSeparated
              ? Array.isArray(fieldValue)
                ? fieldValue.join(", ")
                : fieldValue || ""
              : fieldValue || "";

            return (
              <div key={name} className="admin-movie-field">
                <label htmlFor={name}>
                  {label}
                  {required && <span style={{ color: "#dc2626" }}> *</span>}
                </label>
                <input
                  id={name}
                  type={type}
                  name={name}
                  value={displayValue}
                  disabled={disabled || isSubmitting}
                  onChange={
                    isCommaSeparated
                      ? (e) => handleCommaSeparatedChange(e, name)
                      : onChange
                  }
                  min={type === "number" ? 0 : undefined}
                  step={step}
                  className="admin-field-control"
                  aria-invalid={Boolean(errors[name])}
                  aria-describedby={errors[name] ? `${name}-error` : undefined}
                  ref={name === firstErrorName ? firstErrorRef : null}
                />
                {errors[name] && (
                  <span
                    id={`${name}-error`}
                    role="alert"
                    className="admin-field-error"
                  >
                    {errors[name]}
                  </span>
                )}
              </div>
            );
          })}
        </div>

        {showImagePreview && imageValid && (
          <div className="admin-image-preview">
            <img
              src={form.image}
              alt="Movie preview"
              className="admin-image-preview-image"
              onError={() => setImageValid(false)}
              onLoad={() => setImageValid(true)}
              draggable={false}
            />
          </div>
        )}

        <div className={`admin-form-actions${isEditing ? " is-editing" : ""}`}>
          {isEditing && (
            <button
              type="button"
              onClick={onCancel}
              disabled={isSubmitting}
              className="admin-form-cancel"
            >
              Cancel
            </button>
          )}

          <button
            type="submit"
            disabled={isSubmitDisabled}
            className="admin-form-submit"
          >
            {isSubmitting
              ? isEditing
                ? "Updating..."
                : "Adding..."
              : isEditing
              ? "Update Movie Detail"
              : "Add Movie Detail"}
          </button>
        </div>

        {success && (
          <p className="admin-form-success">
            Successfully {isEditing ? "updated" : "added"} movie detail!
          </p>
        )}
      </form>
    </div>
  );
};

export default FullMovieDetailForm;
