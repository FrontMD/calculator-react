/*import data from "../data/data.json"

export default function calculate() {
    let amountOfCreditVal = parseFloat(amountOfCredit.value.replace(/\s/g, ''));
    let interestRateVal = parseFloat(interestRate.value) / 100;
    let creditTermVal = parseFloat(creditTerm.value);
    let billingPeriod = parseInt(data.billingPeriod);
    let daysYear = parseInt(data.daysYear);

    let payments = [];
    let currentDebt = amountOfCreditVal;
    let repaymentStep = Math.round(amountOfCreditVal / creditTermVal * 100) / 100;

    for(let i = 1; i <= creditTermVal; i++) {
        let interestСharges = Math.round(parseInt(currentDebt) * interestRateVal * billingPeriod / daysYear * 100) / 100;
        let summ = Math.round((interestСharges + repaymentStep) * 100) / 100;
        payments.push({
            "month": i,
            "summ": summ,
            "interestСharges": interestСharges,
            "currentDebt": currentDebt
        })

        currentDebt = Math.round((currentDebt - repaymentStep) * 100) / 100;
    }

    console.log(payments)

    return payments;

}*/