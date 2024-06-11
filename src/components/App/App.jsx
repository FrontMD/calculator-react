import { useState, useRef } from 'react';

import {Chart as ChartJS} from 'chart.js/auto'
import {Bar, Line, Pie} from 'react-chartjs-2'

ChartJS.register();

let styles = {
    container: {
        maxWidth: '1440px',
        margin: '0 auto',
        padding: '0 30px'

    },
    calculator: {
        padding: '70px 0',

        backgroundColor: 'white'
    },
    calculatorTitle: {
        fontSize: '50px',
        lineHeight: '1.1'
    },
    calculatorForm: {
        marginTop: '50px',
        maxWidth: '350px',
        display: 'flex',
        flexDirection: 'column',
        gap: '20px'
    },
    formField: {
        display: 'flex',
        flexDirection: 'column',
        gap: '10px'
    },
    inputAndSelect: {
        padding: '15px 20px',
        width: '100%',
        outline: 'none',
        border: '1px solid lightgrey'
    },
    inputAndSelectError: {
        padding: '15px 20px',
        width: '100%',
        outline: 'none',
        border: '1px solid red'
    },
    btn: {
        padding: '15px 30px',
        fontFamily: '"Raleway", sans-serif',
        fontSize: '16px',
        color: 'white',
        backgroundColor: '#07664E',
        outline: 'none',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
        transition: 'background-color 0.2s ease'
    },

    calculatorResults: {
        marginTop: '50px',
        display: 'flex',
        alignItems: 'flex-start',
        justifyContent: 'space-between',
        flexDirection: 'row',
        gap: '50px'
    },
    
    resultsTitle: {
        fontSize: '35px',
        lineHeight: '1.1'
    },
    
    schedule: {
        flex: '0 0 650px'
    },
        
    scheduleTable: {
        fontSize: '16px',
        lineHeight: '1.2em',
        fontWeight: '400',
        borderTop: '1px solid lightgrey',
        width: '100%',
        marginTop: '30px'
    },

    tableRow: {
        display: 'flex',
        alignItems: 'stretch',
        borderLeft: '1px solid lightgrey'
    },

    tableCol: {
        padding: '10px',
        flexShrink: '0',
        flexGrow: '0',
        flexBasis: '30%',
        borderRight: '1px solid lightgrey',
        borderBottom: '1px solid lightgrey',
    },

    tableColMonth: {
        padding: '10px',
        flexShrink: '0',
        flexGrow: '0',
        flexBasis: '16%',
        borderRight: '1px solid lightgrey',
        borderBottom: '1px solid lightgrey',
    },

    tableColInterest: {
        padding: '10px',
        flexShrink: '0',
        flexGrow: '0',
        flexBasis: '24%',
        borderRight: '1px solid lightgrey',
        borderBottom: '1px solid lightgrey',
    },

    tableTitle: {
        fontWeight: '700'
    },
    
    diagram: {
        flexBasis: 'auto',
        flexGrow: '1',
        flexShrink: '1'
    },

    diagramContainer: {
        display: 'flex',
        flexDirection: 'column',
        gap: '40px',
        marginTop: '30px'
    }
}

export default function App() {
	const [amountOfCredit, setAmountOfCredit] = useState('');
	const [interestRate, setInterestRate] = useState('');
	const [creditTerm, setCreditTerm] = useState(12);
	const [amountOfCreditError, setAmountOfCreditError] = useState(false);
	const [interestRateError, setInterestRateError] = useState(false);
	const [payments, setPayments] = useState([]);

    
    const windowWidth = useRef(window.innerWidth);

    if(windowWidth.current < 1200) {
        styles.calculatorResults.flexDirection = 'column'
        styles.schedule.flex = '0 0 auto'
        styles.schedule.width = '100%'
        styles.schedule.maxWidth = '650px'
        styles.diagram.width = '100%'
        styles.diagram.maxWidth = '650px'
    }

	return (
		<main> 
			<section className='calculator' style={styles.calculator}>
				<div className="container calculator__container" style={styles.container}>
					<h1 className='calculator__title' style={styles.calculatorTitle}>Кредитный калькулятор</ h1>
					<form onSubmit={e => formValidate(e)} action="" noValidate className="form calculator__form" style={styles.calculatorForm}>
						<div className="form-field" style={styles.formField}>
                            <label htmlFor="amountOfCredit">Сумма кредита (руб)</label>
                            <input type="input" id="amountOfCredit" value={amountOfCredit} onChange={amountOfCreditChange} style={!amountOfCreditError ? styles.inputAndSelect : styles.inputAndSelectError} />
						</div>
						
						<div className="form-field" style={styles.formField}>
						<label htmlFor="interestRate">Процентная ставка</label>
						<input type="input" id="interestRate" value={interestRate} onChange={interestRateChange} style={!interestRateError ? styles.inputAndSelect : styles.inputAndSelectError}/>
						</div>

						<div className="form-field" style={styles.formField}>
						<label htmlFor="creditTerm">Срок кредита</label>
						<select name="" id="creditTerm" value={creditTerm} onChange={creditTermChange} style={styles.inputAndSelect}>
							<option value="12">1 год</option>
							<option value="18">1.5 года</option>
							<option value="24">2 года</option>
						</select>
						</div>
						<Button type="submit" classes="btn form__btn" style={styles.btn}>Рассчитать</Button>
					</form>

					{payments.length > 0 ? <Results payments={payments} classes='calculator__results' /> : null }

				</div>
			</section>
		</main>
	)


	function amountOfCreditChange(event) {
		let currentValue = event.target.value.replace(/\D/g, '');

		setAmountOfCredit(currentValue.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " "));

		if(currentValue.length < 1) {
			setAmountOfCreditError(true)
		} else {
			setAmountOfCreditError(false)
		}
	}

	function interestRateChange(event) {
		let currentValue = event.target.value.replace(/\D/g, '');

		setInterestRate(currentValue);
		if(currentValue.length < 1) {
			setInterestRateError(true)
		} else {
			setInterestRateError(false)
		}
	}

	function creditTermChange(event) {
		let currentValue = event.target.value;
		console.log(currentValue)
		setCreditTerm(currentValue);
	}

	function formValidate(e) {
		e.preventDefault();
		if(amountOfCredit.length < 1 || interestRate < 1) {
			if(amountOfCredit.length < 1) setAmountOfCreditError(true);
			if(interestRate.length < 1) setInterestRateError(true);
			return
		} else {
			setPayments(calculate())
		}
	}
    
    function calculate() {
        let amountOfCreditVal = parseFloat(amountOfCredit.replace(/\s/g, ''));
        let interestRateVal = parseFloat(interestRate) / 100;
        let creditTermVal = parseFloat(creditTerm);
        let billingPeriod = parseInt(data.billingPeriod);
        let daysYear = parseInt(data.daysYear);

        console.log(creditTerm)
        console.log(amountOfCreditVal)
        console.log(interestRateVal)
        console.log(creditTermVal)

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

        return payments;

    }
}


