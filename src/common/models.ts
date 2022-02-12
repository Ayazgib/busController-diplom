export enum PagesLink {
    main= '/',
    auth = '/Authorization',
    schedule = '/schedule',
    timesheet = '/timesheet',
    change_driver = '/change_driver',
    docs = '/docs'
}

export const workHours = [6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21];

export const dateOptions: any =   {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    /*weekday: 'long',
    timezone: 'UTC',
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric'*/
};

export enum racesTypes {
    long = 'long',
    short = 'short',
    bigBus = "bigBus"
}

export const testTimesheets = [
    {
        id: 111,
        driverId: 125696,
        raceId: 111,
        busId: 222,
        type: racesTypes.long
    },
    {
        id: 222,
        driverId: 125696,
        raceId: 222,
        busId: 333,
        type: racesTypes.bigBus
    },
    {
        id: 333,
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
export const testChangeRequest = [
    {
        id: 111,
        driverId: 125696,
        startTime: 1644514148514,
        finishTime: 1644814148514,
        timeSheets: [111,222],
        chagedId: [111, 333],
    },
    {
        id: 222,
        driverId: 125958,
        startTime: 1644514148514,
        finishTime: 1644534148514,
        timeSheets: [333],
        chagedId: [222],
    }
]

export const testChengedRaces = [
    {
        id: 111,
        driverId: 125696,
        shouldChangeId: {raceId: 111, timeSheetId: 111}, //race id: timeSheets[i]
    },
    {
        id: 222,
        driverId: 125958,
        shouldChangeId: {raceId: 111, timeSheetId: 222},
    },
    {
        id: 333,
        driverId: 125697,
        shouldChangeId: {raceId: 222, timeSheetId: 333},
    }
]

