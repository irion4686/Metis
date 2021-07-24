let controller = new AbortController();
let isLoading = false;

const mapResultsToSuggestions = (results) => {
    let suggestions = [];
    if (results.length > 0) {
        suggestions = results.reduce((suggestions, prediction) => {
            if (prediction.types.includes('premise')) {
                const suggestion = {
                    street: prediction.terms[0].value + ' ' + prediction.terms[1].value,
                    city: prediction.terms[2].value,
                    state: prediction.terms[3].value,
                    zip: 0,
                    id: prediction.place_id,
                }
                suggestions.push(suggestion);
            }
            if (prediction.terms.length === 5 && prediction.types.includes('street_address')) {
                const suggestion = {
                    street: prediction.terms[0].value,
                    city: prediction.terms[1].value,
                    state: prediction.terms[2].value,
                    zip: prediction.terms[3].value,
                    id: prediction.place_id,
                }
                suggestions.push(suggestion);
            }
            if (prediction.terms.length === 4 && prediction.types.includes('street_address')) {
                const suggestion = {
                    street: prediction.terms[0].value,
                    city: prediction.terms[1].value,
                    state: prediction.terms[2].value,
                    zip: null,
                    id: prediction.place_id,
                }
                suggestions.push(suggestion);
            } else if (prediction.terms.length === 3) {
                const suggestion = {
                    street: null,
                    city: prediction.terms[0].value,
                    state: prediction.terms[1].value,
                    zip: null,
                    id: prediction.place_id
                }
                suggestions.push(suggestion);
            }
            return suggestions;
        }, []);
    }
    return suggestions;
}

const fillInAddress = (results) => {
    let address = {};
    if (results.address_components.length > 0) {
        for (const component of results.address_components) {
            const componentType = component.types[0];

            switch (componentType) {
                case "street_number": {
                    address.street = `${component.long_name} ${address.street}`;
                    break;
                }

                case "route": {
                    address.street += component.short_name;
                    break;
                }

                case "postal_code": {
                    address.zip = `${component.long_name}`;
                    break;
                }
                case "locality":
                    address.city = component.long_name;
                    break;

                case "administrative_area_level_1": {
                    address.state = component.short_name;
                    break;
                }
            }

        }
    }
    return address;
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

export async function getPlaceInformation(placeId, ctx, sessionToken) {
    const SERVER = ctx.SERVER;
    try {
        const url = SERVER + 'api/addresses/place/' + placeId + '/' + sessionToken;
        const response = await fetch(url, {
            method: 'GET',
            mode: 'cors',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        if (response.ok) {
            const data = await response.json();
            console.log(data);
            const suggestions = fillInAddress(data);
            return suggestions;
        } else {
            let message = 'Unknown error';
            if (response.status === 409) message = 'User with that email already exists';
            console.log(message);
        }
    } catch (error) {
        console.log("Error");
        console.log(error);
    }
}

export async function getDistance(origin, destination, ctx) {
    const body = {
        origin: origin,
        destination: destination
    }
    const SERVER = ctx.SERVER;
    try {
        const url = SERVER + 'api/addresses/distance';
        const response = await fetch(url, {
            method: 'POST',
            mode: 'cors',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        })
        if (response.ok) {
            const data = await response.json();
            return data.text.split(' ')[0];
        } else {
            let message = 'Unknown error';
            if (response.status === 409) message = 'User with that email already exists';
            console.log(message);
        }
    } catch (error) {
        console.log("Error");
        console.log(error);
    }
}
