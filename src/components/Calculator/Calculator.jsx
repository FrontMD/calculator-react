import { useState, useRef, useEffect, useCallback } from 'react';

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

    initialResults: {
        marginTop: '50px',
        display: 'flex',
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
        flexWrap: 'wrap',
        gap: '0 30px',
        boxSizing: 'border-box'
    },

    detailedResults: {
        marginTop: '50px',
        display: 'flex',
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
        flexWrap: 'wrap',
        gap: '0 30px',
        boxSizing: 'border-box'
    },
    
    resultsTitle: {
        flexBasis: '100%',
        fontSize: '35px',
        lineHeight: '1.1',
        boxSizing: 'border-box'
    },
        
    scheduleTable: {
        fontSize: '16px',
        lineHeight: '1.2em',
        fontWeight: '400',
        borderTop: '1px solid lightgrey',
        flexBasis: '50%',
        maxWidth: '650px',
        marginTop: '30px',
        boxSizing: 'border-box'
    },

    detailedTable: {
        fontSize: '16px',
        lineHeight: '1.2em',
        fontWeight: '400',
        borderTop: '1px solid lightgrey',
        flexBasis: '100%',
        maxWidth: '1330px',
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
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '10px',
        flexShrink: '0',
        flexGrow: '0',
        flexBasis: '50%',
        borderRight: '1px solid lightgrey',
        borderBottom: '1px solid lightgrey',
        boxSizing: 'border-box'
    },

    detailedTableCol: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '10px',
        flexShrink: '0',
        flexGrow: '0',
        flexBasis: 'calc(100% / 11)',
        borderRight: '1px solid lightgrey',
        borderBottom: '1px solid lightgrey',
        boxSizing: 'border-box'
    },

    maintenanceTableCol: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '10px',
        flexShrink: '0',
        flexGrow: '0',
        flexBasis: 'calc(100% / 12)',
        borderRight: '1px solid lightgrey',
        borderBottom: '1px solid lightgrey',
        boxSizing: 'border-box'
    },

    maintenanceTableCol2: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '10px',
        flexShrink: '0',
        flexGrow: '0',
        flexBasis: 'calc(100% / 12 * 2)',
        borderRight: '1px solid lightgrey',
        borderBottom: '1px solid lightgrey',
        boxSizing: 'border-box'
    },

    maintenanceTableCol3: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '10px',
        flexShrink: '0',
        flexGrow: '0',
        flexBasis: 'calc(100% / 12 * 3)',
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

    //расчётная модель
    const [modelGPUArr, setModelGPUArr] = useState(modelsData.find(item => item.electricPower == nominalElectricalPower.value))
    useEffect(() => {
        setModelGPUArr(modelsData.find(item => item.electricPower == nominalElectricalPower.value))
    }, [nominalElectricalPower])
    
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
            value: modelGPUArr.thermalPower + ' кВт',
            value2: Math.round(modelGPUArr.thermalPower * 0.00086 * 1000) / 1000 + ' Гкал'
        },
        {
            id: 'gasConsumption',
            name: 'Расход газа',
            value: modelGPUArr.gasСonsumption + ' нм3'
        },
        {
            id: 'SNGPU',
            name: 'СН ГПУ',
            value: variables.SNGPU + "%"
        },
        {
            id: 'maxOutputPowerGPES',
            name: 'Макс. отпуск. мощность ГПЭС (-СН)',
            value: `${modelGPUArr.electricPower * amount.value * (1 - (variables.SNGPU / 100))} кВт`
        },
        {
            id: 'oilConsumption',
            name: 'Расход масла на угар/Объем при замене',
            value: modelGPUArr.oilConsumptionBurning + ' г/кВтч',
            value2: modelGPUArr.oilVolumeCrankcase + ' л'
        },
        {
            id: 'oilChangeIntervals',
            name: 'Переодичность замены масла',
            value: variables.oilResource
        },
        {
            id: 'capex',
            name: 'CAPEX',
            value: Math.round(modelGPUArr.installationCost[execution.value] * exchangeRatesRubCny.value * amount.value).toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ") + " руб"
        }
    ])

     //массив тарифов
     const [tariffData, setTariffData] = useState([
        {
            id: 'gasVolume',
            name: '1 нм3 газа',
            price: gasPrice.value,
            indexing: variables.indexing.gas,
        },
        {
            id: 'electricVolume',
            name: '1 кВт э/э',
            price: priceElectricity.value,
            indexing: variables.indexing.electricPower,
        },
        {
            id: 'thermalVolume',
            name: '1 Гкал т/э',
            price: priceThermalEnergy.value,
            indexing: variables.indexing.thermalPower,
        },
        {
            id: 'oilVolume',
            name: '1 л масла',
            price: variables.oilPrice,
            indexing: variables.indexing.oil,
        },
        {
            id: 'antifreezeVolume',
            name: '1л антифриза',
            price: variables.oilPrice,
            indexing: variables.indexing.antifreeze,
        }
    ])

    //массив ТО
    const [maintenanceData, setMaintenanceData] = useState([
        {
            id: 'W10',
            name: 'W10',
            spareParts: Math.ceil(modelGPUArr.costSpareParts.w10 * exchangeRatesRubCny.value),
            work: modelGPUArr.costWork.w10,
            years: distributionMaintenanceYear(maintenance.w10, variables.annualProductionGPU),
            count: maintenance.w10.length
        },
        {
            id: 'W30',
            name: 'W30',
            spareParts: Math.ceil(modelGPUArr.costSpareParts.w30 * exchangeRatesRubCny.value),
            work: modelGPUArr.costWork.w30,
            years: distributionMaintenanceYear(maintenance.w30, variables.annualProductionGPU),
            count: maintenance.w30.length
        },
        {
            id: 'W40',
            name: 'W40',
            spareParts: Math.ceil(modelGPUArr.costSpareParts.w40 * exchangeRatesRubCny.value),
            work: modelGPUArr.costWork.w40,
            years: distributionMaintenanceYear(maintenance.w40, variables.annualProductionGPU),
            count: maintenance.w40.length
        },
        {
            id: 'W50',
            name: 'W50',
            spareParts: Math.ceil(modelGPUArr.costSpareParts.w50 * exchangeRatesRubCny.value),
            work: modelGPUArr.costWork.w50,
            years: distributionMaintenanceYear(maintenance.w50, variables.annualProductionGPU),
            count: maintenance.w50.length
        },
        {
            id: 'W60',
            name: 'W60',
            spareParts: Math.ceil(modelGPUArr.costSpareParts.w60 * exchangeRatesRubCny.value),
            work: modelGPUArr.costWork.w60,
            years: distributionMaintenanceYear(maintenance.w60, variables.annualProductionGPU),
            count: maintenance.w60.length
        },
        {
            id: 'W70',
            name: 'W70',
            spareParts: variables.w70Coast ? Math.ceil(modelGPUArr.costSpareParts.w70 * exchangeRatesRubCny.value) : '0',
            work: variables.w70Coast ? modelGPUArr.costWork.w70 : '0',
            years: distributionMaintenanceYear(maintenance.w70, variables.annualProductionGPU),
            count: maintenance.w70.length
        },
        {
            id: 'turbines',
            name: 'Турбины',
            spareParts: Math.ceil(modelGPUArr.costSpareParts.turbineRepair * exchangeRatesRubCny.value),
            work: modelGPUArr.costWork.turbineRepair,
            years: distributionMaintenanceYear(maintenance.turbines, variables.annualProductionGPU),
            count: maintenance.turbines.length
        },
        {
            id: 'generator',
            name: 'Генераторы',
            spareParts: Math.ceil(modelGPUArr.costSpareParts.generatorRepair * exchangeRatesRubCny.value),
            work: modelGPUArr.costWork.generatorRepair,
            years: distributionMaintenanceYear(maintenance.generator, variables.annualProductionGPU),
            count: maintenance.generator.length
        },
        {
            id: 'oil',
            name: 'Колличество замен масла на одной ГПУ',
            spareParts: '',
            work: '',
            years: [
                Math.floor(variables.annualProductionGPU / variables.oilResource),
                Math.floor((variables.annualProductionGPU * 2 - (Math.floor(variables.annualProductionGPU / variables.oilResource) *  variables.oilResource)) / variables.oilResource),
                Math.floor((variables.annualProductionGPU * 3 - (Math.floor(variables.annualProductionGPU * 2 / variables.oilResource) *  variables.oilResource)) / variables.oilResource),
                Math.floor((variables.annualProductionGPU * 4 - (Math.floor(variables.annualProductionGPU * 3 / variables.oilResource) *  variables.oilResource)) / variables.oilResource),
                Math.floor((variables.annualProductionGPU * 5 - (Math.floor(variables.annualProductionGPU * 4 / variables.oilResource) *  variables.oilResource)) / variables.oilResource),
                Math.floor((variables.annualProductionGPU * 6 - (Math.floor(variables.annualProductionGPU * 5 / variables.oilResource) *  variables.oilResource)) / variables.oilResource),
                Math.floor((variables.annualProductionGPU * 7 - (Math.floor(variables.annualProductionGPU * 6 / variables.oilResource) *  variables.oilResource)) / variables.oilResource),
                Math.floor((variables.annualProductionGPU * 8 - (Math.floor(variables.annualProductionGPU * 7 / variables.oilResource) *  variables.oilResource)) / variables.oilResource) - 1
            ],
            count: Math.floor(variables.annualProductionGPU * 8 / variables.oilResource) - 1
        }

    ])

    //массив ТЭП до кап. ремонта
    const [tepData, setTepData] = useState([
        {
            id: 'GPUOperatingTime',
            name: 'Наработка ГПУ, мч',
            years: calculationOperatingHours(variables.annualProductionGPU),
            sum: ''
        },
        {
            id: 'GPUOperatingYear',
            name: 'Наработка ГПУ за год, мч',
            years: [
                variables.annualProductionGPU,
                variables.annualProductionGPU,
                variables.annualProductionGPU,
                variables.annualProductionGPU,
                variables.annualProductionGPU,
                variables.annualProductionGPU,
                variables.annualProductionGPU,
                variables.annualProductionGPU
            ],
            sum: variables.annualProductionGPU * 8
        },
        {
            id: 'electricityGeneration',
            name: 'Выработка э/э ГПЭС, кВтч',
            years: [
                variables.annualProductionGPU * modelGPUArr.electricPower * amount.value,
                variables.annualProductionGPU * modelGPUArr.electricPower * amount.value,
                variables.annualProductionGPU * modelGPUArr.electricPower * amount.value,
                variables.annualProductionGPU * modelGPUArr.electricPower * amount.value,
                variables.annualProductionGPU * modelGPUArr.electricPower * amount.value,
                variables.annualProductionGPU * modelGPUArr.electricPower * amount.value,
                variables.annualProductionGPU * modelGPUArr.electricPower * amount.value,
                variables.annualProductionGPU * modelGPUArr.electricPower * amount.value
            ],
            sum: variables.annualProductionGPU * modelGPUArr.electricPower * amount.value * 8
        },
        {
            id: 'usefulOutputElectricity',
            name: 'Полезный отпуск э/э ГПЭС (- СН), кВтч',
            years: [
                modelGPUArr.electricPower * amount.value * (1 - (variables.SNGPU / 100)) * variables.annualProductionGPU,
                modelGPUArr.electricPower * amount.value * (1 - (variables.SNGPU / 100)) * variables.annualProductionGPU,
                modelGPUArr.electricPower * amount.value * (1 - (variables.SNGPU / 100)) * variables.annualProductionGPU,
                modelGPUArr.electricPower * amount.value * (1 - (variables.SNGPU / 100)) * variables.annualProductionGPU,
                modelGPUArr.electricPower * amount.value * (1 - (variables.SNGPU / 100)) * variables.annualProductionGPU,
                modelGPUArr.electricPower * amount.value * (1 - (variables.SNGPU / 100)) * variables.annualProductionGPU,
                modelGPUArr.electricPower * amount.value * (1 - (variables.SNGPU / 100)) * variables.annualProductionGPU,
                modelGPUArr.electricPower * amount.value * (1 - (variables.SNGPU / 100)) * variables.annualProductionGPU,
            ],
            sum: modelGPUArr.electricPower * amount.value * (1 - (variables.SNGPU / 100)) * variables.annualProductionGPU * 8
        },
        {
            id: 'thermalGeneration',
            name: 'Выработка т/э ГПЭС, Гкал',
            years: [],
            sum: [].length
        },
        {
            id: 'gasСonsumption',
            name: 'Расход газа, нм3',
            years: [],
            sum: [].length
        },
        {
            id: 'oilСonsumption',
            name: 'Расход масла, л',
            years: [],
            sum: [].length
        },  
    ])

    //массив себестоимости
    const [costPriceData, setCostPriceData] = useState([])

    //массив окупаемости
    const [paybackData, setPaybackData] = useState([])        

    // подключение адаптивных стилей
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

					<InitialDataTable title='Исходные данные' data={initialData} />

                    <TariffTable title="Тарифы" data={tariffData} />

                    <MaintenanceTable title="Техническое обслуживание" data={maintenanceData} />

                    <TepTable title="Расчет технико-экономических показателей до капитального ремонта" data={tepData} resultRow={false} />

                    <TepTable title="Расчет себестоимости выработанной ГПУ электроэнергии" data={costPriceData} resultRow={false} />
                    
                    <TepTable title="Расчет простого срока окупаемости" data={paybackData} resultRow={true} />

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
        setInitialData([
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
                value: modelGPUArr.thermalPower + ' кВт',
                value2: Math.round(modelGPUArr.thermalPower * 0.00086 * 1000) / 1000 + ' Гкал'
            },
            {
                id: 'gasConsumption',
                name: 'Расход газа',
                value: modelGPUArr.gasСonsumption + ' нм3'
            },
            {
                id: 'SNGPU',
                name: 'СН ГПУ',
                value: variables.SNGPU + "%"
            },
            {
                id: 'maxOutputPowerGPES',
                name: 'Макс. отпуск. мощность ГПЭС (-СН)',
                value: `${modelGPUArr.electricPower * amount.value * (1 - (variables.SNGPU / 100))} кВт`
            },
            {
                id: 'oilConsumption',
                name: 'Расход масла на угар/Объем при замене',
                value: modelGPUArr.oilConsumptionBurning + ' г/кВтч',
                value2: modelGPUArr.oilVolumeCrankcase + ' л'
            },
            {
                id: 'oilChangeIntervals',
                name: 'Переодичность замены масла',
                value: variables.oilResource
            },
            {
                id: 'capex',
                name: 'CAPEX',
                value: Math.round(modelGPUArr.installationCost[execution.value] * exchangeRatesRubCny.value * amount.value).toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ") + " руб"
            }
        ]) 
        setTariffData([
            {
                id: 'gasVolume',
                name: '1 нм3 газа',
                price: gasPrice.value,
                indexing: variables.indexing.gas,
            },
            {
                id: 'electricVolume',
                name: '1 кВт э/э',
                price: priceElectricity.value,
                indexing: variables.indexing.electricPower,
            },
            {
                id: 'thermalVolume',
                name: '1 Гкал т/э',
                price: priceThermalEnergy.value,
                indexing: variables.indexing.thermalPower,
            },
            {
                id: 'oilVolume',
                name: '1 л масла',
                price: variables.oilPrice,
                indexing: variables.indexing.oil,
            },
            {
                id: 'antifreezeVolume',
                name: '1л антифриза',
                price: variables.oilPrice,
                indexing: variables.indexing.antifreeze,
            }
        ])
    }
}



