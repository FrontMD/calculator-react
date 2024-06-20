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
        maxWidth: '650px',
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
        fontSize: '15px',
        lineHeight: '1.2em',
        fontWeight: '400',
        borderTop: '1px solid lightgrey',
        flexBasis: '50%',
        maxWidth: '650px',
        marginTop: '30px',
        boxSizing: 'border-box'
    },

    detailedTable: {
        fontSize: '15px',
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
        padding: '5px 10px',
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
        padding: '5px 10px',
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
        padding: '5px 10px',
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
        padding: '5px 10px',
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
        padding: '5px 10px',
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
    const execution = useInput('containerHeatRecovery');
    const useThermalEnergy = useInput('heatingSeason');
    const gasPrice = useInput(6.00, 'float');
    const priceElectricity = useInput(6.00, 'float');
    const priceThermalEnergy = useInput(1500.00, 'float');

    //расчётная модель
    const [modelGPUArr, setModelGPUArr] = useState(modelsData.find(item => item.electricPower == nominalElectricalPower.value))
    useEffect(() => {
        setModelGPUArr(modelsData.find(item => item.electricPower == nominalElectricalPower.value))
    }, [nominalElectricalPower])

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

    //тут массивы всех расчётов
    let calculatorResult = getTepData();

    //массив исходных данных
    const [initialData, setInitialData] = useState(calculatorResult.resultInitialData)

    //массив тарифов
    const [tariffData, setTariffData] = useState(calculatorResult.resultTariffArr)

    //массив ТЭП до кап. ремонта
    const [tepData, setTepData] = useState(calculatorResult.resultTepArr)

    //массив себестоимости
    const [costPriceData, setCostPriceData] = useState(calculatorResult.resultCostPriceArr)

    //массив окупаемости
    const [paybackData, setPaybackData] = useState(calculatorResult.resultPaybackArr)

    //Массив итоговой сотимости и технических характеристик
    const [finalCostTechChars, setFinalCostTechChars] = useState(calculatorResult.finalCostTechCharsArr)

    //Массив годовых показателей
    const [finalAnnualIndicators, setFinalAnnualIndicators] = useState(calculatorResult.finalAnnualIndicatorsArr)

    //Данные для диаграммы Bar
    const [energyProductionСostsDiagram, setEnergyProductionСostsDiagram] = useState(calculatorResult.energyProductionСostsDiagramObj)

    //Данные для диаграммы затрат на энергию
    const [energyСostsDiagram, setEnergyСostsDiagram] = useState(calculatorResult.energyСostsDiagramObj)
    
    // расчёт массивов тарифов, ТЭП, себестоимости и окупаемости
    function getTepData() {
        let capex = Math.round(modelGPUArr.installationCost[execution.value] * exchangeRatesRubCny.value * amount.value)
        // результирующий объект
        let resultObj = {
            resultInitialData: [
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
                    value: variables.oilResource + ' мч'
                },
                {
                    id: 'capex',
                    name: 'CAPEX',
                    value: capex.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ") + " ₽"
                }
            ], 
            resultTariffArr: [
                {
                    id: 'gasVolume',
                    name: '1 нм3 газа',
                    price: gasPrice.value,
                    indexing: variables.indexing.gas,
                    years: calculateIndexingArr(parseFloat(gasPrice.value), parseFloat(variables.indexing.gas))
                },
                {
                    id: 'electricVolume',
                    name: '1 кВт э/э',
                    price: priceElectricity.value,
                    indexing: variables.indexing.electricPower,
                    years: calculateIndexingArr(parseFloat(priceElectricity.value), parseFloat(variables.indexing.electricPower))
                },
                {
                    id: 'thermalVolume',
                    name: '1 Гкал т/э',
                    price: priceThermalEnergy.value,
                    indexing: variables.indexing.thermalPower,
                    years: calculateIndexingArr(parseFloat(priceThermalEnergy.value), parseFloat(variables.indexing.thermalPower))
                },
                {
                    id: 'oilVolume',
                    name: '1 л масла',
                    price: variables.oilPrice,
                    indexing: variables.indexing.oil,
                    years: calculateIndexingArr(parseFloat(variables.oilPrice), parseFloat(variables.indexing.oil))
                },
                {
                    id: 'antifreezeVolume',
                    name: '1л антифриза',
                    price: variables.antifreezePrice,
                    indexing: variables.indexing.antifreeze,
                    years: calculateIndexingArr(parseFloat(variables.antifreezePrice), parseFloat(variables.indexing.antifreeze))
                }
            ],
            resultTepArr: [],
            resultCostPriceArr: [],
            resultPaybackArr: [],
            finalCostTechCharsArr: [
                {
                    id: 'type',
                    name: 'Тип установки',
                    value: modelGPUArr.model,
                },
                {
                    id: 'electricPower',
                    name: 'Номинальная электрическая мощность, кВт',
                    value: modelGPUArr.electricPower,
                },
                {
                    id: 'thermalPower',
                    name: 'Номинальная тепловая мощность, кВт',
                    value: modelGPUArr.thermalPower,
                },
                {
                    id: 'electricEfficiency',
                    name: 'Электрический КПД',
                    value: modelGPUArr.electricEfficiency,
                },
                {
                    id: 'gasConsumption',
                    name: 'Потребление природного газа',
                    value: modelGPUArr.gasСonsumption,
                },
                {
                    id: 'amount',
                    name: 'Количество установок, шт',
                    value: amount.value,
                },
                {
                    id: 'resultElectricPower',
                    name: 'Суммарная электрическая мощность, кВт',
                    value: modelGPUArr.electricPower * amount.value,
                },
                {
                    id: 'resultThermalPower',
                    name: 'Суммарная тепловая мощность, Гкал/час',
                    value: modelGPUArr.thermalPower * amount.value,
                },
                {
                    id: 'execution',
                    name: 'Выбранное исполнение',
                    value: execution.value === 'open' ? 'Открытое' : 
                            execution.value === 'container' ? 'Контейнерное' :
                            execution.value === 'containerHeatRecovery' ? 'Контейнерное с утилизацией тепла' : '',
                },
                {
                    id: 'Capex',
                    name: 'Стоимость оборудования в выбранной комплектации',
                    value: capex.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ") + " ₽",
                },
                {
                    id: 'powerCost',
                    name: 'Удельная стоимость 1 кВт установленной мощности',
                    value: (Math.round(Math.round(modelGPUArr.installationCost[execution.value] * exchangeRatesRubCny.value * amount.value) / modelGPUArr.electricPower * 100) / 100).toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ") + " ₽",
                },
            ],
            finalAnnualIndicatorsArr: []
        }

        // массив ТЭП
        let resultTepArr = [
            {
                id: 'GPUOperatingTime',
                name: 'Наработка ГПУ, мч',
                years: [],
                sum: ''
            },
            {
                id: 'GPUOperatingYear',
                name: 'Наработка ГПУ за год, мч',
                years: [],
                sum: 0
            },
            {
                id: 'electricityGeneration',
                name: 'Выработка э/э ГПЭС, кВтч',
                years: [],
                sum: 0
            },
            {
                id: 'usefulOutputElectricity',
                name: 'Полезный отпуск э/э ГПЭС (- СН), кВтч',
                years: [],
                sum: 0
            },
            {
                id: 'thermalGeneration',
                name: 'Выработка т/э ГПЭС, Гкал',
                years: [],
                sum: 0
            },
            {
                id: 'gasСonsumption',
                name: 'Расход газа, нм3',
                years: [],
                sum: 0
            },
            {
                id: 'oilСonsumption',
                name: 'Расход масла, л',
                years: [],
                sum: 0
            },
        ]

        //итоги ТЭП
        let sumsTepArr = {
            operatingTime: '',
            operatingYear: 0,
            electricityGeneration: 0,
            usefulOutputElectricity: 0,
            thermalGeneration: 0,
            gasСonsumption: 0,
            oilСonsumption: 0
        }

        // Массив себестоимости
        let resultCostPriceArr = [
            {
                id: 'totalСosts',
                name: 'Затраты на выработку э/э, в т.ч.:',
                years: [],
                sum: 0
            },
            {
                id: 'totalСostsGas',
                name: '- топливо',
                years: [],
                sum: 0
            },
            {
                id: 'totalСostsOil',
                name: '- масло',
                years: [],
                sum: 0
            },
            {
                id: 'totalСostsMaintenance',
                name: '- ТО',
                years: [],
                sum: 0
            },
            {
                id: 'costsPrice',
                name: 'Затраты на выработку э/э, в т.ч.:',
                years: [],
                sum: 0
            },
            {
                id: 'costsPriceGas',
                name: '- топливо',
                years: [],
                sum: 0
            },
            {
                id: 'costsPriceOil',
                name: '- масло',
                years: [],
                sum: 0
            },
            {
                id: 'costsPriceMaintenance',
                name: '- ТО',
                years: [],
                sum: 0
            },
        ]

        // итоги себестоимости
        let sumsCostPriceArr = {
            totalСosts: 0,
            totalСostsGas: 0,
            totalСostsOil: 0,
            totalСostsMaintenance: 0,
            costsPrice: 0,
            costsPriceGas: 0,
            costsPriceOil: 0,
            costsPriceMaintenance: 0,
        }

        // Массив окупаемости
        let resultPaybackArr = [
            {
                id: 'purchaseElectricity',
                name: 'Затраты на приобретение э/э',
                years: [],
                sum: 0
            },
            {
                id: 'purchaseThermalEnergy',
                name: 'Затраты на приобретение т/э',
                years: [],
                sum: 0
            },
            {
                id: 'purchaseEnergyResources',
                name: 'Итого на приобретение энергоносителей',
                years: [],
                sum: 0
            },
            {
                id: 'savingsElectricity',
                name: 'Полученная экономия по э/э',
                years: [],
                sum: 0
            },
            {
                id: 'savingsThermalEnergy',
                name: 'Полученная экономия по т/э',
                years: [],
                sum: 0
            },
            {
                id: 'resultSavings',
                name: 'Экономия ИТОГО',
                years: [],
                sum: 0
            },
            {
                id: 'economicEffect',
                name: 'Экономический эффект с учетом CAPEX',
                years: [],
                sum: 0
            },
            {
                id: 'resultPayback',
                name: 'Окупаемость',
                years: [],
                sum: 0
            },
        ]

        // итоги окупаемости
        let sumsPaybackArr = {
            purchaseElectricity: 0,
            purchaseThermalEnergy: 0,
            purchaseEnergyResources: 0,
            savingsElectricity: 0,
            savingsThermalEnergy: 0,
            resultSavings: 0,
            economicEffect: 0,
            resultPayback: 0
        }

        // Объект для диаграммы затрат на энергию
        let energyСostsDiagramObj = {
            labels: ['установка', '1 год', '2 год', '3 год', '4 год', '5 год', '6 год', '7 год', '8 год'],
            datasets: [
                {
                    label: "Приобретение",
                    data: [
                        0,
                    ]
                },
                {
                    label: "Выработка",
                    data: [
                        capex,
                    ]
                }
            ]
        }

        // цикл по годам
        for(let i = 1; i <= 8; i++) {
            //переменные ТЭП
            let operatingTime = variables.annualProductionGPU * i;
            let operatingYear = variables.annualProductionGPU;
            let electricityGeneration = variables.annualProductionGPU * modelGPUArr.electricPower * amount.value;
            let usefulOutputElectricity = modelGPUArr.electricPower * amount.value * (1 - (variables.SNGPU / 100)) * variables.annualProductionGPU;
            let thermalGeneration = 0
            if(execution.value === 'containerHeatRecovery') {
                if(useThermalEnergy.value === 'heatingSeason') {
                    if(operatingTime < variables.annualProductionGPU) {
                        thermalGeneration = variables.hoursHeatUsage;
                    } else if(operatingYear < 2520) {
                        thermalGeneration = operatingYear
                    } else if(operatingYear < 6988) {
                        thermalGeneration = 2520
                    } else {
                        thermalGeneration = operatingYear - 4368;
                    }
                } else {
                    thermalGeneration = variables.annualProductionGPU;
                }
            }
            let gasСonsumption = operatingYear * modelGPUArr.gasСonsumption * amount.value;
            let oilСonsumption = Math.ceil(maintenanceData[8].years[i - 1] * modelGPUArr.oilVolumeCrankcase * amount.value + (electricityGeneration * modelGPUArr.oilConsumptionBurning / 1000 * 1.11));


            // Промежуточный массив ТЭП
            let yearTepArr = [
                operatingTime,
                operatingYear,
                electricityGeneration,
                usefulOutputElectricity,
                thermalGeneration,
                gasСonsumption,
                oilСonsumption
            ]

            // помещаем результаты за год в массив ТЭП
            resultTepArr.forEach((item, index) => {
                item.years.push(yearTepArr[index])
            })

            // расчитываем суммы ТЭП
            sumsTepArr.operatingYear += operatingYear
            sumsTepArr.electricityGeneration += electricityGeneration
            sumsTepArr.usefulOutputElectricity += usefulOutputElectricity
            sumsTepArr.thermalGeneration += thermalGeneration
            sumsTepArr.gasСonsumption += gasСonsumption
            sumsTepArr.oilСonsumption += oilСonsumption

            /****************************************************** */

            // Переменные себестоимости
            let totalСostsGas = Math.round(gasСonsumption * resultObj.resultTariffArr[0].years[i - 1])
            let totalСostsOil = Math.round(oilСonsumption * resultObj.resultTariffArr[3].years[i - 1])

            let totalСostsMaintenanceSumm = 0
            for(let j = 0; j < 8; j++) {
                if(maintenanceData[j].years[i - 1] > 0) {
                    totalСostsMaintenanceSumm += (maintenanceData[j].spareParts + maintenanceData[j].work) * maintenanceData[j].years[i - 1] * amount.value;
                }
            }
            let totalСostsMaintenance = Math.round(totalСostsMaintenanceSumm);

            let totalСosts = totalСostsGas + totalСostsOil + totalСostsMaintenance;
            let costsPrice = Math.round(totalСosts / usefulOutputElectricity * 100) / 100;
            let costsPriceGas = Math.round(totalСostsGas / usefulOutputElectricity * 100) / 100;
            let costsPriceOil = Math.round(totalСostsOil / usefulOutputElectricity * 100) / 100;
            let costsPriceMaintenance = Math.round(totalСostsMaintenance / usefulOutputElectricity * 100) / 100;

            // Промежуточный массив себестоимости
            let yearCostPriceArr = [
                totalСosts,
                totalСostsGas,
                totalСostsOil,
                totalСostsMaintenance,
                costsPrice,
                costsPriceGas,
                costsPriceOil,
                costsPriceMaintenance,
            ]

            // помещаем результаты за год в массив себестоимости
            resultCostPriceArr.forEach((item, index) => {
                item.years.push(yearCostPriceArr[index])
            })

            //Рассчитываем итоги себестоимости
            sumsCostPriceArr.totalСostsGas += totalСostsGas
            sumsCostPriceArr.totalСostsOil += totalСostsOil
            sumsCostPriceArr.totalСostsMaintenance += totalСostsMaintenance

            /****************************************************** */
            
            //переменные окупаемости
            let purchaseElectricity = Math.round(usefulOutputElectricity * resultObj.resultTariffArr[1].years[i - 1])

            let purchaseThermalEnergy = 0
            if(priceThermalEnergy.value == 0) {
                purchaseThermalEnergy = Math.round(thermalGeneration * 140 * resultObj.resultTariffArr[0].years[i - 1])
            } else {
                purchaseThermalEnergy = Math.round(thermalGeneration * resultObj.resultTariffArr[2].years[i - 1])
            }

            let purchaseEnergyResources = Math.round(purchaseElectricity + purchaseThermalEnergy)
            let savingsElectricity = Math.round(purchaseElectricity - totalСosts)

            let savingsThermalEnergy = 0
            if(priceThermalEnergy.value == 0) {
                savingsThermalEnergy = Math.round(thermalGeneration * 125 * resultObj.resultTariffArr[0].years[i - 1])
                
            } else {
                savingsThermalEnergy = Math.round(thermalGeneration * resultObj.resultTariffArr[2].years[i - 1])
            }

            let resultSavings = savingsElectricity + savingsThermalEnergy
            
            let economicEffect = 0
            let intCapex = parseInt(resultObj.resultInitialData[9].value.replace(/\D/g, ''))
            if(i > 1) {
                if(resultPaybackArr[6].years[i - 2] + resultSavings < resultSavings ) {
                    economicEffect = Math.round(resultPaybackArr[6].years[i - 2] + resultSavings)
                } else {
                    economicEffect = resultSavings
                }                
            } else {
                if(resultSavings - intCapex < 0 ) {
                    economicEffect = resultSavings - intCapex
                } else {
                    economicEffect = resultSavings
                }
            }

            let resultPayback =  Math.round(Math.abs(economicEffect / resultSavings) * 100) / 100
            if(economicEffect / resultSavings < 0) {
                resultPayback = 1;
            } else if(economicEffect / resultSavings === 1) {
                resultPayback = 0
            }

            // Промежуточный массив окупаемости
            let yearPaybackArr = [
                purchaseElectricity,
                purchaseThermalEnergy,
                purchaseEnergyResources,
                savingsElectricity,
                savingsThermalEnergy,
                resultSavings,
                economicEffect,
                resultPayback,
            ]

            // помещаем результаты за год в массив окупаемости
            resultPaybackArr.forEach((item, index) => {
                item.years.push(yearPaybackArr[index])
            })

            //Рассчитываем итоги окупаемости
            sumsPaybackArr.purchaseElectricity += purchaseElectricity
            sumsPaybackArr.purchaseThermalEnergy += purchaseThermalEnergy
            sumsPaybackArr.purchaseEnergyResources += purchaseEnergyResources
            sumsPaybackArr.savingsElectricity += savingsElectricity
            sumsPaybackArr.savingsThermalEnergy += savingsThermalEnergy
            sumsPaybackArr.resultSavings += resultSavings
            sumsPaybackArr.economicEffect += economicEffect > 0 ? economicEffect : 0
            sumsPaybackArr.resultPayback += resultPayback

            // заполняем данные для диаграммы затрат на энергию
            energyСostsDiagramObj.datasets[0].data.push(energyСostsDiagramObj.datasets[0].data[i - 1] + purchaseEnergyResources)
            energyСostsDiagramObj.datasets[1].data.push(energyСostsDiagramObj.datasets[1].data[i - 1] + totalСosts)
        }

        //Помещаем итоги ТЭП в массив ТЭП
        resultTepArr.forEach((item, index) => {
            item.sum = sumsTepArr[Object.keys(sumsTepArr)[index]]
        })
        
        // добавляем массив ТЭП в результирующий объект
        resultObj.resultTepArr = resultTepArr

        //Рассчитываем итоги себестоимости
        sumsCostPriceArr.totalСosts += sumsCostPriceArr.totalСostsGas + sumsCostPriceArr.totalСostsOil + sumsCostPriceArr.totalСostsMaintenance
        sumsCostPriceArr.costsPrice += Math.round(sumsCostPriceArr.totalСosts / sumsTepArr.usefulOutputElectricity * 100) / 100;
        sumsCostPriceArr.costsPriceGas += Math.round(sumsCostPriceArr.totalСostsGas / sumsTepArr.usefulOutputElectricity * 100) / 100;
        sumsCostPriceArr.costsPriceOil += Math.round(sumsCostPriceArr.totalСostsOil / sumsTepArr.usefulOutputElectricity * 100) / 100;
        sumsCostPriceArr.costsPriceMaintenance += Math.round(sumsCostPriceArr.totalСostsMaintenance / sumsTepArr.usefulOutputElectricity * 100) / 100;

        //Помещаем итоги себестоимости в массив себестоимости
        resultCostPriceArr.forEach((item, index) => {
            item.sum = sumsCostPriceArr[Object.keys(sumsCostPriceArr)[index]]
        })

        // добавляем массив себестоимости в результирующий объект
        resultObj.resultCostPriceArr = resultCostPriceArr

        //Помещаем итоги окупаемости в массив окупаемости
        resultPaybackArr.forEach((item, index) => {
            item.sum = sumsPaybackArr[Object.keys(sumsPaybackArr)[index]]
        })

        // добавляем массив окупаемости в результирующий объект
        resultObj.resultPaybackArr = resultPaybackArr

        // Массив годовых показателей с учётом годовой наработки
        let finalAnnualIndicatorsArr = [
            {
                id: 'ElectricalEnergy',
                name: 'Электрическая энергия',
                data: [
                    {
                        id: 'generationElectricalEnergy',
                        name: 'выработка электрической энергии генераторами, кВтч/год',
                        value: resultTepArr[2].years[0],
                    },
                    {
                        id: 'consumptionElectricalEnergy',
                        name: 'потребление электрической энергии на собственные нужды энергоцентра, кВтч/год',
                        value: resultTepArr[2].years[0] - resultTepArr[3].years[0],
                    },
                    {
                        id: 'releaseElectricalEnergy',
                        name: 'отпуск электрической энергии в сеть предприятия, кВтч/год',
                        value: resultTepArr[3].years[0],
                    },
                ]
            },
            {
                id: 'ThermalEnergy',
                name: 'Тепловая энергия',
                data: [
                    {
                        id: 'generationThermalEnergy',
                        name: 'выработка тепловой энергии генераторами, Гкал/год',
                        value: resultTepArr[4].years[0],
                    },
                ]
            },
            {
                id: 'Gas',
                name: 'Природный газ',
                data: [
                    {
                        id: 'consumptionGas',
                        name: 'потребление природного газа генераторами, нм3/год',
                        value: resultTepArr[5].years[0],
                    },
                ]
            }, 
            {
                id: 'Payback',
                name: 'Окупаемость',
                data: [
                    {
                        id: 'averageElectricalEnergyСosts',
                        name: 'Средние затраты за расчетный период на приобретение электрической энергии в год у сбытовой компании, Рубли',
                        value: Math.round(resultPaybackArr[0].sum / resultPaybackArr[0].years.length) + ' ₽',
                    },
                    {
                        id: 'averageThermalEnergyСosts',
                        name: 'Средние затраты за расчетный период на приобретение тепловой энергии в год у сбытовой компании, Рубли',
                        value: Math.round(resultPaybackArr[1].sum / resultPaybackArr[1].years.length) + ' ₽',
                    },
                    {
                        id: 'totalEnergyCosts',
                        name: 'Итого затраты на приобретение энергоносителей, Рубли',
                        value: Math.round((resultPaybackArr[0].sum / resultPaybackArr[0].years.length) + (resultPaybackArr[1].sum / resultPaybackArr[1].years.length)) + ' ₽',
                    },
                    {
                        id: 'averageEnergyProductionCosts',
                        name: 'Средние затраты за расчетный период на производство электрической и тепловой энергии на собственном энергоцентре, Рубли',
                        value: Math.round(resultCostPriceArr[0].sum / resultPaybackArr[0].years.length) + ' ₽',
                    },
                    {
                        id: 'averageSavings',
                        name: 'Средняя за расчетный период ежегодная экономия, Рубли',
                        value: Math.round(resultPaybackArr[5].sum / resultPaybackArr[5].years.length) + ' ₽',
                    },
                    {
                        id: 'paybackPeriod',
                        name: 'Срок окупаемости, лет',
                        value: floatToYearsMonths(resultPaybackArr[7].sum),
                    }
                ]
            },           
        ]

        // добавляем массив годовых показателей в результирующий объект
        resultObj.finalAnnualIndicatorsArr = finalAnnualIndicatorsArr

        // Объект для диаграммы затрат на выработку электоэнергии
        let energyProductionСostsDiagramObj = {
            labels: resultCostPriceArr[0].years.map((_, index) => index + 1 + ' год'),
            datasets: [
                {
                    label: "Топливо",
                    data: resultCostPriceArr[1].years
                },
                {
                    label: "Масло",
                    data: resultCostPriceArr[2].years
                },
                {
                    label: "ТО",
                    data: resultCostPriceArr[3].years
                }
            ]
        }

        // добавляем объект для диаграммы затрат в результирующий объект
        resultObj.energyProductionСostsDiagramObj = energyProductionСostsDiagramObj

        // добавляем объект для диаграммы затрат на энергию в результирующий объект
        resultObj.energyСostsDiagramObj = energyСostsDiagramObj

        return resultObj
    }

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

                    <FinalData costTechChars={finalCostTechChars} annualIndicators={finalAnnualIndicators} energyProductionСostsDiagram={energyProductionСostsDiagram} energyСostsDiagram={energyСostsDiagram}/>

					<InitialDataTable title='Исходные данные' data={initialData} />

                    <TariffTable title="Тарифы" data={tariffData} />

                    <MaintenanceTable title="Техническое обслуживание" data={maintenanceData} />

                    <TepTable title="Расчет технико-экономических показателей до капитального ремонта" data={tepData} />

                    <CostPriceTable title="Расчет себестоимости выработанной ГПУ электроэнергии" data={costPriceData} />
                    
                    <PaybackTable title="Расчет простого срока окупаемости" data={paybackData} />

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
        calculatorResult = getTepData()
        setInitialData(calculatorResult.resultInitialData)
        setTariffData(calculatorResult.resultTariffArr)
        setTepData(calculatorResult.resultTepArr)
        setCostPriceData(calculatorResult.resultCostPriceArr)
        setPaybackData(calculatorResult.resultPaybackArr)
        setFinalCostTechChars(calculatorResult.finalCostTechCharsArr)
        setFinalAnnualIndicators(calculatorResult.finalAnnualIndicatorsArr)
        setEnergyProductionСostsDiagram(calculatorResult.energyProductionСostsDiagramObj)
        setEnergyСostsDiagram(calculatorResult.energyСostsDiagramObj)
    }
}

