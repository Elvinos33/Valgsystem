export default async function makeRequest(url, method, data) {
    return await fetch("http://127.0.0.1:5000/" + url,
        {
            method: method,
            headers: {
                "Content-Type": "application/json",
                'Access-Control-Allow-Origin': '*'
            },
            body: JSON.stringify(data)
        });
}