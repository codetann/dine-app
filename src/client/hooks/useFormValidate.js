import { useState, useEffect } from "react";

export default function useFormValidate(formData, agreeTerms) {
  const [isValid, setIsValid] = useState(false);

  useEffect(() => {
    if (formData.password !== formData.confirmPassword)
      return setIsValid(false);
    if (Object.values(formData).some((value) => !value))
      return setIsValid(false);
    if (!agreeTerms) return setIsValid(false);

    setIsValid(true);
  }, [formData, agreeTerms]);

  return { isValid, isDisabled: !isValid };
}
