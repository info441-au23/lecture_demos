async function getSpies() {
    const errorDiv = document.getElementById('error');
    const resultsDiv = document.getElementById('results');

    const showError = (error) => {
        errorDiv.style.setProperty('display', 'block');
        errorDiv.innerHTML = error;
    };

    resultsDiv.innerHTML = '';
    errorDiv.innerHTML = '';
    errorDiv.style.setProperty('display', 'none');

    const search = document.getElementById('searchBox').value;
    try {
        const response = await fetch(`/api/spies?search=${search}`);
        const { success, spies, error } = await response.json();

        console.log({ success, spies, error});
        if(success) {
            if(spies) {
                resultsDiv.innerHTML = [
                    `<h5>Spies Matched: ${spies.length}</h5>`,
                    ...spies.map((spy) => `<div>${spy.first_name} ${spy.last_name}</div>`),
                ].join('');
            } else {
                resultsDiv.innerHTML = `<h5>No spies found</h5>`;
            }
        } else {
            showError(error)
        }
    } catch(error) {
        showError(error.message);
    }
}

