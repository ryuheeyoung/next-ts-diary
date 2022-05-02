export enum language {
    kr = 0,
    en,
    ch
}

export const getWeekLabel = (lang: language = language.kr) => {
    switch(lang) {
        case language.kr: return ['일', '월', '화', '수', '목', '금'];
        case language.en: return ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
        case language.ch: return ['日', '月', '火', '水', '木', '金', '土'];
        default: return ['일', '월', '화', '수', '목', '금'];
    }
}