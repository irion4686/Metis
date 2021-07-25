export async function submitQuote(quote, serverCtx) {
    const SERVER = serverCtx.SERVER;
    try {
        const url = SERVER + 'api/quotes/add';
        const response = await fetch(url, {
            method: 'POST',
            mode: 'cors',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(quote)
        })
        if (response.ok) {
            return response.json();
        } else {
            return response.json().message;
        }
    } catch (error) {
        return {code: 500, message: error.message};
    }
}
