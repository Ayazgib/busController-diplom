export enum PagesLink {
    main= '/',
    auth = '/Authorization',
    schedule = '/schedule',
    timesheet = '/timesheet',
    request = '/request',
    docs = '/docs'
}

export const workHours = [6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21];

export enum racesTypes {
    long = 'long',
    short = 'short',
    bigBus = "bigBus"
}

export const testTimesheets = [
    {
        driverId: 125696,
        raceId: 111,
        busId: 222,
        type: racesTypes.long
    },
    {
        driverId: 125696,
        raceId: 222,
        busId: 333,
        type: racesTypes.bigBus
    },
    {
        driverId: 125696,
        raceId: 333,
        busId: 444,
        type: racesTypes.short
    }
]
export const testRaces = [
    {
        id: 111,
        startTime: 8,
        finishTime: 11,
        startTarget: 'selo adasd',
        finishTarget: 'selo asdasd'
    },
    {
        id: 222,
        startTime: 12,
        finishTime: 13,
        startTarget: 'selo adasd',
        finishTarget: 'selo asdasd'
    },
    {
        id: 333,
        startTime: 15,
        finishTime: 21,
        startTarget: 'selo adasd',
        finishTarget: 'selo asdasd'
    }
]
export const testBuses = [
    {
        id: 222,
        number: 'T548EA116',
    },
    {
        id: 333,
        number: 'K548AC16',
    },
    {
        id: 444,
        number: 'M548BO116',
    },
]
export const testDrivers = [
    {
        id: 125696,
        name: 'Иванов Иван Иваныч'
    },
    {
        id: 125958,
        name: 'Петров Петр Ретрович'
    },
    {
        id: 125697,
        name: 'Васильев Василий Васильевич'
    }
]

