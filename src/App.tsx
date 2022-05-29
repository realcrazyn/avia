import React, { useState } from 'react'
import './App.css'
import { FlightCard } from './components/FlightCard'
import fligtData from './data/flights.json'
import {
  airlinesFilterHandler,
  priceFilterHandler,
  segmentsFilterHandler,
  sortHandler,
} from './helpFuncs/flghtCardFuncs'
import { IFlight } from './model/IFlight'

function App() {
  //@ts-ignore
  const data = fligtData.result.flights as IFlight[]

  const [priceFilter, setPriceFilter] = useState({ min: 0, max: 1000000 })
  const [sortMode, setSortMode] = useState('lower')
  const [filterSegments, setFilterSegments] = useState([] as number[])

  const [showData, setShowData] = useState(data)

  let segments = data
    .map((d) => d.flight.legs.map((l) => l.segments.length))
    .flat(1)
    .filter((item, index, arr) => arr.indexOf(item) === index)

  let airlines = segmentsFilterHandler(
    priceFilterHandler(data, priceFilter),
    filterSegments
  )
    .map((d) =>
      d.flight.legs.map((l) => l.segments.map((s) => s.airline.caption))
    )
    .flat(2)
    .filter((item, index, arr) => arr.indexOf(item) === index)

  const [filterAilines, setFilterAirlines] = useState(airlines as string[])

  return (
    <div className="App">
      <div className="filters">
        <div className="filters__item">
          <div className="filters__item_title">Сортировать</div>
          <div className="filters__item_content">
            <fieldset>
              <input
                type="radio"
                name="sort"
                id="lower"
                onChange={() => setSortMode('lower')}
                defaultChecked
              />
              <label htmlFor="lower">По возрастацнию цены</label>
              <br />
              <input
                type="radio"
                name="sort"
                id="bigger"
                onChange={() => setSortMode('bigger')}
              />
              <label htmlFor="bigger">По убыванию цены</label>
              <br />
              <input
                type="radio"
                name="sort"
                id="time"
                onChange={() => setSortMode('time')}
              />
              <label htmlFor="time">По времени в пути</label>
            </fieldset>
          </div>
        </div>
        <div className="filters__item">
          <div className="filters__item_title">Фильтровать</div>
          <div className="filters__item_content">
            {segments.map((s) => (
              <>
                <input
                  id={s.toString()}
                  onChange={(e) => {
                    e.target.checked
                      ? setFilterSegments([...filterSegments, s])
                      : setFilterSegments(
                          filterSegments.filter((seg) => seg !== s)
                        )
                  }}
                  type={'checkbox'}
                ></input>
                <label htmlFor={s.toString()}>
                  {s - 1 === 0
                    ? 'Без пересадок'
                    : s - 1 === 1
                    ? `${s - 1} пересадка`
                    : `${s - 1} пересадки`}
                </label>
                <br />
              </>
            ))}
          </div>
        </div>
        <div className="filters__item">
          <div className="filters__item_title">Цена</div>
          <div className="filters__item_content">
            <div>
              От:{' '}
              <input
                type="number"
                value={priceFilter.min}
                onChange={(e) => {
                  setPriceFilter({
                    ...priceFilter,
                    min: +e.target.value,
                  })
                }}
              />
            </div>
            <div>
              До:{' '}
              <input
                type="number"
                value={priceFilter.max}
                onChange={(e) => {
                  setPriceFilter({
                    ...priceFilter,
                    max: +e.target.value,
                  })
                }}
              />
            </div>
          </div>
        </div>
        <div className="filters__item">
          <div className="filters__item_title">Авиакомпании</div>
          <div className="filters__item_content">
            {airlines.map((a) => (
              <>
                <input
                  checked={filterAilines.includes(a) ? true : false}
                  id={a}
                  onChange={(e) => {
                    e.target.checked
                      ? setFilterAirlines([...filterAilines, a])
                      : setFilterAirlines(
                          filterAilines.filter((air) => air !== a)
                        )
                  }}
                  type={'checkbox'}
                ></input>
                <label htmlFor={a}>{a}</label>
                <br />
              </>
            ))}
          </div>
        </div>
        <button
          className="filters__result"
          onClick={() => {
            setShowData(
              sortHandler(
                sortMode,
                airlinesFilterHandler(
                  segmentsFilterHandler(
                    priceFilterHandler(data, priceFilter),
                    filterSegments
                  ),
                  filterAilines
                )
              )
            )
          }}
        >
          Показать результаты
        </button>
      </div>
      <div className="cards__container">
        {showData.map((el) => (
          <FlightCard flight={el} />
        ))}
      </div>
    </div>
  )
}

export default App
