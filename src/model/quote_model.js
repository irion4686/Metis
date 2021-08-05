
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
            return 200;
        } else {
            const message = await response.json();
            return message;
        }
    } catch (error) {
        return {code: 500, message: error.message};
    }
}

export async function getQuotes(ctx) {
    const SERVER = ctx.SERVER;
    try {
        const url = SERVER + 'api/quotes';
        const response = await fetch(url, {
            method: 'GET',
            mode: 'cors',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            },
        })
        if (response.ok) {
            const data = await response.json();
            return data;
        } else {
            if (response.status === 401) {

            }
        }
    } catch (error) {
        console.log("Error");
        console.log(error);
    }
}
