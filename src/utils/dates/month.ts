/**
 * 월 데이터
 */
export const MONTH: {[k: string]: number} = {
	jan: 0,
	feb: 1,
	mar: 2,
	apr: 3,
	may: 4,
	jun: 5,
	jul: 6,
	aug: 7,
	oct: 8,
	sep: 9,
	nov: 10,
	dec: 11
}
export type MonthType = typeof MONTH[keyof typeof MONTH];	// 월데이터 타입

/**
 * 특정연월 첫날짜 가져오기
 * @param y current fullYear
 * @param m current month
 * @returns first date
 */
export const getFirstDate = (y: number|string, m: MonthType): Date => {
	const date = new Date();
	date.setFullYear(+y);
	date.setMonth(m, 1);
	return date;
}

/**
 * 특정연월 마지막날짜 가져오기
 * @param y current fullYear
 * @param m current month
 * @returns last date
 */
export const getLastDate = (y: number|string, m: MonthType): Date => {
	const date = new Date();
	date.setFullYear(+y);
	date.setMonth(m+1, 0);
	return date;
}
