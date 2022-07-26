import sf from 'seconds-formater'

/**
 * format seconds
 * @param value seconds
 * @returns format string
 */
export function formatSeconds(value: string): string {
  let theTime = parseInt(value) // Time seconds to convert
  let theTimeMinute = 0 // minute
  let theTimeHour = 0 // hour
  let theTimeDay = 0 // day
  if (theTime > 60) {
    theTimeMinute = parseInt(String(theTime / 60))
    theTime = parseInt(String(theTime % 60))
    if (theTimeMinute > 60) {
      theTimeHour = parseInt(String(theTimeMinute / 60))
      theTimeMinute = parseInt(String(theTimeMinute % 60))
      if (theTimeHour > 24) {
        // more than 24 hours
        theTimeDay = parseInt(String(theTimeHour / 24))
        theTimeHour = parseInt(String(theTimeHour % 24))
      }
    }
  }
  let result = ''
  if (theTime > 0) {
    result = '' + parseInt(String(theTime)) + ' second'
  }
  if (theTimeMinute > 0) {
    result = '' + parseInt(String(theTimeMinute)) + ' minute ' + result
  }
  if (theTimeHour > 0) {
    result = '' + parseInt(String(theTimeHour)) + ' hour ' + result
  }
  if (theTimeDay > 0) {
    result = '' + parseInt(String(theTimeDay)) + ' day ' + result
  }
  return result
}

/**
 * format Day
 * @param value seconds
 * @returns
 */
export const formatDay = (value: number): string => sf.convert(value).format('D')

export const sleep = (ms: number): Promise<unknown> => new Promise((resolve) => setTimeout(resolve, ms))
