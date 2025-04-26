"use client";

/**
 * Service for handling API requests to the backend
 */
const ApiService = {
  /**
   * Submit organization registration data to the backend
   * @param {Object} formData - The form data to submit
   * @returns {Promise} - Promise resolving to the API response
   */
  submitRegistration: async (formData) => {
    try {
      // Create a FormData object to handle file uploads
      const data = new FormData();

      // Add all form fields to the FormData object
      Object.keys(formData).forEach((key) => {
        if (key === "file" && formData[key]) {
          // Add file with its original name
          data.append("file", formData[key], formData[key].name);
        } else if (formData[key] !== null && formData[key] !== undefined) {
          // Add other form fields
          data.append(key, formData[key]);
        }
      });

      // Make the API request
      const response = await fetch("/api/register-organization", {
        method: "POST",
        body: data,
        // Don't set Content-Type header, it will be set automatically with boundary for FormData
      });

      // Parse the JSON response
      const result = await response.json();

      // Check if the request was successful
      if (!response.ok) {
        throw new Error(result.message || "Failed to submit registration");
      }

      return result;
    } catch (error) {
      console.error("Error submitting registration:", error);
      throw error;
    }
  },

  /**
   * Get a file URI from the backend
   * @param {File} file - The file to get a URI for
   * @returns {Promise<string>} - Promise resolving to the file URI
   */
  getFileUri: async (file) => {
    try {
      // Create a FormData object for the file
      const data = new FormData();
      data.append("file", file);

      // Upload the file to get a URI
      const response = await fetch("/api/upload-file", {
        method: "POST",
        body: data,
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Failed to upload file");
      }

      return result.fileUri;
    } catch (error) {
      console.error("Error getting file URI:", error);
      throw error;
    }
  },
};

export default ApiService;
