import axios from "axios";




const sendMessage = async () => {
    const apikey = "a412d939c3e6406e8968d79646e8dae9"; // Replace with your API key
    const number = "9869546570"; // Replace with the recipient's phone number
    const msg = "Hello! Testing WhatsApp API with Axios."; // Replace with your message

    const url = `http://web.cloudwhatsapp.com/wapp/api/send?apikey=${apikey}&mobile=${number}&msg=${encodeURIComponent(msg)}`;

    try {
        const response = await axios.post(url); // Using GET request as shown in the example
        console.log("Message sent successfully:", response.data);
    } catch (error) {
        console.error("Error sending message:", error.response ? error.response.data : error.message);
    }
};

// Run the function
sendMessage();
