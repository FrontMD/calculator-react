import { useState, useRef, useEffect } from 'react';

import {Chart as ChartJS} from 'chart.js/auto'
import {Bar, Line} from 'react-chartjs-2'

ChartJS.register();

// Хук для двусторонней связи полей

function useInput(initialValue, type = '') {
    const [value, setValue] = useState(initialValue);
    const [error, setError] = useState(false)

    function onChange(event) {
        
        if(type === 'float') {
            let currentValue = event.target.value.replace(/[^\.\d]/g, '');
            
            setValue(currentValue.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " "))
    
            if(currentValue.length < 1) {
                setError(true)
            } else {
                setError(false)
            }

        } else if(type === 'int') {
            let currentValue = event.target.value.replace(/\D/g, '');

            setValue(currentValue.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " "));

            if(currentValue.length < 1) {
                setError(true)
            } else {
                setError(false)
            }
        } else {
            let currentValue = event.target.value;
            setValue(currentValue);
        }
    }


    return {
        value, error, onChange
    }
}

// стили

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
        flexBasis: '50%',
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
	const exchangeRatesRubCny = useInput(12.58, 'float');
	const nominalElectricalPower = useInput(1100);
	const amount = useInput(1, 'int');
    const execution = useInput('container');
    const useThermalEnergy = useInput('allEYear');
    const gasPrice = useInput(6.00, 'float');
    const priceElectricity = useInput(6.00, 'float');
    const priceThermalEnergy = useInput(1500.00, 'float');

    const [modelGPUArr, setModelGPUArr] = useState(modelsData.find(item => item.electricPower == nominalElectricalPower.value))

    //массив исходных данных

	const [initialData, setInitialData] = useState([
        {
            id: 'modelGPU',
            name: 'Модель ГПУ',
            value: modelGPUArr.model
        },
        {
            id: 'nominalElectricalPowerGPU',
            name: 'Номинальная электрическая мощность ГПУ',
            value: modelGPUArr.electricPower + ' кВт'
        },
        {
            id: 'numberGPUs',
            name: 'Количество ГПУ',
            value: amount.value + ' шт'
        },
        {
            id: 'nominalThermalPower',
            name: 'Номинальная тепловая мощность',
            value: `${modelGPUArr.thermalPower} кВт / ${modelGPUArr.thermalPower * 0.00086} Гкал`
        },
        {
            id: 'gasConsumption',
            name: 'Расход газа',
            value: modelGPUArr.gasСonsumption + ' нм3'
        },
        {
            id: 'SNGPU',
            name: 'СН ГПУ',
            value: ''
        },
        {
            id: 'maxOutputPowerGPES',
            name: 'Макс. отпуск. мощность ГПЭС (-СН)',
            value: ''
        },
        {
            id: 'oilConsumption',
            name: 'Расход масла на угар/Объем при замене',
            value: ''
        },
        {
            id: 'oilChangeIntervals',
            name: 'Переодичность замены масла',
            value: modelGPUArr.oilResource
        }
    ]);
    
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
                            <input type="input" id="exchangeRatesRubCny" value={exchangeRatesRubCny.value} onChange={exchangeRatesRubCny.onChange} style={!exchangeRatesRubCny.error ? styles.inputAndSelect : styles.inputAndSelectError} />
						</div>

						<div style={styles.formField}>
                            <label htmlFor="nominalElectricalPower">Номин. эл. мощность ГПУ</label>
                            <select name="" id="nominalElectricalPower" value={nominalElectricalPower.value} onChange={nominalElectricalPower.onChange} style={styles.inputAndSelect}>
                                <option value="1100">1100 кВт</option>
                                <option value="1500">1500 кВт</option>
                                <option value="2000">2000 кВт</option>
                            </select>
						</div>
						
						<div style={styles.formField}>
                            <label htmlFor="amount">Количество (шт.)</label>
                            <input type="input" id="amount" value={amount.value} onChange={amount.onChange} style={!amount.error ? styles.inputAndSelect : styles.inputAndSelectError}/>
						</div>

                        <div style={styles.formField}>
                            <label htmlFor="execution">Исполнение</label>
                            <select name="" id="execution" value={execution.value} onChange={execution.onChange} style={styles.inputAndSelect}>
                                <option value="open">Открытое</option>
                                <option value="container">Контейнерное</option>
                                <option value="containerHeatRecovery">Контейнерное с утилизацией тепла</option>
                            </select>
						</div>

                        <div style={styles.formField}>
                            <label htmlFor="useThermalEnergy">Использование тепловой энергии ГПУ</label>
                            <select name="" id="UseThermalEnergy" value={useThermalEnergy.value} onChange={useThermalEnergy.onChange} style={styles.inputAndSelect}>
                                <option value="allEYear">Круглый год</option>
                                <option value="heatingSeason">Отопительный сезон</option>
                            </select>
						</div>

                        <div style={styles.formField}>
                            <label htmlFor="gasPrice">Стоимость 1 нм3 газа (в рублях без НДС)</label>
                            <input type="input" id="gasPrice" value={gasPrice.value} onChange={gasPrice.onChange} style={!gasPrice.error ? styles.inputAndSelect : styles.inputAndSelectError}/>
						</div>

                        <div style={styles.formField}>
                            <label htmlFor="priceElectricity">Стимость 1 кВт э/э (в рублях без НДС)</label>
                            <input type="input" id="priceElectricity" value={priceElectricity.value} onChange={priceElectricity.onChange} style={!priceElectricity.error ? styles.inputAndSelect : styles.inputAndSelectError}/>
						</div>

                        <div style={styles.formField}>
                            <label htmlFor="priceThermalEnergy">Стимость 1 Гкал т/э (руб.)</label>
                            <input type="input" id="priceThermalEnergy" value={priceThermalEnergy.value} onChange={priceThermalEnergy.onChange} style={!priceThermalEnergy.error ? styles.inputAndSelect : styles.inputAndSelectError}/>
						</div>

						<Button type="submit" classes="btn form__btn" style={styles.btn}>Рассчитать</Button>
					</form>

					{initialData.length > 0 ? <InitialDataTable title='Исходные данные' data={initialData} /> : null}

				</div>
			</section>
		</main>
	)

    // Валидация формы
	function formValidate(e) {
		e.preventDefault();
		if(
            exchangeRatesRubCny.error
            || nominalElectricalPower.error
            || amount.error
            || execution.error
            || useThermalEnergy.error
            || gasPrice.error
            || priceElectricity.error
            || priceThermalEnergy.error
        ) {
			console.log("ошибка")
		} else {
			calculate()
		}
	}
    
    function calculate() {
        //тут расчёты
        console.log('расчёты')    
    }
}


