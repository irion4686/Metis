let controller = new AbortController();
let isLoading = false;

const mapResultsToSuggestions = (predictions) => {
    let suggestions = [];
    if (predictions.length > 0) {
        suggestions = predictions.reduce((suggestions, prediction) => {
            const suggestion = {
                firstName: prediction.first_name,
                lastName: prediction.last_name,
                businessName: prediction.business_name,
                email: prediction.email,
                phone: prediction.phone,
                id: prediction.client_id,
            }
            suggestions.push(suggestion);
            return suggestions;
        }, []);
    }
    return suggestions;
}

export async function getSuggestions(client, ctx) {
    if (client.firstName || client.lastName || client.businessName || client.email || client.phone) {
        const SERVER = ctx.SERVER;
        try {
            if (isLoading) {
                controller.abort();
                controller = new AbortController();
            }
            isLoading = true;
            const url = SERVER + 'api/clients/suggestions';
            const response = await fetch(url, {
                method: 'POST',
                mode: 'cors',
                credentials: 'include',
                signal: controller.signal,
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(client)
            })
            if (response.ok) {
                const data = await response.json();
                const suggestions = mapResultsToSuggestions(data.suggestions);
                return suggestions;
            } else {
                let message = 'Unknown error';
                if (response.status === 409) message = 'User with that email already exists';
            }
        } catch (error) {
            console.log("Error");
            console.log(error);
        } finally {
            isLoading = false;
        }
    }
}
