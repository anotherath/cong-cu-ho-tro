export interface IGoldPrice {
  sjcNationWide: SjcNationWide[];
  goldNationWide: GoldNationWide[];
  currencyNationWide: CurrencyNationWide[];
  goldenFund95: GoldenFund95;
  goldenFund99: GoldenFund99;
  ContentNew: ContentNew[];
  Calendars: Calendar[];
  silver_price: SilverPrice[];
  vsg_gold_table: VsgGoldTable[];
}

export interface SjcNationWide {
  name: string;
  hanoi: Hanoi;
  saigon: Saigon;
  rate: number;
  digit: number;
  gap: number;
  update_at: string;
}

export interface Hanoi {
  name: string;
  buy: number;
  sell: number;
  buy_change: number;
  sell_change: number;
}

export interface Saigon {
  name: string;
  buy: number;
  sell: number;
  buy_change: number;
  sell_change: number;
}

export interface GoldNationWide {
  name: string;
  hanoi: Hanoi2;
  saigon: Saigon2;
  rate: number;
  digit: number;
  gap: number;
  update_at: string;
}

export interface Hanoi2 {
  name: string;
  buy: number;
  sell: number;
  buy_change: number;
  sell_change: number;
}

export interface Saigon2 {
  name: string;
  buy: number;
  sell: number;
  buy_change: number;
  sell_change: number;
}

export interface CurrencyNationWide {
  name: string;
  hanoi: Hanoi3;
  saigon: Saigon3;
  rate: number;
  digit: number;
  gap: number;
  update_at: string;
}

export interface Hanoi3 {
  name: string;
  buy: number;
  sell: number;
  buy_change: number;
  sell_change: number;
}

export interface Saigon3 {
  name: string;
  buy: number;
  sell: number;
  buy_change: number;
  sell_change: number;
}

export interface GoldenFund95 {
  name: string;
  hanoi: Hanoi4;
  saigon: Saigon4;
  rate: number;
  digit: number;
  gap: number;
  update_at: string;
}

export interface Hanoi4 {
  name: string;
  buy: number;
  sell: number;
  buy_change: number;
  sell_change: number;
}

export interface Saigon4 {
  name: string;
  buy: number;
  sell: number;
  buy_change: number;
  sell_change: number;
}

export interface GoldenFund99 {
  name: string;
  hanoi: Hanoi5;
  saigon: Saigon5;
  rate: number;
  digit: number;
  gap: number;
  update_at: string;
}

export interface Hanoi5 {
  name: string;
  buy: number;
  sell: number;
  buy_change: number;
  sell_change: number;
}

export interface Saigon5 {
  name: string;
  buy: number;
  sell: number;
  buy_change: number;
  sell_change: number;
}

export interface ContentNew {
  ID: string;
  created_at: string;
  updated_at: string;
  title: string;
  country: string;
  important: string;
  trending: string;
  content: string;
}

export interface Calendar {
  ID: string;
  created_at: string;
  updated_at: string;
  title: string;
  country: string;
  important: string;
  description: string;
  content: string;
  previous: number;
  forecast: number;
  actual: number;
  unit: string;
  time: string;
  url: string;
  update: boolean;
  result: boolean;
}

export interface SilverPrice {
  name: string;
  hanoi: Hanoi6;
  saigon: Saigon6;
  rate: number;
  digit: number;
  gap: number;
  update_at: string;
}

export interface Hanoi6 {
  name: string;
  buy: number;
  sell: number;
  buy_change: number;
  sell_change: number;
}

export interface Saigon6 {
  name: string;
  buy: number;
  sell: number;
  buy_change: number;
  sell_change: number;
}

export interface VsgGoldTable {
  name: string;
  hanoi: Hanoi7;
  saigon: Saigon7;
  rate: number;
  digit: number;
  gap: number;
  update_at: string;
}

export interface Hanoi7 {
  name: string;
  buy: number;
  sell: number;
  buy_change: number;
  sell_change: number;
}

export interface Saigon7 {
  name: string;
  buy: number;
  sell: number;
  buy_change: number;
  sell_change: number;
}