function Button({ children, type, ...props }) {
    return (
      <button type={type} {...props}>{children}</button> 
    )
}

function InitialDataTable({ title, data }) {
    return (
        <div style={styles.calculatorResults}>
            <div style={styles.schedule}>
                <h2 style={styles.resultsTitle}>{title}</h2>
                <div style={styles.scheduleTable}>
                    {
                        data.map(item => {
                            return (
                                <div style={styles.tableRow} key={item.id}>
                                    <div style={styles.tableCol}>{item.name}</div>
                                    <div style={styles.tableCol}>{item.value}</div>
                                </div>
                            )
                        })
                    }

                </div>
            </div>
            {/*<div style={styles.diagram}>
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
            </div>*/}
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
        InstallationCost: {
            open: 2875680,
            container: 3905280,
            containerHeatRecovery: 4139280
        },
        costSpareParts: {
            w10: 2725,
            w30: 3774,
            w40: 45951,
            w50: 233600,
            w60: 388412,
            w70: 773278,
            turbineRepair: 48440,
            generatorRepair: 84000,
        },
        costWork: {
            w10: 28000,
            w30: 56000,
            w40: 56000,
            w50: 360000,
            w60: 450000,
            w70: 900000,
            turbineRepair: 151463,
            generatorRepair: 400000,
        }
    },
    {
        model: 'LY1600GH-T',
        electricPower: 1500,
        thermalPower: 1670,
        electricEfficiency: 41.3,
        thermalEfficiency: 46.0,
        gasСonsumption: 291,
        oilConsumptionBurning: 0.2,
        oilVolumeCrankcase: 240,
        antifreezeVolume: 180,
        oilResource: 3000,
        oilPrice: 450,
        antifreezePrice: 300,
        InstallationCost: {
            open:  3418320,
            container:  4552800,
            containerHeatRecovery:  4834800
        },
        costSpareParts: {
            w10: 2449,
            w30: 4216,
            w40: 54204,
            w50: 302115,
            w60: 502049,
            w70: 1005138,
            turbineRepair: 48440,
            generatorRepair: 84000,
        },
        costWork: {
            w10: 28000,
            w30: 56000,
            w40: 56000,
            w50: 450000,
            w60: 540000,
            w70: 1200000,
            turbineRepair: 151463,
            generatorRepair: 400000,
        }
    },
    {
        model: 'LY2000GH-T',
        electricPower: 2000,
        thermalPower: 2200,
        electricEfficiency: 41.6,
        thermalEfficiency: 45.8,
        gasСonsumption: 517,
        oilConsumptionBurning: 0.2,
        oilVolumeCrankcase: 300,
        antifreezeVolume: 250,
        oilResource: 3000,
        oilPrice: 450,
        antifreezePrice: 300,
        InstallationCost: {
            open: 4009410,
            container: 5679120,
            containerHeatRecovery: 6009120
        },
        costSpareParts: {
            w10: 2396,
            w30: 3872,
            w40: 63748,
            w50: 441481,
            w60: 701866,
            w70: 1270660,
            turbineRepair: 96880,
            generatorRepair: 84000,
        },
        costWork: {    
            w10: 28000,
            w30: 56000,
            w40: 56000,
            w50: 540000,
            w60: 630000,
            w70: 1400000,
            turbineRepair: 302926,
            generatorRepair: 400000,
        }
    }
]

