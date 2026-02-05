export default function AuthInput({
  label,
  type = "text",
  placeholder,
  register,
  name,
  error,
}) {
  return (
    <div className="mb-3">
      <label className="auth-label">{label}</label>
      <input
        type={type}
        className={`form-control auth-input ${error ? "is-invalid" : ""}`}
        placeholder={placeholder}
        {...register(name)}
      />
      {error && <div className="invalid-feedback">{error}</div>}
    </div>
  );
}
