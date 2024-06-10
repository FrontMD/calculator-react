import './Results.scss'

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
                                    <div className="schedule-table__col schedule-table__text">{paypent.currentDebt + ' руб.'}</div>
                                    <div className="schedule-table__col schedule-table__text">{paypent.summ + ' руб.'}</div>
                                    <div className="schedule-table__col schedule-table__col--Interest schedule-table__text">{paypent.interestСharges + ' руб.'}</div>
                                </div>
                            )
                        })
                    }

                </div>
            </div>
            <div className="diagram">
                <h2 className='results__title'> Диаграмма платежей </h2>
            </div>
        </div>
    )
}