import { useState } from 'react'
import './App.css'

export default function App() {
  return (
    <main> 
      <section className='calculator'>
        <div className="container calculator__container">
          <h1 className='calculator__title'>Калькулятор</ h1>
          <form action='' className="calculator__form">
              <input type="text" />
              <input type="text" />
              <select name="" id="">
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
              </select>
              <input type="submit" value='Рассчитать' />
          </form>
          <div className="calculator__results">
            <h2 className='calculator__table'> тут будет таблица результатов </h2>
            <h2 className='calculator__charts'> тут будет график </h2>
          </div>
        </div>
      </section>
    </main>
  )
}
