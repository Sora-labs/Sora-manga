export const handleShowFieldErrors = (errors: any[], funcSetError: Function) => {
  console.log("Handling field errors", errors);

  return errors.map((error) => {
    if (error.field && error.message) {
      funcSetError(error.field, { type: "manual", message: error.message });
    }
  });
}

export const convertFileObjectToImage = (file?: File | null) => {
  if (!file) return ""
  return URL.createObjectURL(file)
}