// Компоненты
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
                                    <span>{item.value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ")}</span>
                                    {item.value2 ?  <span>{item.value2.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ")}</span> : null}
                                </div>
                            </div>
                        )
                    })
                }
            </div>
            <div style={styles.scheduleTable}>
                <div style={styles.tableRow}>
                    <div style={styles.tableCol}>Годовая наработка ГПУ</div>
                    <div style={styles.tableCol}>{variables.annualProductionGPU.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ") + ' мч'}</div>
                </div>

                <div style={styles.tableRow}>
                    <div style={styles.tableCol}>Часы использования тепла</div>
                    <div style={styles.tableCol}>{variables.hoursHeatUsage.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ") + ' мч'}</div>
                </div>

                <div style={styles.tableRow}>
                    <div style={styles.tableCol}>Стоимость W70</div>
                    <div style={styles.tableCol}>{variables.w70Coast ? 'включена' : 'не включена'}</div>
                </div>
            </div>
        </div>
	)
}

function TariffTable({title, data}) {
    return (
        <div style={styles.detailedResults}>
            <h2 style={styles.resultsTitle} key={title}>{title}</h2>
            <div style={styles.detailedTable}>
                <div style={styles.tableRow}>
                    <div style={styles.detailedTableCol}>Параметр</div>
                    <div style={styles.detailedTableCol}>Тарифы</div>
                    <div style={styles.detailedTableCol}>Индексация</div>
                    <div style={styles.detailedTableCol}>1 год</div>
                    <div style={styles.detailedTableCol}>2 год</div>
                    <div style={styles.detailedTableCol}>3 год</div>
                    <div style={styles.detailedTableCol}>4 год</div>
                    <div style={styles.detailedTableCol}>5 год</div>
                    <div style={styles.detailedTableCol}>6 год</div>
                    <div style={styles.detailedTableCol}>7 год</div>
                    <div style={styles.detailedTableCol}>8 год</div>
                </div>
                {
                    data.map(item => {
                        return (
                            <div style={styles.tableRow} key={item.id}>
                                <div style={styles.detailedTableCol}>{item.name}</div>
                                <div style={styles.detailedTableCol}>{item.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ")} &#8381;</div>
                                <div style={styles.detailedTableCol}>{item.indexing}%</div>
                                {
                                    item.years.map((indexItem, index) => {
                                        return (
                                            <div style={styles.detailedTableCol} key={'year' + index}>{indexItem.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ")}</div>
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
                                        <div style={styles.maintenanceTableCol}>{item.spareParts !== '0' ? item.spareParts.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ") + ' ₽' : '-'}</div>
                                        <div style={styles.maintenanceTableCol}>{item.work !== '0' ? item.work.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ") + ' ₽' : '-'}</div>
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
                                            <div style={styles.maintenanceTableCol} key={index}>{innerItem !== 0 ? innerItem.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ") : '-'}</div>
                                        )
                                    })
                                }
                                <div style={styles.maintenanceTableCol}>{item.sum !== 0 ? item.sum.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ") : '-'}</div>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}

function CostPriceTable({title, data}) {
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
                                            <div style={styles.maintenanceTableCol} key={index}>{innerItem.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ")} &#8381;</div>
                                        )
                                    })
                                }
                                <div style={styles.maintenanceTableCol}>{item.sum.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ")} &#8381;</div>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}

function PaybackTable({title, data}) {
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
                    data.map((item, index) => {
                        return (
                            <div style={styles.tableRow} key={item.id}>
                                {
                                index != data.length - 1 ?
                                <div style={styles.maintenanceTableCol3}>{item.name}</div>
                                :
                                <div style={styles.maintenanceTableCol3}>
                                    <span>{item.name}</span>
                                    <span>{floatToYearsMonths(item.sum)}</span>
                                </div>
                                }
                                {
                                    item.years.map((innerItem, innerIndex) => {
                                        return (

                                            index != data.length - 1 ?
                                            <div style={styles.maintenanceTableCol} key={innerIndex}>{innerItem !== 0 ? innerItem.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ")  + ' ₽' : '-'}</div>
                                            :
                                            <div style={styles.maintenanceTableCol} key={innerIndex}>{innerItem !== 0 ? innerItem.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ") : '-'}</div>
                                        )
                                    })
                                }
                                {
                                    index != data.length - 1 ?
                                    <div style={styles.maintenanceTableCol}>{item.sum !== 0 ? item.sum.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ")  + ' ₽' : '-'}</div>
                                    :
                                    <div style={styles.maintenanceTableCol}>{item.sum !== 0 ? item.sum.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ") : '-'}</div>
                                }
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}

function FinalData({ costTechChars, annualIndicators, energyProductionСostsDiagram, energyСostsDiagram}) {
    let styles = {
        finalContainer: {
            display: 'flex',
            gap: '50px',
            marginTop: '50px'
        },
        finalTables: {
            display: 'flex',
            flexDirection: 'column',
            gap: '30px',
            flex: '0 0 650px'
        },
        finalTable: {
            fontSize: '15px',
            lineHeight: '1.2em',
            fontWeight: '400',
            backgroundColor: '#C6E0B4',
            borderTop: '1px solid black',
            flexBasis: '50%',
            maxWidth: '100%',
            width: '100%',
            boxSizing: 'border-box'
        },
        finalTableBlock: {
            maxWidth: '100%',
            width: '100%',
            boxSizing: 'border-box'
        },
        finalTableRow: {
            display: 'flex',
            alignItems: 'stretch',
            borderLeft: '1px solid black',
            boxSizing: 'border-box'
        },
        finalTableTitleCol: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '5px 10px',
            flexShrink: '0',
            flexGrow: '0',
            flex: '0 0 100%',
            fontWeight: '700',
            borderRight: '1px solid black',
            borderBottom: '1px solid black',
            boxSizing: 'border-box'
        },
        finalTableCol1: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '5px 10px',
            flexShrink: '0',
            flexGrow: '0',
            flex: '0 0 60%',
            borderRight: '1px solid black',
            borderBottom: '1px solid black',
            boxSizing: 'border-box'
        },
        finalTableCol2: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-end',
            padding: '5px 10px',
            flexShrink: '0',
            flexGrow: '0',
            flex: '1 0 40%',
            borderRight: '1px solid black',
            borderBottom: '1px solid black',
            boxSizing: 'border-box'
        },
        diagrams: {
            display: 'flex',
            flexDirection: 'column',
            gap: '30px',
            flex: '1 1 auto'
        },
    }

    return (
        <div style={styles.finalContainer}>
            <div style={styles.finalTables}>
                <div style={styles.finalTable}>
                    {
                        costTechChars.map((item, index) => {
                            return (
                                <div style={styles.finalTableRow} key={item.id}>
                                    <div style={styles.finalTableCol1}>{item.name}</div>
                                    <div style={styles.finalTableCol2}>
                                        <span>{index !== 0 ? item.value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ") : item.value}</span>
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
                <div style={styles.finalTable}>
                    {
                        annualIndicators.map(item => {
                            return (
                                <div style={styles.finalTableBlock} key={item.name}>
                                    <div style={styles.finalTableRow} key={item.id}>
                                        <div style={styles.finalTableTitleCol}>{item.name}</div>
                                    </div>
                                    {
                                        item.data.map(dataItem => {
                                            return (
                                                <div style={styles.finalTableRow} key={dataItem.id}>
                                                    <div style={styles.finalTableCol1}>{dataItem.name}</div>
                                                    <div style={styles.finalTableCol2}>
                                                        <span>{dataItem.value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ")}</span>
                                                    </div>
                                                </div> 
                                            )
                                        })
                                    }
                                </div>
                             
                            )
                        })
                    }
                </div>
            </div>
            <div style={styles.diagrams}>
                
                <Bar
                    data={energyProductionСostsDiagram}
                    options={
                        {
                            plugins: {
                                title: {
                                    display: true,
                                    font: {
                                        size: 20
                                    },
                                    text: 'Затраты на выработку э/э'
                                }
                            },
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
                    data={energyСostsDiagram}
                    options={
                        {
                            plugins: {
                                title: {
                                    display: true,
                                    font: {
                                        size: 20
                                    },
                                    text: 'Затраты на э/э'
                                }
                            },
                        }
                    }
                />
                
            </div>
        </div>
	)
}

/**********Статичные данные ******************/

// Модели
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

// Общие переменные
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

// Техническое обслуживание
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

/**********Вспомогательные функции ****/

//расчёт индексации тарифов
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

// распределение количества ТО по годам
function distributionMaintenanceYear(maintenanceArr, annualOperatingTime) {
    let resultArr = [];

    for(let i = 1; i <= 8; i++) {
        let filteredArr = maintenanceArr.filter(item => item > annualOperatingTime * i - annualOperatingTime && item <= annualOperatingTime * i);
        resultArr.push(filteredArr.length)
    }

    return resultArr
}

//преобразование десятичных дробей чисел в годы и месяцы
function floatToYearsMonths(value)
{
    var totalDays = value * 365;
    var years = Math.floor(totalDays/365);
    var months = Math.floor((totalDays-(years *365))/30);
    var yearsText = numWord(years, ['год', 'года', 'лет']);
    var monthsText = numWord(months, ['месяц', 'месяца', 'месяцев']);

    var result = (years > 0 ? years + " " + yearsText + " " : '') + (months > 0 ? months + " " + monthsText : '');

    return result
}

//склонение числительных
function numWord(value, words) {  
	value = Math.abs(value) % 100; 
	var num = value % 10;
	if(value > 10 && value < 20) return words[2]; 
	if(num > 1 && num < 5) return words[1];
	if(num == 1) return words[0]; 
	return words[2];
}