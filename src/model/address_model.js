
let controller = new AbortController();
const signal = controller.signal;
let isLoading = false;
const SERVER = 'http://ec2-44-193-80-73.compute-1.amazonaws.com:3001/';
export async function getSuggestions(address) {
    try {
        if (isLoading) {
            controller.abort();
            controller = new AbortController();
        }
        else {
            isLoading = true;
        }
        const response = await fetch(SERVER + 'api/addresses/suggestions', {
            //credentials: 'include',
            credentials: 'include',
            method: 'POST',
            mode:'cors',
            signal: signal,
            body: JSON.stringify(address),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        if (response.ok) {
            console.log(response.json());
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
