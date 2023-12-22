const uploadPreview = (preview, userFile) => {
    const fits = ['.png', '.jpeg', '.jpg'].some((e) => userFile.files[0].name.toLowerCase().endsWith(e));
    if (fits) {
      preview.src = URL.createObjectURL(userFile.files[0]);}
  };
  
export {uploadPreview};