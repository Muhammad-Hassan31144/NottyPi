// helper.js

// Function to validate email
export const validateEmail = (email) => {
    // Regular expression pattern for email validation
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    // Check if the email matches the pattern
    return emailPattern.test(email);
};

// Export the validateEmail function
// Function to get initials from username
export const getInitials = (username) => {
    if (!username) return ""
    // Split the username into an array of words
    const words = username.split(' ');

    // Initialize an empty string for the initials
    let initials = '';

    // Iterate over the words array
    for (let i = 0; i < Math.min(words.length, 2); i++) {
        // Get the first character of each word and convert it to uppercase
        initials += words[i][0].toUpperCase();
    }
    // Return the initials
    return initials;
};

// Export the getInitials function
export default getInitials;