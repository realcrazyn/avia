import { formDate, getTimeFromMins } from '../helpFuncs/flghtCardFuncs'
import { IFlight } from '../model/IFlight'

interface IProps {
  flight: IFlight
}

export const FlightCard = ({ flight }: IProps) => {
  return (
    <div className="flightcard">
      <div className="flightcard__leg_price">
        <p className="flightcard__leg_price-total">
          {flight.flight.price.total.amount}{' '}
          {flight.flight.price.total.currencyCode === 'RUB'
            ? '₽'
            : flight.flight.price.total.currencyCode}
        </p>
        <p>Стоимость для одного взрослого пассажира</p>
      </div>
      {flight.flight.legs.map((leg, i) => {
        return (
          <div className="flightcard__leg">
            <div className="flightcard__leg_adress">
              <p>
                {leg.segments[0].departureCity?.caption},{' '}
                {leg.segments[0].departureAirport.caption}{' '}
                <span>({leg.segments[0].departureAirport.uid}) </span>
              </p>
              <div className="arrow__container">
                <span className="arrow"></span>
              </div>

              <p>
                {leg.segments[leg.segments.length - 1].arrivalCity?.caption},
                {leg.segments[leg.segments.length - 1].arrivalAirport.caption}
                <span>
                  {' '}
                  ({leg.segments[leg.segments.length - 1].arrivalAirport.uid})
                </span>
              </p>
            </div>
            <div className="flightcard__leg_time">
              <p>{formDate(leg.segments[0].departureDate)}</p>
              <p> {getTimeFromMins(leg.duration)}</p>
              <p>
                {formDate(leg.segments[leg.segments.length - 1].arrivalDate)}
              </p>
            </div>
            <div className="line">
              {leg.segments.length > 1 ? (
                <div className="subline">
                  {leg.segments.length - 1}{' '}
                  {leg.segments.length - 1 === 1 ? 'пересадка' : 'перенсадки'}
                </div>
              ) : null}
            </div>
            <div className="flightcard__leg_company">
              Рейс выполняет:{' '}
              {leg.segments
                .map((l) => l.airline.caption)
                .filter((item, index, arr) => arr.indexOf(item) === index)
                .join(' и ')}
            </div>
            {i < flight.flight.legs.length - 1 ? (
              <div className="endline"></div>
            ) : null}
          </div>
        )
      })}
      <button className="flightcard__leg_btn">Выбрать</button>
    </div>
  )
}
