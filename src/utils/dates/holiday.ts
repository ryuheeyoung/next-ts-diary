export interface Iholiday {
    id: string;
    nm: string;
    month: number;
    date: number;
    desc: string|null;
}

export const Holiday: Array<Iholiday> = [
    {id: '103011', nm: '삼일절', month: 3, date: 1, desc: null},
    {id: '104050', nm: '식목일', month: 4, date: 5, desc: null},
    {id: '105051', nm: '어린이날', month: 5, date: 5, desc: null},
    {id: '105080', nm: '어버이날', month: 5, date: 8, desc: null},
    {id: '105150', nm: '스승의날', month: 5, date: 15, desc: null},
    {id: '105180', nm: '광주민주화운동', month: 5, date: 18, desc: null},
    {id: '106060', nm: '현충일', month: 6, date: 6, desc: null},
    {id: '106250', nm: '6.25전쟁', month: 6, date: 25, desc: null},
    {id: '107170', nm: '제헌절', month: 7, date: 17, desc: null},
    {id: '108151', nm: '광복절', month: 8, date: 15, desc: null},
    {id: '110031', nm: '개천절', month: 10, date: 3, desc: null},
    {id: '110091', nm: '한글날', month: 10, date: 9, desc: null},
    {id: '112251', nm: '성탄절', month: 12, date: 25, desc: null},
];