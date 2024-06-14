import { useState, useRef } from 'react';

import {Chart as ChartJS} from 'chart.js/auto'
import {Bar, Line, Pie} from 'react-chartjs-2'

ChartJS.register();

let styles = {
    container: {
        maxWidth: '1440px',
        margin: '0 auto',
        padding: '0 30px',
        boxSizing: 'border-box'

    },
    calculator: {
        padding: '70px 0',
        boxSizing: 'border-box',
        backgroundColor: 'white'
    },
    calculatorTitle: {
        fontSize: '50px',
        lineHeight: '1.1',
        boxSizing: 'border-box'
    },
    calculatorForm: {
        marginTop: '50px',
        maxWidth: '750px',
        display: 'grid',
        gridTemplateColumns: 'repeat(2, minmax(0, 1fr))',
        gap: '20px',
        boxSizing: 'border-box'
    },
    formField: {
        display: 'flex',
        flexDirection: 'column',
        gap: '10px',
        boxSizing: 'border-box'
    },
    inputAndSelect: {
        padding: '15px 20px',
        width: '100%',
        outline: 'none',
        border: '1px solid lightgrey',
        boxSizing: 'border-box'
    },
    inputAndSelectError: {
        padding: '15px 20px',
        width: '100%',
        outline: 'none',
        border: '1px solid red',
        boxSizing: 'border-box'
    },
    btn: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gridСolumnStart: '1',
        gridColumnEnd: '3',
        padding: '15px 30px',
        fontFamily: '"Raleway", sans-serif',
        fontSize: '16px',
        color: 'white',
        backgroundColor: '#07664E',
        outline: 'none',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
        transition: 'background-color 0.2s ease',
        boxSizing: 'border-box'
    },

    calculatorResults: {
        marginTop: '50px',
        display: 'flex',
        alignItems: 'flex-start',
        justifyContent: 'space-between',
        flexDirection: 'row',
        gap: '50px',
        boxSizing: 'border-box'
    },
    
    resultsTitle: {
        fontSize: '35px',
        lineHeight: '1.1',
        boxSizing: 'border-box'
    },
    
    schedule: {
        flex: '0 0 650px',
        boxSizing: 'border-box'
    },
        
    scheduleTable: {
        fontSize: '16px',
        lineHeight: '1.2em',
        fontWeight: '400',
        borderTop: '1px solid lightgrey',
        width: '100%',
        marginTop: '30px',
        boxSizing: 'border-box'
    },

    tableRow: {
        display: 'flex',
        alignItems: 'stretch',
        borderLeft: '1px solid lightgrey',
        boxSizing: 'border-box'
    },

    tableCol: {
        padding: '10px',
        flexShrink: '0',
        flexGrow: '0',
        flexBasis: '30%',
        borderRight: '1px solid lightgrey',
        borderBottom: '1px solid lightgrey',
        boxSizing: 'border-box'
    },

    tableColMonth: {
        padding: '10px',
        flexShrink: '0',
        flexGrow: '0',
        flexBasis: '16%',
        borderRight: '1px solid lightgrey',
        borderBottom: '1px solid lightgrey',
        boxSizing: 'border-box'
    },

    tableColInterest: {
        padding: '10px',
        flexShrink: '0',
        flexGrow: '0',
        flexBasis: '24%',
        borderRight: '1px solid lightgrey',
        borderBottom: '1px solid lightgrey',
        boxSizing: 'border-box'
    },

    tableTitle: {
        fontWeight: '700',
        boxSizing: 'border-box'
    },
    
    diagram: {
        flexBasis: 'auto',
        flexGrow: '1',
        flexShrink: '1',
        boxSizing: 'border-box'
    },

    diagramContainer: {
        display: 'flex',
        flexDirection: 'column',
        gap: '40px',
        marginTop: '30px',
        boxSizing: 'border-box'
    }
}

