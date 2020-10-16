// Generated by dts-bundle v0.7.3
// Dependencies for this module:
//   index.d.ts

import * as moment from 'moment'

declare module 'moment' {
  interface Moment {
    /**
     * The `monthWeek()` method can be used to determine the week of the month a date is in.
     * ```js
     * moment("01/01/2014").monthWeek(); // 0
     * ```
     */
    monthWeek(): number
    monthWeek(week: number): moment.Moment
    /**
     * Plugin for calculating the occurrence of the day of the week in the month.
     * Similar to `moment().monthWeek()`, the return value is zero-indexed.
     * A return value of 2 means the date is the 3rd occurence of that day
     * of the week in the month.
     */
    monthWeekByDay(): number
    monthWeekByDay(dayCount: number): moment.Moment
    /**
     * The `dateOnly()` method can be used to remove any time information from a moment.
     * ```js
     * moment("2014-01-01 09:30:26").dateOnly(); // 01/01/2014 12:00:00 AM
     * ```
     */
    dateOnly(): moment.Moment
    /**
     * Recur can also be created the following ways:
     * ```js
     * moment().recur()
     * moment().recur(options)
     * moment().recur(start, end)
     * moment(start).recur(end)
     * moment().recur(end)
     * ```
     */
    recur(start?: moment.MomentInput, end?: moment.MomentInput): Recur
    recur(options?: Recur.Options): Recur
  }
  /**
   * Recur can be created the following ways:
   * ```js
   * moment.recur()
   * moment.recur(options)
   * moment.recur(start)
   * moment.recur(start, end)
   * ```
   */
  function recur(start?: moment.MomentInput, end?: moment.MomentInput): Recur
  function recur(options?: Recur.Options): Recur
}

/** @hidden */
export type Moment = moment.Moment
/** @hidden */
export type MomentInput = moment.MomentInput
export namespace Recur {
  /**
   * Set options upon creation.
   *
   * > Note that the units for rules are converted to objects,
   * > so it is not recommended to set rules this way.
   * > They can be set in the options so that they can be imported.
   *
   * ```js
   * moment().recur({
   *   start: "01/01/2014",
   *   end: "12/31/2014",
   *   rules: [
   *     { units: [2], measure: "days" }
   *   ],
   *   exceptions: ["01/05/2014"]
   * });
   * ```
   */
  interface Options {
    start?: MomentInput
    end?: MomentInput
    rules?: {
      units: Rule.UnitsInput
      measure: Rule.MeasureInput
    }[]
    exceptions?: MomentInput[]
  }
}
export interface Recur {
  days(units?: Rule.UnitsInput): this
  day(units?: Rule.UnitsInput): this
  weeks(units?: Rule.UnitsInput): this
  week(units?: Rule.UnitsInput): this
  months(units?: Rule.UnitsInput): this
  month(units?: Rule.UnitsInput): this
  years(units?: Rule.UnitsInput): this
  year(units?: Rule.UnitsInput): this
  daysOfWeek(units?: Rule.UnitsInput): this
  dayOfWeek(units?: Rule.UnitsInput): this
  daysOfMonth(units?: Rule.UnitsInput): this
  dayOfMonth(units?: Rule.UnitsInput): this
  weeksOfMonth(units?: Rule.UnitsInput): this
  weekOfMonth(units?: Rule.UnitsInput): this
  weeksOfYear(units?: Rule.UnitsInput): this
  weekOfYear(units?: Rule.UnitsInput): this
  /**
   * ```js
   * // Will match any date that is in January of any year.
   * cal = moment.recur().every("January").monthsOfYear();
   * ```
   */
  monthsOfYear(units?: Rule.UnitsInput): Recur
  monthOfYear(units?: Rule.UnitsInput): Recur
  /**
   * A weekOfMonthByDay interval is available for combining with the daysOfWeek to
   * achieve "nth weekday of month" recurrences. The following matches every 1st
   * and 3rd Thursday of the month.
   * > (Note this cannot be combined at the moment with every(x).months() expression)
   *
   * ```js
   * cal = moment.recur()
   *   .every("Thursday").daysOfWeek()
   *   .every([0, 2]).weeksOfMonthByDay();
   * ```
   * ```js
   * cal = moment.recur()
   *   .every(moment("01/01/2014").day()).daysOfWeek()
   *   .every(moment("01/01/2014").monthWeekByDay()).weeksOfMonthByDay();
   * ```
   */
  weeksOfMonthByDay(units?: Rule.UnitsInput): Recur
  weekOfMonthByDay(units?: Rule.UnitsInput): Recur
}
/**
 * The main Recur object to provide an interface for settings, rules, and matching
 *
 * Creating Rules
 * --------------
 * moment-recur-ts uses rules to define when a date should recur. You can then generate future
 * or past recurrences based on these rules, or see if a specific date matches the rules.
 * Rules can also be overridden or removed.
 *
 * ### Length Intervals
 * moment-recur-ts supports intervals for days, weeks, months, and years. Measurements may be singular or
 * plural (ex: `day()` vs `days()`). Length Intervals **must** have a start date defined.
 *
 * Possible Length Intervals Include:
 * * day / days
 * * week / weeks
 * * month / months
 * * year / years
 *
 * ### Calendar Intervals
 * Calendar Intervals do not depend on a start date. They define a unit of another unit. For instance,
 * a day of a month, or a month of a year. Measurements may be singular or plural
 * (ex: `dayOfMonth()` vs `daysOfMonth()`).
 *
 * Possible Calendar Intervals Include:
 * * dayOfWeek / daysOfWeek
 * * dayOfMonth / daysOfMonth
 * * weekOfMonth / weeksOfMonth
 * * weekOfYear / weeksOfYear
 * * monthOfYear / monthsOfYear
 */
