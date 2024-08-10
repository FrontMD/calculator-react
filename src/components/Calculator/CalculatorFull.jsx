import { useState, useMemo, useRef } from "react"

import { Chart as ChartJS } from "chart.js/auto"
import { Bar, Line } from "react-chartjs-2"
import { color } from "chart.js/helpers"

ChartJS.register()

// Хук для двусторонней связи полей ввода
function useInput(initialValue, type = "") {
    const [value, setValue] = useState(initialValue)
    const [error, setError] = useState(false)

    function onFocus(event) {
        if (type === "phone") {
            let currentValue = event.target.value.replace(/\D/g, "")

            if (currentValue.length < 3) {
                setValue("+7")
            }
        }

        event.target.style.borderColor = "#005CA9"
    }

    function onChange(event) {
        if (type === "float") {
            let currentValue = event.target.value.replace(/[^\.\d]/g, "")

            setValue(
                currentValue.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ")
            )

            if (currentValue.length < 1) {
                setError(true)
            } else {
                setError(false)
                event.target.style.borderColor = "#005CA9"
            }
        } else if (type === "int") {
            let currentValue = event.target.value.replace(/\D/g, "")

            setValue(
                currentValue.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ")
            )

            if (currentValue.length < 1) {
                setError(true)
            } else {
                setError(false)
                event.target.style.borderColor = "#005CA9"
            }
        } else if (type === "name") {
            let currentValue = event.target.value.replace(/[^а-яА-Яa-zA-Z\s]/g, "")
            setValue(currentValue)

            if (currentValue.length < 2) {
                setError(true)
            } else {
                setError(false)
                event.target.style.borderColor = "#005CA9"
            }
        } else if (type === "phone") {
            let matrix = "+7 (___) ___-__-__"
            let i = 0
            let def = matrix.replace(/\D/g, "")
            let currentValue = event.target.value.replace(/\D/g, "")

            if (def.length >= currentValue.length) {
                currentValue = def
            }

            let newValue = matrix.replace(/./g, function (a) {
                return /[_\d]/.test(a) && i < currentValue.length
                    ? currentValue.charAt(i++)
                    : i >= currentValue.length
                        ? ""
                        : a
            })

            setValue(newValue)

            if (newValue.length !== 18) {
                setError(true)
            } else {
                setError(false)
                event.target.style.borderColor = "#005CA9"
            }
        } else if (type === "email") {
            let currentValue = event.target.value.replace(/[а-яА-Я]/g, "")
            setValue(currentValue)

            const res = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/

            if (!res.test(String(currentValue).toLowerCase())) {
                setError(true)
            } else {
                setError(false)
                event.target.style.borderColor = "#005CA9"
            }
        } else {
            let currentValue = event.target.value
            setValue(currentValue)
            event.target.style.borderColor = "#005CA9"
        }
    }

    function onBlur(event) {

        if (type === "name") {
            let currentValue = event.target.value

            if (currentValue.length < 2) {
                setError(true)
                event.target.style.borderColor = "#F01471"
            } else {
                setError(false)
                event.target.style.borderColor = "#000"
            }
        } else if (type === "phone") {
            let currentValue = event.target.value

            if (currentValue.length !== 18) {
                setError(true)
                event.target.style.borderColor = "#F01471"
            } else {
                setError(false)
                event.target.style.borderColor = "#000"
            }

            if (currentValue.length == 2) {
                event.target.value = ""
            }
        } else if (type === "email") {
            let currentValue = event.target.value

            const res = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/

            if (!res.test(String(currentValue).toLowerCase())) {
                setError(true)
                event.target.style.borderColor = "#F01471"
            } else {
                setError(false)
                event.target.style.borderColor = "#000"
            }
        } else {
            let currentValue = event.target.value

            if (currentValue.length < 1) {
                setError(true)
                event.target.style.borderColor = "#F01471"
            } else {
                setError(false)
                event.target.style.borderColor = "#000"
            }
        }
    }

    function fieldValidate() {
        if (type === "name") {
            let currentValue = value

            if (currentValue.length < 2) {
                setError(true)
                return true
            } else {
                setError(false)
                return false
            }
        } else if (type === "phone") {
            let currentValue = value

            if (currentValue.length !== 18) {
                setError(true)
                return true
            } else {
                setError(false)
                return false
            }
        } else if (type === "email") {
            let currentValue = value

            const res = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/

            if (!res.test(String(currentValue).toLowerCase())) {
                setError(true)
                return true
            } else {
                setError(false)
                return false
            }
        } else {
            return false
        }
    }

    return {
        value,
        error,
        setValue,
        setError,
        onFocus,
        onChange,
        onBlur,
        fieldValidate,
    }
}

// стили
let styles = {
    /* Контейнеры */
    container: {
        maxWidth: "1170px",
        margin: "0 auto",
        padding: "0 30px",
        boxSizing: "border-box",
    },
    calculator: {
        padding: "70px 0",
        boxSizing: "border-box",
        backgroundColor: "white",
    },

    /* финальные данные */
    finalContainer: {
        fontFamily: "Montserrat",
        display: "flex",
        flexDirection: "column",
        gap: "75px",
        color: "#000"
    },

    finalRow: {
        display: "flex",
        flexDirection: "column",
        gap: "48px",
    },

    finalRowTitle: {
        maxWidth: "720px",
        fontSize: "40px",
        fontWeight: "400",
        lineHeight: "1.1em"
    },

    finalRowItems: {
        display: "flex",
        alignItems: "flex-start",
        justifyContent: "space-between",
        gap: "25px"
    },

    finalTable: {
        display: "flex",
        flexDirection: "column",
        gap: "24px",
        padding: "24px",
        fontSize: "16px",
        lineHeight: "1.1em",
        fontWeight: "500",
        backgroundColor: "#F6F6F6",
        flex: "0 0 560px",
        maxWidth: "100%",
        width: "100%",
        boxSizing: "border-box",
    },

    finalTableRow: {
        display: "flex",
        alignItems: "stretch",
        boxSizing: "border-box",
    },

    finalTableCol1: {
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        flex: "0 0 70%",
        boxSizing: "border-box",
        minHeight: "18px"
    },

    finalTableCol2: {
        display: "flex",
        alignItems: "center",
        justifyContent: "flex-end",
        flex: "1 0 30%",
        boxSizing: "border-box",
        color: "#005CA9",
        minHeight: "18px"
    },

    finalTableBlock: {
        display: "flex",
        flexDirection: "column",
        gap: "24px",
        maxWidth: "100%",
        width: "100%",
        boxSizing: "border-box",
    },

    finalTableTitleCol: {
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        flex: "0 0 100%",
        boxSizing: "border-box",
        fontWeight: "700",
    },

    /* диаграммы */
    diagramWrap: {
        flex: "1 1 100%"
    },

    /* формы и поля */
    calculatorForm: {
        marginTop: "50px",
        maxWidth: "938px",
        display: "flex",
        flexDirection: "column",
        gap: "80px",
        boxSizing: "border-box",
        userSelect: "none"
    },
    formSubtitle1: {
        gridColumn: "1 / 4",
        padding: "0",
        margin: "0",
        fontFamily: "Montserrat",
        fontSize: "24px",
        lineHeight: "1.1em",
        fontWeight: "500",
        color: "#000",
    },
    formSubtitle2: {
        gridColumn: "1 / 3",
        padding: "0",
        margin: "0",
        fontFamily: "Montserrat",
        fontSize: "24px",
        lineHeight: "1.1em",
        fontWeight: "500",
        color: "#000",
    },
    formFieldSet: {
        display: "grid",
        gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
        gap: "40px",
    },
    formFieldSetContacts: {
        maxWidth: "840px",
        display: "grid",
        gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
        gap: "40px",
    },
    formField: {
        position: "relative",
        display: "flex",
        flexDirection: "column",
        gap: "24px",
        boxSizing: "border-box",
        fontFamily: "Montserrat",
        fontSize: "16px",
        lineHeight: "1.1em",
        fontWeight: "500",
        color: "#000",
    },
    formFieldTextarea: {
        gridColumn: "1 / 3",
        display: "flex",
        flexDirection: "column",
        gap: "24px",
        boxSizing: "border-box",
    },
    inputAndSelect: {
        padding: "23px 24px",
        width: "100%",
        outline: "none",
        border: "1px solid #000000",
        boxSizing: "border-box",
        fontFamily: "Montserrat",
        fontSize: "16px",
        lineHeight: "1em",
        fontWeight: "400",
        color: "#005CA9",
        backgroundColor: "#fff",
        MozAppearance: "none",
        WebkitAppearance: "none"
    },
    inputAndSelectError: {
        padding: "23px 24px",
        width: "100%",
        outline: "none",
        border: "1px solid #F01471",
        boxSizing: "border-box",
        fontFamily: "Montserrat",
        fontSize: "16px",
        lineHeight: "1em",
        fontWeight: "400",
        color: "#005CA9",
        MozAppearance: "none",
        WebkitAppearance: "none"
    },
    textarea: {
        padding: "16px",
        width: "100%",
        outline: "none",
        border: "1px solid #000000",
        boxSizing: "border-box",
        fontFamily: "Montserrat",
        fontSize: "16px",
        lineHeight: "1.1em",
        fontWeight: "400",
        color: "#005CA9",
    },
    inputControls: {
        position: "absolute",
        right: "24px",
        bottom: "16px"
    },
    inputControl: {
        width: "16px",
        height: "16px",
        cursor: "pointer"
    },
    selectArrow: {
        position: "absolute",
        right: "24px",
        bottom: "24px",
        width: "16px",
        height: "16px",
        pointerEvents: "none"
    },
    btn: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
        padding: "15px 30px",
        minHeight: "64px",
        fontFamily: '"Montserrat", sans-serif',
        fontSize: "20px",
        lineHeight: "1.1em",
        color: "white",
        backgroundColor: "#005CA9",
        outline: "none",
        border: "none",
        cursor: "pointer",
        transition: "background-color 0.2s ease",
        boxSizing: "border-box",
    },

    btnHovered: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
        padding: "15px 30px",
        minHeight: "64px",
        fontFamily: '"Montserrat", sans-serif',
        fontSize: "20px",
        lineHeight: "1.1em",
        color: "white",
        backgroundColor: "#008ECF",
        outline: "none",
        border: "none",
        cursor: "pointer",
        transition: "background-color 0.2s ease",
        boxSizing: "border-box",
    },

    /* таблицы промежуточных результатов */
    initialResults: {
        marginTop: "50px",
        display: "flex",
        alignItems: "flex-start",
        justifyContent: "flex-start",
        flexWrap: "wrap",
        gap: "0 30px",
        boxSizing: "border-box",
    },

    detailedResults: {
        marginTop: "50px",
        display: "flex",
        alignItems: "flex-start",
        justifyContent: "flex-start",
        flexWrap: "wrap",
        gap: "0 30px",
        boxSizing: "border-box",
    },

    resultsTitle: {
        flexBasis: "100%",
        fontSize: "35px",
        lineHeight: "1.1",
        boxSizing: "border-box",
    },

    scheduleTable: {
        fontSize: "14px",
        lineHeight: "1.2em",
        fontWeight: "400",
        borderTop: "1px solid lightgrey",
        flexBasis: "50%",
        maxWidth: "650px",
        marginTop: "30px",
        boxSizing: "border-box",
    },

    detailedTable: {
        fontSize: "14px",
        lineHeight: "1.2em",
        fontWeight: "400",
        borderTop: "1px solid lightgrey",
        flexBasis: "100%",
        maxWidth: "1330px",
        marginTop: "30px",
        boxSizing: "border-box",
    },

    tableRow: {
        display: "flex",
        alignItems: "stretch",
        borderLeft: "1px solid lightgrey",
        boxSizing: "border-box",
    },

    tableCol: {
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "5px 10px",
        flexShrink: "0",
        flexGrow: "0",
        flexBasis: "50%",
        borderRight: "1px solid lightgrey",
        borderBottom: "1px solid lightgrey",
        boxSizing: "border-box",
    },

    detailedTableCol: {
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "5px 10px",
        flexShrink: "1",
        flexGrow: "1",
        flexBasis: "calc(100% / 11)",
        borderRight: "1px solid lightgrey",
        borderBottom: "1px solid lightgrey",
        boxSizing: "border-box",
    },

    maintenanceTableCol: {
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "5px 10px",
        flexShrink: "0",
        flexGrow: "0",
        flexBasis: "calc(100% / 12)",
        borderRight: "1px solid lightgrey",
        borderBottom: "1px solid lightgrey",
        boxSizing: "border-box",
    },

    maintenanceTableCol3: {
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "5px 10px",
        flexShrink: "0",
        flexGrow: "0",
        flexBasis: "calc(100% / 12 * 3)",
        borderRight: "1px solid lightgrey",
        borderBottom: "1px solid lightgrey",
        boxSizing: "border-box",
    },

    /* Радио кнопки с картинками */
    radioList: {
        display: "flex",
        gap: "24px",
    },

    radioListBtns: {
        display: "flex",
        gap: "40px",
    },

    hideRadioInput: {
        position: "absolute",
        top: "0",
        left: "0",
        width: "0",
        height: "0",
        visibility: "hidden"
    },

    radioImageItem: {
        display: "flex",
        flexDirection: "column",
        gap: "16px",
        alignItems: "center",
        flex: "1 1 33%",
        cursor: "pointer"
    },

    radioImgBlock: {
        display: "block",
        position: "relative",
        width: "135px",
        height: "151.22px",
    },

    radioBg: {
        display: "block",
        position: "absolute",
        width: "100%",
        height: "100%",
        left: "50%",
        top: "50%",
        transform: "translate(-50%, -50%)",
        zIndex: "5",
        opacity: "0"
    },

    radioBgActive: {
        display: "block",
        position: "absolute",
        width: "100%",
        height: "100%",
        left: "50%",
        top: "50%",
        transform: "translate(-50%, -50%)",
        zIndex: "5",
        opacity: "1"
    },

    radioImage: {
        display: "block",
        position: "absolute",
        width: "88.89%",
        height: "88.89%",
        left: "50%",
        top: "50%",
        transform: "translate(-50%, -50%)",
        zIndex: "10"
    },

    radioName: {
        fontSize: "16px",
        lineHeight: "1.1em",
        fontWeight: "400",
        color: "#000",
    },

    radioNameActive: {
        fontSize: "16px",
        lineHeight: "1.1em",
        fontWeight: "400",
        color: "#005CA9",
    },

    radioBtnItem: {
        flex: "1 1 50%",
        maxWidth: "280px",
        cursor: "pointer"
    },

    radioBtn: {
        height: "64px",
        boxSizing: "border-box",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        fontFamily: "Inter",
        fontSize: "16px",
        lineHeight: "1.1em",
        fontWeight: "400",
        color: "#005CA9",
        border: "1px solid #008ECF"
    },

    radioBtnActive: {
        height: "64px",
        boxSizing: "border-box",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        fontFamily: "Inter",
        fontSize: "16px",
        lineHeight: "1.1em",
        fontWeight: "400",
        color: "#fff",
        backgroundColor: "#008ECF"
    }

}

