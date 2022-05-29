export interface IFlightLeg {
  duration: number
  segments: {
    classOfServiceCode: string
    classOfService: {
      uid: string
      caption: string
    }
    departureAirport: {
      uid: string
      caption: string
    }
    departureCity: {
      uid: string
      caption: string
    }
    aircraft: {
      uid: number
      caption: string
    }
    travelDuration: number
    arrivalCity: {
      uid: string
      caption: string
    }
    arrivalDate: string
    flightNumber: number
    techStopInfos: []
    departureDate: string
    stops: number
    servicesDetails: {
      freeCabinLuggage: {}
      paidCabinLuggage: {}
      tariffName: string
      fareBasis: {
        ADULT: string
      }
      freeLuggage: {
        ADULT: {
          pieces: number
          nil: boolean
          unit: string
        }
      }
      paidLuggage: {}
    }
    airline: {
      uid: string
      caption: string
      airlineCode: string
    }
    starting: true
    arrivalAirport: {
      uid: string
      caption: string
    }
  }[]
}

export interface IFlight {
  hasExtendedFare: boolean
  flight: {
    carrier: {
      uid: string
      caption: string
      airlineCode: string
    }
    price: {
      total: {
        amount: number
        currency: string
        currencyCode: string
      }
      totalFeeAndTaxes: {
        amount: number
        currency: string
        currencyCode: string
      }
      rates: {
        totalUsd: {
          amount: number
          currencyCode: string
        }
        totalEur: {
          amount: number
          currencyCode: string
        }
      }
      passengerPrices: {
        total: {
          amount: number
          currency: string
          currencyCode: string
        }
        passengerType: {
          uid: string
          caption: string
        }
        singlePassengerTotal: {
          amount: number
          currency: string
          currencyCode: string
        }
        passengerCount: number
        tariff: {
          amount: number
          currency: string
          currencyCode: string
        }
        feeAndTaxes: {
          amount: number
          currency: string
          currencyCode: string
        }
      }[]
    }
    servicesStatuses: any
    legs: IFlightLeg[]

    exchange: any
    isTripartiteContractDiscountApplied: false
    international: false
    seats: any
  }
  flightToken: string
}