export default function Calculator() {
    // Поля ввода
	const [exchangeRatesRubCny, setExchangeRatesRubCny] = useState(12.58);
	const [nominalElectricalPower, setNominalElectricalPower] = useState(1100);
	const [amount, setAmount] = useState(1);
    const [execution, setExecution] = useState('container');
    const [useThermalEnergy, setUseThermalEnergy] = useState('allEYear');
    const [gasPrice, setGasPrice] = useState(6.00);
    const [priceElectricity, setPriceElectricity] = useState(6.00);
    const [priceThermalEnergy, setPriceThermalEnergy] = useState(1500.00);

    // Ошибки ввода
	const [exchangeRatesRubCnyError, setExchangeRatesRubCnyError] = useState(false);
	const [amountError, setAmountError] = useState(false);
    const [gasPriceError, setGasPriceError] = useState(false);
	const [priceElectricityError, setPriceElectricityError] = useState(false);
    const [priceThermalEnergyError, setPriceThermalEnergyError] = useState(false);

    //массив исходных данных
	const [initialData, setInitialData] = useState({
        modelGPU: '',
        nominalElectricalPowerGPU: '',
        numberGPUs: '',
        nominalThermalPower: '',
        gasConsumption: '',
        SNGPU: '',
        maxOutputPowerGPES: '',
        oilConsumption: '',
        oilChangeIntervals: ''
    });

    
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
			<section style={styles.calculator}>
				<div style={styles.container}>
					<h1  style={styles.calculatorTitle}>Калькулятор ТЭП</ h1>
					<form onSubmit={e => formValidate(e)} action="" noValidate style={styles.calculatorForm}>
						<div style={styles.formField}>
                            <label htmlFor="exchangeRatesRubCny">Курс рубля к ЮАНЬ (руб.)</label>
                            <input type="input" id="exchangeRatesRubCny" value={exchangeRatesRubCny} onChange={exchangeRatesRubCnyChange} style={!exchangeRatesRubCnyError ? styles.inputAndSelect : styles.inputAndSelectError} />
						</div>

						<div style={styles.formField}>
                            <label htmlFor="nominalElectricalPower">Номин. эл. мощность ГПУ</label>
                            <select name="" id="nominalElectricalPower" value={nominalElectricalPower} onChange={nominalElectricalPowerChange} style={styles.inputAndSelect}>
                                <option value="1100">1100 кВт</option>
                                <option value="1500">1500 кВт</option>
                                <option value="2000">2000 кВт</option>
                            </select>
						</div>
						
						<div style={styles.formField}>
                            <label htmlFor="amount">Количество (шт.)</label>
                            <input type="input" id="amount" value={amount} onChange={amountChange} style={!amountError ? styles.inputAndSelect : styles.inputAndSelectError}/>
						</div>

                        <div style={styles.formField}>
                            <label htmlFor="execution">Исполнение</label>
                            <select name="" id="execution" value={execution} onChange={executionChange} style={styles.inputAndSelect}>
                                <option value="open">Открытое</option>
                                <option value="container">Контейнерное</option>
                                <option value="containerHeatRecovery">Контейнерное с утилизацией тепла</option>
                            </select>
						</div>

                        <div style={styles.formField}>
                            <label htmlFor="useThermalEnergy">Использование тепловой энергии ГПУ</label>
                            <select name="" id="UseThermalEnergy" value={useThermalEnergy} onChange={useThermalEnergyChange} style={styles.inputAndSelect}>
                                <option value="allEYear">Круглый год</option>
                                <option value="heatingSeason">Отопительный сезон</option>
                            </select>
						</div>

                        <div style={styles.formField}>
                            <label htmlFor="gasPrice">Стоимость 1 нм3 газа (в рублях без НДС)</label>
                            <input type="input" id="gasPrice" value={gasPrice} onChange={gasPriceChange} style={!gasPriceError ? styles.inputAndSelect : styles.inputAndSelectError}/>
						</div>

                        <div style={styles.formField}>
                            <label htmlFor="priceElectricity">Стимость 1 кВт э/э (в рублях без НДС)</label>
                            <input type="input" id="priceElectricity" value={priceElectricity} onChange={priceElectricityChange} style={!priceElectricityError ? styles.inputAndSelect : styles.inputAndSelectError}/>
						</div>

                        <div style={styles.formField}>
                            <label htmlFor="priceThermalEnergy">Стимость 1 Гкал т/э (руб.)</label>
                            <input type="input" id="priceThermalEnergy" value={priceThermalEnergy} onChange={priceThermalEnergyChange} style={!priceThermalEnergyError ? styles.inputAndSelect : styles.inputAndSelectError}/>
						</div>

						<Button type="submit" classes="btn form__btn" style={styles.btn}>Рассчитать</Button>
					</form>

					{/*payments.length > 0 ? <Results payments={payments} classes='calculator__results' /> : null */}

				</div>
			</section>
		</main>
	)

    // Двусторонняя связь полей

	function exchangeRatesRubCnyChange(event) {
		let currentValue = event.target.value.replace(/\D/g, '');

		setExchangeRatesRubCny(currentValue.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " "));

		if(currentValue.length < 1) {
			setExchangeRatesRubCnyError(true)
		} else {
			setExchangeRatesRubCnyError(false)
		}
	}

    function nominalElectricalPowerChange(event) {
		let currentValue = event.target.value;
		setNominalElectricalPower(currentValue);
	}

	function amountChange(event) {
		let currentValue = event.target.value.replace(/\D/g, '');

		setAmount(currentValue);
		if(currentValue.length < 1) {
			setAmountError(true)
		} else {
			setAmountError(false)
		}
	}

    function executionChange(event) {
		let currentValue = event.target.value;
		setExecution(currentValue);
	}

    function useThermalEnergyChange(event) {
		let currentValue = event.target.value;
		setUseThermalEnergy(currentValue);
	}

    function gasPriceChange(event) {
		let currentValue = event.target.value.replace(/\D/g, '');

		setGasPrice(currentValue);
		if(currentValue.length < 1) {
			setGasPriceError(true)
		} else {
			setGasPriceError(false)
		}
	}

    function priceElectricityChange(event) {
		let currentValue = event.target.value.replace(/\D/g, '');

		setPriceElectricity(currentValue);
		if(currentValue.length < 1) {
			setPriceElectricityError(true)
		} else {
			setPriceElectricityError(false)
		}
	}

    function priceThermalEnergyChange(event) {
		let currentValue = event.target.value.replace(/\D/g, '');

		setPriceThermalEnergy(currentValue);
		if(currentValue.length < 1) {
			setPriceThermalEnergyError(true)
		} else {
			setPriceThermalEnergyError(false)
		}
	}

    // Валидация формы
	function formValidate(e) {
		e.preventDefault();
		if(exchangeRatesRubCny.length < 1 || amount < 1) {
			if(exchangeRatesRubCny.length < 1) setExchangeRatesRubCnyError(true);
			if(interestRate.length < 1) setAmountError(true);
			return
		} else {
			setPayments(calculate())
		}
	}
    
    function calculate() {
        //тут расчёты
    }
}


