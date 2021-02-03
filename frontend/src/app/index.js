import React, { useState, useEffect } from 'react';
import FormFieldInput from "../components/FormFieldInput";

const App = () => {

    const [currencies, setCurrencies] = useState([]);
    const [current, setCurrent] = useState("");
    const [amount, setAmount] = useState(1);
    const [exchangeRate, setExchangeRate] = useState([]);

    useEffect(() => {
        getCurriencies();
    }, []);

    const getCurriencies = async () => {
        try {
            const { currency } = await window.$http.getWithoutHeaders('/common/currency-list');

            setCurrencies(currency.map(a => ({ key: a.id, value: a.value, label: a.name })));

        } catch (err) {
            console.log(err);
        }
    };

    const handleValueChange = (val) => {
        if (isNaN(val)) return;
        setAmount(val);
    };

    const handleOptionChange = async (val) => {
        try {
            setCurrent(val);
            const { data } = await window.$utility.getCurrencyExchange(val);
            setExchangeRate(data.rates);
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <div className="container text-center my-4">
            <div className="row" >
                <div className="col-md-6">
                    <FormFieldInput
                        options={currencies}
                        handleChange={handleOptionChange}
                        placeholder="Select the Currency"
                        inputType="select"
                        label="Select the currency"
                    />
                </div>
                <div className="col-md-6">
                    <FormFieldInput
                        handleChange={handleValueChange}
                        placeholder="Select Amount"
                        label="Select the Amount"
                    />
                </div>
            </div>
            {
                current ?
                    <>
                        <div className="row" >
                            <div className="col-md-8 text-center">
                                <div> The Exchange Rate of {amount} {current} with the other curriencies are as follows:  </div>
                            </div>
                            <div className="col-md-8 text-center">
                                {
                                    Object.keys(exchangeRate).map(a => (
                                        <p key={a}> {a} : { exchangeRate[a] * amount}</p>
                                    ))
                                }
                            </div>
                        </div>
                    </> : ""
            }
        </div>
    );
};

export default App;
