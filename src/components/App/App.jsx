import { useState } from 'react';
import Button from '../Button/Button';
import Results from '../Results/Results';
import calculate from '../../scripts/calculate';
import './App.scss'

export default function App() {
	const [amountOfCredit, setAmountOfCredit] = useState('');
	const [interestRate, setInterestRate] = useState('');
	const [creditTerm, setCreditTerm] = useState('');
	const [amountOfCreditError, setAmountOfCreditError] = useState(false);
	const [interestRateError, setInterestRateError] = useState(false);
	const [payments, setPayments] = useState([]);

	return (
		<main> 
			<section className='calculator'>
				<div className="container calculator__container">
					<h1 className='calculator__title'>Кредитный калькулятор</ h1>
					<form onSubmit={e => formValidate(e)} action="" noValidate className="form calculator__form">
						<div className={!amountOfCreditError ? "form-field" : "form-field error"}>
						<label htmlFor="amountOfCredit">Сумма кредита (руб)</label>
						<input type="input" id="amountOfCredit" value={amountOfCredit} onChange={amountOfCreditChange} />
						</div>
						
						<div className={!interestRateError ? "form-field" : "form-field error"}>
						<label htmlFor="interestRate">Процентная ставка</label>
						<input type="input" id="interestRate" value={interestRate} onChange={interestRateChange}/>
						</div>

						<div className="form-field">
						<label htmlFor="creditTerm">Срок кредита</label>
						<select name="" id="creditTerm" value={creditTerm} onChange={creditTermChange}>
							<option value="12">1 год</option>
							<option value="18">1.5 года</option>
							<option value="24">2 года</option>
						</select>
						</div>
						<Button type="submit" classes="btn form__btn">Рассчитать</Button>
					</form>

					{payments.length > 0 ? <Results payments={payments} classes='calculator__results' /> : null }

				</div>
			</section>
		</main>
	)


	function amountOfCreditChange(event) {
		let currentValue = event.target.value.replace(/\D/g, '');

		setAmountOfCredit(currentValue);

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
			//formReset()
		}
	}

	function formReset() {
		setAmountOfCredit('');
		setInterestRate('');
		setCreditTerm(6);
	}

}
