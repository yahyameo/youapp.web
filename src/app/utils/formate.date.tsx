export const formatDate = (date: Date | undefined): string => {
    if (!date) {
        return ""; // Handle the case when date is undefined
      }

    return new Date(date).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    });
};