function Button({ children, type, ...props }) {
    return (
      <button type={type} {...props}>{children}</button> 
    )
}

function Results({ payments }) {
    return (
        <div style={styles.calculatorResults}>
            <div style={styles.schedule}>
                <h2 style={styles.resultsTitle}> График платежей </h2>
                <div style={styles.scheduleTable}>
                    <div style={styles.tableRow}>
                        <div style={styles.tableColMonth}><span style={styles.tableTitle}>Месяц</span></div>
                        <div style={styles.tableCol}><span style={styles.tableTitle}>Текущий остаток</span></div>
                        <div style={styles.tableCol}><span style={styles.tableTitle}>Платёж</span></div>
                        <div style={styles.tableColInterest}><span style={styles.tableTitle}>Проценты</span></div>
                    </div>
                    {
                        payments.map(paypent => {
                            return (
                                <div style={styles.tableRow} key={paypent.month}>
                                    <div style={styles.tableColMonth}>{paypent.month}</div>
                                    <div style={styles.tableCol}>{paypent.currentDebt.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ") + ' руб.'}</div>
                                    <div style={styles.tableCol}>{paypent.summ.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ") + ' руб.'}</div>
                                    <div style={styles.tableColInterest}>{paypent.interestСharges.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ") + ' руб.'}</div>
                                </div>
                            )
                        })
                    }

                </div>
            </div>
            <div style={styles.diagram}>
                <h2 style={styles.resultsTitle}> Диаграмма платежей </h2>
                <div style={styles.diagramContainer}>
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
                </div>
            </div>
        </div>
	)
}

const modelsData = [
    {
        model: 'LY1200GH-T',
        electricPower: 1100,
        thermalPower: 1200,
        electricEfficiency: 41.0,
        thermalEfficiency: 44.7,
        gasСonsumption: 288,
        oilConsumptionBurning: 0.2,
        oilVolumeCrankcase: 180,
        antifreezeVolume: 150,
        oilResource: 3000,
        oilPrice: 450,
        antifreezePrice: 300,
        InstallationСostOpen: 2875680,
        InstallationСostContainer: 3905280,
        InstallationСostContainerHeatRecovery: 4139280
    }
]