export class Recur implements Iterable<moment.Moment> {
  /**
   * ### Recur Object Constrcutor
   *
   * From an instance of moment:
   * ```js
   * let recurrence;
   *
   * // Create a recurrence using today as the start date.
   * recurrence = moment().recur();
   *
   * // Create a recurrence while passing the start and end dates to the recur function.
   * // Note: passing an end date requires you to also pass a start date.
   * recurrence = moment().recur( start, end );
   *
   * // You may pass a start date to the moment, or use an existing moment, to set the start date.
   * // In this case, passing a date to the recur function sets and end date.
   * recurrence = moment(start).recur( end );
   *
   * // Finally, you can create a recurrence and pass in an entire set of options.
   * recurrence = moment().recur({
   *   start: "01/01/2014",
   *   end: "01/01/2015"
   * });
   * ```
   * From static moment:
   * ```js
   * // Create recurrence without a start date. Note: this will not work with intervals.
   * recurrence = moment.recur();
   *
   * // Create a recurrence, passing just the start, or the start and end dates.
   * recurrence = moment.recur( start, end );
   *
   * // Create a recurrence, passing set of options.
   * recurrence = moment.recur({
   *   start: "01/01/2014",
   *   end: "01/01/2015"
   * });
   * ```
   */
  constructor(options: Recur.Options)
  /**
   * Get/Set the Start Date
   * ```js
   * recurrence.startDate(); // Get
   * recurrence.startDate("01/01/2014"); // Set
   * ```
   * @category getter/setter
   */
  startDate(): Moment
  startDate(date: MomentInput | null): Recur
  /**
   * Get/Set the End Date
   * ```js
   * recurrence.endDate(); // Get
   * recurrence.endDate("01/01/2014"); // Set
   * ```
   * @category getter/setter
   */
  endDate(): Moment
  endDate(date: MomentInput | null): Recur
  /**
   * Get/Set a temporary "From Date" for use with generating dates
   * ```js
   * recurrence.fromDate(); // Get
   * recurrence.fromDate("01/01/2014"); // Set
   * ```
   * @category getter/setter
   */
  fromDate(): Moment
  fromDate(date: MomentInput | null): Recur
  /**
   * Interval calculations will use a default of 1000 year limit when determining unbounded
   * rules. Use this function to query or change the maximum limit.
   */
  maxYears(): number
  maxYears(years: number): Recur
  /**
   * Use `save()` to export all options, rules, and exceptions as an object.
   * This can be used to store recurrences in a database.
   * > Note: This does not export the "From Date" which is considered a temporary option.
   * ```js
   * recurrence.save();
   * ```
   */
  save(): Recur.Options
  /**
   * Use `repeats()` to check if a recurrence has rules set.
   * ```js
   * recurrence.repeats(); // true/false
   * ```
   */
  repeats(): boolean
  /**
   * The `every()` function allows you to set the units and, optionally, the measurment type
   * of the recurring date. It returns the recur object to allow chaining.
   *
   *  ```js
   *  let myDate, recurrence;
   *
   *  // Create a date to start from
   *  myDate = moment("01/01/2014");
   *
   *  // You can pass the units to recur on, and the measurement type.
   *  recurrence = myDate.recur().every(1, "days");
   *
   *  // You can also chain the measurement type instead of passing it to every.
   *  recurrence = myDate.recur().every(1).day();
   *
   *  // It is also possible to pass an array of units.
   *  recurrence = myDate.recur().every([3, 5]).days();
   *
   *  // When using the dayOfWeek measurement, you can pass days names.
   *  recurrence = myDate.recur().every(["Monday", "wed"]).daysOfWeek();
   *
   *  // Month names also work when using monthOfYear.
   *  recurrence = myDate.recur().every(["Jan", "february"], "monthsOfYear");
   *  ```
   *
   *  `every()` will override the last "every" if a measurement was not provided.
   *  The following line will create a recurrence for every 5 days.
   *  ```js
   *  recurrence  = myDate.recur().every(1).every(5).days();
   *  ```
   *  If you need to specify multiple units, pass an array to `every()`.
   *
   *  You may also pass the units directly to the interval functions (listed below)
   *  instead of using `every()`.
   *  ```js
   *  let recurrence = moment.recur().monthOfYear("January");
   *  ```
   */
  every(units: Rule.UnitsInput, measure?: Rule.MeasureInput): this
  /**
   * To prevent a date from matching that would normally match, use the `except()` function.
   * ```js
   * let recurrence = moment("01/01/2014").recur().every(1).day().except("01/02/2014");
   * recurrence.matches("01/02/2014"); // false
   * ```
   */
  except(date: MomentInput): this
  /**
   * Forgets rules (by passing measure) and exceptions (by passing date)
   * ```js
   * // Exceptions can be removed by passing a date to the forget() function.
   * recurrence.forget("01/03/2014");
   * ```
   * ```js
   * // Rules can be removed by passing the measurement to the forget() function.
   * recurrence.forget("days");
   * ```
   */
  forget(dateOrRule: MomentInput | Rule.MeasureInput, format?: string): this
  /**
   * Checks if a rule has been set on the chain
   */
  hasRule(measure: Rule.MeasureInput): boolean
  /**
   * The `matches()` function will test a date to check if all of the recurrence rules match.
   * It returns `true` if the date matches, `false` otherwise.
   * ```js
   * let interval = moment("01/01/2014").recur().every(2).days();
   * interval.matches("01/02/2014"); // false
   * interval.matches("01/03/2014"); // true
   * ```
   *
   * You may also see if a date matches before the start date or after the end date by
   * passing `true` as the second argument to `matches()`.
   * ```js
   * let interval = moment("01/01/2014").recur().every(2).days();
   * interval.matches("12/30/2013"); // false
   * interval.matches("12/30/2013", true); // true
   * ```
   */
  matches(dateToMatch: MomentInput, ignoreStartEnd?: boolean): boolean
  /**
   * Iterate over moments matched by rules
   * > Note if there is no end date, results are unbounded (you must manually terminate the iterator).
   *
   * > Also note, this exapmle intentionally ignores some complicated leap year math.
   *
   * ```js
   * let recurrence = moment('2012-01').recur('2032-01').every(4).years()
   * let leapYears = [...recurrence].map(m => m.year())
   * // leapYears = [ 2012, 2016, 2020, 2024, 2028, 2032 ]
   * ```
   * Or, this is a bit faster...
   * ```js
   * let recurrence = moment('2012-01').recur('2032-01').every(4).years()
   * let leapYears = []
   * for (let date of recurrence) {
   *   leapYears.push(date.year())
   * }
   * // leapYears = [ 2012, 2016, 2020, 2024, 2028, 2032 ]
   * ```
   */
  [Symbol.iterator](): IterableIterator<Moment>
  /**
   * Reverse iterator direction
   * > Note since there is no end date, results are unbounded (you must manually terminate the iterator).
   *
   * ```js
   * let mondays = []
   * for (let monday of moment().recur().every('Monday').dayOfWeek().reverse()) {
   *   lastThreeMondays.push(monday)
   *   if (mondays.length > 10) break
   * }
   * ```
   */
  reverse(): this
  /**
   * With both a start date and an end date set, you can generate all dates within
   * that range that match the pattern (including the start/end dates).
   *
   * ```js
   * let recurrence = moment().recur("01/01/2014", "01/07/2014").every(2).days();
   *
   * // Outputs: ["01/01/2014", "01/03/2014", "01/05/2014", "01/07/2014"]
   * allDates = recurrence.all("L");
   * ```
   */
  all(): Moment[]
  all(format: string): string[]
  /**
   * Get next N occurrences
   * ```js
   * // Generate the next three dates as moments
   * // Outputs: [moment("01/03/2014"), moment("01/05/2014"), moment("01/07/2014")]
   * nextDates = recurrence.next(3);
   * ```
   * ```js
   * // Generate the next three dates, formatted in local format
   * // Outputs: ["01/03/2014", "01/05/2014", "01/07/2014"]
   * nextDates = recurrence.next(3, "L");
   * ```
   */
  next(num: number): Moment[]
  next(num: number, format: string): string[]
  /**
   * Get previous N occurrences
   * ```js
   * // Generate previous three dates, formatted in local format
   * // Outputs: ["12/30/2013", "12/28/2013", "12/26/2013"]
   * nextDates = recurrence.previous(3, "L");
   * ```
   */
  previous(num: number): Moment[]
  previous(num: number, format: string): string[]
}

export namespace Rule {
  type MeasureSingle =
    | 'day'
    | 'week'
    | 'month'
    | 'year'
    | 'dayOfWeek'
    | 'dayOfMonth'
    | 'weekOfMonth'
    | 'weekOfMonthByDay'
    | 'weekOfYear'
    | 'monthOfYear'
  type MeasurePlural =
    | 'days'
    | 'weeks'
    | 'months'
    | 'years'
    | 'daysOfWeek'
    | 'daysOfMonth'
    | 'weeksOfMonth'
    | 'weeksOfMonthByDay'
    | 'weeksOfYear'
    | 'monthsOfYear'
  type UnitsInput =
    | string
    | number
    | (string | number)[]
    | UnitsObject
    | undefined
    | null
  /**
   * @hidden
   * @deprecated
   */
  interface UnitsObject {
    [unit: string]: boolean
    [unit: number]: boolean
  }
  type MeasureInput = MeasureSingle | MeasurePlural | undefined | null
}
/**
 *
 */
export interface Rule {
  readonly units: number[]
  readonly measure: Rule.MeasurePlural
  next(current: moment.Moment, limit?: moment.Moment): moment.Moment
  previous(current: moment.Moment, limit?: moment.Moment): moment.Moment
}