function Button({ children, type, classes, ...props }) {
    return (
      <button type={type} className={classes} {...props}>{children}</button> 
    )
}

function Results({ payments, classes }) {
    return (
        <div className={"results" + ' ' + classes} style={styles.calculatorResults}>
            <div className="schedule" style={styles.schedule}>
                <h2 className='results__title' style={styles.resultsTitle}> График платежей </h2>
                <div className="schedule__table schedule-table" style={styles.scheduleTable}>
                    <div className="schedule-table__row" style={styles.tableRow}>
                        <div className="schedule-table__col schedule-table__col--month schedule-table__title" style={styles.tableColMonth}><span style={styles.tableTitle}>Месяц</span></div>
                        <div className="schedule-table__col schedule-table__title" style={styles.tableCol}><span style={styles.tableTitle}>Текущий остаток</span></div>
                        <div className="schedule-table__col schedule-table__title" style={styles.tableCol}><span style={styles.tableTitle}>Платёж</span></div>
                        <div className="schedule-table__col schedule-table__col--Interest schedule-table__title" style={styles.tableColInterest}><span style={styles.tableTitle}>Проценты</span></div>
                    </div>
                    {
                        payments.map(paypent => {
                            return (
                                <div className="schedule-table__row" style={styles.tableRow} key={paypent.month}>
                                    <div className="schedule-table__col schedule-table__col--month schedule-table__text" style={styles.tableColMonth}>{paypent.month}</div>
                                    <div className="schedule-table__col schedule-table__text" style={styles.tableCol}>{paypent.currentDebt.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ") + ' руб.'}</div>
                                    <div className="schedule-table__col schedule-table__text" style={styles.tableCol}>{paypent.summ.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ") + ' руб.'}</div>
                                    <div className="schedule-table__col schedule-table__col--Interest schedule-table__text" style={styles.tableColInterest}>{paypent.interestСharges.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ") + ' руб.'}</div>
                                </div>
                            )
                        })
                    }

                </div>
            </div>
            <div className="diagram" style={styles.diagram}>
                <h2 className='results__title' style={styles.resultsTitle}> Диаграмма платежей </h2>
                <div className="diagram__container" style={styles.diagramContainer}>
                    <Bar
                        data={
                            {
                                labels: payments.map(payment => payment.month),
                                datasets: [
                                    {
                                        label: "Основной долг",
                                        data: payments.map(payment => parseFloat(payment.currentDebt))
                                    },
                                    {
                                        label: "Проценты",
                                        data: payments.map(payment => parseFloat(payment.interestСharges))
                                    }
                                ]
                            }
                        }
                        options={
                            {
                                scales: {
                                    x: {
                                    stacked: true,
                                    },
                                    y: {
                                    stacked: true,
                                    },
                                },
                            }
                        }  
                    />
                    <Line
                        data={
                            {
                                labels: payments.map(payment => payment.month),
                                datasets: [
                                    {
                                        label: "Основной долг",
                                        data: payments.map(payment => payment.currentDebt)
                                    },
                                    {
                                        label: "Проценты",
                                        data: payments.map(payment => payment.interestСharges)
                                    }
                                ]
                            }
                        }
                    />
                    <Pie
                        data={
                            {
                                labels: ["Основной долг", "Проценты"],
                                datasets: [
                                    {
                                        label: "a",
                                        data: [
                                            payments[0].currentDebt,
                                            payments.reduce((acc, payment) => acc + payment.interestСharges, 0),
                                        ]
                                    },
                                ]
                            }
                        }
                    />
                </div>
            </div>
        </div>
	)
}

const data = {
    "daysYear": "365",
    "billingPeriod": "30"
}
