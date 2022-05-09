/**
 * 언어 데이터
 */
export const LANGUAGE = {
	kr: 0,
	en: 1,
	ch: 2
}
export type LangType = typeof LANGUAGE[keyof typeof LANGUAGE] | string;	// 언어 데이터 타입

/**
 * 요일 데이터
 */
export const DAY = {
	sun: 0,
	mon: 1,
	tue: 2,
	wed: 3,
	thu: 4,
	fri: 5,
	sat: 6
}
export type DayType = typeof DAY[keyof typeof DAY] | string;  // 요일 데이터 타입

/**
 * 언어별 요일값 가져오기
 * @param lang 언어 타입
 * @returns 언어별 요일 배열
 */
export const getWeekLabel = (lang: LangType = LANGUAGE.kr): string[] => {
    switch(lang) {
        case LANGUAGE.kr: return ['일', '월', '화', '수', '목', '금', '토'];
        case LANGUAGE.en: return ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
        case LANGUAGE.ch: return ['日', '月', '火', '水', '木', '金', '土'];
        default: return ['일', '월', '화', '수', '목', '금', '토'];
    }
}