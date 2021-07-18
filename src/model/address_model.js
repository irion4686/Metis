let controller = new AbortController();
let isLoading = false;

const mapResultsToSuggestions = (predictions) => {
    let suggestions = [];
    if (predictions.length > 0) {
        suggestions = predictions.reduce((suggestions, prediction) => {
            if (prediction.terms.length === 5) {
                const suggestion = {
                    street: prediction.terms[0].value + ' ' + prediction.terms[1].value,
                    city: prediction.terms[2].value,
                    state: prediction.terms[3].value,
                    zip: 0,
                    id: prediction.place_id,
                }
                suggestions.push(suggestion);
            }
            ;
            return suggestions;
        }, []);
    }
    return suggestions;
}

export async function getSuggestions(address, ctx) {
    if (address.street || address.city || address.state || address.zip != 0) {
        const SERVER = ctx.SERVER;
        try {
            if (isLoading) {
                controller.abort();
                controller = new AbortController();
            }
            isLoading = true;
            const url = SERVER + 'api/addresses/suggestions';
            const response = await fetch(url, {
                method: 'POST',
                mode: 'cors',
                credentials: 'include',
                signal: controller.signal,
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(address)
            })
            if (response.ok) {
                const data = await response.json();
                const suggestions = mapResultsToSuggestions(data.predictions);
                return suggestions;
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
    }
}
