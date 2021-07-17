const axios = require('axios').default;
let controller = new AbortController();
const signal = controller.signal;
let isLoading = false;


export async function getSuggestions(address, ctx) {
    const SERVER = ctx.SERVER;
    try {
        if (isLoading) {
            controller.abort();
            controller = new AbortController();
        }
        else {
            isLoading = true;
        }
        const url = SERVER + 'api/addresses/suggestions';
        console.log(url);
        const response = await axios.post(url, {withCredentials:true});
        if (response.statusText === 'OK') {
            console.log(response);
        } else {
            let message = 'Unknown error';
            if (response.status === 409) message = 'User with that email already exists';
            console.log(message);
        }
    } catch (error) {
        console.log("Error");
        console.log(error);
    } finally {
        isLoading = false;
    }
};
