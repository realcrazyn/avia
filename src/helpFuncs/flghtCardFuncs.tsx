import { IFlight } from '../model/IFlight'

const contains = (where: any[], what: any[]) => {
  for (var i = 0; i < what.length; i++) {
    if (where.indexOf(what[i]) == -1) return false
  }
  return true
}

export const getTimeFromMins = (mins: number) => {
  let hours = Math.trunc(mins / 60)
  let minutes = mins % 60
  return hours > 0 ? `${hours} ч ${minutes} мин` : `${minutes} мин`
}

export const formDate = (date: string) => {
  let h = new Date(date)

  let months = [
    'янв.',
    'фев.',
    'мар.',
    'апр.',
    'мая',
    'июн.',
    'июл.',
    'авг.',
    'сен.',
    'окт.',
    'ноя.',
    'дек.',
  ]

  let days = ['пн', 'вт', 'ср', 'чт', 'пт', 'сб', 'вс']
  return (
    <>
      {`${h.toISOString().substr(11, 5)} `}
      <span style={{ color: '#1890ff' }}>
        {`${h.getDate()} 
          ${months[h.getMonth() - 1]} ${days[h.getDay() - 1]}`}
      </span>
    </>
  )
}

export const sortHandler = (mode: string, data: IFlight[]): IFlight[] => {
  switch (mode) {
    case 'lower':
      return data.sort(
        (a, b) => +a.flight.price.total.amount - +b.flight.price.total.amount
      )
    case 'bigger':
      return data.sort(
        (a, b) => +b.flight.price.total.amount - +a.flight.price.total.amount
      )
    case 'time':
      return data.sort(
        (a, b) =>
          a.flight.legs
            .map((leg) => leg.duration)
            .reduce((partialSum, el) => partialSum + el, 0) -
          b.flight.legs
            .map((leg) => leg.duration)
            .reduce((partialSum, el) => partialSum + el, 0)
      )
    default:
      return data
  }
}

export const priceFilterHandler = (
  data: IFlight[],
  priceFilter: { min: number; max: number }
): IFlight[] => {
  return data.filter(
    (el) =>
      +el.flight.price.total.amount < priceFilter.max &&
      +el.flight.price.total.amount > priceFilter.min
  )
}

export const segmentsFilterHandler = (
  data: IFlight[],
  segments: number[]
): IFlight[] => {
  if (segments.length === 0) {
    return data
  } else {
    return data.filter((f) =>
      contains(
        segments,
        f.flight.legs.map((l) => l.segments.length)
      )
    )
  }
}

export const airlinesFilterHandler = (
  data: IFlight[],
  airlines: string[]
): IFlight[] => {
  if (airlines.length === 0) {
    return data
  } else {
    return data.filter((f) =>
      contains(
        airlines,
        f.flight.legs
          .map((l) => l.segments.map((s) => s.airline.caption))
          .flat(1)
      )
    )
  }
}