export default function Calculator() {

    // Поля ввода
    const exchangeRatesRubCny = useInput(12.58, "float")
    const nominalElectricalPower = useInput(1100)
    const amount = useInput(1, "int")
    const gasPrice = useInput(6.0, "float")
    const priceElectricity = useInput(6.0, "float")
    const priceThermalEnergy = useInput(1500.0, "float")
    const userName = useInput("", "name")
    const companyName = useInput("", "name")
    const userPhone = useInput("", "phone")
    const userEmail = useInput("", "email")
    const userComment = useInput("")

    const [execution, setExecution] = useState("open")
    function executionChangeHandler(e) {
        setExecution(e.target.value)
    }

    const [useThermalEnergy, setUseThermalEnergy] = useState("heatingSeason")
    function useThermalEnergyChangeHandler(e) {
        setUseThermalEnergy(e.target.value)
    }

    const selectRef = useRef(null)
    const [btnHover, setBtnHover] = useState(false)

    const exchangeRatesRubCnyValue = parseFloat(
        exchangeRatesRubCny.value.toString().replace(/[^\.\d]/g, "")
    )

    const amountValue = parseFloat(amount.value.toString().replace(/\D/g, ""))

    const gasPriceValue = parseFloat(
        gasPrice.value.toString().replace(/[^\.\d]/g, "")
    )

    const priceElectricityValue = parseFloat(
        priceElectricity.value.toString().replace(/[^\.\d]/g, "")
    )

    const priceThermalEnergyValue = parseFloat(
        priceThermalEnergy.value.toString().replace(/[^\.\d]/g, "")
    )

    //видимость формы
    const [calculateFormVisibility, setCalculateFormVisibility] = useState(true)

    //видимость расчётов
    const [finalDataVisibility, setFinalDataVisibility] = useState(false)

    //расчётная модель
    const modelGPUArr = useMemo(() => {
        return modelsData.find(
            (item) => item.electricPower == nominalElectricalPower.value
        )
    }, [nominalElectricalPower])

    //массив ТО
    const maintenanceData = [
        {
            id: "W10",
            name: "W10",
            spareParts:
                modelGPUArr.costSpareParts.w10 * exchangeRatesRubCnyValue,
            work: modelGPUArr.costWork.w10,
            years: distributionMaintenanceYear(
                maintenance.w10,
                variables.annualProductionGPU
            ),
            count: maintenance.w10.length,
        },
        {
            id: "W30",
            name: "W30",
            spareParts:
                modelGPUArr.costSpareParts.w30 * exchangeRatesRubCnyValue,
            work: modelGPUArr.costWork.w30,
            years: distributionMaintenanceYear(
                maintenance.w30,
                variables.annualProductionGPU
            ),
            count: maintenance.w30.length,
        },
        {
            id: "W40",
            name: "W40",
            spareParts:
                modelGPUArr.costSpareParts.w40 * exchangeRatesRubCnyValue,
            work: modelGPUArr.costWork.w40,
            years: distributionMaintenanceYear(
                maintenance.w40,
                variables.annualProductionGPU
            ),
            count: maintenance.w40.length,
        },
        {
            id: "W50",
            name: "W50",
            spareParts:
                modelGPUArr.costSpareParts.w50 * exchangeRatesRubCnyValue,
            work: modelGPUArr.costWork.w50,
            years: distributionMaintenanceYear(
                maintenance.w50,
                variables.annualProductionGPU
            ),
            count: maintenance.w50.length,
        },
        {
            id: "W60",
            name: "W60",
            spareParts:
                modelGPUArr.costSpareParts.w60 * exchangeRatesRubCnyValue,
            work: modelGPUArr.costWork.w60,
            years: distributionMaintenanceYear(
                maintenance.w60,
                variables.annualProductionGPU
            ),
            count: maintenance.w60.length,
        },
        {
            id: "W70",
            name: "W70",
            spareParts: variables.w70Coast
                ? modelGPUArr.costSpareParts.w70 * exchangeRatesRubCnyValue
                : "0",
            work: variables.w70Coast ? modelGPUArr.costWork.w70 : "0",
            years: distributionMaintenanceYear(
                maintenance.w70,
                variables.annualProductionGPU
            ),
            count: maintenance.w70.length,
        },
        {
            id: "turbines",
            name: "Турбины",
            spareParts:
                modelGPUArr.costSpareParts.turbineRepair *
                exchangeRatesRubCnyValue,
            work: modelGPUArr.costWork.turbineRepair,
            years: distributionMaintenanceYear(
                maintenance.turbines,
                variables.annualProductionGPU
            ),
            count: maintenance.turbines.length,
        },
        {
            id: "generator",
            name: "Генераторы",
            spareParts:
                modelGPUArr.costSpareParts.generatorRepair *
                exchangeRatesRubCnyValue,
            work: modelGPUArr.costWork.generatorRepair,
            years: distributionMaintenanceYear(
                maintenance.generator,
                variables.annualProductionGPU
            ),
            count: maintenance.generator.length,
        },
        {
            id: "oil",
            name: "Колличество замен масла на одной ГПУ",
            spareParts: "",
            work: "",
            years: getOilYears(),
            count:
                Math.floor(
                    (variables.annualProductionGPU * 8) / variables.oilResource
                ) - 1,
        },
    ]

    //тут массивы всех расчётов
    let calculatorResult = useMemo(() => {
        return getTepData()
    }, [])

    //массив исходных данных
    const [initialData, setInitialData] = useState(
        calculatorResult.resultInitialData
    )

    //массив тарифов
    const [tariffData, setTariffData] = useState(
        calculatorResult.resultTariffArr
    )

    //массив ТЭП до кап. ремонта
    const [tepData, setTepData] = useState(calculatorResult.resultTepArr)

    //массив себестоимости
    const [costPriceData, setCostPriceData] = useState(
        calculatorResult.resultCostPriceArr
    )

    //массив окупаемости
    const [paybackData, setPaybackData] = useState(
        calculatorResult.resultPaybackArr
    )

    //Массив итоговой сотимости и технических характеристик
    const [finalCostTechChars, setFinalCostTechChars] = useState(
        calculatorResult.finalCostTechCharsArr
    )

    //Массив годовых показателей
    const [finalAnnualIndicators, setFinalAnnualIndicators] = useState(
        calculatorResult.finalAnnualIndicatorsArr
    )

    //Данные для диаграммы Bar
    const [energyProductionСostsDiagram, setEnergyProductionСostsDiagram] =
        useState(calculatorResult.energyProductionСostsDiagramObj)

    //Данные для диаграммы затрат на энергию
    const [energyСostsDiagram, setEnergyСostsDiagram] = useState(
        calculatorResult.energyСostsDiagramObj
    )

    // расчёт массивов тарифов, ТЭП, себестоимости и окупаемости
    function getTepData() {
        const capex =
            modelGPUArr.installationCost[execution] *
            exchangeRatesRubCnyValue *
            amountValue
        const thermalPowerСalories = modelGPUArr.thermalPower * 0.00086
        const resultElectricPower = modelGPUArr.electricPower * amountValue
        const maxOutputPowerGPES =
            resultElectricPower * (1 - variables.SNGPU / 100)

        // результирующий объект
        let resultObj = {
            resultInitialData: [
                {
                    id: "modelGPU",
                    name: "Модель ГПУ",
                    value: modelGPUArr.model,
                },
                {
                    id: "nominalElectricalPowerGPU",
                    name: "Номинальная электрическая мощность ГПУ",
                    value: modelGPUArr.electricPower + " кВт",
                },
                {
                    id: "numberGPUs",
                    name: "Количество ГПУ",
                    value: amountValue + " шт",
                },
                {
                    id: "nominalThermalPower",
                    name: "Номинальная тепловая мощность",
                    value: modelGPUArr.thermalPower + " кВт",
                    value2:
                        Math.round(thermalPowerСalories * 1000) / 1000 +
                        " Гкал",
                },
                {
                    id: "gasConsumption",
                    name: "Расход газа",
                    value: modelGPUArr.gasСonsumption + " нм3",
                },
                {
                    id: "SNGPU",
                    name: "СН ГПУ",
                    value: variables.SNGPU + "%",
                },
                {
                    id: "maxOutputPowerGPES",
                    name: "Макс. отпуск. мощность ГПЭС (-СН)",
                    value: maxOutputPowerGPES + " кВт",
                },
                {
                    id: "oilConsumption",
                    name: "Расход масла на угар/Объем при замене",
                    value: modelGPUArr.oilConsumptionBurning + " г/кВтч",
                    value2: modelGPUArr.oilVolumeCrankcase + " л",
                },
                {
                    id: "oilChangeIntervals",
                    name: "Переодичность замены масла",
                    value: variables.oilResource + " мч",
                },
                {
                    id: "capex",
                    name: "CAPEX",
                    value:
                        capex.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ") +
                        " ₽",
                },
            ],
            resultTariffArr: [
                {
                    id: "gasVolume",
                    name: "1 нм3 газа",
                    price: gasPriceValue,
                    indexing: variables.indexing.gas,
                    years: calculateIndexingArr(
                        gasPriceValue,
                        parseFloat(variables.indexing.gas)
                    ),
                },
                {
                    id: "electricVolume",
                    name: "1 кВт э/э",
                    price: priceElectricityValue,
                    indexing: variables.indexing.electricPower,
                    years: calculateIndexingArr(
                        priceElectricityValue,
                        parseFloat(variables.indexing.electricPower)
                    ),
                },
                {
                    id: "thermalVolume",
                    name: "1 Гкал т/э",
                    price: priceThermalEnergyValue,
                    indexing: variables.indexing.thermalPower,
                    years: calculateIndexingArr(
                        priceThermalEnergyValue,
                        parseFloat(variables.indexing.thermalPower)
                    ),
                },
                {
                    id: "oilVolume",
                    name: "1 л масла",
                    price: variables.oilPrice,
                    indexing: variables.indexing.oil,
                    years: calculateIndexingArr(
                        parseFloat(variables.oilPrice),
                        parseFloat(variables.indexing.oil)
                    ),
                },
                {
                    id: "antifreezeVolume",
                    name: "1л антифриза",
                    price: variables.antifreezePrice,
                    indexing: variables.indexing.antifreeze,
                    years: calculateIndexingArr(
                        parseFloat(variables.antifreezePrice),
                        parseFloat(variables.indexing.antifreeze)
                    ),
                },
            ],
            finalCostTechCharsArr: [
                {
                    id: "type",
                    name: "Тип установки",
                    value: modelGPUArr.model,
                },
                {
                    id: "electricPower",
                    name: "Номинальная электрическая мощность, кВт",
                    value: modelGPUArr.electricPower,
                },
                {
                    id: "thermalPower",
                    name: "Номинальная тепловая мощность, кВт",
                    value: modelGPUArr.thermalPower,
                },
                {
                    id: "electricEfficiency",
                    name: "Электрический КПД, %",
                    value: modelGPUArr.electricEfficiency,
                },
                {
                    id: "gasConsumption",
                    name: "Потребление природного газа, Нм3/ч",
                    value: modelGPUArr.gasСonsumption,
                },
                {
                    id: "amount",
                    name: "Количество установок, шт",
                    value: amountValue,
                },
                {
                    id: "resultElectricPower",
                    name: "Суммарная электрическая мощность, кВт",
                    value: resultElectricPower,
                },
                {
                    id: "resultThermalPower",
                    name: "Суммарная тепловая мощность, Гкал/час",
                    value: modelGPUArr.thermalPower * amountValue,
                },
                {
                    id: "execution",
                    name: "Выбранное исполнение",
                    value:
                        execution === "open"
                            ? "Открытое"
                            : execution === "container"
                                ? "Контейнерное без утилизации тепла"
                                : execution === "containerHeatRecovery"
                                    ? "Контейнерное с утилизацией тепла"
                                    : "",
                },
                {
                    id: "Capex",
                    name: "Стоимость оборудования в выбранной комплектации, руб. без НДС",
                    value:
                        capex.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ") +
                        " ₽",
                },
                {
                    id: "powerCost",
                    name: "Удельная стоимость 1 кВт установленной мощности, руб. без НДС",
                    value:
                        (
                            Math.round(
                                (capex /
                                    (modelGPUArr.electricPower * amountValue)) *
                                100
                            ) / 100
                        )
                            .toString()
                            .replace(/\B(?=(\d{3})+(?!\d))/g, " ") + " ₽",
                },
            ],
        }

        // массив ТЭП
        let resultTepArr = [
            {
                id: "GPUOperatingTime",
                name: "Наработка ГПУ, мч",
                years: [],
                sum: "",
            },
            {
                id: "GPUOperatingYear",
                name: "Наработка ГПУ за год, мч",
                years: [],
                sum: 0,
            },
            {
                id: "electricityGeneration",
                name: "Выработка э/э ГПЭС, кВтч",
                years: [],
                sum: 0,
            },
            {
                id: "usefulOutputElectricity",
                name: "Полезный отпуск э/э ГПЭС (- СН), кВтч",
                years: [],
                sum: 0,
            },
            {
                id: "thermalGeneration",
                name: "Выработка т/э ГПЭС, Гкал",
                years: [],
                sum: 0,
            },
            {
                id: "gasСonsumption",
                name: "Расход газа, нм3",
                years: [],
                sum: 0,
            },
            {
                id: "oilСonsumption",
                name: "Расход масла, л",
                years: [],
                sum: 0,
            },
        ]

        //итоги ТЭП
        let sumsTepArr = {
            operatingTime: "",
            operatingYear: 0,
            electricityGeneration: 0,
            usefulOutputElectricity: 0,
            thermalGeneration: 0,
            gasСonsumption: 0,
            oilСonsumption: 0,
        }

        // Массив себестоимости
        let resultCostPriceArr = [
            {
                id: "totalСosts",
                name: "Затраты на выработку э/э, в т.ч.:",
                years: [],
                sum: 0,
            },
            {
                id: "totalСostsGas",
                name: "- топливо",
                years: [],
                sum: 0,
            },
            {
                id: "totalСostsOil",
                name: "- масло",
                years: [],
                sum: 0,
            },
            {
                id: "totalСostsMaintenance",
                name: "- ТО",
                years: [],
                sum: 0,
            },
            {
                id: "costsPrice",
                name: "Себестоимость 1 кВт э/э, в т.ч.:",
                years: [],
                sum: 0,
            },
            {
                id: "costsPriceGas",
                name: "- топливо",
                years: [],
                sum: 0,
            },
            {
                id: "costsPriceOil",
                name: "- масло",
                years: [],
                sum: 0,
            },
            {
                id: "costsPriceMaintenance",
                name: "- ТО",
                years: [],
                sum: 0,
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
                id: "purchaseElectricity",
                name: "Затраты на приобретение э/э",
                years: [],
                sum: 0,
            },
            {
                id: "purchaseThermalEnergy",
                name: "Затраты на приобретение т/э",
                years: [],
                sum: 0,
            },
            {
                id: "purchaseEnergyResources",
                name: "Итого на приобретение энергоносителей",
                years: [],
                sum: 0,
            },
            {
                id: "savingsElectricity",
                name: "Полученная экономия по э/э",
                years: [],
                sum: 0,
            },
            {
                id: "savingsThermalEnergy",
                name: "Полученная экономия по т/э",
                years: [],
                sum: 0,
            },
            {
                id: "resultSavings",
                name: "Экономия ИТОГО",
                years: [],
                sum: 0,
            },
            {
                id: "economicEffect",
                name: "Экономический эффект с учетом CAPEX",
                years: [],
                sum: 0,
            },
            {
                id: "resultPayback",
                name: "Окупаемость",
                years: [],
                sum: 0,
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
            resultPayback: 0,
        }

        // Объект для диаграммы затрат на энергию
        let energyСostsDiagramObj = {
            labels: [
                "установка",
                "1 год",
                "2 год",
                "3 год",
                "4 год",
                "5 год",
                "6 год",
                "7 год",
                "8 год",
            ],
            datasets: [
                {
                    label: "Приобретение",
                    data: [0],
                },
                {
                    label: "Выработка",
                    data: [Math.round(capex)],
                },
            ],
        }

        // цикл по годам
        for (let i = 1; i <= 8; i++) {
            //переменные ТЭП
            let operatingTime = variables.annualProductionGPU * i
            let operatingYear = variables.annualProductionGPU
            let electricityGeneration =
                variables.annualProductionGPU * resultElectricPower
            let usefulOutputElectricity =
                maxOutputPowerGPES * variables.annualProductionGPU
            let thermalGeneration = 0
            if (execution === "containerHeatRecovery") {
                let intermediateResult = amountValue * thermalPowerСalories
                if (useThermalEnergy === "heatingSeason") {
                    if (operatingTime < variables.annualProductionGPU) {
                        if (operatingYear < 2520) {
                            thermalGeneration =
                                operatingYear * intermediateResult
                        } else if (operatingYear < 6988) {
                            thermalGeneration = 2520 * intermediateResult
                        } else {
                            thermalGeneration =
                                (operatingYear - 4368) * intermediateResult
                        }
                    } else {
                        thermalGeneration =
                            variables.hoursHeatUsage * intermediateResult
                    }
                } else {
                    thermalGeneration = operatingYear * intermediateResult
                }

                thermalGeneration = thermalGeneration
            }
            let gasСonsumption =
                operatingYear * modelGPUArr.gasСonsumption * amountValue
            let oilСonsumption =
                maintenanceData[8].years[i - 1] *
                modelGPUArr.oilVolumeCrankcase *
                amountValue +
                ((electricityGeneration * modelGPUArr.oilConsumptionBurning) /
                    1000) *
                1.11

            // Промежуточный массив ТЭП
            let yearTepArr = [
                operatingTime,
                operatingYear,
                electricityGeneration,
                usefulOutputElectricity,
                thermalGeneration,
                gasСonsumption,
                oilСonsumption,
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
            let totalСostsGas =
                gasСonsumption * resultObj.resultTariffArr[0].years[i - 1]
            let totalСostsOil =
                oilСonsumption * resultObj.resultTariffArr[3].years[i - 1]

            let totalСostsMaintenanceSumm = 0
            for (let j = 0; j < 8; j++) {
                if (maintenanceData[j].years[i - 1] > 0) {
                    totalСostsMaintenanceSumm +=
                        (maintenanceData[j].spareParts +
                            maintenanceData[j].work) *
                        maintenanceData[j].years[i - 1] *
                        amountValue
                }
            }
            let totalСostsMaintenance = totalСostsMaintenanceSumm

            let totalСosts =
                totalСostsGas + totalСostsOil + totalСostsMaintenance
            let costsPrice = totalСosts / usefulOutputElectricity
            let costsPriceGas = totalСostsGas / usefulOutputElectricity
            let costsPriceOil = totalСostsOil / usefulOutputElectricity
            let costsPriceMaintenance =
                totalСostsMaintenance / usefulOutputElectricity

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
            let purchaseElectricity =
                usefulOutputElectricity *
                resultObj.resultTariffArr[1].years[i - 1]

            let purchaseThermalEnergy = 0
            if (priceThermalEnergyValue == 0) {
                purchaseThermalEnergy =
                    thermalGeneration *
                    140 *
                    resultObj.resultTariffArr[0].years[i - 1]
            } else {
                purchaseThermalEnergy =
                    thermalGeneration *
                    resultObj.resultTariffArr[2].years[i - 1]
            }

            let purchaseEnergyResources =
                purchaseElectricity + purchaseThermalEnergy
            let savingsElectricity = purchaseElectricity - totalСosts

            let savingsThermalEnergy = 0
            if (priceThermalEnergyValue == 0) {
                savingsThermalEnergy =
                    thermalGeneration *
                    125 *
                    resultObj.resultTariffArr[0].years[i - 1]
            } else {
                savingsThermalEnergy =
                    thermalGeneration *
                    resultObj.resultTariffArr[2].years[i - 1]
            }

            let resultSavings = savingsElectricity + savingsThermalEnergy

            let economicEffect = 0
            if (i > 1) {
                if (
                    resultPaybackArr[6].years[i - 2] + resultSavings <
                    resultSavings
                ) {
                    economicEffect =
                        resultPaybackArr[6].years[i - 2] + resultSavings
                } else {
                    economicEffect = resultSavings
                }
            } else {
                if (resultSavings - capex < 0) {
                    economicEffect = resultSavings - capex
                } else {
                    economicEffect = resultSavings
                }
            }

            let resultPayback = Math.abs(economicEffect / resultSavings)
            if (economicEffect / resultSavings < 0) {
                resultPayback = 1
            } else if (economicEffect / resultSavings === 1) {
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
            sumsPaybackArr.economicEffect +=
                economicEffect > 0 ? economicEffect : 0
            sumsPaybackArr.resultPayback += resultPayback

            // заполняем данные для диаграммы затрат на энергию
            energyСostsDiagramObj.datasets[0].data.push(
                energyСostsDiagramObj.datasets[0].data[i - 1] +
                purchaseEnergyResources
            )
            energyСostsDiagramObj.datasets[1].data.push(
                energyСostsDiagramObj.datasets[1].data[i - 1] + totalСosts
            )
        }

        //Помещаем итоги ТЭП в массив ТЭП
        resultTepArr.forEach((item, index) => {
            item.sum = sumsTepArr[Object.keys(sumsTepArr)[index]]
        })

        // добавляем массив ТЭП в результирующий объект
        resultObj.resultTepArr = resultTepArr

        //Рассчитываем итоги себестоимости
        sumsCostPriceArr.totalСosts +=
            sumsCostPriceArr.totalСostsGas +
            sumsCostPriceArr.totalСostsOil +
            sumsCostPriceArr.totalСostsMaintenance
        sumsCostPriceArr.costsPrice +=
            sumsCostPriceArr.totalСosts / sumsTepArr.usefulOutputElectricity
        sumsCostPriceArr.costsPriceGas +=
            sumsCostPriceArr.totalСostsGas / sumsTepArr.usefulOutputElectricity
        sumsCostPriceArr.costsPriceOil +=
            sumsCostPriceArr.totalСostsOil / sumsTepArr.usefulOutputElectricity
        sumsCostPriceArr.costsPriceMaintenance +=
            sumsCostPriceArr.totalСostsMaintenance /
            sumsTepArr.usefulOutputElectricity

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
                id: "ElectricalEnergy",
                name: "Электрическая энергия",
                data: [
                    {
                        id: "generationElectricalEnergy",
                        name: "выработка электрической энергии генераторами, кВт*ч/год",
                        value: resultTepArr[2].years[0],
                    },
                    {
                        id: "consumptionElectricalEnergy",
                        name: "потребление электрической энергии на собственные нужды энергоцентра, кВт*ч/год",
                        value:
                            resultTepArr[2].years[0] - resultTepArr[3].years[0],
                    },
                    {
                        id: "releaseElectricalEnergy",
                        name: "отпуск электрической энергии в сеть предприятия, кВт*ч/год",
                        value: resultTepArr[3].years[0],
                    },
                ],
            },
            {
                id: "ThermalEnergy",
                name: "Тепловая энергия",
                data: [
                    {
                        id: "generationThermalEnergy",
                        name: "выработка тепловой энергии генераторами, Гкал/год",
                        value: resultTepArr[4].years[0],
                    },
                ],
            },
            {
                id: "Gas",
                name: "Природный газ",
                data: [
                    {
                        id: "consumptionGas",
                        name: "потребление природного газа генераторами, Нм3/год",
                        value: resultTepArr[5].years[0],
                    },
                ],
            },
            {
                id: "Payback",
                name: "Окупаемость",
                data: [
                    {
                        id: "averageElectricalEnergyСosts",
                        name: "Средние затраты за расчетный период на приобретение электрической энергии в год у сбытовой компании, руб. без НДС",
                        value:
                            Math.round(
                                resultPaybackArr[0].sum /
                                resultPaybackArr[0].years.length
                            ) + " ₽",
                    },
                    {
                        id: "averageThermalEnergyСosts",
                        name: "Средние затраты за расчетный период на приобретение тепловой энергии в год у сбытовой компании, руб. без НДС",
                        value:
                            Math.round(
                                resultPaybackArr[1].sum /
                                resultPaybackArr[1].years.length
                            ) + " ₽",
                    },
                    {
                        id: "totalEnergyCosts",
                        name: "Итого затраты на приобретение энергоносителей, руб. без НДС",
                        value:
                            Math.round(
                                resultPaybackArr[0].sum /
                                resultPaybackArr[0].years.length +
                                resultPaybackArr[1].sum /
                                resultPaybackArr[1].years.length
                            ) + " ₽",
                    },
                    {
                        id: "averageEnergyProductionCosts",
                        name: "Средние затраты за расчетный период на производство электрической и тепловой энергии на собственном энергоцентре, руб. без НДС",
                        value:
                            Math.round(
                                resultCostPriceArr[0].sum /
                                resultPaybackArr[0].years.length
                            ) + " ₽",
                    },
                    {
                        id: "averageSavings",
                        name: "Средняя за расчетный период ежегодная экономия, руб. без НДС",
                        value:
                            Math.round(
                                resultPaybackArr[5].sum /
                                resultPaybackArr[5].years.length
                            ) + " ₽",
                    },
                    {
                        id: "paybackPeriod",
                        name: "Срок окупаемости, лет",
                        value: floatToYearsMonths(resultPaybackArr[7].sum),
                    },
                ],
            },
        ]

        // добавляем массив годовых показателей в результирующий объект
        resultObj.finalAnnualIndicatorsArr = finalAnnualIndicatorsArr

        // Объект для диаграммы затрат на выработку электоэнергии
        let energyProductionСostsDiagramObj = {
            labels: resultCostPriceArr[0].years.map(
                (_, index) => index + 1 + " год"
            ),
            datasets: [
                {
                    label: "Топливо",
                    data: resultCostPriceArr[1].years.map((item) =>
                        Math.round(item)
                    ),
                },
                {
                    label: "Масло",
                    data: resultCostPriceArr[2].years.map((item) =>
                        Math.round(item)
                    ),
                },
                {
                    label: "ТО",
                    data: resultCostPriceArr[3].years.map((item) =>
                        Math.round(item)
                    ),
                },
            ],
        }

        // добавляем объект для диаграммы затрат в результирующий объект
        resultObj.energyProductionСostsDiagramObj =
            energyProductionСostsDiagramObj

        // округляем данные для диаграммы затрат на энергию
        energyСostsDiagramObj.datasets[0].data =
            energyСostsDiagramObj.datasets[0].data.map((item) =>
                Math.round(item)
            )
        energyСostsDiagramObj.datasets[1].data =
            energyСostsDiagramObj.datasets[1].data.map((item) =>
                Math.round(item)
            )

        // добавляем объект для диаграммы затрат на энергию в результирующий объект
        resultObj.energyСostsDiagramObj = energyСostsDiagramObj

        return resultObj
    }

    return (
        <main>
            <section style={styles.calculator}>
                <div style={styles.container}>
                    {calculateFormVisibility ? (
                        <form
                            onSubmit={(e) => formValidate(e)}
                            action=""
                            noValidate
                            style={styles.calculatorForm}
                        >
                            <div style={styles.formFieldSet}>
                                <p style={styles.formSubtitle1}>Укажите данные для просчета</p>
                                <div style={styles.formField}>
                                    <label htmlFor="exchangeRatesRubCny">
                                        Курс рубля к ЮАНЬ
                                    </label>
                                    <input
                                        type="input"
                                        id="exchangeRatesRubCny"
                                        value={exchangeRatesRubCny.value}
                                        onChange={exchangeRatesRubCny.onChange}
                                        onFocus={exchangeRatesRubCny.onFocus}
                                        onBlur={exchangeRatesRubCny.onBlur}
                                        style={
                                            !exchangeRatesRubCny.error
                                                ? styles.inputAndSelect
                                                : styles.inputAndSelectError
                                        }
                                    />

                                    <div style={styles.inputControls}>
                                        <div style={styles.inputControl} onClick={(e) => inputControlHandler(e, "up", exchangeRatesRubCny, "fraction")} >
                                            <svg width="100%" height="100%" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path fillRule="evenodd" clipRule="evenodd" d="M14.0104 9.98959L8 3.97918L1.98959 9.98959L2.6967 10.6967L8 5.3934L13.3033 10.6967L14.0104 9.98959Z" fill="black" />
                                            </svg>
                                        </div>
                                        <div style={styles.inputControl} onClick={(e) => inputControlHandler(e, "down", exchangeRatesRubCny, "fraction")} >
                                            <svg style={{ transform: "rotate(180deg)" }} width="100%" height="100%" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path fillRule="evenodd" clipRule="evenodd" d="M14.0104 9.98959L8 3.97918L1.98959 9.98959L2.6967 10.6967L8 5.3934L13.3033 10.6967L14.0104 9.98959Z" fill="black" />
                                            </svg>
                                        </div>
                                    </div>

                                </div>

                                <div className="selectWrap" style={styles.formField}>
                                    <label htmlFor="nominalElectricalPower">
                                        Номин. эл. мощность ГПУ
                                    </label>
                                    <select
                                        ref={selectRef}
                                        name=""
                                        id="nominalElectricalPower"
                                        value={nominalElectricalPower.value}
                                        onChange={nominalElectricalPower.onChange}
                                        onFocus={nominalElectricalPower.onFocus}
                                        onBlur={nominalElectricalPower.onBlur}
                                        style={styles.inputAndSelect}
                                    >
                                        <option value="1100">1100 кВт</option>
                                        <option value="1500">1500 кВт</option>
                                        <option value="2000">2000 кВт</option>
                                    </select>

                                    <div style={styles.selectArrow} >
                                        <svg style={{ transform: "rotate(180deg)" }} width="100%" height="100%" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path fillRule="evenodd" clipRule="evenodd" d="M14.0104 9.98959L8 3.97918L1.98959 9.98959L2.6967 10.6967L8 5.3934L13.3033 10.6967L14.0104 9.98959Z" fill="black" />
                                        </svg>
                                    </div>

                                </div>

                                <div style={styles.formField}>
                                    <label htmlFor="amount">
                                        Количество ГПУ
                                    </label>
                                    <input
                                        type="input"
                                        id="amount"
                                        value={amount.value}
                                        onChange={amount.onChange}
                                        onFocus={amount.onFocus}
                                        onBlur={amount.onBlur}
                                        style={
                                            !amount.error
                                                ? styles.inputAndSelect
                                                : styles.inputAndSelectError
                                        }
                                    />
                                    <div style={styles.inputControls}>
                                        <div style={styles.inputControl} onClick={(e) => inputControlHandler(e, "up", amount, "number")} >
                                            <svg width="100%" height="100%" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path fillRule="evenodd" clipRule="evenodd" d="M14.0104 9.98959L8 3.97918L1.98959 9.98959L2.6967 10.6967L8 5.3934L13.3033 10.6967L14.0104 9.98959Z" fill="black" />
                                            </svg>
                                        </div>
                                        <div style={styles.inputControl} onClick={(e) => inputControlHandler(e, "down", amount, "number")} >
                                            <svg style={{ transform: "rotate(180deg)" }} width="100%" height="100%" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path fillRule="evenodd" clipRule="evenodd" d="M14.0104 9.98959L8 3.97918L1.98959 9.98959L2.6967 10.6967L8 5.3934L13.3033 10.6967L14.0104 9.98959Z" fill="black" />
                                            </svg>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div style={styles.formField}>
                                <p style={{ padding: "0", margin: "0" }}>Выберите исполнение</p>
                                <div style={styles.radioList}>
                                    <label style={styles.radioImageItem}>
                                        <input
                                            style={styles.hideRadioInput}
                                            type="radio"
                                            name="execution"
                                            value="open"
                                            checked={execution == "open" ? true : false}
                                            onChange={executionChangeHandler} />
                                        <span style={styles.radioImgBlock}>
                                            <span style={execution == "open" ? styles.radioBgActive : styles.radioBg}>
                                                <svg width="100%" height="100%" viewBox="0 0 135 152" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M67.5126 0C45.0168 13.3147 22.5084 26.6294 0 39.9314V110.273C22.5084 123.916 45.0168 137.572 67.5126 151.216C90.0084 137.572 112.504 123.916 135 110.273V39.9314C112.504 26.6294 90.0084 13.3147 67.5126 0Z" fill="#005CA9" />
                                                </svg>
                                            </span>
                                            <span style={styles.radioImage}>
                                                <img src="https://framerusercontent.com/images/LQP9uepLhgc063NqO0ApCqxcKU.svg" />
                                            </span>
                                        </span>
                                        <span style={execution == "open" ? styles.radioNameActive : styles.radioName}>Открытое</span>
                                    </label>
                                    <label style={styles.radioImageItem}>
                                        <input
                                            style={styles.hideRadioInput}
                                            type="radio"
                                            name="execution"
                                            value="container"
                                            checked={execution == "container" ? true : false}
                                            onChange={executionChangeHandler} />
                                        <span style={styles.radioImgBlock}>
                                            <span style={execution == "container" ? styles.radioBgActive : styles.radioBg}>
                                                <svg width="100%" height="100%" viewBox="0 0 135 152" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M67.5126 0C45.0168 13.3147 22.5084 26.6294 0 39.9314V110.273C22.5084 123.916 45.0168 137.572 67.5126 151.216C90.0084 137.572 112.504 123.916 135 110.273V39.9314C112.504 26.6294 90.0084 13.3147 67.5126 0Z" fill="#005CA9" />
                                                </svg>
                                            </span>
                                            <span style={styles.radioImage}>
                                                <img src="https://framerusercontent.com/images/kkOViUf5A7Mz4BkgKsd823Yk0.svg" />
                                            </span>
                                        </span>
                                        <span style={execution == "container" ? styles.radioNameActive : styles.radioName}>Контейнерное без утилизации тепла</span>
                                    </label>
                                    <label style={styles.radioImageItem}>
                                        <input
                                            style={styles.hideRadioInput}
                                            type="radio"
                                            name="execution"
                                            value="containerHeatRecovery"
                                            checked={execution == "containerHeatRecovery" ? true : false}
                                            onChange={executionChangeHandler} />
                                        <span style={styles.radioImgBlock}>
                                            <span style={execution == "containerHeatRecovery" ? styles.radioBgActive : styles.radioBg}>
                                                <svg width="100%" height="100%" viewBox="0 0 135 152" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M67.5126 0C45.0168 13.3147 22.5084 26.6294 0 39.9314V110.273C22.5084 123.916 45.0168 137.572 67.5126 151.216C90.0084 137.572 112.504 123.916 135 110.273V39.9314C112.504 26.6294 90.0084 13.3147 67.5126 0Z" fill="#005CA9" />
                                                </svg>
                                            </span>
                                            <span style={styles.radioImage}>
                                                <img src="https://framerusercontent.com/images/5QNAGym1HwepCYPXSHsWuT12FS4.svg" />
                                            </span>
                                        </span>
                                        <span style={execution == "containerHeatRecovery" ? styles.radioNameActive : styles.radioName}>Контейнерное с утилизацией тепла</span>
                                    </label>
                                </div>
                            </div>

                            {execution ===
                                "containerHeatRecovery" && (
                                    <div style={styles.formField}>
                                        <p style={{ padding: "0", margin: "0" }}>Выберите период использование тепловой энергии ГПУ</p>
                                        <div style={styles.radioListBtns}>
                                            <label style={styles.radioBtnItem}>
                                                <input
                                                    style={styles.hideRadioInput}
                                                    type="radio"
                                                    name="useThermalEnergy"
                                                    value="allEYear"
                                                    checked={execution == "allEYear" ? true : false}
                                                    onChange={useThermalEnergyChangeHandler} />
                                                <span style={useThermalEnergy == "allEYear" ? styles.radioBtnActive : styles.radioBtn}>Круглый год</span>
                                            </label>
                                            <label style={styles.radioBtnItem}>
                                                <input
                                                    style={styles.hideRadioInput}
                                                    type="radio"
                                                    name="useThermalEnergy"
                                                    value="heatingSeason"
                                                    checked={execution == "heatingSeason" ? true : false}
                                                    onChange={useThermalEnergyChangeHandler} />
                                                <span style={useThermalEnergy == "heatingSeason" ? styles.radioBtnActive : styles.radioBtn}>Отопительный сезон</span>
                                            </label>
                                        </div>
                                    </div>
                                )}

                            <div style={styles.formFieldSet}>
                                <div style={styles.formField}>
                                    <label htmlFor="gasPrice">
                                        Стоимость 1 нм3 газа, руб. без НДС
                                    </label>
                                    <input
                                        type="input"
                                        id="gasPrice"
                                        value={gasPrice.value}
                                        onChange={gasPrice.onChange}
                                        onFocus={gasPrice.onFocus}
                                        onBlur={gasPrice.onBlur}
                                        style={
                                            !gasPrice.error
                                                ? styles.inputAndSelect
                                                : styles.inputAndSelectError
                                        }
                                    />
                                    <div style={styles.inputControls}>
                                        <div style={styles.inputControl} onClick={(e) => inputControlHandler(e, "up", gasPrice, "number")} >
                                            <svg width="100%" height="100%" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path fillRule="evenodd" clipRule="evenodd" d="M14.0104 9.98959L8 3.97918L1.98959 9.98959L2.6967 10.6967L8 5.3934L13.3033 10.6967L14.0104 9.98959Z" fill="black" />
                                            </svg>
                                        </div>
                                        <div style={styles.inputControl} onClick={(e) => inputControlHandler(e, "down", gasPrice, "number")} >
                                            <svg style={{ transform: "rotate(180deg)" }} width="100%" height="100%" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path fillRule="evenodd" clipRule="evenodd" d="M14.0104 9.98959L8 3.97918L1.98959 9.98959L2.6967 10.6967L8 5.3934L13.3033 10.6967L14.0104 9.98959Z" fill="black" />
                                            </svg>
                                        </div>
                                    </div>
                                </div>

                                <div style={styles.formField}>
                                    <label htmlFor="priceElectricity">
                                        Стоимость 1 кВт э/э, руб. без НДС
                                    </label>
                                    <input
                                        type="input"
                                        id="priceElectricity"
                                        value={priceElectricity.value}
                                        onChange={priceElectricity.onChange}
                                        onFocus={priceElectricity.onFocus}
                                        onBlur={priceElectricity.onBlur}
                                        style={
                                            !priceElectricity.error
                                                ? styles.inputAndSelect
                                                : styles.inputAndSelectError
                                        }
                                    />
                                    <div style={styles.inputControls}>
                                        <div style={styles.inputControl} onClick={(e) => inputControlHandler(e, "up", priceElectricity, "number")} >
                                            <svg width="100%" height="100%" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path fillRule="evenodd" clipRule="evenodd" d="M14.0104 9.98959L8 3.97918L1.98959 9.98959L2.6967 10.6967L8 5.3934L13.3033 10.6967L14.0104 9.98959Z" fill="black" />
                                            </svg>
                                        </div>
                                        <div style={styles.inputControl} onClick={(e) => inputControlHandler(e, "down", priceElectricity, "number")} >
                                            <svg style={{ transform: "rotate(180deg)" }} width="100%" height="100%" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path fillRule="evenodd" clipRule="evenodd" d="M14.0104 9.98959L8 3.97918L1.98959 9.98959L2.6967 10.6967L8 5.3934L13.3033 10.6967L14.0104 9.98959Z" fill="black" />
                                            </svg>
                                        </div>
                                    </div>
                                </div>

                                {execution ===
                                    "containerHeatRecovery" && (
                                        <div style={styles.formField}>
                                            <label htmlFor="priceThermalEnergy">
                                                Стоимость 1 Гкал т/э, руб. без НДС
                                            </label>
                                            <input
                                                type="input"
                                                id="priceThermalEnergy"
                                                value={priceThermalEnergy.value}
                                                onChange={
                                                    priceThermalEnergy.onChange
                                                }
                                                onFocus={priceThermalEnergy.onFocus}
                                                onBlur={priceThermalEnergy.onBlur}
                                                style={
                                                    !priceThermalEnergy.error
                                                        ? styles.inputAndSelect
                                                        : styles.inputAndSelectError
                                                }
                                            />
                                            <div style={styles.inputControls}>
                                                <div style={styles.inputControl} onClick={(e) => inputControlHandler(e, "up", priceThermalEnergy, "number")} >
                                                    <svg width="100%" height="100%" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <path fillRule="evenodd" clipRule="evenodd" d="M14.0104 9.98959L8 3.97918L1.98959 9.98959L2.6967 10.6967L8 5.3934L13.3033 10.6967L14.0104 9.98959Z" fill="black" />
                                                    </svg>
                                                </div>
                                                <div style={styles.inputControl} onClick={(e) => inputControlHandler(e, "down", priceThermalEnergy, "number")} >
                                                    <svg style={{ transform: "rotate(180deg)" }} width="100%" height="100%" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <path fillRule="evenodd" clipRule="evenodd" d="M14.0104 9.98959L8 3.97918L1.98959 9.98959L2.6967 10.6967L8 5.3934L13.3033 10.6967L14.0104 9.98959Z" fill="black" />
                                                    </svg>
                                                </div>
                                            </div>
                                        </div>
                                    )}
                            </div>

                            <div style={styles.formFieldSetContacts}>
                                <p style={styles.formSubtitle2}>Ваши контактные данные</p>
                                <div style={styles.formField}>
                                    <label htmlFor="userName">
                                        Ваше имя
                                    </label>
                                    <input
                                        type="input"
                                        id="userName"
                                        value={userName.value}
                                        onChange={userName.onChange}
                                        onFocus={userName.onFocus}
                                        onBlur={userName.onBlur}
                                        style={
                                            !userName.error
                                                ? styles.inputAndSelect
                                                : styles.inputAndSelectError
                                        }
                                    />
                                </div>

                                <div style={styles.formField}>
                                    <label htmlFor="companyName">
                                        Название компании
                                    </label>
                                    <input
                                        type="input"
                                        id="companyName"
                                        value={companyName.value}
                                        onChange={companyName.onChange}
                                        onFocus={companyName.onFocus}
                                        onBlur={companyName.onBlur}
                                        style={
                                            !companyName.error
                                                ? styles.inputAndSelect
                                                : styles.inputAndSelectError
                                        }
                                    />
                                </div>

                                <div style={styles.formField}>
                                    <label htmlFor="userPhone">Ваш номер телефона</label>
                                    <input
                                        type="input"
                                        id="userPhone"
                                        value={userPhone.value}
                                        onFocus={userPhone.onFocus}
                                        onChange={userPhone.onChange}
                                        onBlur={userPhone.onBlur}
                                        placeholder="+7 (000) 000-00-00"
                                        style={
                                            !userPhone.error
                                                ? styles.inputAndSelect
                                                : styles.inputAndSelectError
                                        }
                                    />
                                </div>

                                <div style={styles.formField}>
                                    <label htmlFor="userEmail">
                                        Ваш email
                                    </label>
                                    <input
                                        type="input"
                                        id="userEmail"
                                        value={userEmail.value}
                                        onChange={userEmail.onChange}
                                        onFocus={userEmail.onFocus}
                                        onBlur={userEmail.onBlur}
                                        placeholder="mail@email.com"
                                        style={
                                            !userEmail.error
                                                ? styles.inputAndSelect
                                                : styles.inputAndSelectError
                                        }
                                    />
                                </div>

                                <div style={styles.formFieldTextarea}>
                                    <label htmlFor="userComment">
                                        Дополнительный комментарий
                                    </label>
                                    <textarea
                                        id="userComment"
                                        value={userComment.value}
                                        onChange={userComment.onChange}
                                        onFocus={userComment.onFocus}
                                        onBlur={userComment.onBlur}
                                        placeholder="Ваш комментарий"
                                        rows="4"
                                        style={
                                            styles.textarea
                                        }
                                    />
                                </div>

                                <Button
                                    type="submit"
                                    onMouseEnter={() => setBtnHover(true)}
                                    onMouseLeave={() => setBtnHover(false)}
                                    style={
                                        btnHover ?
                                            styles.btnHovered :
                                            styles.btn
                                    }
                                >
                                    Рассчитать стоимость
                                </Button>
                            </div>
                        </form>
                    ) : null}

                    {finalDataVisibility ? (
                        <FinalData
                            costTechChars={finalCostTechChars}
                            annualIndicators={finalAnnualIndicators}
                            energyProductionСostsDiagram={
                                energyProductionСostsDiagram
                            }
                            energyСostsDiagram={energyСostsDiagram}
                        />
                    ) : null}

                    {/*Таблицы с промежуточными результатами

                    <InitialDataTable title='Исходные данные' data={initialData} />

                    <TariffTable title="Тарифы" data={tariffData} />

                    <MaintenanceTable title="Техническое обслуживание" data={maintenanceData} />

                    <TepTable title="Расчет технико-экономических показателей до капитального ремонта" data={tepData} />

                    <CostPriceTable title="Расчет себестоимости выработанной ГПУ электроэнергии" data={costPriceData} />

                    <PaybackTable title="Расчет простого срока окупаемости" data={paybackData} />
                    
                    */}
                </div>
            </section>
        </main>
    )

    // Валидация формы
    function formValidate(e) {
        e.preventDefault()

        userName.fieldValidate()
        companyName.fieldValidate()
        userPhone.fieldValidate()
        userEmail.fieldValidate()

        if (
            exchangeRatesRubCny.error ||
            nominalElectricalPower.error ||
            amount.error ||
            gasPrice.error ||
            priceElectricity.error ||
            priceThermalEnergy.error ||
            userName.fieldValidate() ||
            companyName.fieldValidate() ||
            userPhone.fieldValidate() ||
            userPhone.fieldValidate()
        ) {
            console.log("ошибка в данных формы")
        } else {
            calculate()
        }
    }

    // пересчёт и отправка
    function calculate() {
        setFinalDataVisibility(true)
        setCalculateFormVisibility(false)
        calculatorResult = getTepData()
        setInitialData(calculatorResult.resultInitialData)
        setTariffData(calculatorResult.resultTariffArr)
        setTepData(calculatorResult.resultTepArr)
        setCostPriceData(calculatorResult.resultCostPriceArr)
        setPaybackData(calculatorResult.resultPaybackArr)
        setFinalCostTechChars(calculatorResult.finalCostTechCharsArr)
        setFinalAnnualIndicators(calculatorResult.finalAnnualIndicatorsArr)
        setEnergyProductionСostsDiagram(
            calculatorResult.energyProductionСostsDiagramObj
        )
        setEnergyСostsDiagram(calculatorResult.energyСostsDiagramObj)

        submitForm(
            [userName.value, companyName.value, userPhone.value, userEmail.value, userComment.value],
            calculatorResult.finalCostTechCharsArr,
            calculatorResult.finalAnnualIndicatorsArr
        )
    }

    function inputControlHandler(e, dir, targetState, type) {
        e.preventDefault()
        e.stopPropagation()

        let startValue = isNaN(parseFloat(targetState.value)) ? 0 : parseFloat(targetState.value)
        let step = 1

        switch (type) {
            case "fraction":
                step = 0.01
                if (dir == "up") {
                    targetState.setValue(Math.round((startValue + step) * 100) / 100)
                } else if (dir == "down") {
                    targetState.setValue(startValue - step > 0 ? Math.round((startValue - step) * 100) / 100 : 0.01)
                }

                break;
            case "number":
                if (dir == "up") {
                    targetState.setValue(startValue + step)
                } else if (dir == "down") {
                    targetState.setValue(startValue - step > 0 ? startValue - step : 1)
                }
                break;
            default:
                return
        }

        targetState.setError(false)

    }
}

// Компоненты
function Button({ children, type, ...props }) {
    return (
        <button type={type} {...props}>
            {children}
        </button>
    )
}

function FinalData({
    costTechChars,
    annualIndicators,
    energyProductionСostsDiagram,
    energyСostsDiagram,
}) {
    return (
        <div style={styles.finalContainer}>
            <div style={styles.finalRow}>
                <div style={styles.finalRowTitle}>
                    Стоимость и основные технические характеристики
                </div>
                <div style={styles.finalRowItems}>
                    <div style={styles.finalTable}>
                        {costTechChars.map((item, index) => {
                            return (
                                <div style={styles.finalTableRow} key={item.id}>
                                    <div style={styles.finalTableCol1}>
                                        {item.name}
                                    </div>
                                    <div style={styles.finalTableCol2}>
                                        <span>
                                            {index !== 0
                                                ? item.value
                                                    .toString()
                                                    .replace(
                                                        /\B(?=(\d{3})+(?!\d))/g,
                                                        " "
                                                    )
                                                : item.value}
                                        </span>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                    <div style={styles.diagramWrap}>
                        <Bar
                            data={energyProductionСostsDiagram}
                            options={{
                                plugins: {
                                    title: {
                                        display: true,
                                        font: {
                                            size: 20,
                                        },
                                        text: "Затраты на выработку э/э",
                                    },
                                },
                                scales: {
                                    x: {
                                        stacked: true,
                                    },
                                    y: {
                                        stacked: true,
                                    },
                                },
                            }}
                        />
                    </div>
                </div>
            </div>
            <div style={styles.finalRow}>
                <div style={styles.finalRowTitle}>
                    Расчетные годовые показатели при годовой наработке 8000 рабочих часов
                </div>
                <div style={styles.finalRowItems}>
                    <div style={styles.finalTable}>
                        {annualIndicators.map((item) => {
                            return (
                                <div
                                    style={styles.finalTableBlock}
                                    key={item.name}
                                >
                                    <div
                                        style={styles.finalTableRow}
                                        key={item.id}
                                    >
                                        <div style={styles.finalTableTitleCol}>
                                            {item.name}
                                        </div>
                                    </div>
                                    {item.data.map((dataItem) => {
                                        return (
                                            <div
                                                style={styles.finalTableRow}
                                                key={dataItem.id}
                                            >
                                                <div
                                                    style={
                                                        styles.finalTableCol1
                                                    }
                                                >
                                                    {dataItem.name}
                                                </div>
                                                <div
                                                    style={
                                                        styles.finalTableCol2
                                                    }
                                                >
                                                    {item.id !== "Payback" ? (
                                                        <span>
                                                            {dataItem.value !==
                                                                0
                                                                ? Math.round(
                                                                    dataItem.value
                                                                )
                                                                    .toString()
                                                                    .replace(
                                                                        /\B(?=(\d{3})+(?!\d))/g,
                                                                        " "
                                                                    )
                                                                : "-"}
                                                        </span>
                                                    ) : (
                                                        <span>
                                                            {dataItem.value
                                                                .toString()
                                                                .replace(
                                                                    /\B(?=(\d{3})+(?!\d))/g,
                                                                    " "
                                                                )}
                                                        </span>
                                                    )}
                                                </div>
                                            </div>
                                        )
                                    })}
                                </div>
                            )
                        })}
                    </div>
                    <div style={styles.diagramWrap}>
                        <Line
                            data={energyСostsDiagram}
                            options={{
                                plugins: {
                                    title: {
                                        display: true,
                                        font: {
                                            size: 20,
                                        },
                                        text: "Затраты на э/э",
                                    },
                                },
                            }}
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}

function InitialDataTable({ title, data }) {
    return (
        <div style={styles.initialResults}>
            <h2 style={styles.resultsTitle}>{title}</h2>
            <div style={styles.scheduleTable}>
                {data.map((item) => {
                    return (
                        <div style={styles.tableRow} key={item.id}>
                            <div style={styles.tableCol}>{item.name}</div>
                            <div style={styles.tableCol}>
                                <span>
                                    {item.value
                                        .toString()
                                        .replace(/\B(?=(\d{3})+(?!\d))/g, " ")}
                                </span>
                                {item.value2 ? (
                                    <span>
                                        {item.value2
                                            .toString()
                                            .replace(
                                                /\B(?=(\d{3})+(?!\d))/g,
                                                " "
                                            )}
                                    </span>
                                ) : null}
                            </div>
                        </div>
                    )
                })}
            </div>
            <div style={styles.scheduleTable}>
                <div style={styles.tableRow}>
                    <div style={styles.tableCol}>Годовая наработка ГПУ</div>
                    <div style={styles.tableCol}>
                        {variables.annualProductionGPU
                            .toString()
                            .replace(/\B(?=(\d{3})+(?!\d))/g, " ") + " мч"}
                    </div>
                </div>

                <div style={styles.tableRow}>
                    <div style={styles.tableCol}>Часы использования тепла</div>
                    <div style={styles.tableCol}>
                        {variables.hoursHeatUsage
                            .toString()
                            .replace(/\B(?=(\d{3})+(?!\d))/g, " ") + " мч"}
                    </div>
                </div>

                <div style={styles.tableRow}>
                    <div style={styles.tableCol}>Стоимость W70</div>
                    <div style={styles.tableCol}>
                        {variables.w70Coast ? "включена" : "не включена"}
                    </div>
                </div>
            </div>
        </div>
    )
}

function TariffTable({ title, data }) {
    return (
        <div style={styles.detailedResults}>
            <h2 style={styles.resultsTitle} key={title}>
                {title}
            </h2>
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
                {data.map((item) => {
                    return (
                        <div style={styles.tableRow} key={item.id}>
                            <div style={styles.detailedTableCol}>
                                {item.name}
                            </div>
                            <div style={styles.detailedTableCol}>
                                {item.price
                                    .toString()
                                    .replace(/\B(?=(\d{3})+(?!\d))/g, " ")}{" "}
                                &#8381;
                            </div>
                            <div style={styles.detailedTableCol}>
                                {item.indexing}%
                            </div>
                            {item.years.map((indexItem, index) => {
                                return (
                                    <div
                                        style={styles.detailedTableCol}
                                        key={"year" + index}
                                    >
                                        {(Math.round(indexItem * 100) / 100)
                                            .toString()
                                            .replace(
                                                /\B(?=(\d{3})+(?!\d))/g,
                                                " "
                                            )}
                                    </div>
                                )
                            })}
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

function MaintenanceTable({ title, data }) {
    return (
        <div style={styles.detailedResults}>
            <h2 style={styles.resultsTitle} key={title}>
                {title}
            </h2>
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
                {data.map((item) => {
                    return (
                        <div style={styles.tableRow} key={item.id}>
                            {item.spareParts && item.work ? (
                                <>
                                    <div style={styles.maintenanceTableCol}>
                                        {item.name}
                                    </div>
                                    <div style={styles.maintenanceTableCol}>
                                        {item.spareParts !== "0"
                                            ? Math.round(item.spareParts)
                                                .toString()
                                                .replace(
                                                    /\B(?=(\d{3})+(?!\d))/g,
                                                    " "
                                                ) + " ₽"
                                            : "-"}
                                    </div>
                                    <div style={styles.maintenanceTableCol}>
                                        {item.work !== "0"
                                            ? Math.round(item.work)
                                                .toString()
                                                .replace(
                                                    /\B(?=(\d{3})+(?!\d))/g,
                                                    " "
                                                ) + " ₽"
                                            : "-"}
                                    </div>
                                </>
                            ) : (
                                <div style={styles.maintenanceTableCol3}>
                                    {item.name}
                                </div>
                            )}
                            {item.years.map((innerItem, index) => {
                                return (
                                    <div
                                        style={styles.maintenanceTableCol}
                                        key={index}
                                    >
                                        {innerItem > 0 ? innerItem : ""}
                                    </div>
                                )
                            })}
                            <div style={styles.maintenanceTableCol}>
                                {item.count}
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

function TepTable({ title, data }) {
    return (
        <div style={styles.detailedResults}>
            <h2 style={styles.resultsTitle} key={title}>
                {title}
            </h2>
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
                {data.map((item) => {
                    return (
                        <div style={styles.tableRow} key={item.id}>
                            <div style={styles.maintenanceTableCol3}>
                                {item.name}
                            </div>
                            {item.years.map((innerItem, index) => {
                                return (
                                    <div
                                        style={styles.maintenanceTableCol}
                                        key={index}
                                    >
                                        {innerItem !== 0
                                            ? Math.round(innerItem)
                                                .toString()
                                                .replace(
                                                    /\B(?=(\d{3})+(?!\d))/g,
                                                    " "
                                                )
                                            : "-"}
                                    </div>
                                )
                            })}
                            <div style={styles.maintenanceTableCol}>
                                {item.sum !== 0
                                    ? Math.round(item.sum)
                                        .toString()
                                        .replace(/\B(?=(\d{3})+(?!\d))/g, " ")
                                    : "-"}
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

function CostPriceTable({ title, data }) {
    return (
        <div style={styles.detailedResults}>
            <h2 style={styles.resultsTitle} key={title}>
                {title}
            </h2>
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
                {data.map((item, index) => {
                    return (
                        <div style={styles.tableRow} key={item.id}>
                            <div style={styles.maintenanceTableCol3}>
                                {item.name}
                            </div>
                            {item.years.map((innerItem, innerIndex) => {
                                return index < 4 ? (
                                    <div
                                        style={styles.maintenanceTableCol}
                                        key={innerIndex}
                                    >
                                        {Math.round(innerItem)
                                            .toString()
                                            .replace(
                                                /\B(?=(\d{3})+(?!\d))/g,
                                                " "
                                            )}{" "}
                                        &#8381;
                                    </div>
                                ) : (
                                    <div
                                        style={styles.maintenanceTableCol}
                                        key={innerIndex}
                                    >
                                        {(Math.round(innerItem * 100) / 100)
                                            .toString()
                                            .replace(
                                                /\B(?=(\d{3})+(?!\d))/g,
                                                " "
                                            )}{" "}
                                        &#8381;
                                    </div>
                                )
                            })}
                            {index < 4 ? (
                                <div style={styles.maintenanceTableCol}>
                                    {Math.round(item.sum)
                                        .toString()
                                        .replace(
                                            /\B(?=(\d{3})+(?!\d))/g,
                                            " "
                                        )}{" "}
                                    &#8381;
                                </div>
                            ) : (
                                <div style={styles.maintenanceTableCol}>
                                    {(Math.round(item.sum * 100) / 100)
                                        .toString()
                                        .replace(
                                            /\B(?=(\d{3})+(?!\d))/g,
                                            " "
                                        )}{" "}
                                    &#8381;
                                </div>
                            )}
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

function PaybackTable({ title, data }) {
    return (
        <div style={styles.detailedResults}>
            <h2 style={styles.resultsTitle} key={title}>
                {title}
            </h2>
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
                {data.map((item, index) => {
                    return (
                        <div style={styles.tableRow} key={item.id}>
                            {index != data.length - 1 ? (
                                <div style={styles.maintenanceTableCol3}>
                                    {item.name}
                                </div>
                            ) : (
                                <div style={styles.maintenanceTableCol3}>
                                    <span>{item.name}</span>
                                    <span>{floatToYearsMonths(item.sum)}</span>
                                </div>
                            )}
                            {item.years.map((innerItem, innerIndex) => {
                                return index != data.length - 1 ? (
                                    <div
                                        style={styles.maintenanceTableCol}
                                        key={innerIndex}
                                    >
                                        {innerItem !== 0
                                            ? Math.round(innerItem)
                                                .toString()
                                                .replace(
                                                    /\B(?=(\d{3})+(?!\d))/g,
                                                    " "
                                                ) + " ₽"
                                            : "-"}
                                    </div>
                                ) : (
                                    <div
                                        style={styles.maintenanceTableCol}
                                        key={innerIndex}
                                    >
                                        {innerItem !== 0
                                            ? Math.round(innerItem)
                                                .toString()
                                                .replace(
                                                    /\B(?=(\d{3})+(?!\d))/g,
                                                    " "
                                                )
                                            : "-"}
                                    </div>
                                )
                            })}
                            {index != data.length - 1 ? (
                                <div style={styles.maintenanceTableCol}>
                                    {item.sum !== 0
                                        ? Math.round(item.sum)
                                            .toString()
                                            .replace(
                                                /\B(?=(\d{3})+(?!\d))/g,
                                                " "
                                            ) + " ₽"
                                        : "-"}
                                </div>
                            ) : (
                                <div style={styles.maintenanceTableCol}>
                                    {item.sum !== 0
                                        ? Math.round(item.sum)
                                            .toString()
                                            .replace(
                                                /\B(?=(\d{3})+(?!\d))/g,
                                                " "
                                            )
                                        : "-"}
                                </div>
                            )}
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

/**********Статичные данные ******************/

// Модели
const modelsData = [
    {
        model: "LY1200GH-T",
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
            containerHeatRecovery: 4139280,
        },
        costSpareParts: {
            w10: 2725.38,
            w30: 3774.12,
            w40: 45950.52,
            w50: 233600.36,
            w60: 388411.576,
            w70: 773277.68,
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
        },
    },
    {
        model: "LY1600GH-T",
        electricPower: 1500,
        thermalPower: 1670,
        electricEfficiency: 41.3,
        thermalEfficiency: 46.0,
        gasСonsumption: 391,
        oilConsumptionBurning: 0.2,
        oilVolumeCrankcase: 240,
        antifreezeVolume: 180,
        installationCost: {
            open: 3418320,
            container: 4552800,
            containerHeatRecovery: 4834800,
        },
        costSpareParts: {
            w10: 2448.6,
            w30: 4215.96,
            w40: 54204.36,
            w50: 302115.03,
            w60: 502049.338,
            w70: 1005137.686,
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
        },
    },
    {
        model: "LY2000GH-T",
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
            containerHeatRecovery: 6009120,
        },
        costSpareParts: {
            w10: 2396.24,
            w30: 3872.4,
            w40: 63747.6,
            w50: 441480.592,
            w60: 701865.752,
            w70: 1270660.132,
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
        },
    },
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
        antifreeze: 4,
    },
}

// Техническое обслуживание
const maintenance = {
    w10: [50, 16050, 32050, 48050],
    w30: [
        2000, 6000, 10000, 14000, 18000, 22000, 26000, 30000, 34000, 38000,
        42000, 46000, 50000, 54000, 58000, 62000,
    ],
    w40: [
        4000, 8000, 12000, 20000, 24000, 28000, 36000, 40000, 44000, 52000,
        56000, 60000,
    ],
    w50: [16000, 48000],
    w60: [32000],
    w70: [64000],
    turbines: [12000, 24000, 36000, 48000, 60000],
    generator: [20000, 40000, 60000],
}

/**********Вспомогательные функции ****/

//расчёт индексации тарифов
function calculateIndexingArr(startPrice, indexing) {
    indexing = indexing / 100
    let acc = startPrice * indexing + startPrice
    let i
    let resultArr = []
    for (i = 1; i <= 8; i++) {
        resultArr.push(acc)
        acc = acc * indexing + acc
    }

    return resultArr
}

// распределение количества ТО по годам
function distributionMaintenanceYear(maintenanceArr, annualOperatingTime) {
    let resultArr = []

    for (let i = 1; i <= 8; i++) {
        let filteredArr = maintenanceArr.filter(
            (item) =>
                item > annualOperatingTime * i - annualOperatingTime &&
                item <= annualOperatingTime * i
        )
        resultArr.push(filteredArr.length)
    }

    return resultArr
}

//расчёт количества замен масла по годам
function getOilYears() {
    let resultArr = []
    let annualProductionGPU = variables.annualProductionGPU
    let oilResource = variables.oilResource

    for (let i = 0; i < 8; i++) {
        if (i === 0) {
            resultArr.push(Math.floor(annualProductionGPU / oilResource))
        } else if (i === 7) {
            resultArr.push(
                Math.floor(
                    (annualProductionGPU * (i + 1) -
                        Math.floor((annualProductionGPU * i) / oilResource) *
                        oilResource) /
                    oilResource
                ) - 1
            )
        } else {
            resultArr.push(
                Math.floor(
                    (annualProductionGPU * (i + 1) -
                        Math.floor((annualProductionGPU * i) / oilResource) *
                        oilResource) /
                    oilResource
                )
            )
        }
    }

    return resultArr
}

//преобразование десятичных дробей чисел в годы и месяцы
function floatToYearsMonths(value) {
    var totalDays = value * 365
    var years = Math.floor(totalDays / 365)
    var months = Math.floor((totalDays - years * 365) / 30)
    var yearsText = numWord(years, ["год", "года", "лет"])
    var monthsText = numWord(months, ["месяц", "месяца", "месяцев"])

    var result =
        years === 0 && months === 0
            ? years + " " + yearsText
            : (years > 0 ? years + " " + yearsText + " " : "") +
            (months > 0 ? months + " " + monthsText : "")

    return result
}

//склонение числительных
function numWord(value, words) {
    value = Math.abs(value) % 100
    var num = value % 10
    if (value > 10 && value < 20) return words[2]
    if (num > 1 && num < 5) return words[1]
    if (num == 1) return words[0]
    return words[2]
}

//заполнение и отправка формы
function submitForm(userData, data1, data2) {
    const resultForm = document.querySelector("[data-js='resultForm']")

    if (!resultForm) return

    const inputs = resultForm.querySelectorAll("input")


    let inputCount = 0

    userData.forEach((item) => {
        inputs[inputCount].value = item

        inputCount += 1
    })

    data1.forEach((item) => {
        inputs[inputCount].value = item.value

        inputCount += 1
    })

    data2.forEach((group) => {
        group.data.forEach((item) => {
            inputs[inputCount].value = item.value

            inputCount += 1
        })
    })

    const submitBtn = resultForm.querySelector('[data-js="submitBtn"]')
    submitBtn.click()
}