import {Chart as ChartJS} from 'chart.js/auto'
import {Bar, Line, Pie} from 'react-chartjs-2'
import './Results.scss'

ChartJS.register();

export default function Results({ payments, classes }) {
    return (
        <div className={"results" + ' ' + classes}>
            <div className="schedule">
                <h2 className='results__title'> График платежей </h2>
                <div className="schedule__table schedule-table">
                    <div className="schedule-table__row">
                        <div className="schedule-table__col schedule-table__col--month schedule-table__title">Месяц</div>
                        <div className="schedule-table__col schedule-table__title">Текущий остаток</div>
                        <div className="schedule-table__col schedule-table__title">Платёж</div>
                        <div className="schedule-table__col schedule-table__col--Interest schedule-table__title">Проценты</div>
                    </div>
                    {
                        payments.map(paypent => {
                            return (
                                <div className="schedule-table__row" key={paypent.month}>
                                    <div className="schedule-table__col schedule-table__col--month schedule-table__text">{paypent.month}</div>
                                    <div className="schedule-table__col schedule-table__text">{paypent.currentDebt.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ") + ' руб.'}</div>
                                    <div className="schedule-table__col schedule-table__text">{paypent.summ.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ") + ' руб.'}</div>
                                    <div className="schedule-table__col schedule-table__col--Interest schedule-table__text">{paypent.interestСharges.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ") + ' руб.'}</div>
                                </div>
                            )
                        })
                    }

                </div>
            </div>
            <div className="diagram">
                <h2 className='results__title'> Диаграмма платежей </h2>
                <div className="diagram__container">
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