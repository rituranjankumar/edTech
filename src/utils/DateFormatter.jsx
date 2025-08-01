export const DateFormatter = ( isoDate ) => {
  const formatDate = (dateString) => {
    const options = {
      day: '2-digit',
      month: 'long',
      year: 'numeric',
      
      timeZone: 'Asia/Kolkata', // IST
    };

    const date = new Date(dateString);
    return date.toLocaleString('en-IN', options);
  };

  return formatDate(isoDate);
};