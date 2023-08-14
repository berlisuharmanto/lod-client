const currencify = (value) => {
    let num = new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(value);
    return num;
}

export default currencify;