function Button({ children, type, ...props }) {
    return (
      <button type={type} {...props}>{children}</button> 
    )
}

function InitialDataTable({ title, data}) {

    return (
        <div style={styles.initialResults}>
            <h2 style={styles.resultsTitle}>{title}</h2>
            <div style={styles.scheduleTable}>
                {
                    data.map(item => {
                        return (
                            <div style={styles.tableRow} key={item.id}>
                                <div style={styles.tableCol}>{item.name}</div>
                                <div style={styles.tableCol}>
                                    <span>{item.value}</span>
                                    {item.value2 ?  <span>{item.value2}</span> : null}
                                </div>
                            </div>
                        )
                    })
                }
            </div>
            <div style={styles.scheduleTable}>
                <div style={styles.tableRow}>
                    <div style={styles.tableCol}>Годовая наработка ГПУ</div>
                    <div style={styles.tableCol}>{variables.annualProductionGPU + ' мч'}</div>
                </div>

                <div style={styles.tableRow}>
                    <div style={styles.tableCol}>Часы использования тепла</div>
                    <div style={styles.tableCol}>{variables.hoursHeatUsage + ' мч'}</div>
                </div>

                <div style={styles.tableRow}>
                    <div style={styles.tableCol}>Стоимость W70</div>
                    <div style={styles.tableCol}>{variables.w70Coast ? 'включена' : 'не включена'}</div>
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

function TariffTable({title, data}) {
    return (
        <div style={styles.detailedResults}>
            <h2 style={styles.resultsTitle} key={title}>{title}</h2>
            <div style={styles.detailedTable}>
                <div style={styles.tableRow}>
                    <div style={styles.detailedTableCol}></div>
                    <div style={styles.detailedTableCol}>Тарифы</div>
                    <div style={styles.detailedTableCol}>Индексация</div>
                    <div style={styles.detailedTableCol}></div>
                    <div style={styles.detailedTableCol}></div>
                    <div style={styles.detailedTableCol}></div>
                    <div style={styles.detailedTableCol}></div>
                    <div style={styles.detailedTableCol}></div>
                    <div style={styles.detailedTableCol}></div>
                    <div style={styles.detailedTableCol}></div>
                    <div style={styles.detailedTableCol}></div>
                </div>
                {
                    data.map(item => {
                        return (
                            <div style={styles.tableRow} key={item.id}>
                                <div style={styles.detailedTableCol}>{item.name}</div>
                                <div style={styles.detailedTableCol}>{item.price} руб</div>
                                <div style={styles.detailedTableCol}>{item.indexing}%</div>
                                {
                                    calculateIndexingArr(parseFloat(item.price), parseFloat(item.indexing)).map((indexItem, index) => {
                                        return (
                                            <div style={styles.detailedTableCol} key={'year' + index}>{indexItem}</div>
                                        )
                                    })
                                } 
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}

function MaintenanceTable({title, data}) {
    return (
        <div style={styles.detailedResults}>
            <h2 style={styles.resultsTitle} key={title}>{title}</h2>
            <div style={styles.detailedTable}>
                <div style={styles.tableRow}>
                    <div style={styles.maintenanceTableCol}>Вид ТО</div>
                    <div style={styles.maintenanceTableCol}>ЗиП</div>
                    <div style={styles.maintenanceTableCol}>Работа</div>
                    <div style={styles.maintenanceTableCol}>1 год</div>
                    <div style={styles.maintenanceTableCol}>2 год</div>
                    <div style={styles.maintenanceTableCol}>3 год</div>
                    <div style={styles.maintenanceTableCol}>4 год</div>
                    <div style={styles.maintenanceTableCol}>5 год</div>
                    <div style={styles.maintenanceTableCol}>6 год</div>
                    <div style={styles.maintenanceTableCol}>7 год</div>
                    <div style={styles.maintenanceTableCol}>8 год</div>
                    <div style={styles.maintenanceTableCol}>ИТОГО</div>
                </div>
                {
                    data.map(item => {
                        return (
                            <div style={styles.tableRow} key={item.id}>
                                { 
                                
                                    item.spareParts && item.work ? (
                                        <>
                                        <div style={styles.maintenanceTableCol}>{item.name}</div>
                                        <div style={styles.maintenanceTableCol}>{item.spareParts !== '0' ? item.spareParts + ' руб' : '-'}</div>
                                        <div style={styles.maintenanceTableCol}>{item.work !== '0' ? item.work + ' руб' : '-'}</div>
                                        </>
                                        ) : (
                                            <div style={styles.maintenanceTableCol3}>{item.name}</div>
                                        )
                                }
                                {
                                    item.years.map((innerItem, index) => {
                                        return (
                                            <div style={styles.maintenanceTableCol} key={index}>{innerItem > 0 ? innerItem : ''}</div>
                                        )
                                    })
                                }
                                <div style={styles.maintenanceTableCol}>{item.count}</div>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}

function TepTable({title, data}) {
    return (
        <div style={styles.detailedResults}>
            <h2 style={styles.resultsTitle} key={title}>{title}</h2>
            <div style={styles.detailedTable}>
                <div style={styles.tableRow}>
                    <div style={styles.maintenanceTableCol3}>Показатель</div>
                    <div style={styles.maintenanceTableCol}>1 год</div>
                    <div style={styles.maintenanceTableCol}>2 год</div>
                    <div style={styles.maintenanceTableCol}>3 год</div>
                    <div style={styles.maintenanceTableCol}>4 год</div>
                    <div style={styles.maintenanceTableCol}>5 год</div>
                    <div style={styles.maintenanceTableCol}>6 год</div>
                    <div style={styles.maintenanceTableCol}>7 год</div>
                    <div style={styles.maintenanceTableCol}>8 год</div>
                    <div style={styles.maintenanceTableCol}>ИТОГО</div>
                </div>
                {
                    data.map(item => {
                        return (
                            <div style={styles.tableRow} key={item.id}>
                                <div style={styles.maintenanceTableCol3}>{item.name}</div>
                                {
                                    item.years.map((innerItem, index) => {
                                        return (
                                            <div style={styles.maintenanceTableCol} key={index}>{innerItem}</div>
                                        )
                                    })
                                }
                                <div style={styles.maintenanceTableCol}>{item.sum}</div>
                            </div>
                        )
                    })
                }
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
        installationCost: {
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
        installationCost: {
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
        installationCost: {
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

const variables = {
    SNGPU: 3,
    annualProductionGPU: 8000,
    hoursHeatUsage: 4392,
    w70Coast: false,
    oilPrice: 450,
    antifreezePrice: 300, 
    oilResource: 3000,
    indexing: {
        gas: 2,
        electricPower: 3,
        thermalPower: 2,
        oil: 4,
        antifreeze: 4
    }
}

const maintenance = {
    w10: [50, 16050, 32050, 48050],
    w30: [2000, 6000, 10000, 14000, 18000, 22000, 26000, 30000, 34000, 38000, 42000, 46000, 50000, 54000, 58000, 62000],
    w40: [4000, 8000, 12000, 20000, 24000, 28000, 36000, 40000, 44000, 52000, 56000, 60000],
    w50: [16000, 48000],   
    w60: [32000],
    w70: [64000],
    turbines: [12000, 24000, 36000, 48000, 60000],
    generator: [20000, 40000, 60000]
}

//Вспомогательные функции

function calculateIndexingArr(startPrice, indexing) {
    indexing = indexing / 100;
    let acc = startPrice * indexing + startPrice;
    let i;
    let resultArr = []
    for(i = 1; i <= 8; i++ ) {
        resultArr.push(Math.round(acc * 100) / 100)
        acc = acc * indexing + acc
    }

    return resultArr
}

function distributionMaintenanceYear(maintenanceArr, annualOperatingTime) {
    let resultArr = [];

    for(let i = 1; i <= 8; i++) {
        let filteredArr = maintenanceArr.filter(item => item > annualOperatingTime * i - annualOperatingTime && item <= annualOperatingTime * i);
        resultArr.push(filteredArr.length)
    }

    return resultArr
}

function calculationOperatingHours(yearHours) {
    let resultArr = [];
    
    for(let i = 1; i <= 8; i++) {
        resultArr.push(yearHours * i)
    }

    return resultArr
}