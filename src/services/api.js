
export async function postData(question) {
    const url = import.meta.env.VITE_API; // Set the API URL from environment variables
    // const url = "http://127.0.0.1:5000";  
    // console.log('API URL:', url); // Log the API URL for debugging
    try {
      const response = await fetch(`${url}/query`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({"question" : question})
      });
  
      if (!response.ok) {
        throw new Error(`Server error: ${response.status}`);
      }
  
      const result = await response.json();
      console.log('Response from API:', result); // Log the response for debugging
      return result;
  
    } catch (error) {
      console.error('POST request failed:', error.message);
      return null;
    }
  }
  
// console.log(postData("What is the capital of France?")); // Test the function with a sample question