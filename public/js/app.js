document.addEventListener('DOMContentLoaded', () => {
    const amtInput = document.getElementById('amount');
    const fromSel = document.getElementById('from-currency');
    const toSel = document.getElementById('to-currency');
    const resDiv = document.getElementById('result');
    const convForm = document.getElementById('converter-form');

    fetch('/api/currencies')
        .then(resp => resp.json())
        .then(data => {
            const curList = Object.keys(data.conversion_rates);
            curList.forEach(cur => {
                const opt = document.createElement('option');
                opt.value = cur;
                opt.textContent = cur;
                fromSel.appendChild(opt.cloneNode(true));
                toSel.appendChild(opt);
            });
        });

    convForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const amt = parseFloat(amtInput.value);
        const fromCur = fromSel.value;
        const toCur = toSel.value;

        if (isNaN(amt)) {
            resDiv.textContent = 'Please enter a valid amount';
            return;
        }

        fetch(`/api/convert?from=${fromCur}&to=${toCur}&amount=${amt}`)
            .then(resp => resp.json())
            .then(data => {
                const convAmt = data.conversion_result;
                resDiv.textContent = `${amt} ${fromCur} = ${convAmt} ${toCur}`;
            });
    });
});