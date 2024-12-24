
export const getTempCartId = (): string | null => {
    let tempCartId = localStorage.getItem('tempCartId');
    if (!tempCartId) {
      tempCartId = generateTempCartId();
      localStorage.setItem('tempCartId', tempCartId);
    }
    return tempCartId;
  };
  
  const generateTempCartId = (): string => {
    // Generate a unique tempCartId, you can use UUID or a random string
    return Math.random().toString(36).substring(2, 15);
  };